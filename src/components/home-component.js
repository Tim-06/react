import React, { useState, useEffect } from "react";
import "./styles/home.css";
import bear1 from "./bear1.png";
import bear2 from "./bear2.png";
import foodGet from "../service/foodGet.service";
import authService from "../service/auth.service";
function HomeComponent({ currentUser, setCurrentUser }) {
  const [bearImage, setBearImage] = useState(bear1);
  const [foodList, setFoodList] = useState([]);
  const [result, setResult] = useState("吃什麼?");
  const [selectedOption, setSelectedOption] = useState("隨機");
  const [firstStartPage, setFirstStartPage] = useState(true);
  const start = () => {
    setFirstStartPage(false);
    //登入的使用者按下按鈕，開始從資料庫取出特定資料
    if (currentUser) {
      const userEmail = authService.getCurrentUser().user.email;

      foodGet
        .getUserFood(userEmail)
        .then((res) => {
          if (selectedOption != "隨機") {
            let dataList = res.data[0].foods
              .filter((item) => item.foodType === selectedOption)
              .map((item) => item.foodName);
            setFoodList(dataList);
            console.log(dataList);
            console.log(selectedOption);
          } else {
            let dataList = res.data[0].foods.map((item) => item.foodName);
            setFoodList(dataList);
            console.log(dataList);
          }
        })
        .catch((e) => {
          console.log("獲取食物失敗:" + e);
        });
    }
    //沒登入的使用者按下按鈕，開始從資料庫取出特定資料
    else {
      if (selectedOption && selectedOption != "隨機") {
        foodGet
          .getFood(selectedOption)
          .then((res) => {
            let dataList = res.data.map((item) => item.foodName);
            setFoodList(dataList);
            console.log(dataList);
            // stop();
          })
          .catch((e) => {
            console.log("獲取食物失敗:" + e);
          });
      } else {
        foodGet
          .getAllFood()
          .then((res) => {
            let dataList = res.data.map((item) => item.foodName);
            setFoodList(dataList);
            console.log(dataList);
          })
          .catch((e) => {
            console.log("獲取食物失敗:" + e);
          });
      }
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (!firstStartPage) {
      const randomIndex = Math.floor(Math.random() * foodList.length);
      setResult(foodList[randomIndex]);
      setBearImage(bear2);
    }
  }, [foodList]);

  useEffect(() => {
    //獲取使用者食物資料

    if (currentUser) {
      const userEmail = authService.getCurrentUser().user.email;

      foodGet
        .getUserFood(userEmail)
        .then((res) => {
          let dataList = res.data[0].foods.map((item) => item.foodName);
          setFoodList(dataList);
          console.log(dataList);
        })
        .catch((e) => {
          console.log("獲取食物失敗:" + e);
        });
    } else {
      //獲取預設食物資料
      foodGet
        .getAllFood()
        .then((res) => {
          let dataList = res.data.map((item) => item.foodName);
          setFoodList(dataList);
        })
        .catch((e) => {
          console.log("獲取食物失敗:" + e);
        });
    }
  }, []);

  return (
    <div className="divBackGround">
      <div className="search">
        <p>{result}</p>
        <select
          className="selectContainer"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="隨機">隨機</option>
          <option value="早餐">早餐</option>
          <option value="午餐">午餐</option>
          <option value="晚餐">晚餐</option>
          <option value="點心">點心</option>
        </select>

        <button onClick={start}>推薦</button>
      </div>

      <div className="Img">
        <img src={bearImage} alt="吃什麼?"></img>
      </div>
    </div>
  );
}

export default HomeComponent;
