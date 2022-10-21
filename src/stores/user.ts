import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    info: {}
  }),
  getters: {
    getUsers(state) {
      return state.users;
    }
  },
  actions: {
    async fetchUsers() {
      try {
        const data = await axios.get("https://jsonplaceholder.typicode.com/users");
        this.users = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async login(email = "", password = "") {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append("email", email);
        bodyFormData.append("password", password);
        const resp = await axios.post("api/token", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
          }
        });
        this.info = resp?.data?.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${resp?.data?.data?.token}`;
        localStorage.setItem("token", resp?.data?.data?.token);
        window.location.href = "negeri";
      } catch (error) {
        console.log(error);
      }
    }
  }
});