import { defineStore } from "pinia";
import axios from "@/utils/axios";

interface BusInterface {
  busType: string[];
  project: string[];
  province: string[];
}

export const busStore = defineStore({
  id: "bus",
  state: (): BusInterface => ({
    busType: [],
    project: [],
    province: []
  }),
  getters: {
    // Get Chats from Getters
    // getBusType(state) {
    //   return state.busType;
    // }
  },
  actions: {
    async fetchProvince() {
      try {
        if (this.province.length > 0) return;
        this.province = await fetch(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
        ).then(async (response) => {
          const data = await response.json();
          return data.sort(
            (
              a: { name_th: string },
              b: { name_th: string }
            ) => a.name_th.localeCompare(b.name_th, "th")
          );
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProject() {
      try {
        const { data } = await axios.get(
          "/projects/active"
        );
        console.log("data.result :>> ", data.result);
        this.project = data.result;
      } catch (error) {
        console.log(error);
      }
    },
    // Fetch Chat from action
    async fetchBusType() {
      try {
        if (this.busType.length > 0) return;
        const { data } = await axios.get("/bustypes");
        console.log("data.result :>> ", data.result);
        this.busType = data.result;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    }
  },
  persist: true
});
