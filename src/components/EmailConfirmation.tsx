import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function EmailConfirmation() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const type = params.get('type');

    if (token && type === 'signup' && supabase) {
      supabase.auth.verifyOtp({
        token_hash: token,
        type: 'signup',
      }).then(({ error }) => {
        if (error) {
          setStatus('error');
          setMessage(error.message);
        } else {
          setStatus('success');
          setMessage('Email verified successfully! Redirecting...');
          setTimeout(() => window.location.href = '/', 2000);
        }
      });
    } else {
      setStatus('success');
      setMessage('Email already verified. Redirecting...');
      setTimeout(() => window.location.href = '/', 1500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center space-y-6">
        {status === 'verifying' && (
          <>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20">
              <Loader2 className="h-10 w-10 text-violet-400 animate-spin" />
            </div>
            <p className="text-white font-medium">{message}</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <p className="text-white font-medium">{message}</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
              <AlertCircle className="h-10 w-10 text-red-400" />
            </div>
            <p className="text-white font-medium">{message}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
