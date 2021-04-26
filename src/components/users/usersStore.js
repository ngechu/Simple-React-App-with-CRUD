import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { notify } from "react-notify-toast";
class usersStore {
  users = [];
  singleUser = [];
  userIsLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  // Fetch user data

  async getUserInfo() {
    this.userIsLoading = true;
    const userData = await axios
      .get("https://607e868602a23c0017e8b79e.mockapi.io/api/v1/users")
      .then((response) => {
        this.users = response.data;
        runInAction(() => {
          this.userIsLoading = false;
        });
      })
      .catch((error) => console.log(error));
  }
  async getUserInfoById(id) {
    this.userIsLoading = true;
    const userData = await axios
      .get(`https://607e868602a23c0017e8b79e.mockapi.io/api/v1/users/${id}`)
      .then((response) => {
        this.singleUser = response.data;
        runInAction(() => {
          this.userIsLoading = false;
        });
      })
      .catch((error) => console.log(error));
  }

  async editUserInfo(id, data) {
    this.userIsLoading = true;
    await axios.put(
      `https://607e868602a23c0017e8b79e.mockapi.io/api/v1/users/${id}`,
      data
    );
    runInAction(() => {
      this.userIsLoading = false;
    });
  }
}
const userStore = new usersStore();

export default userStore;
