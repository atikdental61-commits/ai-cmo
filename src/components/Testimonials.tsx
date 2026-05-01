import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "We've been running Alinin AI CMO for some weeks now. It's positioning our investment bank in three languages, across four verticals, targeting capital allocators in the US, Canada, and LATAM simultaneously.",
    author: 'Pablo Fernando Altamira López',
    role: 'velarib.com',
    avatar: 'PA',
  },
  {
    quote: "This is really good if you're a solo dev and need some marketing/product insights. The action items and daily suggestions are incredibly helpful.",
    author: 'Arda Yuceler',
    role: 'LinkedIn',
    avatar: 'AY',
  },
  {
    quote: "I am a huge fan. Already used it for site analysis, SEO gaps etc. It's actually impressive. Reddit opportunities, SEO, articles — all in one place.",
    author: 'Hassan Chattha',
    role: 'LinkedIn',
    avatar: 'HC',
  },
  {
    quote: "This is a no-brainer for a bootstrapped founder with zero marketing budget and a product that works. The ROI is incredible.",
    author: 'Demetri Panici',
    role: 'LinkedIn',
    avatar: 'DP',
  },
  {
    quote: "I love the action items, daily and weekly suggestions, and tracking of articles and posts on X and Reddit very helpful. Alinin AI CMO is a perfect fit for managing resources from a marketing perspective.",
    author: 'Brian Proctor',
    role: 'questdatingapp.com',
    avatar: 'BP',
  },
  {
    quote: "After trying Alinin AI CMO suggestions for the first four days without question, I observed a noticeable jump in Google console and website dashboard. It built trust in the product's advice.",
    author: 'Ehsan Azish',
    role: '3nsofts.com',
    avatar: 'EA',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-slate-300 ring-1 ring-white/10 backdrop-blur-sm mb-4">
            <Star className="h-4 w-4 text-yellow-400" />
            Loved by Founders
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What people are saying
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Trusted by indie hackers, solo founders, and small teams worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 hover:bg-white/[0.05] transition-all duration-300"
            >
              <Quote className="h-8 w-8 text-violet-500/30 mb-4" />
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-semibold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{testimonial.author}</p>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '4.9/5', label: 'Average rating' },
            { value: '10,000+', label: 'Websites analyzed' },
            { value: '50M+', label: 'Impressions generated' },
            { value: '98%', label: 'User satisfaction' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
