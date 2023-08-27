<template>
  <div
    class="d-flex justify-center align-center text-center h-100 pa-10"
  >
    <div>
      <!-- <img
        src="@/assets/images/backgrounds/maintenance.svg"
        width="500"
        alt="under_construction"
      /> -->
      <h1 class="text-h1">ขอบคุณ</h1>
      <h4 class="text-h4 my-8">
        รอผลการตรวจสอบของเจ้าหน้าที่
      </h4>
      <v-row class="justify-center">
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple-accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { onMounted } from "vue";

const authUser: any = useAuthStore();
function sendMesages() {
  const userId = authUser.user.userId;
  axios
    .post(
      "https://line-oa-data-user-request-fa13dee09a49.herokuapp.com/push",
      { userId }
    )
    .then((result) => {
      console.log("result :>> ", result);
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}

onMounted(() => {
  sendMesages();
  console.log(" authUser.value :>> ", authUser.user);
});
</script>
