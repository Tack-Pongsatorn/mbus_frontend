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
