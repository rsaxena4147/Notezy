import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
import { useLocation } from "react-router-dom";

export function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user from backend
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user");

      if (data.message === "no user") {
        setUser(null);
        setLoggedIn(false);
      } else if (data.success) {
        setUser(data.user);

        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Set notes when user is available and has notes
  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");

    try {
      if (data.success) {
        setNotes(data.notes);
      } else {
        console.log("Error in notes fetching ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Run once on mount
  useEffect(() => {
    const getUser = async () => {
      await fetchUser(); // wait till user is fetched
    };
    getUser();
  }, []);

  // When user is updated, update notes
  useEffect(() => {
    
      fetchNotes();
    
  }, [location]);

  const value = {
    user,
    setUser,
    notes,
    setNotes,
    navigate,
    loggedIn,
    setLoggedIn,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
