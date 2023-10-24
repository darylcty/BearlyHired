import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getUser } from "../../utils/users-service";

import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../AuthPage/LoginPage";
import SignUpPage from "../AuthPage/SignUpPage";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from '../DashboardPage/Dashboard';
import JobApplicationForm from '../JobApplicationForm/JobApplicationForm';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import CompanyCreationForm from '../CompanyCreationForm/CompanyCreationForm';

export default function App() {
  const [ user, setUser ] = useState(getUser());
  console.log("App User: ", user);

  return (
      <main className="App">
        <NavBar user={user} setUser={setUser} />
        <Routes>
        {user ? (
          <>
            {user.isAdmin ? (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/companycreation" element={<CompanyCreationForm />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/jobs" element={<JobApplicationForm />} />
              </>
          )}
          </>
          ) : (
          <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpPage user={user} setUser={setUser}/>} />
              <Route path="/login" element={<LoginPage setUser={setUser}/>} />
          </>
        )}
        </Routes>
      </main>
  );
}
