import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import MainApp from "./components/MainApp";
import Register from "./components/auth/Register";
import { ThemeProvider } from "@emotion/react";
import theme from "./themes/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/app" element={<MainApp />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;