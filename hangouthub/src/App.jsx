import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import HangoutPage from "./pages/HangoutPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/hangouts/:id" component={HangoutPage} />
          <PrivateRoute path="/" component={HomePage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
