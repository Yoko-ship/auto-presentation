import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import Create from "./components/Create";
import Create_page from "./components/Create_page";
import PresentMaker from "./components/PresentMaker";
import Waiting from "./components/Waiting";
import Error from "./components/Error";
import Contacts from "./components/Contacts";
import PresentationContext from "./store/PresentationContext";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <PresentationContext>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Create />}></Route>
            <Route path="/generate" element={<Create_page />}></Route>
            <Route path="/present" element={<PresentMaker />}></Route>
            <Route path="/waiting" element={<Waiting />}></Route>
            <Route path="/error" element={<Error />}></Route>
            <Route path="/contacts" element={<Contacts />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register/>}></Route>
          </Routes>
        </Router>
      </PresentationContext>
    </>
  );
}

export default App;
