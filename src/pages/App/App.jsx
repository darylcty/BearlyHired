import debug from "debug";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../../components/AuthPage/AuthPage";
import NewOrderPage from "../../components/NewOrderPage/NewOrderPage";
import OrderHistory from "../../components/OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import LoginForm from "../../components/LoginForm/LoginForm";
import { getUser } from "../../utils/users-service";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start React App");

export default function App() {
  const [ user, setUser ] = useState(getUser());
  console.log("App User: ", user);

  return (
      <main className="App">
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistory />} />
            </Routes>
          </>
        ) : (
          <>
            <AuthPage user={user} setUser={setUser}/>
            <LoginForm setUser={setUser}/>
          </>
        )}
      </main>
  );
}
