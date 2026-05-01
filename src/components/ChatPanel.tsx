import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { chat as aiChat, isAIConfigured } from '../lib/ai';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestions = [
  'Analyze my SEO performance',
  'Find Reddit opportunities',
  'Generate content ideas',
  'Check AI visibility',
];

const botResponses: Record<string, string> = {
  seo: "Based on your latest audit, here are the key findings:\n\n1. **Page Speed**: 94/100 (+12 improvement)\n2. **Mobile Score**: 91/100\n3. **Critical Issues**: 3 broken internal links found\n4. **Recommendation**: Fix meta descriptions on 5 pages\n\nWould you like me to generate a detailed report?",
  reddit: "I found 4 high-relevance Reddit opportunities:\n\n1. **r/startups** - \"Best marketing tools for indie devs\" (87% match)\n2. **r/SaaS** - \"How to get first 1000 users\" (92% match)\n3. **r/entrepreneur** - \"Marketing automation tips\" (78% match)\n4. **r/webdev** - \"Show HN: My side project\" (85% match)\n\nShall I prepare draft replies?",
  content: "Here are 5 content ideas based on trending topics:\n\n1. \"10 Growth Hacks for SaaS Startups in 2026\" - SEO Score: 89\n2. \"Why AI Marketing is the Future\" - SEO Score: 85\n3. \"Reddit Marketing: A Complete Guide\" - SEO Score: 91\n4. \"How to Optimize for ChatGPT\" - SEO Score: 88\n5. \"Indie Hacker's Marketing Playbook\" - SEO Score: 86\n\nWant me to start writing any of these?",
  visibility: "Your AI Visibility Report:\n\n- **ChatGPT**: Mentioned in 3/10 queries (+2 from last week)\n- **Claude**: Mentioned in 2/10 queries (+1)\n- **Perplexity**: Mentioned in 4/10 queries (+1)\n\nTop performing queries:\n✓ \"marketing automation tool\"\n✓ \"Alinin AI CMO platform\"\n✗ \"SEO optimization tool\" (not mentioned)\n\nRecommendation: Add FAQ schema to improve visibility.",
  default: "I'm your Alinin AI CMO assistant. I can help you with:\n\n• SEO analysis and recommendations\n• Reddit and social media opportunities\n• Content generation and optimization\n• AI visibility tracking\n• Competitor analysis\n\nWhat would you like to explore?",
};

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "👋 Hi! I'm your Alinin AI CMO assistant. I can help you analyze your marketing performance, find opportunities, and generate content. What would you like to know?",
      timestamp: '2:30 PM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    if (lower.includes('seo') || lower.includes('speed') || lower.includes('audit')) {
      return botResponses.seo;
    } else if (lower.includes('reddit') || lower.includes('community')) {
      return botResponses.reddit;
    } else if (lower.includes('content') || lower.includes('article') || lower.includes('blog')) {
      return botResponses.content;
    } else if (lower.includes('visibility') || lower.includes('chatgpt') || lower.includes('ai')) {
      return botResponses.visibility;
    }
    return botResponses.default;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const currentInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    let responseContent = '';

    if (isAIConfigured) {
      // Use real AI when configured
      const conversationHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const aiResponse = await aiChat([
        { role: 'system', content: 'You are an Alinin AI CMO assistant. Help users with marketing, SEO, content, Reddit strategies, and AI visibility. Be concise and actionable.' },
        ...conversationHistory,
        { role: 'user', content: currentInput },
      ]);
      responseContent = aiResponse.error
        ? `⚠️ AI error: ${aiResponse.error}\n\nFalling back to mock response:\n\n${getBotResponse(currentInput)}`
        : aiResponse.content;
    } else {
      // Fall back to mock responses
      await new Promise((r) => setTimeout(r, 1200));
      responseContent = getBotResponse(currentInput);
    }

    const botMessage: Message = {
      id: Date.now() + 1,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-72' : 'w-96'
    }`}>
      <div className="rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-600 to-indigo-600">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Alinin AI CMO Assistant</h3>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/80">{isAIConfigured ? 'Live AI · Online' : 'Demo mode'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}>
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-violet-600'
                        : 'bg-gradient-to-br from-violet-500 to-indigo-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-violet-600 text-white'
                          : 'bg-white/5 text-slate-200'
                      }`}>
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 px-1">{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white/5 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 transition-colors border border-white/10"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your marketing..."
                  className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 border border-white/10"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
