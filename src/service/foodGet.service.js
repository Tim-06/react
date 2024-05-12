import axios from "axios";
const API_URL = "https://server-foodrecommend.onrender.com/getFood";
class foodService {
  // user的食物清單
  getUserFood(userEmail) {
    return axios.get(API_URL + "/foodSearch/user/" + userEmail);
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
    return axios.patch(
      API_URL + `/foodDelete?email=${email}&foodName=${foodName}`
    );
  }
  //新增食物
  insertFood(email, foodName, foodType) {
    return axios.patch(
      API_URL +
        `/foodInsert?email=${email}&foodName=${foodName}&foodType=${foodType}`
    );
  }
}
export default new foodService();
