import React from "react";
import { useAppContext } from "../AppContext.jsx";
import { toast } from "react-hot-toast";

function Login() {
  const [state, setState] = React.useState("login"); // 'login' or 'register'
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { setUser, navigate, axios, setLoggedIn } = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(`/api/${state}`, {
        username: name,
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        setLoggedIn(true);
        navigate("/");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-8 font-inter">
      <div className="max-w-6xl w-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row h-full min-h-[600px]">
          
          {/* Left Side - Welcome Section */}
          <div className="md:w-1/2 p-12 flex flex-col justify-center items-center bg-gradient-to-br from-purple-600/20 to-blue-600/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
              <div className="absolute top-40 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-40 right-10 w-12 h-12 border border-white/20 rounded-full"></div>
            </div>

            <div className="relative z-10 text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="mx-auto mb-4 relative">
                  <svg 
                    width="80" 
                    height="80" 
                    viewBox="0 0 80 80" 
                    fill="none" 
                    className="mx-auto"
                  >
                    {/* Notebook pages */}
                    <rect x="15" y="10" width="45" height="58" rx="4" fill="url(#gradient1)" />
                    <rect x="18" y="13" width="39" height="52" rx="2" fill="rgba(255,255,255,0.1)" />
                    
                    {/* Lines on the page */}
                    <line x1="22" y1="25" x2="54" y2="25" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                    <line x1="22" y1="35" x2="50" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                    <line x1="22" y1="45" x2="54" y2="45" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                    <line x1="22" y1="55" x2="48" y2="55" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                    
                    {/* Pen icon */}
                    <path d="M50 20l6 6-18 18-6-6 18-18z" fill="url(#gradient2)" />
                    <circle cx="58" cy="16" r="3" fill="#FFD700"/>
                    
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30"></div>
                </div>

                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
                  NoteMaster
                </h1>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome {state === "login" ? "Back!" : "to NoteMaster!"}
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                {state === "login" 
                  ? "Continue your journey of organizing thoughts and ideas. Your notes are waiting for you."
                  : "Start your journey of organized note-taking. Capture, organize, and never forget your brilliant ideas."
                }
              </p>

              {/* Feature highlights */}
              <div className="mt-8 grid grid-cols-1 gap-4 text-left max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm">Organize your thoughts beautifully</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm">Access your notes anywhere</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm">Never lose an important idea</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 p-12 flex items-center justify-center">
            <form
              onSubmit={onSubmitHandler}
              className="w-full max-w-md space-y-6"
            >
              {/* Form Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {state === "login" ? "Sign In" : "Create Account"}
                </h3>
                <p className="text-gray-400">
                  {state === "login" 
                    ? "Enter your credentials to access your notes"
                    : "Fill in your details to get started"
                  }
                </p>
              </div>

              {/* Name Field (Register only) */}
              {state === "register" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-white/20 rounded-xl 
                             text-white placeholder-gray-400 text-sm
                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-300 hover:border-white/30"
                    type="text"
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-white/20 rounded-xl 
                           text-white placeholder-gray-400 text-sm
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-300 hover:border-white/30"
                  type="email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-white/20 rounded-xl 
                           text-white placeholder-gray-400 text-sm
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-300 hover:border-white/30"
                  type="password"
                  required
                />
              </div>

              {/* Toggle Login/Register */}
              <div className="text-center">
                {state === "register" ? (
                  <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setState("login")}
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300 hover:underline"
                    >
                      Sign in here
                    </button>
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setState("register")}
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300 hover:underline"
                    >
                      Create one here
                    </button>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                         disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed
                         text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 
                         transition-all duration-300 hover:-translate-y-1 disabled:hover:translate-y-0
                         text-lg flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {state === "register" ? "Creating..." : "Signing in..."}
                  </>
                ) : (
                  <>
                    {state === "register" ? "✨ Create Account" : "🚀 Sign In"}
                  </>
                )}
              </button>

              {/* Decorative Elements */}
              <div className="relative">
                <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500 rounded-full opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-1 h-1 bg-blue-500 rounded-full opacity-30"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
