import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/nav.css";
import AuthService from "../service/auth.service";
function NavComponent({ currentUser, setCurrentUser }) {
  const handleLogout = () => {
    AuthService.logout();
    window.alert("登出成功!現在您會被導向到首頁。");
    setCurrentUser(null);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              首頁
            </Link>
          </li>
          {currentUser && (
            <li>
              <Link className="nav-link" to="customFood">
                自訂食物
              </Link>
            </li>
          )}

          {!currentUser && (
            <li>
              <Link className="nav-link" to="register">
                註冊
              </Link>
            </li>
          )}
          {!currentUser && (
            <li>
              <Link className="nav-link" to="login">
                登入
              </Link>
            </li>
          )}

          {currentUser && (
            <li>
              <Link onClick={handleLogout} className="nav-link" to="/">
                登出
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavComponent;
