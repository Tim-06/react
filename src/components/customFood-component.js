import React, { useState, useEffect } from "react";
import "./styles/customFood.css";
import foodGet from "../service/foodGet.service";
import authService from "../service/auth.service";

function CustomFoodComponent({ currentUser }) {
  const [foodList, setFoodList] = useState([]);
  const [showForm, setShowForm] = useState(false); // 控制表格的顯示與隱藏
  const [selectedOption, setSelectedOption] = useState("早餐");
  const [newFoodName, setNewFoodName] = useState("");
  const [renew, setRenew] = useState(false);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleNewFoodName = (e) => {
    setNewFoodName(e.target.value);
  };
  //插入食物
  const handleInsertNewFood = (e) => {
    e.preventDefault(); // 阻止表單的默認提交行為
    const userEmail = authService.getCurrentUser().user.email;

    foodGet
      .insertFood(userEmail, newFoodName, selectedOption)
      .then((res) => {
        console.log(res);
        //更新食物清單
        setRenew(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //刪除食物
  const handleDeleteFood = (index) => {
    const userEmail = authService.getCurrentUser().user.email;
    const deleteFood = foodList[index];

    foodGet
      .deleteFood(userEmail, deleteFood)
      .then((res) => {
        let dataList = res.data.foods.map((item) => item.foodName);
        setFoodList(dataList);
        console.log("成功刪除:" + deleteFood);
      })
      .catch((e) => {
        console.log("刪除失敗:", e);
      });
  };

  const handleAddFood = () => {
    setShowForm(true); // 點擊新增按鈕時顯示表單
  };
  //獲取食物清單
  useEffect(() => {
    setRenew(false);
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
    }
  }, [renew]);

  return (
    <>
      {!currentUser && (
        <div className="notLogin">
          <p>請先登入</p>
        </div>
      )}
      {currentUser && (
        <div className="divBackGround">
          <div className="foodList">
            <div className="newFood">
              <h1>食物清單</h1>
              <button onClick={handleAddFood}>新增食物</button>
            </div>
            {showForm && (
              <div className="addFoodFormContainer">
                <form>
                  <label>食物:</label>
                  <input
                    onChange={handleNewFoodName}
                    name="newFoodName"
                    maxLength={"20"}
                    minLength={"1"}
                    placeholder="食物名稱"
                  ></input>

                  <label>種類:</label>
                  <select
                    className="selectContainer"
                    onChange={handleSelectChange}
                    value={selectedOption}
                  >
                    <option value="早餐">早餐</option>
                    <option value="午餐">午餐</option>
                    <option value="晚餐">晚餐</option>
                    <option value="點心">點心</option>
                  </select>
                  <button onClick={handleInsertNewFood}>新增</button>
                </form>
              </div>
            )}
            <ul>
              {foodList.map((food, index) => (
                <li key={index}>
                  {food}
                  <button onClick={() => handleDeleteFood(index)}>刪除</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomFoodComponent;
