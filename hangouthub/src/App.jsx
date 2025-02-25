import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// import HangoutPage from "./pages/HangoutPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/hangouts/:id" element={<PrivateRoute component={HangoutPage} />} /> */}
          <Route path="/" element={<PrivateRoute component={HomePage} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
