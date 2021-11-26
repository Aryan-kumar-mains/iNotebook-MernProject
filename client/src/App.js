import { Box } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Component
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.js";
import Login from "./components/User/Login"
import Signup from "./components/User/SignUp.jsx";

// This is Context
import NoteState from "./context/notes/NoteState.js";
import DrawerState from "./context/drawer/DrawerState.js";
import DialogState from "./context/dialogBox/DialogState.js";
import SignUpState from "./context/user/SignUpState.js";
import Profile from "./components/User/Profile.jsx";

function App() {
  return (
    <SignUpState>
      <DialogState> {/*  this is a context, for opening Dialog */}
        <DrawerState> {/* this is a context, for opening left drawer  */}
          <NoteState>  {/* this is a context, for fetching all the notes */}
            <BrowserRouter>
              <Navbar />
              <Box>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/user/login" component={Login} />
                  <Route exact path="/user/signup" component={Signup} />
                  <Route exact path="/user/profile" component={Profile} />
                </Switch>
              </Box>
            </BrowserRouter>
          </NoteState>
        </DrawerState>
      </DialogState>
    </SignUpState>
  );
}

export default App;
