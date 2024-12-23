import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Ticket from "./Ticket";

function App() {
  // state of the user email
  const [userEmail, setUserEmail] = useState("user1@example.com");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard email={userEmail} />} />
        <Route path="/profile" element={<Profile email={userEmail} setEmail={setUserEmail} />} />
        <Route path="/ticket" element={<TicketRedirect />} />
      </Routes>
    </>
  );
}

function TicketRedirect() {
  useEffect(() => {
    window.location.replace("localhost:3000");
  }, []);

  return null;
}

export default App;
