import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import home from "./pages/home";
import signIn from "./pages/signIn";
import signUp from "./pages/signUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={signUp} />
        <Route exact path="/signin" component={signIn} />
        <Route exact path="/signup" component={signUp} />
      </Switch>
    </Router>
  );
}

export default App;
