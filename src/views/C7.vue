<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import { useContactStore } from "@/stores/apps/contact";
import { busStore } from "@/stores/myStore/bus";

import contact from "@/_mockApis/apps/contact";
import axiosServices from "../utils/axios";

// store
const busStoreData = busStore();
const store = useContactStore();

onMounted(() => {
  busStoreData.fetchProject();
  busStoreData.fetchBusType();
  busStoreData.fetchProvince();
  store.fetchContacts();
});

// Interface
interface BusRegister {
  project_id: number | string;
  station_id: number;
  bus_type_id: string;
  plate_no: string;
  plate_province: string;
  adult_qty: number;
  child_qty: number;
  monk_qty: number;
  novice_qty: number;
  vehicle_license_file: string;
  driver_license_file: string;
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
const passenger_qty = computed(() => {
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
const project = computed(() => {
  return busStoreData.project;
});
const province = computed(() => {
  return busStoreData.province;
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
const dataBusRegister: BusRegister = reactive({
  project_id: "",
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
  project_id: "",
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
const projectName = ref<string>("");
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

//Methods
const filteredList = computed(() => {
  return desserts.value.filter((user: any) => {
    return user.userinfo
      .toLowerCase()
      .includes(search.value.toLowerCase());
  });
});
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
  editedItem.value = Object.assign({}, item);
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
    axiosServices
      .post("/bus_registers", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        console.log(res);
        dialog.value = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
    ? "เพิ่มใบ C7"
    : "แก้ไข C7";
});

// Watcher
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
      </v-row>
      <!-- <v-col cols="12" lg="4" md="6">
                <v-text-field density="compact" v-model="search" label="Search Contacts" hide-details variant="outlined"></v-text-field>
            </v-col> -->
      <v-col cols="12" lg="8" md="6" class="text-right">
        <v-dialog v-model="dialog" max-width="500">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
              flat
              class="ml-auto"
              @click="openDialogC7"
            >
              <v-icon class="mr-2"
                >mdi-account-multiple-plus</v-icon
              >สร้างใบ C7
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
                    <v-select
                      :items="project"
                      variant="outlined"
                      item-title="name"
                      item-value="id"
                      hide-details
                      v-model="dataBusRegister.project_id"
                      :rules="requiredRules"
                      label="เลือกงานบุญ"
                    ></v-select>
                  </v-col>
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
                  <v-col cols="12">
                    <p class="">
                      จำนวนผู้โดยสาร
                      {{ passenger_qty }}
                      ท่าน
                    </p>
                  </v-col>

                  <v-col cols="12" sm="12">
                    <v-row class="justify-center">
                      <v-col cols="6" sm="6">
                        <p>พระ</p>
                        <v-btn-toggle
                          divided
                          variant="outlined"
                        >
                          <v-btn
                            size="x-small"
                            color="secondary"
                            :disabled="
                              dataBusRegister.monk_qty < 1
                            "
                            @click="
                              dataBusRegister.monk_qty--
                            "
                          >
                            <MinusIcon size="18" />
                          </v-btn>

                          <v-btn
                            size="x-small"
                            color="secondary"
                          >
                            {{ dataBusRegister.monk_qty }}
                          </v-btn>

                          <v-btn
                            size="x-small"
                            color="secondary"
                            @click="
                              dataBusRegister.monk_qty++
                            "
                          >
                            <PlusIcon size="18" />
                          </v-btn>
                        </v-btn-toggle>
                      </v-col>

                      <v-col cols="6" sm="6">
                        <p>สามเณร</p>
                        <v-btn-toggle
                          divided
                          variant="outlined"
                        >
                          <v-btn
                            size="x-small"
                            color="secondary"
                            @click="
                              dataBusRegister.novice_qty--
                            "
                            :disabled="
                              dataBusRegister.novice_qty < 1
                            "
                          >
                            <MinusIcon size="18" />
                          </v-btn>

                          <v-btn
                            size="x-small"
                            color="secondary"
                          >
                            {{ dataBusRegister.novice_qty }}
                          </v-btn>

                          <v-btn
                            size="x-small"
                            color="secondary"
                            @click="
                              dataBusRegister.novice_qty++
                            "
                          >
                            <PlusIcon size="18" />
                          </v-btn>
                        </v-btn-toggle>
                      </v-col>

                      <v-col cols="6" sm="6">
                        <p>ผู้ใหญ่</p>
                        <v-btn-toggle
                          divided
                          variant="outlined"
                        >
                          <v-btn
                            size="x-small"
                            color="secondary"
                            @click="
                              dataBusRegister.adult_qty--
                            "
                            :disabled="
                              dataBusRegister.adult_qty < 1
                            "
                          >
                            <MinusIcon size="18" />
                          </v-btn>

                          <v-btn
                            size="x-small"
                            color="secondary"
                          >
                            {{ dataBusRegister.adult_qty }}
                          </v-btn>

                          <v-btn
                            size="x-small"
                            color="secondary"
                            @click="
                              dataBusRegister.adult_qty++
                            "
                          >
                            <PlusIcon size="18" />
                          </v-btn>
                        </v-btn-toggle>
                      </v-col>

                      <v-col cols="6" sm="6">
                        <p>เด็ก</p>
                        <v-btn-toggle
                          divided
                          variant="outlined"
                        >
                          <v-btn
                            size="x-small"
                            color="secondary"
                            @click="
                              dataBusRegister.child_qty--
                            "
                            :disabled="
                              dataBusRegister.child_qty < 1
                            "
                          >
                            <MinusIcon size="18" />
                          </v-btn>

                          <v-btn
                            size="x-small"
                            color="secondary"
                          >
                            {{ dataBusRegister.child_qty }}
                          </v-btn>

                          <v-btn
                            size="x-small"
                            color="secondary"
                            @click="
                              dataBusRegister.child_qty++
                            "
                          >
                            <PlusIcon size="18" />
                          </v-btn>
                        </v-btn-toggle>
                      </v-col>
                    </v-row>
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
    <v-table class="mt-4">
      <thead>
        <tr>
          <!-- <th class="text-subtitle-1 font-weight-semibold">Id</th> -->
          <th class="text-subtitle-1 font-weight-semibold">
            รายการทั้งหมด
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
  </div>
</template>
