import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CreateNotePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { axios, navigate } = useAppContext();

 
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/createnote', {title , content});

     

      if (data.success || data.message === 'Note created') {
        toast.success("Note created successfully!");
        navigate("/",  { state: { refresh: true } })
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error connecting to server");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 font-inter">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Create New Note
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Form Container */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={onSubmitHandler} className="space-y-8">
            {/* Title Input */}
            <div className="space-y-2">
              <label 
                htmlFor="title" 
                className="block text-lg font-semibold text-white mb-3"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-4 bg-gray-700/50 border border-white/20 rounded-xl 
                         text-white placeholder-gray-400 text-lg
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-all duration-300 hover:border-white/30
                         backdrop-blur-sm"
              />
            </div>

            {/* Content Textarea */}
            <div className="space-y-2">
              <label 
                htmlFor="content" 
                className="block text-lg font-semibold text-white mb-3"
              >
                Content
              </label>
              <textarea
                id="content"
                placeholder="Write your note content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                className="w-full px-4 py-4 bg-gray-700/50 border border-white/20 rounded-xl 
                         text-white placeholder-gray-400 text-lg resize-none
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-all duration-300 hover:border-white/30
                         backdrop-blur-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
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
                    Creating...
                  </>
                ) : (
                  '✨ Create Note'
                )}
              </button>

              {/* Cancel Button */}
              <Link
                to="/notes"
                className="flex-1 bg-gray-600/50 hover:bg-gray-600/70 border border-white/20 hover:border-white/30
                         text-white font-semibold px-8 py-4 rounded-xl 
                         transition-all duration-300 hover:-translate-y-1
                         text-lg flex items-center justify-center"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Decorative Elements */}
          <div className="absolute top-6 right-6 w-3 h-3 bg-purple-500 rounded-full opacity-50"></div>
          <div className="absolute bottom-6 right-6 w-2 h-2 bg-blue-500 rounded-full opacity-30"></div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            💡 **Tip:** Use descriptive titles to easily find your notes later
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateNotePage;
