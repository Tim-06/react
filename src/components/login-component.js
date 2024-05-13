import React, { useState, useEffect } from "react";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";

function LoginComponent({ setCurrentUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEmail("");
  }, []); // 只在組件加載時執行一次

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // 阻止表單的默認提交行為
    if (email.length < 5 || password.length < 5) {
      setMessage("帳號或密碼不可以是空的");
      console.log(email.length + " " + password.length);
    } else {
      AuthService.login(email, password)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          window.alert("登入成功。");
          setCurrentUser(AuthService.getCurrentUser()); // 更新當前用戶的狀態
          navigate("/"); // 重新導向到首頁
        })
        .catch((e) => {
          console.log(e.response);
          setMessage(e.response.data);
        });
    }
  };

  return (
    <div className="background">
      <form>
        <h1>登入</h1>
        <label>帳號</label>
        <input
          onChange={handleEmail}
          name="email"
          type="email"
          maxLength={"20"}
          minLength={"5"}
          placeholder="email@example.com"
        ></input>
        <br />
        <label>密碼</label>
        <input
          onChange={handlePassword}
          name="password"
          type="password"
          maxLength={"20"}
          minLength={"5"}
        ></input>
        <br />
        <button onClick={handleLogin}>登入</button>
        {message && (
          <div className="alert">
            <p style={{ color: "red" }}>{message}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginComponent;
