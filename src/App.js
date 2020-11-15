import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import signIn from "./pages/signInPage";
import {signUp} from "./pages/signUpPage";
import { main } from "./pages/mainPage";
import {register} from "./pages/registerPage";
import path from "path";
import dotenv from "dotenv";

import { UserContextProvider } from "./context/UserContext";

function App() {

  dotenv.config();
  const defaultEnv = "local";
  const envPath = path.resolve(process.cwd(), `.env.${defaultEnv}`);
  dotenv.config({ path: envPath });

  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              UserContextProvider.isSigned ? (
                <Redirect to="/main" />
              ) : (
                <Redirect to="/signin" />
              )
            }
          />
          <Route exact path="/signin" component={signIn} />
          <Route exact path="/signup" component={signUp} />
          <Route exact path="/register/:accountType" component={register} />
          <Route exact path="/main" component={main} />
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
