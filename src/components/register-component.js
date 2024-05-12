import React, { useState, useEffect } from "react";
import "./styles/register.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";
function RegisterComponent() {
  let [message, setMessage] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [password2, setPassword2] = useState("");
  const nagivate = useNavigate();
  useEffect(() => {
    setEmail("");
  }, []); // 只在組件加載時執行一次
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  function handleClick(e) {
    e.preventDefault(); // 阻止表單的默認提交行為
    if (email.length < 5 || password.length < 5 || password2.length < 5) {
      setMessage("帳號密碼請填寫完整");
      console.log(email.length + " " + password.length);
    } else if (password != password2) {
      setMessage("確認密碼不正確");
    } else {
      AuthService.register(email, password)
        .then(() => {
          window.alert("註冊成功。您現在將被導向到登入頁面");
          nagivate("/login");
        })
        .catch((e) => {
          console.log(e.response);
          setMessage(e.response.data);
        });
    }
  }

  return (
    <div className="background">
      <form>
        <h1>註冊</h1>
        <label>信箱</label>
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
          placeholder="密碼最小長度為五"
        ></input>
        <br />
        <label>密碼確認</label>
        <input
          onChange={handlePassword2}
          name="password2"
          type="password"
          maxLength={"20"}
          minLength={"5"}
          placeholder="密碼最小長度為五"
        ></input>
        <br />
        <button onClick={handleClick}>註冊</button>
        {message && (
          <div className="alert">
            <p style={{ color: "red" }}>{message}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterComponent;
