<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import { useContactStore } from "@/stores/apps/contact";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import TheEarningCard from "@/components/dashboards/minimal/TheEarningCard.vue";
import CurrentVisits from "@/components/dashboards/classic/CurrentVisits.vue";
import TheBrowserStats from "@/components/dashboards/minimal/TheBrowserStats.vue";
import TheTotalRevenue from "@/components/dashboards/minimal/TheTotalRevenue.vue";
import TheSalesPrediction from "@/components/dashboards/minimal/TheSalesPrediction.vue";
import TheSalesDifference from "@/components/dashboards/minimal/TheSalesDifference.vue";
import TheBlogCard from "@/components/dashboards/minimal/TheBlogCard.vue";
import WeeklyStats from "@/components/dashboards/minimal/WeeklyStats.vue";
import MedicalProBranding from "@/components/dashboards/minimal/MedicalProBranding.vue";

import contact from "@/_mockApis/apps/contact";
import { busStore } from "@/stores/myStore/bus";
import { useRoute } from "vue-router";

// store
const store = useContactStore();
const busStoreData = busStore();

// interface
interface Bus {
  station_id: string;
  bus_type_id: number | string;
  plate_no: string;
  plate_province: string;
  amount?: string;
  is_claim: boolean;
}

onMounted(() => {
  store.fetchContacts();
  busStoreData.fetchBusType();
  busStoreData.fetchProvince();
});

// computed
const getContacts: any = computed(() => {
  return store.contacts;
});

// Data
const route = useRoute();

const valid = ref(true);
const dialog = ref(false);
const search = ref("");
const busType = computed(() => {
  return busStoreData.busType;
});
const province = computed<string[]>(() => {
  return busStoreData.province;
});
const listProject = computed(() => {
  return busStoreData.project;
});

const desserts = ref(contact);
const editedIndex = ref(-1);
const projectName = ref();
let editedItem: Bus = reactive({
  station_id: "",
  bus_type_id: "",
  plate_no: "",
  plate_province: "",
  amount: "0",
  is_claim: true
});
const defaultItem: Bus = reactive({
  station_id: "",
  bus_type_id: "",
  plate_no: "",
  plate_province: "",
  amount: "0",
  is_claim: true
});

//Methods
const filteredList = computed(() => {
  return desserts.value.filter((user: any) => {
    return user.userinfo
      .toLowerCase()
      .includes(search.value.toLowerCase());
  });
});

function editItem(item: any) {
  editedIndex.value = desserts.value.indexOf(item);
  // editedItem.value = Object.assign({}, item);
  dialog.value = true;
}
function deleteItem(item: any) {
  const index = desserts.value.indexOf(item);
  confirm("Are you sure you want to delete this item?") &&
    desserts.value.splice(index, 1);
}

function close() {
  dialog.value = false;
  setTimeout(() => {
    console.log("test", defaultItem);
    editedItem = Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  }, 300);
}
function save() {
  if (editedItem.amount === "0") {
    console.log("test");
    editedItem.is_claim = false;
  }
  console.log("editedItem :>> ", editedItem.is_claim);
  if (editedIndex.value > -1) {
    Object.assign(
      desserts.value[editedIndex.value]
      // editedItem.value
    );
  } else {
    console.log("save expence");
  }
  close();
}

// function select(event: {
//   target: {
//     setSelectionRange: (arg0: number, arg1: number) => void;
//   };
// }) {
//   event.target.setSelectionRange(
//     0,
//     editedItem.amount
//   );
// }

//Computed Property
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "เพิ่มรถ" : "แก้ไขรถ";
});
// onMounted(() => {
//   console.log("test");
//   console.log("route.query.id :>> ", route.params.id);
// });
</script>
<template>
  <div>
    <v-row>
      <v-row>
        <v-col cols="12" class="px-5">
          <VCard class="overflow-hidden" elevation="10">
            <v-card-text class="pb-0">
              <v-label
                class="text-h5 font-weight-medium pb-4"
                >เลือกงานบุญ</v-label
              >
              <v-select
                :items="listProject"
                item-title="name"
                item-value="id"
                v-model="projectName"
                label="งานบุญ"
                variant="outlined"
              ></v-select>
            </v-card-text>
          </VCard>
        </v-col>
        <!---Earning card---->
        <v-col cols="12" lg="12" class="px-5">
          <TheEarningCard />
        </v-col>
      </v-row>
      <!-- <v-col cols="12" lg="4" md="6">
        <v-text-field
          density="compact"
          v-model="search"
          label="Search Contacts"
          hide-details
          variant="outlined"
        ></v-text-field>
      </v-col> -->
      <v-col
        cols="12"
        lg="8"
        md="6"
        class="d-flex justify-space-between flex-row my-3"
      >
        <v-dialog v-model="dialog" max-width="500">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
              flat
              class="ml-auto"
            >
              +<v-icon class="mr-2">mdi-bus</v-icon>เพิ่มรถ
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="pa-4 bg-secondary d-flex">
              <p class="title text-white">
                {{ formTitle }}
              </p>
              <v-spacer></v-spacer>
              <p class="">*ครั้งละ 1 คัน</p>
            </v-card-title>

            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      variant="outlined"
                      hide-details
                      v-model="editedItem.station_id"
                      label="เลือกจุดออกรถ"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="busType"
                      variant="outlined"
                      hide-details
                      item-title="name"
                      item-value="id"
                      v-model="editedItem.bus_type_id"
                      label="ประเภทรถที่ใช้เดินทาง"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      variant="outlined"
                      hide-details
                      v-model="editedItem.plate_no"
                      label="เลขทะเบียนรถ"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="province"
                      item-title="name_th"
                      item-value="name_th"
                      variant="outlined"
                      hide-details
                      v-model="editedItem.plate_province"
                      label="ทะเบียนจังหวัด"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      variant="outlined"
                      hide-details
                      v-model="editedItem.amount"
                      label="ค่ารถที่ขอเบิก"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions class="px-auto">
              <v-btn
                color="error"
                @click="close"
                variant="outlined"
                >ยกเลิก</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                color="secondary"
                variant="flat"
                @click="save"
                >บันทึก</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-table class="mt-2">
      <thead>
        <tr>
          <th class="text-subtitle-1 font-weight-semibold">
            รายการรถโดยสาร
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredList" :key="item.id">
          <!-- <td class="text-subtitle-1">{{ item.id }}</td> -->
          <td>
            <div class="d-flex align-center py-4">
              <div>
                <v-img
                  :src="item.avatar"
                  width="45px"
                  class="rounded-circle img-fluid"
                ></v-img>
              </div>

              <div class="ml-5">
                <h4 class="text-h6">
                  {{ item.userinfo }}
                </h4>
                <span
                  class="text-subtitle-1 d-block mt-1 textSecondary"
                  >{{ item.usermail }}</span
                >
              </div>
            </div>
          </td>
          <!-- <td class="text-subtitle-1">{{ item.phone }}</td>
                    <td class="text-subtitle-1">{{ item.jdate }}</td>
                    <td>
                        <v-chip :color="item.rolestatus" size="small" label>{{ item.role }}</v-chip>
                    </td> -->
          <!-- <td>
                        <div class="d-flex align-center">
                            <v-tooltip text="Edit">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon flat @click="editItem(item)" v-bind="props"
                                        ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                    /></v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip text="Delete">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon flat @click="deleteItem(item)" v-bind="props"
                                        ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                    /></v-btn>
                                </template>
                            </v-tooltip>
                        </div>
                    </td> -->
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<style scoped>
.card-bus {
  height: 100px;
}
</style>
