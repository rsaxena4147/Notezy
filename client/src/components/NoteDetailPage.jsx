import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { toast } from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const { axios, navigate } = useAppContext();

  const fetdata = async () => {
    try {
      const { data } = await axios.get(`/api/notes/${id}`);
      if (data.success) {
        setNote(data.note);
        setEditTitle(data.note.title);
        setEditContent(data.note.content);
      } else {
        toast.error("Note not found");
      }
    } catch (error) {
      toast.error("Error in show");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      const { data } = await axios.put(`/api/notes/${id}`, {
        title: editTitle,
        content: editContent
      });
      
      if (data.success) {
        setNote({ title: editTitle, content: editContent });
        setIsEditing(false);
        toast.success('Note updated successfully!');
      } else {
        toast.error('Failed to update note');
      }
    } catch (error) {
      toast.error('Error updating note');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const { data } = await axios.delete(`/api/notes/${id}`);
        if (data.success) {
          toast.success('Note deleted successfully!');
          navigate('/');
        } else {
          toast.error('Failed to delete note');
        }
      } catch (error) {
        toast.error('Error deleting note');
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetdata();
  }, []);

  // Fixed date formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      })
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 font-inter">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading note...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 font-inter">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-400 text-xl">Note not found</p>
          <Link
            to="/"
            className="text-purple-400 hover:text-purple-300 mt-4 inline-block"
          >
            ← Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  // Fixed date variables
  const createdDate = formatDate(note.createdAt);
  const updatedDate = note.updatedAt ? formatDate(note.updatedAt) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 font-inter">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/notes"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Notes
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
          {/* Header with Actions */}
          <div className="border-b border-white/10 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-3xl font-bold bg-transparent text-white border-b-2 border-purple-500 focus:outline-none pb-2"
                  autoFocus
                />
              ) : (
                <h1 className="text-3xl font-bold text-white">{note.title}</h1>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditTitle(note.title);
                      setEditContent(note.content);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={12}
                className="w-full bg-gray-700/50 border border-white/20 rounded-xl p-4 text-white text-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            )}
          </div>

          {/* Footer with Timestamps */}
          <div className="border-t border-white/10 p-6 bg-gray-900/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Created: {createdDate.date} at {createdDate.time}
                </span>
              </div>

              {updatedDate && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
                  </svg>
                  <span>
                    Updated: {updatedDate.date} at {updatedDate.time}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full opacity-50"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
