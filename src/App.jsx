import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import "./App.css";
import catImg from "./assets/cat.gif"

const severityTypes = {
  success: "success",
  error: "error",
  warning: "warning"
};

const SeverityMessages = {
  [severityTypes.success]: "Success! You are logged in.",
  [severityTypes.error]: "Error! Please try with another credentials.",
  [severityTypes.warning]: "Warning! Incorrect Email or Password.",
};

function App() {
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [validity, setValidity] = useState({
    email: true,
    password: true,
  });
  const [severity, setSeverity] = useState(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return String(password).length > 5;
  };

  const validateAndSetSeverity = () => {
    const emailValidityState = validateEmail(emailValue)
    const passwordValidityState = validatePassword(passwordValue)

    setValidity(() => ({
      email: emailValidityState,
      password: passwordValidityState,
    }));

    if (emailValidityState && passwordValidityState) {
      setSeverity(severityTypes.success);
      
      return;
    }

    if (emailValidityState || passwordValidityState) {
      setSeverity(severityTypes.warning);

      return;
    }

    setSeverity(severityTypes.error);
  };

  const clickHandler = () => {
    validateAndSetSeverity();
  };

  return (
    <>
      { severity === severityTypes.success && <div className="img">
        <img src={catImg} alt="Dancing cat" />
      </div>}
      <div id="form">
        <div className="input-field">
          <TextField
            error={!validity.email}
            value={emailValue}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            variant="outlined"
            label="Email"
          />
        </div>

        <div className="input-field">
          <TextField
            error={!validity.password}
            value={passwordValue}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            variant="outlined"
            label="Password"
            type="password"
          />
        </div>

        <Button onClick={clickHandler} variant="contained">
          Log-In
        </Button>
      </div>
      <div>
        {severity && (
          <Alert severity={severity}>{SeverityMessages[severity]}</Alert>
        )}
      </div>
    </>
  );
}

export default App;
