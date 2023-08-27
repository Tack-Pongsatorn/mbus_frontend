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
      </v-row>
      <!-- <v-col cols="12" lg="4" md="6">
                <v-text-field density="compact" v-model="search" label="Search Contacts" hide-details variant="outlined"></v-text-field>
            </v-col> -->
      <v-col cols="12" lg="8" md="6" class="text-right">
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
              @click="openDialogC7"
            >
              +<v-icon class="mr-2">mdi-bus</v-icon
              >ลงทะเบียนรถ
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="pa-4 bg-secondary d-flex">
              <p class="title text-white">
                {{ formTitle }}
              </p>
              <v-spacer></v-spacer>
              <p>ครั้งละ 1 คัน</p>
            </v-card-title>

            <v-card-text>
              <v-form
                ref="formFirst"
                v-model="valid"
                lazy-validation
                class="mt-2"
                v-if="stepRegister == 1"
              >
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      variant="outlined"
                      hide-details
                      v-model="dataBusRegister.station_id"
                      :rules="requiredRules"
                      label="จุดออกรถ"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="busType"
                      item-title="name"
                      item-value="id"
                      variant="outlined"
                      hide-details
                      v-model="dataBusRegister.bus_type_id"
                      :rules="requiredRules"
                      label="ประเภทรถ"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      variant="outlined"
                      hide-details
                      v-model="dataBusRegister.plate_no"
                      label="ทะเบียนรถ"
                      placeholder="ทะเบียนรถ"
                      :rules="requiredRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      variant="outlined"
                      hide-details
                      v-model="
                        dataBusRegister.plate_province
                      "
                      :items="province"
                      item-title="name_th"
                      item-value="name_th"
                      label="ทะเบียนจังหวัด"
                      :rules="requiredRules"
                      :loading="loading"
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-row class="justify-center">
                      <v-col cols="6" sm="6">
                        <v-icon color="warning"
                          >mdi-account-injury</v-icon
                        >
                        พระ
                        <v-text-field
                          v-model.number="
                            dataBusRegister.monk_qty
                          "
                          @click="selectPerson"
                          ref="monk_qty"
                          type="number"
                          oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
                          max="9"
                          hide-details
                          variant="underlined"
                        >
                          <template v-slot:append>
                            <v-btn
                              density="compact"
                              flat
                              icon
                              @click="
                                dataBusRegister.monk_qty++
                              "
                            >
                              <v-icon size="small">
                                mdi-plus
                              </v-icon>
                            </v-btn>
                          </template>
                          <template v-slot:prepend>
                            <v-btn
                              flat
                              icon
                              density="compact"
                              @click="
                                dataBusRegister.monk_qty--
                              "
                              :disabled="
                                dataBusRegister.monk_qty < 1
                              "
                            >
                              <v-icon size="small">
                                mdi-minus
                              </v-icon>
                            </v-btn>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="6" sm="6">
                        <v-icon color="warning"
                          >mdi-account-injury-outline</v-icon
                        >สามเณร

                        <v-text-field
                          v-model.number="
                            dataBusRegister.novice_qty
                          "
                          @click="selectPerson"
                          ref="novice_qty"
                          type="number"
                          oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
                          max="9"
                          hide-details
                          variant="underlined"
                        >
                          <template v-slot:append>
                            <v-btn
                              flat
                              icon
                              @click="
                                dataBusRegister.novice_qty++
                              "
                              density="compact"
                            >
                              <v-icon size="small">
                                mdi-plus
                              </v-icon>
                            </v-btn>
                          </template>
                          <template v-slot:prepend>
                            <v-btn
                              flat
                              icon
                              density="compact"
                              @click="
                                dataBusRegister.novice_qty--
                              "
                              :disabled="
                                dataBusRegister.novice_qty <
                                1
                              "
                            >
                              <v-icon size="small">
                                mdi-minus
                              </v-icon>
                            </v-btn>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="6" sm="6">
                        <v-icon color="warning"
                          >mdi-account</v-icon
                        >ผู้ใหญ่
                        <v-text-field
                          v-model.number="
                            dataBusRegister.adult_qty
                          "
                          @click="selectPerson"
                          ref="adult_qty"
                          type="number"
                          oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
                          max="9"
                          variant="underlined"
                          ><template v-slot:append>
                            <v-btn
                              density="compact"
                              flat
                              icon
                              @click="
                                dataBusRegister.adult_qty++
                              "
                            >
                              <v-icon size="small">
                                mdi-plus
                              </v-icon>
                            </v-btn>
                          </template>
                          <template v-slot:prepend>
                            <v-btn
                              density="compact"
                              flat
                              icon
                              @click="
                                dataBusRegister.adult_qty--
                              "
                              :disabled="
                                dataBusRegister.adult_qty <
                                1
                              "
                            >
                              <v-icon size="small">
                                mdi-minus
                              </v-icon>
                            </v-btn>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="6" sm="6">
                        <v-icon color="warning">
                          mdi-account-child-outline
                        </v-icon>
                        เด็ก
                        <v-text-field
                          v-model.number="
                            dataBusRegister.child_qty
                          "
                          @click="selectPerson"
                          ref="child_qty"
                          type="number"
                          oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
                          max="09"
                          variant="underlined"
                        >
                          <template v-slot:append>
                            <v-btn
                              density="compact"
                              flat
                              icon
                              @click="
                                dataBusRegister.child_qty++
                              "
                            >
                              <v-icon size="small">
                                mdi-plus
                              </v-icon>
                            </v-btn>
                          </template>
                          <template v-slot:prepend>
                            <v-btn
                              density="compact"
                              flat
                              icon
                              @click="
                                dataBusRegister.child_qty--
                              "
                              :disabled="
                                dataBusRegister.child_qty <
                                1
                              "
                            >
                              <v-icon size="small">
                                mdi-minus
                              </v-icon>
                            </v-btn>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <p class="text-h6 font-weight-medium">
                      จำนวนผู้โดยสาร
                      {{ passenger_qty }}
                      ท่าน
                    </p>
                  </v-col>
                </v-row>
              </v-form>
              <v-form
                ref="formSecond"
                v-model="valid"
                lazy-validation
                class="mt-2 mx-1"
                v-if="stepRegister == 2"
              >
                <v-alert
                  variant="tonal"
                  type="warning"
                  color="primary"
                  class="mb-6"
                  >อัพโหลดเอกสาร</v-alert
                >

                <v-card
                  elevation="10"
                  rounded="md"
                  class="mt-5 px-3"
                >
                  <v-card-item class="px-1">
                    <div
                      class="d-flex align-center justify-space-between pb-10"
                    >
                      <h5 class="text-h6">
                        อัพโหลดรูปสำเนาทะเบียนรถ
                      </h5>
                    </div>
                    <v-file-input
                      @change="
                        onFileUpload(
                          $event,
                          'vehicle_license_file'
                        )
                      "
                      ref="vehicle_license_file"
                      style="display: none"
                      :rules="fileRules"
                      accept="image/*"
                    />
                    <v-avatar
                      rounded="lg"
                      class="w-100 mt-2 mb-6"
                      size="160"
                    >
                      <img
                        style="
                          max-height: 200px;
                          max-width: 100%;
                        "
                        @click="
                          selectFile('vehicle_license_file')
                        "
                        :src="
                          urlVehicleLicense
                            ? urlVehicleLicense
                            : 'http://www.ขายประกันภัยรถยนต์.com/read_img.php?idz=64'
                        "
                      />
                    </v-avatar>
                    <p
                      @click="
                        selectFile('vehicle_license_file')
                      "
                      class="text-subtitle-1 font-weight-medium py-2 text-center"
                    >
                      <v-icon>mdi-upload</v-icon>
                      คลิกรูปเพื่ออัพโหลด
                    </p>
                  </v-card-item>
                </v-card>
                <v-card
                  elevation="10"
                  rounded="md"
                  class="mt-5 px-3"
                >
                  <v-card-item class="px-1">
                    <div
                      class="d-flex align-center justify-space-between pb-10"
                    >
                      <h5 class="text-h6">
                        อัพโหลดรูปสำเนาใบขับขี่
                      </h5>
                    </div>
                    <v-avatar
                      rounded="lg"
                      class="w-100 mt-2 mb-6"
                      size="160"
                    >
                      <img
                        style="
                          max-height: 200px;
                          max-width: 100%;
                        "
                        @click="
                          selectFile('driver_license_file')
                        "
                        class="w-100"
                        :src="
                          urlDriverLicense
                            ? urlDriverLicense
                            : 'https://unitedhonda.com/upload/img/blog/20221122132922_967225279.jpg'
                        "
                      />
                    </v-avatar>
                    <p
                      class="text-subtitle-1 font-weight-medium py-2 text-center"
                    >
                      <v-icon>mdi-upload</v-icon>
                      คลิกรูปเพื่ออัพโหลด
                    </p>
                    <v-file-input
                      @change="
                        onFileUpload(
                          $event,
                          'driver_license_file'
                        )
                      "
                      ref="driver_license_file"
                      style="display: none"
                      accept="image/*"
                    />
                  </v-card-item>
                </v-card>

                <!-- <v-btn
                  size="large"
                  class="mt-5"
                  color="primary"
                  block
                  flat
                  @click="checkRegister()"
                  >สมัคร</v-btn
                > -->
              </v-form>
            </v-card-text>

            <v-card-actions class="px-auto">
              <v-btn
                color="error"
                variant="outlined"
                @click="close"
                >ยกเลิก</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                color="secondary"
                variant="flat"
                @click="checkRegister"
              >
                {{ stepRegister == 2 ? "บันทึก" : "ถัดไป" }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-table
      class="mt-4"
      fixed-header
      :height="heightDisplay"
    >
      <thead>
        <tr>
          <!-- <th class="text-subtitle-1 font-weight-semibold">Id</th> -->
          <th class="text-subtitle-1 font-weight-semibold">
            รายการรถโดยสาร
          </th>

          <!-- <th class="text-subtitle-1 font-weight-semibold">Phone</th>
                    <th class="text-subtitle-1 font-weight-semibold">Joining Date</th>
                    <th class="text-subtitle-1 font-weight-semibold">Role</th> -->
          <!-- <th class="text-subtitle-1 font-weight-semibold">Actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredList" :key="item.id">
          <!-- <td class="text-subtitle-1">{{ item.id }}</td> -->
          <td class="px-1 pa-5" @click="editItem(item)">
            <v-container class="py-0 px-0">
              <v-row class="d-flex justify-center pt-0">
                <v-col class="pb-3">
                  <div>
                    <h4 class="text-h6 text-truncate"></h4>

                    <div class="ml-3">
                      <h6
                        class="text-subtitle-1 text-no-wrap font-weight-medium"
                      >
                        <v-icon color="success"
                          >mdi-map-marker</v-icon
                        >
                        จุดออกรถ
                      </h6>
                      <div
                        class="text-subtitle-2 text-no-wrap textSecondary mt-1"
                      >
                        {{ item.station_id }}
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col class="pb-3">
                  <div>
                    <div class="ml-3">
                      <h6
                        class="text-subtitle-1 text-no-wrap font-weight-medium"
                      >
                        <v-icon color="warning"
                          >mdi-bus</v-icon
                        >
                        รถโดยสาร
                      </h6>
                      <div
                        class="text-subtitle-2 text-no-wrap textSecondary mt-1"
                      >
                        {{ convertCar(item.bus_type_id) }}
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row class="d-flex align-top pt-0">
                <v-col class="pb-3">
                  <div>
                    <div class="ml-3">
                      <h6
                        class="text-subtitle-1 text-no-wrap font-weight-medium"
                      >
                        <v-icon color="accent">
                          mdi-card-text</v-icon
                        >

                        ทะเบียนรถ
                      </h6>
                      <div
                        class="text-subtitle-2 text-no-wrap textSecondary mt-1"
                      >
                        {{ item.plate_no }}
                        {{ item.plate_province }}
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col class="pb-3 align-top">
                  <div>
                    <div class="ml-3">
                      <h6
                        class="text-subtitle-1 text-no-wrap font-weight-medium"
                      >
                        <v-icon color="primary">
                          mdi-account-group</v-icon
                        >

                        จำนวนผู้โดยสาร
                      </h6>
                      <div
                        class="justify-self-end text-subtitle-2 text-no-wrap textSecondary mt-1"
                      >
                        <span v-if="item.adult_qty">
                          <v-icon
                            class="me-1"
                            size="x-small"
                            icon="mdi-account"
                          ></v-icon>
                          <span class="subheading me-2">{{
                            item.adult_qty
                          }}</span>
                        </span>

                        <span v-if="item.child_qty">
                          <v-icon
                            class="me-1"
                            size="x-small"
                            icon="mdi-account-child-outline"
                          ></v-icon>
                          <span class="subheading">{{
                            item.child_qty
                          }}</span>
                        </span>
                        <span v-if="item.monk_qty">
                          <v-icon
                            class="me-1"
                            size="x-small"
                            icon="mdi-account-injury"
                          ></v-icon>
                          <span class="subheading me-2">{{
                            item.monk_qty
                          }}</span>
                        </span>
                        <span v-if="item.novice_qty">
                          <v-icon
                            class="me-1"
                            size="x-small"
                            icon="mdi-account-injury-outline"
                          ></v-icon>
                          <span class="subheading">{{
                            item.novice_qty
                          }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>

              <v-row class="d-flex align-center pt-0">
                <v-col
                  class="d-flex justify-space-between pb-3"
                >
                  <div>
                    <div class="ml-3">
                      <h6
                        class="text-subtitle-1 text-no-wrap font-weight-medium"
                      >
                        <v-icon color="info">
                          mdi-smart-card-outline</v-icon
                        >

                        เอกสารทะเบียนรถ
                      </h6>
                      <div
                        class="text-subtitle-2 text-no-wrap textSecondary mt-1"
                      >
                        {{
                          item.vehicle_license_file.length >
                          0
                            ? "อัพโหลดเอกสารแล้ว"
                            : "ไม่มี"
                        }}
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col
                  class="d-flex justify-space-between pb-3"
                >
                  <div>
                    <div class="ml-3">
                      <h6
                        class="text-subtitle-1 text-no-wrap font-weight-medium"
                      >
                        <v-icon color="error">
                          mdi-card-account-details-star-outline</v-icon
                        >

                        เอกสารใบขับขี่
                      </h6>
                      <div
                        class="text-subtitle-2 text-no-wrap textSecondary mt-1"
                      >
                        {{
                          item.driver_license_file > 0
                            ? "อัพโหลดเอกสารแล้ว"
                            : "ไม่มี"
                        }}
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </td>
          <!-- <td>
            <div class="d-flex align-center py-4">
              <div> -->
          <!-- <v-img
                  :src="item.avatar"
                  width="45px"
                  class="rounded-circle img-fluid"
                ></v-img> -->
          <!-- </div>

              <div class="ml-5">
                <h4 class="text-h6">
                  {{ item }}
                </h4> -->
          <!-- <span
                  class="text-subtitle-1 d-block mt-1 textSecondary"
                  >{{ item.usermail }}</span
                > -->
          <!-- </div>
            </div>
          </td> -->
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
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        :timeout="5000"
        color="warning"
        vertical
      >
        <h3 class="text-center">
          <strong>
            {{ textSnackbar }}
          </strong>
        </h3>
        <template v-slot:actions>
          <v-btn
            color="indigo"
            variant="outlined"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import { useContactStore } from "@/stores/apps/contact";
import { busStore } from "@/stores/myStore/bus";

import contact from "@/_mockApis/apps/contact";
import axiosServices from "../utils/axios";

// store
const busStoreData = busStore();
// const store = useContactStore();

onMounted(() => {
  busStoreData.fetchProject();
  busStoreData.fetchBusType();
  busStoreData.fetchProvince();
  // store.fetchContacts();
});

// Interface
interface BusRegister {
  project_id: number | string;
  station_id: number | string;
  bus_type_id: string | number;
  plate_no: string;
  plate_province: string;
  adult_qty?: number;
  child_qty?: number;
  monk_qty?: number;
  novice_qty?: number;
  vehicle_license_file: any;
  driver_license_file: any;
}

// computed
const listProject = computed(() => {
  return busStoreData.project;
});
const requiredRules = computed(() => {
  return [(v: string) => !!v || "กรุณากรอก"];
});
const getContacts: any = computed(() => {
  return store.contacts;
});
const passenger_qty = computed<number>(() => {
  return (
    dataBusRegister.adult_qty +
    dataBusRegister.child_qty +
    dataBusRegister.monk_qty +
    dataBusRegister.novice_qty
  );
});
const busType = computed(() => {
  return busStoreData.busType;
});

const province = computed(() => {
  return busStoreData.province;
});

const heightDisplay = computed<number>(() => {
  return window.innerHeight - 20;
});

// Data
let textSnackbar = ref<string>("");
const snackbar = ref<boolean>(false);
const loading = ref<boolean>(false);
const formFirst = ref<any>(null);
const formSecond = ref<any>(null);
const stepRegister = ref<number>(1);
const urlVehicleLicense = ref<string>("");
const urlDriverLicense = ref<string>("");
const maxSizeBytes = 10 * 1024 * 1024;
const vehicle_license_file = ref<HTMLInputElement | null>(
  null
);
const driver_license_file = ref<HTMLInputElement | null>(
  null
);
const child_qty = ref<HTMLInputElement | null>(null);
const adult_qty = ref<HTMLInputElement | null>(null);
const novice_qty = ref<HTMLInputElement | null>(null);
const monk_qty = ref<HTMLInputElement | null>(null);
const projectName = ref<string>(
  listProject.value.length > 0 ? listProject.value[0] : ""
);

const dataBusRegister: BusRegister = reactive({
  project_id: 0,
  station_id: 0,
  bus_type_id: "",
  plate_no: "",
  plate_province: "",
  adult_qty: 0,
  child_qty: 0,
  monk_qty: 0,
  novice_qty: 0,
  vehicle_license_file: "",
  driver_license_file: ""
});
const dataBusRegisterDefault: BusRegister = reactive({
  project_id: 0,
  station_id: 0,
  bus_type_id: "",
  plate_no: "",
  plate_province: "",
  adult_qty: 0,
  child_qty: 0,
  monk_qty: 0,
  novice_qty: 0,
  vehicle_license_file: "",
  driver_license_file: ""
});
const valid = ref(true);
const dialog = ref(false);
const search = ref("");
const rolesbg = ref([
  "primary",
  "secondary",
  "error",
  "success",
  "warning"
]);
const desserts = ref(contact);
const editedIndex = ref(-1);
const editedItem = ref({
  id: "",
  avatar: "1.jpg",
  userinfo: "",
  usermail: "",
  phone: "",
  jdate: "",
  role: "",
  rolestatus: ""
});
const defaultItem = ref({
  id: "",
  avatar: "1.jpg",
  userinfo: "",
  usermail: "",
  phone: "",
  jdate: "",
  role: "",
  rolestatus: ""
});

const fileRules = computed(() => {
  return [
    (value: any) =>
      !value ||
      value.size < maxSizeBytes ||
      limitSizeFile(value)
  ];
});

const filteredList = ref<BusRegister[]>([
  {
    project_id: "1",
    station_id: "กำแพงแสน",
    bus_type_id: 1,
    plate_no: "กข4332",
    plate_province: "กรุงเทพมหานคร",
    adult_qty: 12,
    child_qty: 0,
    monk_qty: 0,
    novice_qty: 0,
    vehicle_license_file: [{}],
    driver_license_file: [{}]
  },
  {
    project_id: "1",
    station_id: "อนุเสาวรีย์ชัยสมอรภูมิ เฟส 3",
    bus_type_id: 3,
    plate_no: "กข4453",
    plate_province: "กรุงเทพมหานคร",
    adult_qty: 6,
    child_qty: 5,
    monk_qty: 0,
    novice_qty: 0,
    vehicle_license_file: [{}],
    driver_license_file: [{}]
  }
]);

//Methods
function convertCar(value: string) {
  const busTypes = busType.value.find(
    (item) => item.id === value
  );
  return busTypes?.name;
}

function selectPerson() {
  child_qty.value?.select();
  adult_qty.value?.select();
  novice_qty.value?.select();
  monk_qty.value?.select();
}

function limitSizeFile(value: any): boolean | string {
  const valueImage = JSON.parse(JSON.stringify(value));

  if (valueImage.length == 0) {
    snackbar.value = true;
    textSnackbar.value = `กรุณาอัพโหลดรูปภาพให้ครบ`;
    return "กรุณาอัพโหลดรูปภาพ";
  }

  if (value?.[0] && value?.[0].size > maxSizeBytes) {
    snackbar.value = true;
    textSnackbar.value = `: กรุณาอัพโหลดรูปและควรมีขนาดไม่เกิน 10 MB`;
    return "กรุณาอัพโหลดรูปและควรมีขนาดไม่เกิน 10 MB";
  }

  return true;
}

function editItem(item: any) {
  editedIndex.value = desserts.value.indexOf(item);
  Object.assign(dataBusRegister, item);
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
    Object.assign(dataBusRegister, dataBusRegisterDefault);
    editedIndex.value = -1;
  }, 300);
}

