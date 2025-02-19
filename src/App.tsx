import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/connexion/Register";
import Login from "./pages/connexion/Login";
import Dashboard from "./pages/Dashboard";
import Wrapper from "./pages/Wrapper";
import Navbar from "./components/Navbar";
import NavbarConnected from "./components/NavbarConnected";
import Messages from "./pages/Messages";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
import Companies from "./pages/Companies";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home */}
        <Route
          path="/"
          element={
            <>
              <Navbar /> {/* Affiche la Navbar uniquement sur la page d'accueil */}
              <Home />
            </>
          }
        />

        {/* register */}
        <Route path="/register" element={
          <>
            <Navbar /> {/* Affiche la Navbar uniquement sur la page d'inscription */}
            <Register />
          </>
        }
        />

        {/* login */}
        <Route path="/login" element={
          <>
            <Navbar /> {/* Affiche la Navbar uniquement sur la page de connexion */}
            <Login />
          </>
        }
        />

        {/* dashboard */}
        <Route
          path="/dashboard"
          element={
            <Wrapper>
              <>
                <NavbarConnected />
                <Dashboard />
              </>

            </Wrapper>
          }
        />

        <Route
          path="/messages"
          element={
            <Wrapper>
              <NavbarConnected />
              <Messages />
            </Wrapper>
          }
        />

        <Route
          path="/profile"
          element={
            <Wrapper>
              <NavbarConnected />
              <Profile />
            </Wrapper>
          }
        />

        {/* <Route
          path="/settings"
          element={
            <Wrapper>
              <NavbarConnected />
              <Settings />
            </Wrapper>
          }
        /> */}

        <Route
          path="/jobs"
          element={
            <Wrapper>
              <NavbarConnected />
              <Jobs />
            </Wrapper>
          }
        />

        <Route
          path="/entreprises"
          element={
            <Wrapper>
              <NavbarConnected />
              <Companies />
            </Wrapper>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;