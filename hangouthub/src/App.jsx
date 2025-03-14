import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import HangoutPage from "./pages/HangoutPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoute from "./components/PrivateRoute";
import CreateHangoutPage from "./pages/CreateHangoutPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/hangouts/:id"
            element={<PrivateRoute element={<HangoutPage />} />}
          />
          <Route
            path="/create-hangout"
            element={<PrivateRoute element={<CreateHangoutPage />} />}
          />
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
