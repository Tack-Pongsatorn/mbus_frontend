<template>
  <div>
    <div>
      <h6 class="text-h6">
        ยินดีต้อนรับสู่บ้านทะเบียน วัดพระธรรมกาย
      </h6>
    </div>
    <v-row>
      <v-col cols="12" class="px-0 mt-5">
        <UiParentCard title="">
          <v-col cols="12" lg="12">
            <v-sheet
              @click="
                $router.push({
                  name: 'expense'
                })
              "
              :class="'note-sheet pa-6 pb-4 rounded-md cursor-pointer mb-4  bg-lightprimary'"
            >
              <v-row class="justify-center">
                <v-col cols="8" sm="7" class="pa-6">
                  <h6
                    :class="'text-h5 text-truncate text-primary'"
                  >
                    ใบขอเบิกค่ารถ (บท01)
                  </h6>
                </v-col>
                <v-col cols="4" sm="5">
                  <div class="mb-n2 align-bottom">
                    <img
                      class="mb-n8 mt-4"
                      src="@/assets/images/backgrounds/welcome-bg2.png"
                      alt="image"
                      width="110"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
            <v-sheet
              :class="'note-sheet pa-6 pb-4 rounded-md cursor-pointer mb-4  bg-lightwarning'"
              @click="
                $router.push({
                  name: 'bus-register'
                })
              "
            >
              <v-row class="justify-center">
                <v-col cols="8" sm="7" class="pa-6">
                  <h6
                    :class="'text-h5 text-truncate text-warning'"
                  >
                    ใบลงทะเบียนรถ (C7)
                  </h6>
                </v-col>
                <v-col cols="4" sm="5">
                  <div class="align-bottom">
                    <img
                      src="@/assets/images/backgrounds/login-bg.svg"
                      height="110"
                      class="mb-n8 ml-sm-5"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
            <v-sheet
              :class="'note-sheet pa-6 pb-4 rounded-md cursor-pointer mb-4  bg-lightsuccess'"
            >
              <v-row class="justify-center">
                <v-col cols="8" sm="7" class="pa-6">
                  <h6
                    :class="'text-h5 text-truncate text-success'"
                  >
                    ประวัติการทำหน้าที่
                  </h6>
                </v-col>
                <v-col cols="4" sm="5">
                  <div class="align-bottom">
                    <img
                      src="@/assets/images/backgrounds/gold.png"
                      alt="image"
                      width="100"
                      class="mb-n5 ml-sm-5"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </UiParentCard>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import UiChildCard from "@/components/shared/UiChildCard.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import ColorTabs from "@/components/ui-components/tabs/ColorTabs.vue";
import { busStore } from "@/stores/myStore/bus";
import { useRouter } from "vue-router";
import {
  defineProps,
  defineEmits,
  computed,
  reactive,
  ref,
  onMounted
} from "vue";

const busStoreData = busStore();
const router = useRouter();
onMounted(() => {
  busStoreData.fetchProject();
});
</script>

<style lang="scss">
.note-sheet {
  transition: 0.1s ease-in;
  &:hover {
    transform: scale(1.02);
  }
}
</style>