async function save() {
  dataBusRegister.project_id = projectName.value;
  const formData = new FormData();
  for (const key in dataBusRegister) {
    const element = dataBusRegister[
      key as keyof BusRegister
    ] as string | Blob;
    formData.append(key, element);
  }
  if (editedIndex.value > -1) {
    // edit bus register
  } else {
    console.log("save bus");
    // axiosServices
    //   .post("/bus_registers", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     dialog.value = false;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  filteredList.value.push({ ...dataBusRegister });
  console.log("filteredList", filteredList);
  close();
}

async function checkRegister() {
  interface validateForm {
    valid: boolean;
    error: any;
  }
  let validateForm: validateForm;
  if (stepRegister.value == 1) {
    validateForm = await formFirst.value?.validate();
    if (!validateForm.valid) return;
    setTimeout(() => {
      stepRegister.value = 2;
    }, 300);
  }
  if (stepRegister.value == 2) {
    validateForm = await formSecond.value?.validate();
    if (!validateForm.valid) return;
    save();
  }
}

function onFileUpload(event: any, type: string) {
  if (type == "vehicle_license_file") {
    const file = event.target.files[0];
    urlVehicleLicense.value = URL.createObjectURL(file);
    dataBusRegister.vehicle_license_file = file;
    return;
  }
  if (type == "driver_license_file") {
    const file = event.target.files[0];
    urlDriverLicense.value = URL.createObjectURL(file);
    dataBusRegister.driver_license_file = file;
    return;
  }
}

function selectFile(type: string) {
  if (type == "vehicle_license_file") {
    vehicle_license_file.value?.click();
  }
  if (type == "driver_license_file") {
    driver_license_file.value?.click();
  }
}

function openDialogC7() {
  stepRegister.value = 1;
  Object.assign(dataBusRegister, dataBusRegisterDefault);
}


//Computed Property
const formTitle = computed(() => {
  return editedIndex.value === -1
    ? "เพิ่มใบลงทะเบียนรถ"
    : "แก้ไขใบลงทะเบียนรถ";
});

// Watcher
</script>
