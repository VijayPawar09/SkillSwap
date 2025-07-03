import React, { useState } from "react";

export default function HomeAuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#f6f2fa] overflow-hidden">
      {/* Abstract SVG background shapes */}
      <svg className="absolute top-0 left-0 w-full h-full" style={{zIndex: 0}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5c6ec" />
            <stop offset="100%" stopColor="#c3b6f7" />
          </linearGradient>
        </defs>
        <ellipse cx="20%" cy="20%" rx="40%" ry="35%" fill="url(#grad1)" opacity="0.5" />
        <ellipse cx="80%" cy="20%" rx="30%" ry="30%" fill="url(#grad1)" opacity="0.3" />
        <ellipse cx="50%" cy="80%" rx="45%" ry="35%" fill="url(#grad1)" opacity="0.4" />
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-2">Skill <span className="font-semibold">Swap</span></h1>
        <p className="text-xl font-semibold text-blue-400 mb-8">Never stop learning.</p>
        
        <div className="w-full max-w-xs bg-white bg-opacity-90 rounded-2xl shadow-lg p-8">
          {isLogin ? (
            <>
              <h2 className="text-2xl font-bold text-center text-red-500 mb-6">Sign In</h2>
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="rounded-full px-5 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-full px-5 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
                <button
                  type="submit"
                  className="py-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold shadow hover:opacity-90 transition"
                >
                  Login
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-purple-500 hover:underline font-medium"
                >
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Sign Up</h2>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-full px-5 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="rounded-full px-5 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-full px-5 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-full px-5 py-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
                <button
                  type="submit"
                  className="py-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold shadow hover:opacity-90 transition"
                >
                  Register
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-red-500 hover:underline font-medium"
                >
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
