import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Smart Note Taking",
      description: "Create, edit, and organize your notes with our intuitive interface designed for productivity."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      title: "Perfect Organization",
      description: "Categorize and sort your notes effortlessly. Find what you need, when you need it."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Powerful Search",
      description: "Instantly find any note with our advanced search functionality. Never lose an important idea again."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure & Private",
      description: "Your notes are encrypted and secure. Only you have access to your personal thoughts and ideas."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500K+", label: "Notes Created" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9/5", label: "User Rating" }
  ];

  const teamMembers = [
    {
      name: "Rimjhim Saxena",
      role: "Founder & CEO",
      image: "https://image.lexica.art/full_webp/170e602d-b13d-4f19-b446-48405dd6bbd2",
      description: "Passionate about productivity and helping people organize their digital lives."
    },
    {
      name: "Sarah Chen",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "Creates beautiful, intuitive interfaces that make note-taking a joy."
    },
    {
      name: "Mike Rodriguez",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      description: "Builds robust, scalable solutions that keep your notes safe and accessible."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black font-inter">
      
      {/* Hero Section */}
      <section className="relative py-20 px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-60 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-40 left-40 w-40 h-40 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="mb-8">
              <div className="mx-auto mb-6 relative">
                <svg 
                  width="120" 
                  height="120" 
                  viewBox="0 0 120 120" 
                  fill="none" 
                  className="mx-auto"
                >
                  <rect x="20" y="15" width="70" height="85" rx="6" fill="url(#gradient1)" />
                  <rect x="25" y="20" width="60" height="75" rx="3" fill="rgba(255,255,255,0.1)" />
                  
                  <line x1="32" y1="35" x2="78" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="3"/>
                  <line x1="32" y1="50" x2="72" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="3"/>
                  <line x1="32" y1="65" x2="78" y2="65" stroke="rgba(255,255,255,0.4)" strokeWidth="3"/>
                  <line x1="32" y1="80" x2="70" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="3"/>
                  
                  <path d="M75 30l9 9-27 27-9-9 27-27z" fill="url(#gradient2)" />
                  <circle cx="87" cy="24" r="4" fill="#FFD700"/>
                  
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
                
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-30"></div>
              </div>

              <h1 className="text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
                NoteMaster
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-8"></div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">
              Your Digital Brain for Better Ideas
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
              NoteMaster is more than just a note-taking app. It's your personal knowledge management system, 
              designed to capture, organize, and retrieve your thoughts effortlessly. Whether you're a student, 
              professional, or creative thinker, we help you turn chaos into clarity.
            </p>

            <Link 
              to="/notes"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                       text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 
                       transition-all duration-300 hover:-translate-y-1 text-lg"
            >
              Start Taking Notes
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Why Choose NoteMaster?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Packed with features designed to make your note-taking experience seamless and productive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-30"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-12 relative overflow-hidden">
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              We believe that everyone has brilliant ideas worth preserving. Our mission is to provide the most 
              intuitive, beautiful, and powerful note-taking experience that helps you capture, organize, and 
              connect your thoughts in meaningful ways.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="text-lg font-semibold text-white mb-2">Innovation</h4>
                <p className="text-gray-400 text-sm">Constantly evolving with cutting-edge features</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="text-lg font-semibold text-white mb-2">Simplicity</h4>
                <p className="text-gray-400 text-sm">Complex functionality, simple interface</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="text-lg font-semibold text-white mb-2">Privacy</h4>
                <p className="text-gray-400 text-sm">Your thoughts remain yours, always</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-6 right-6 w-4 h-4 bg-purple-500 rounded-full opacity-50"></div>
            <div className="absolute bottom-6 left-6 w-3 h-3 bg-blue-500 rounded-full opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The passionate individuals behind NoteMaster, dedicated to revolutionizing how you organize your thoughts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 text-center relative overflow-hidden"
              >
                <div className="mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gradient-to-r from-purple-500 to-blue-500 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {member.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-purple-500 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-500 rounded-full opacity-30"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-12 relative overflow-hidden">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Note-Taking?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of organized thinking with NoteMaster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                         text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 
                         transition-all duration-300 hover:-translate-y-1 text-lg"
              >
                Get Started Free
              </Link>
              <Link 
                to="/notes"
                className="bg-gray-700/50 hover:bg-gray-600/50 border border-white/20 hover:border-white/30
                         text-white font-semibold px-8 py-4 rounded-xl 
                         transition-all duration-300 hover:-translate-y-1 text-lg"
              >
                View Demo
              </Link>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-12 h-12 border border-white rounded-full"></div>
              <div className="absolute top-20 right-8 w-8 h-8 border border-white rounded-full"></div>
              <div className="absolute bottom-8 left-12 w-16 h-16 border border-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
