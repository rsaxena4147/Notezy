import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom"; // <-- Corrected import
import { Toaster } from "react-hot-toast";
import NotesPage from "./components/NotesPage";

import Home from "./components/Home";
import Login from "./components/Login";
import { AppProvider, useAppContext } from "./AppContext";
import CreateNotePage from "./components/CreateNotePage";
import NoteDetailPage from "./components/NoteDetailPage";
import AboutPage from "./components/AboutPage";

function App() {
  const { loggedIn } = useAppContext();
  return (
    <>
      <Toaster />
      <NavBar />

      <Routes>
        {" "}
        {/* <-- Corrected component name */}
        {loggedIn ? (
          <Route path="/" element={<NotesPage />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
