import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../AuthPage/LoginPage";
import { getUser } from "../../utils/users-service";
import SignUpPage from "../AuthPage/SignUpPage";
import LandingPage from "../LandingPage/LandingPage";

export default function App() {
  const [ user, setUser ] = useState(getUser());
  console.log("App User: ", user);

  return (
      <main className="App">
        <NavBar />
        {user ? (
          <>
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpPage user={user} setUser={setUser}/>} />
              <Route path="/login" element={<LoginPage setUser={setUser}/>} />
            </Routes>
          </>
        )}
      </main>
  );
}
