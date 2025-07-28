import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { Link } from 'react-router-dom';

const NotesPage = () => {
  const {notes, navigate} = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Your Notes
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Notes Content */}
        {notes.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 backdrop-blur-sm">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-400 text-xl">No notes saved yet.</p>
              <p className="text-gray-500 text-sm mt-2">Create your first note to get started</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
              
                key={note._id}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                         backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                         hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10
                         hover:-translate-y-2 transition-all duration-300 cursor-pointer
                         before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
                         before:from-purple-500/5 before:to-blue-500/5 before:opacity-0 
                         hover:before:opacity-100 before:transition-opacity before:duration-300"
              >
                {/* Note Content */}
                <div className="relative z-10">
                  <Link 
                  to={`/notes/${note._id}`}
                   className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors">

                    {note.title}
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-purple-500 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 right-4 w-1 h-1 bg-blue-500 rounded-full opacity-30"></div>
              </div>
            ))}
          </div>
        )}

        {/* Add Note Button - FIXED CENTERING */}
        <div className="text-center mt-12">
          <Link to="/create">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                             text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 
                             transition-all duration-300 hover:-translate-y-1">
              + Add New Note
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;

