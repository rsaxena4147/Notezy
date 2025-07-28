import React from 'react';

function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to <span className="text-indigo-500">Notezy</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        Your personal, secure vault for ideas, notes, and thoughts.
        Organize everything in one place, from anywhere.
      </p>
      <p className="text-md text-gray-400">
        Login or sign up to start creating your notes now.
      </p>
    </div>
  );
}

export default Home;
