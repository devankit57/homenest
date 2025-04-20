'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: "url('/login-bg.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Login card */}
      <div className="relative z-10 bg-white rounded-3xl px-10 py-14 max-w-md w-full text-center shadow-2xl hover:shadow-3xl transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Homenest</span>
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Your trusted platform for shared living. 
        </p>

        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition duration-300 font-semibold"
        >
          <img
            src="/google.webp"
            alt="Google"
            className="w-5 h-5 bg-white rounded-full p-1"
          />
          Continue with Google
        </button>

        <p className="mt-8 text-xs text-gray-400">
          By continuing, you agree to our{' '}
          <span className="underline cursor-pointer hover:text-blue-600">Terms</span>{' '}
          and{' '}
          <span className="underline cursor-pointer hover:text-blue-600">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
