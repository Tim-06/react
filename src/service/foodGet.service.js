import axios from "axios";
const API_URL = "https://server-foodrecommend.onrender.com/getFood";

class foodService {
  // user的食物清單
  getUserFood(userEmail) {
    const storedData = JSON.parse(localStorage.getItem("user"));
    const jwtToken = storedData && storedData.token;

    return axios.get(API_URL + "/foodSearch/user/" + userEmail, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // 在 Header 中添加 JWT
      },
    });
  }

  // 使用foodType，找到食物
  getFood(foodType) {
    return axios.get(API_URL + "/foodSearch/" + foodType);
  }
  //找尋所有食物
  getAllFood() {
    return axios.get(API_URL + "/foodSearch");
  }
  //刪除食物

  deleteFood(email, foodName) {
    const storedData = JSON.parse(localStorage.getItem("user"));
    const jwtToken = storedData && storedData.token;

    return axios.patch(
      API_URL + `/foodDelete?email=${email}&foodName=${foodName}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // 在 Header 中添加 JWT
        },
      }
    );
  }

  //新增食物
  insertFood(email, foodName, foodType) {
    const storedData = JSON.parse(localStorage.getItem("user"));
    const jwtToken = storedData && storedData.token;
    return axios.patch(
      API_URL +
        `/foodInsert?email=${email}&foodName=${foodName}&foodType=${foodType}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // 在 Header 中添加 JWT
        },
      }
    );
  }
}
export default new foodService();
