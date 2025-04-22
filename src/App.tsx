import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import MainApp from "./components/MainApp";
import Register from "./components/auth/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;