import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from "./components/Main";
import "./components/css/header.css";
import Create from "./components/Create";
import Create_page from "./components/Create_page";
import PresentMaker from "./components/PresentMaker";
import { useEffect, useState } from "react";
import Waiting from "./components/Waiting";

function App() {
  const [action, setAction] = useState("");
  const [image, setImage] = useState("");
  const [imageSecond, setSecondImage] = useState("");
  const [imageThird, setThirdImage] = useState("");
  const [imageFourth, setFourthImage] = useState("");

  return (
    <>
      <Router>
        <header>
          <ul>
            <li>
              <Link to="/">Главное меню</Link>
            </li>
            <li>
              <Link to="/create">Создать презентацию</Link>
            </li>
            <li>
              <Link to="/login">Авторизация</Link>
            </li>
            <li>
              <Link to="/present">Презент</Link>
            </li>
          </ul>
        </header>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route
            path="/generate"
            element={<Create_page setAction={setAction} />}
          ></Route>
          <Route
            path="/present"
            element={
              <PresentMaker
                action={action}
                imageOne={image}
                imageSecond={imageSecond}
                imageThird={imageThird}
                imageFourth={imageFourth}
              />
            }
          ></Route>
          <Route
            path="/waiting"
            element={
              <Waiting
                action={action}
                setFirstImage={setImage}
                setSecondImage={setSecondImage}
                setThirdImage={setThirdImage}
                setFourthImage={setFourthImage}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
