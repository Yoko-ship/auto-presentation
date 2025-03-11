import React from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./css/header.css";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Создать презентацию</Link>
          </li>
          <li>
            <Link to="/contacts">Контакты</Link>
          </li>
          <li>
            <Link to="/login">Войти</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
