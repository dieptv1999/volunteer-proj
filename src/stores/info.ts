import { ref, computed, getCurrentInstance } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import values from "lodash/values";
import map from "lodash/map";

export const useInfoStore = defineStore("info", {
  state: () => ({
    dms: [],
    negeri: "",
    parlimens: [],
    perlis: "",
    duns: [],
    dun: "",
    pdms: [],
    pdm: "",
    infoUpdate: {},
    notification: undefined,
    countNoti: 1,
  }),
  getters: {
    getDms(state) {
      return state.dms;
    }
  },
  actions: {
    async fetchDms() {
      try {
        if (!localStorage.token) location.href = '/'
        const data = await axios.get("api/attendance/get-dm");
        // @ts-ignore
        this.dms = map(data.data, o => o.negeri);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchParlimens() {
      try {
        if (!localStorage.token) location.href = '/'
        const data = await axios.get("api/attendance/get-dm/perlis");
        // @ts-ignore
        this.parlimens = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDuns(id: String) {
      try {
        if (!localStorage.token) location.href = '/'
        const data = await axios.get(`api/attendance/get-dm/perlis/${id}`);
        // @ts-ignore
        this.duns = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPdms(id: String, dunId: String) {
      try {
        if (!localStorage.token) location.href = '/'
        const data = await axios.get(`api/attendance/get-dm/perlis/${id}/${dunId}`);
        // @ts-ignore
        this.pdms = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchInfoUpdate(id: String, dunId: String, pdmId: String) {
      try {
        if (!localStorage.token) location.href = '/'
        const data = await axios.get(`api/attendance/get-dm/perlis/${id}/${dunId}/${pdmId}`);
        // @ts-ignore
        this.infoUpdate = data.data[0];
      } catch (error) {
        console.log(error);
      }
    },
    async updateDm(time_slot1: Number, time_slot2: Number, time_slot3: Number, time_slot4: Number, time_slot5: Number) {
      try {
        // let bodyFormData = new FormData();
        // @ts-ignore
        // bodyFormData.append("id", `${this.infoUpdate?.id}`);
        // bodyFormData.append("time_slot1", `${time_slot1}`);
        // bodyFormData.append("time_slot2", `${time_slot2}`);
        // bodyFormData.append("time_slot3", `${time_slot3}`);
        // bodyFormData.append("time_slot4", `${time_slot4}`);
        // bodyFormData.append("time_slot5", `${time_slot5}`);
        const data = await axios.patch(`api/attendance/update-dm`,
          new URLSearchParams({
            // @ts-ignore
            id: `${this.infoUpdate?.id}`, //gave the values directly for testing
            time_slot1: `${time_slot1}`,
            time_slot2: `${time_slot2}`,
            time_slot3: `${time_slot3}`,
            time_slot4: `${time_slot4}`,
            time_slot5: `${time_slot5}`,
          }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
        // @ts-ignore
        console.log(data);
        if (data.status === 200) {
          console.log("success");
          this.showNoti("Update successful");
        }
      } catch (error) {
        console.log(error);
        this.showNoti("Update failed", "error");
      }
    },
    async updateNegeri(negeri: string) {
      this.negeri = negeri;
    },
    async updateParlimen(perlis: string) {
      this.perlis = perlis;
    },
    async updateDun(dun: string) {
      this.dun = dun;
    },
    async updatePdm(pdm: string) {
      this.pdm = pdm;
    },
    showNoti(message: String, type: String = "success") {
      // @ts-ignore
      this.notification = { message, type };
      this.countNoti++
    },
    hideNoti() {
      this.notification = undefined;
    }
  }
});