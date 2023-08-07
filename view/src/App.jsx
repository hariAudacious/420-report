import { useState } from "react";
import Login from "./Pages/Login";
import ReportingForm from "./Pages/ReportingForm";

const App = () => {
  const [credential, setCredential] = useState(localStorage.getItem("auth"));
  const auth = credential ? JSON.parse(credential) : {};
  return (
    <>{true ? <ReportingForm /> : <Login instantLogin={setCredential} />}</>
  );
};

export default App;
