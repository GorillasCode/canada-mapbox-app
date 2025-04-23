import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import MainApp from "./components/MainApp";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <MainApp />
              </PrivateRoute>
            }
          />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;