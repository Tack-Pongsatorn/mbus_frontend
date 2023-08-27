<template>
  <v-container class="pa-1">
    <v-row>
      <v-row>
        <v-col cols="12" class="px-5 mt-5">
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
          <TheEarningCard
            :listBus="filteredList"
            :typeBus="busStoreData.busType"
          />
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
        <v-dialog
          v-model="dialog"
          max-width="500"
          persistent
        >
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
                      ref="amountRef"
                      @click="select"
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
    <v-table
      class="mt-2"
      fixed-header
      :height="heightDisplay"
    >
      <thead>
        <tr>
          <th class="text-subtitle-1 font-weight-semibold">
            รายการรถโดยสาร
          </th>
          <th
            class="text-subtitle-1 font-weight-semibold"
          ></th>
          <th
            class="text-subtitle-1 font-weight-semibold"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in filteredList"
          :key="index"
        >
          <!-- <td class="text-subtitle-1">{{ item.id }}</td> -->

          <td style="max-width: 10px">
            <div class="d-flex align-center py-4">
              <!-- <div>
                <v-img
                  :src="item.avatar"
                  width="45px"
                  class="rounded-circle img-fluid"
                ></v-img>
              </div> -->

              <div class="">
                <h4 class="text-h6 text-truncate">
                  <v-chip color="accent" label class="pa-3">
                    <v-icon start>mdi-map-marker</v-icon>
                    จุดออกรถ
                  </v-chip>
                </h4>
                <span
                  class="text-subtitle-1 d-block mt-1 textSecondary"
                >
                  <v-chip
                    color="primary"
                    label
                    class="pa-3"
                  >
                    <v-icon start>mdi-bus</v-icon>รถโดยสาร
                  </v-chip></span
                >
                <span
                  class="text-subtitle-1 text-truncate d-block mt-1 textSecondary"
                >
                  <v-chip
                    color="success"
                    label
                    class="pa-3"
                  >
                    <v-icon start> mdi-card-text</v-icon>

                    ทะเบียนรถ
                  </v-chip></span
                >

                <h4 class="text-h6 mt-1">
                  <v-chip
                    color="warning"
                    label
                    class="pa-3"
                  >
                    <v-icon start>mdi-cash</v-icon>

                    ค่ารถที่ขอเบิก
                  </v-chip>
                </h4>
              </div>
            </div>
          </td>

          <td @click="editItem(item)" class="px-0">
            <div class="d-flex align-center py-0">
              <div class="">
                <span>
                  <h4
                    class="text-h6 text-truncate pb-2"
                    style="max-width: 100px"
                  >
                    {{ item.station_id }}
                  </h4>
                </span>

                <span
                  class="text-subtitle-1 d-block mt-1 textSecondary pb-3"
                >
                  {{ convertCar(item.bus_type_id) }}</span
                >
                <span
                  class="text-subtitle-1 text-truncate d-block mt-0 textSecondary"
                >
                  {{ item.plate_no }}
                </span>
                <span
                  class="text-subtitle-1 text-truncate d-block mt-0 pb-1 textSecondary"
                >
                  {{ item.plate_province }}</span
                >

                <h4 class="text-h6 mt-2">
                  <p>
                    {{ currencyComma(item.amount) }} บาท
                  </p>
                </h4>
              </div>
            </div>
          </td>
          <td style="width: 50px">
            <div class="d-flex align-center text-center">
              <v-sheet
                color="primary"
                class="pa-3 mb-5"
                elevation="12"
              >
                <v-icon
                  icon="mdi-check-circle"
                  size="45"
                ></v-icon>
                <p class="textSuccess">มาลงทะเบียนแล้ว</p>
              </v-sheet>
            </div>
            <!-- <div
              class="d-flex align-center mt-5 justify-center"
            >
              <v-btn icon  @click="deleteItem(item)"
                ><TrashIcon
                  stroke-width="1.5"
                  size="20"
                  class="text-error"
              /></v-btn>
            </div> -->
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import { useContactStore } from "@/stores/apps/contact";
import TheEarningCard from "@/components/dashboards/minimal/TheEarningCard.vue";

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
  busStoreData.fetchProject();
});

// computed
const getContacts: any = computed(() => {
  return store.contacts;
});

// Data
const heightDisplay = computed<number>(() => {
  return window.innerHeight / 2;
});
const amountRef = ref<HTMLInputElement | null>(null);
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
const projectName = ref(
  listProject.value.length > 0 ? listProject.value[0] : ""
);
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
const filteredList = ref<Bus[]>([
  {
    station_id: "บางระมุง",
    bus_type_id: 4,
    plate_no: "กข4332",
    plate_province: "กรุงเทพมหานคร",
    amount: "15000",
    is_claim: true
  },
  {
    station_id: "บางระมุง2",
    bus_type_id: 3,
    plate_no: "กข4331",
    plate_province: "กรุงเทพมหานคร",
    amount: "15000",
    is_claim: true
  }
]);

//Methods

function editItem(item: any) {
  console.log("item :>> ", item);
  editedIndex.value = desserts.value.indexOf(item);
  Object.assign(editedItem, item);
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
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  }, 300);
}
function save() {
  if (editedItem.amount === "0") {
    editedItem.is_claim = false;
  }

  if (editedIndex.value > -1) {
    Object.assign(
      desserts.value[editedIndex.value]
      // editedItem.value
    );
  } else {
    console.log("save expence");
  }
  filteredList.value.push({ ...editedItem });
  console.log("filteredList", filteredList);
  close();
}

function select() {
  // select text all in ref amount field input
  amountRef.value?.select();
}

function currencyComma(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertCar(value: string) {
  const busType = busStoreData.busType.find(
    (item) => item.id === value
  );
  return busType?.name;
}

//Computed Property
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "เพิ่มรถ" : "แก้ไขรถ";
});
</script>
<style scoped>
.card-bus {
  height: 100px;
}
</style>
