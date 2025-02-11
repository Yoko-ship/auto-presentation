import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./components/css/header.css";
import Create from "./components/Create";
import Create_page from "./components/Create_page";
import PresentMaker from "./components/PresentMaker";
import {useState } from "react";
import Waiting from "./components/Waiting";
import Error from "./components/Error";

function App() {
  const [action, setAction] = useState("");
  const [image, setImage] = useState("");
  const [imageSecond, setSecondImage] = useState("");
  const [imageThird, setThirdImage] = useState("");
  const [imageFourth, setFourthImage] = useState("");
  const [selectValue,setSelectValue] = useState()


  return (
    <>
      <Router>
        <header>
          <ul>
            <li>
              <Link to="/">Создать презентацию</Link>
            </li>
          </ul>
        </header>
        <Routes>
          <Route path="/" element={<Create />}></Route>
          <Route
            path="/generate"
            element={<Create_page setAction={setAction} setSelectValue={setSelectValue} />}
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
                backgroundImage={selectValue}
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
          <Route path="/error" element={<Error/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
