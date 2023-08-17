<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch
} from "vue";
import axiosServices from "../utils/axios";
import { useRouter } from "vue-router";

const router = useRouter();

interface Register {
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  gender: string;
  birthdate: string;
  role_id: number;
  is_consent: boolean;
  line_id_token: string;
  office?: string;
  province?: string;
  amphur?: string;

  idcard_no?: string;
  person_face_file?: string;
  idcard_front_file?: string;
  bank_book_file?: string;
}

const dataRegister: Register = reactive({
  first_name: "",
  last_name: "",
  email: "",
  mobile_no: "",
  birthdate: "",
  gender: "",
  office: "",
  province: "",
  amphur: "",
  role_id: 0,
  is_consent: false,
  line_id_token: "",
  idcard_no: "",
  person_face_file: "",
  idcard_front_file: "",
  bank_book_file: ""
});
const setPDPA = ref<boolean>(false);

const birthdate = computed<string>(() => {
  return `${rawDate.years}-${rawDate.months}-${rawDate.days}`;
});

const requiredRules = computed(() => {
  return [(v: string) => !!v || "กรุณากรอก"];
});
// phoneRule chcek phone number regex 10 digit and start with 08 , 09 , 06
const phoneRules = ref([
  (v: string) => !!v || "กรุณากรอก",
  (v: string) =>
    (v && v.length == 10) ||
    "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
  (v: string) =>
    (v && v.startsWith("08")) ||
    (v && v.startsWith("09")) ||
    (v && v.startsWith("06")) ||
    "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"
]);

// emailRule if email empty is not require but email is not empty check email regex
const emailRules = ref([
  (v: string) =>
    !v || /.+@.+\..+/.test(v) || "กรุณากรอกอีเมลให้ถูกต้อง"
]);

const passportRules = ref([
  (v: string) => !!v || "กรุณากรอกเลขที่บัตรประชาชน",
  //  number only and 13 digit and start with 1-9
  (v: string) =>
    (v && /^[1-9]\d{12}$/.test(v)) ||
    "กรุณากรอกเลขที่บัตรประชาชนให้ถูกต้อง"
]);
//validate image file size less than 10 MB (10000000 byte)
const fileRules = computed(() => {
  return [
    (value: any) =>
      !value ||
      value.size < maxSizeBytes ||
      limitSizeFile(value)
  ];
});

const rawDate = reactive({
  days: "",
  months: "",
  years: ""
});
let textSnackbar = ref<string>("");
const snackbar = ref<boolean>(false);
const valid = ref<boolean>(false);
const stepRegister = ref<number>(3);
const textButton = ref<string>("สมัครสมาชิก");
const formFirst = ref<any>(null);
const formSecond = ref<any>(null);
const formThird = ref<any>(null);
const roleAll = ref<any>(null);
const urlIdentity = ref<any>(null);
const urlFace = ref<any>(null);
const urlBookBank = ref<any>(null);
const myIdentifyInput = ref<HTMLInputElement | null>(null);
const myFaceInput = ref<HTMLInputElement | null>(null);
const myBookBank = ref<HTMLInputElement | null>(null);
let provinceAll = ref<string[]>([]);
let amphursAll = ref<string[]>([]);
const maxSizeBytes = 10 * 1024 * 1024;

const days = computed(() => {
  return Array.from({ length: 31 }, (_, i) => i + 1);
});
const months = computed((): number[] => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
});
const years = computed((): number[] => {
  return Array.from({ length: 80 }, (_, i) => 2023 - i);
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

function onFileUpload(event: any, type: string) {
  const file = event.target.files[0];

  if (type == "idcard_front_file") {
    urlIdentity.value = URL.createObjectURL(file);
    dataRegister.idcard_front_file = file;
    return;
  }
  if (type == "person_face_file") {
    urlFace.value = URL.createObjectURL(file);
    dataRegister.person_face_file = file;
    return;
  }
  if (type == "bank_book_file") {
    urlBookBank.value = URL.createObjectURL(file);
    dataRegister.bank_book_file = file;
    return;
  }
}

function register() {
  dataRegister.birthdate = birthdate as unknown as string;
  const formData = new FormData();

  // loop dataRegister and append to formData for send to server by axios post method with multipart/form-data header type for upload file to server with data
  for (const key in dataRegister) {
    if (
      Object.prototype.hasOwnProperty.call(
        dataRegister,
        key
      )
    ) {
      const element = dataRegister[
        key as keyof Register
      ] as string | Blob;
      formData.append(key, element);
    }
  }
  console.log("formData :>> ", formData);

  //send formData by axios
  axiosServices
    .post("/users/registration", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((res) => {
      console.log("res :>> ", res);
      router.push({ name: "wait" });
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });

  //send sms by axios
}
async function checkRegister() {
  interface validateForm {
    valid: boolean;
    error: any;
  }
  const type = dataRegister.role_id; // 3 = พนักงาน 4 = ผู้นำรถ 5 = ผู้เบิกจ่าย
  let validateForm: validateForm;
  if (stepRegister.value == 1) {
    validateForm = await formFirst.value?.validate();

    if (!validateForm.valid) return;
    if (type == 3 && stepRegister.value == 1) {
      return register();
    }
    setTimeout(() => {
      stepRegister.value = 2;
    }, 1000);
  }

  if (stepRegister.value == 2) {
    validateForm = await formSecond.value?.validate();
    console.log("validateForm :>> ", validateForm);
    if (!validateForm.valid) return;
    setTimeout(() => {
      stepRegister.value = 3;
    }, 1000);
  }

  if (stepRegister.value == 3) {
    validateForm = await formThird.value?.validate();
    if (!validateForm.valid) return;
    register();
  }
}

function setTextButton() {
  if (dataRegister.role_id == 3) {
    textButton.value = "สมัครสมาชิก";
    return;
  }
  textButton.value = "ถัดไป";
  return;
}

function getRole() {
  axiosServices
    .get("/roles")
    .then(({ data }) => {
      if (data.status == "success") {
        console.log("data.result :>> ", data.result);
        roleAll.value = data.result;
      }
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}

function selectFile(type: string) {
  if (type == "idcard_front_file") {
    myIdentifyInput.value?.click();
  }
  if (type == "person_face_file") {
    myFaceInput.value?.click();
  }
  if (type == "bank_book_file") {
    myBookBank.value?.click();
  }
}
function getProvince() {
  axiosServices
    .get("/locations/provinces")
    .then(({ data }) => {
      if (data.status == "success") {
        provinceAll.value = data.result;
      }
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}

function getAmphur() {
  axiosServices
    .get(
      `/locations/amphurs/search?province=${dataRegister.province}`
    )
    .then(({ data }) => {
      if (data.status == "success") {
        console.log("data.result :>> ", data.result);
        amphursAll.value = data.result;
      }
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}

onMounted(() => {
  getRole();
  getProvince();
});

watch(
  () => dataRegister.province,
  () => {
    getAmphur();
  }
);
</script>

<template>
  <div class="authentication">
    <v-container fluid fill-height class="pa-3">
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 mx-auto"
            max-width="450"
          >
            <v-card-item class="py-sm-8">
              <h5
                class="text-h5 text-medium-emphasis d-flex justify-center align-center mt-3 mb-5"
              >
                สมัครสมาชิก
              </h5>
              <v-row>
                <v-col cols="12" lg="12">
                  <v-form
                    ref="formFirst"
                    v-model="valid"
                    lazy-validation
                    class="mt-2"
                    v-if="stepRegister == 1"
                  >
                    <v-alert
                      variant="tonal"
                      type="warning"
                      color="primary"
                      class="mb-6 text-h5"
                    >
                      ข้อมูลบุคคลที่สมัครสมาชิก
                    </v-alert>

                    <v-label
                      class="text-subtitle-1 font-weight-medium py-2"
                      >ชื่อ</v-label
                    >
                    <v-text-field
                      v-model="dataRegister.first_name"
                      :rules="requiredRules"
                      class="mb-2"
                      clearable
                    ></v-text-field>

                    <v-label
                      class="text-subtitle-1 font-weight-medium py-2"
                      >นามสกุล</v-label
                    >
                    <v-text-field
                      v-model="dataRegister.last_name"
                      :rules="requiredRules"
                      class="mb-2"
                      clearable
                    ></v-text-field>

                    <v-label
                      class="text-subtitle-1 font-weight-medium py-2"
                      >เบอร์มือถือ</v-label
                    >
                    <VTextField
                      v-model="dataRegister.mobile_no"
                      :rules="phoneRules"
                      type="number"
                      class="mb-2"
                      clearable
                      maxLength="10"
                      oninput="this.value=this.value.slice(0,this.maxLength)"
                    ></VTextField>

                    <v-label
                      class="text-subtitle-1 font-weight-medium py-2"
                      >Line ID</v-label
                    >
                    <v-text-field
                      v-model="dataRegister.email"
                      :rules="requiredRules"
                      class="mb-2"
                      clearable
                    ></v-text-field>

                    <v-label
                      class="text-subtitle-1 font-weight-medium pb-2"
                      >วันเดือนปีเกิด</v-label
                    >
                    <v-row>
                      <v-col cols="4" sm="3" md="4">
                        <v-select
                          color="primary"
                          variant="outlined"
                          label="วันที่"
                          :rules="requiredRules"
                          :items="days"
                          v-model="rawDate.days"
                          class="mb-2"
                        ></v-select>
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-select
                          color="primary"
                          variant="outlined"
                          label="เดือน"
                          :rules="requiredRules"
                          :items="months"
                          v-model="rawDate.months"
                          class="mb-2"
                        ></v-select>
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-select
                          color="primary"
                          variant="outlined"
                          label="ปี"
                          :rules="requiredRules"
                          :items="years"
                          v-model="rawDate.years"
                          class="mb-2"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-label
                      class="text-subtitle-1 font-weight-medium pb-2"
                      >เพศ</v-label
                    >
                    <v-radio-group
                      v-model="dataRegister.gender"
                      inline
                      :rules="requiredRules"
                    >
                      <v-radio
                        label="บรรพชิต"
                        value="monk"
                        color="primary"
                      ></v-radio>
                      <v-radio
                        label="ชาย"
                        value="male"
                        color="primary"
                      ></v-radio>
                      <v-radio
                        label="หญิง"
                        value="female"
                        color="primary"
                      ></v-radio>
                    </v-radio-group>
                    <v-label
                      class="text-subtitle-1 font-weight-medium pb-2"
                      >สถานภาพ</v-label
                    >
                    <v-radio-group
                      v-model="dataRegister.role_id"
                      inline
                      @change="setTextButton()"
                      :rules="requiredRules"
                      color="primary"
                    >
                      <v-radio
                        v-for="option in roleAll"
                        :key="option.id"
                        :label="option.name"
                        :value="option.id"
                      ></v-radio>
                    </v-radio-group>

                    <v-btn
                      size="large"
                      class="mt-2"
                      color="primary"
                      block
                      flat
                      @click="checkRegister()"
                      >{{ textButton }}</v-btn
                    >
                  </v-form>

                  <v-form
                    ref="formSecond"
                    v-model="valid"
                    lazy-validation
                    class="mt-2"
                    v-if="stepRegister == 2"
                  >
                    <v-alert
                      variant="tonal"
                      type="warning"
                      color="primary"
                      class="mb-6 text-h5"
                    >
                      ข้อมูลจุดออกรถ
                    </v-alert>
                    <!-- <v-label
                      class="text-subtitle-1 font-weight-medium py-2"
                      >วัด / ศูนย์ / หน่วยงาน /
                      สังกัด</v-label
                    >
                    <v-text-field
                      v-model="dataRegister.office"
                      :rules="requiredRules"
                      class="mb-2"
                      clearable
                    ></v-text-field> -->

                    <v-label
                      class="text-subtitle-1 font-weight-medium py-2"
                      >จังหวัด</v-label
                    >
                    <v-autocomplete
                      :items="provinceAll"
                      v-model="dataRegister.province"
                      :rules="requiredRules"
                      class="mb-2"
                      clearable
                      variant="outlined"
                    ></v-autocomplete>

                    <v-label
                      class="text-subtitle-1 font-weight-medium py-2"
                      >อำเภอ / เขต</v-label
                    >
                    <v-combobox
                      :items="amphursAll"
                      v-model="dataRegister.amphur"
                      :rules="requiredRules"
                      class="mb-2"
                      clearable
                      variant="outlined"
                    ></v-combobox>

                    <v-btn
                      size="large"
                      class="mt-2"
                      color="primary"
                      block
                      flat
                      @click="checkRegister()"
                      >{{
                        dataRegister.role_id == 3
                          ? "สมัคร"
                          : "ถัดไป"
                      }}</v-btn
                    >
                  </v-form>

                  <v-form
                    ref="formThird"
                    v-model="valid"
                    lazy-validation
                    class="mt-2 mx-1"
                    v-if="stepRegister == 3"
                  >
                    <v-alert
                      variant="tonal"
                      type="warning"
                      color="primary"
                      class="mb-6 text-h5"
                      >อัพโหลดเอกสาร</v-alert
                    >

                    <v-card
                      elevation="10"
                      rounded="md"
                      class="mt-5 px-3"
                    >
                      <v-card-item class="px-1 pb-0">
                        <div
                          class="d-flex align-center justify-space-between pb-10"
                        >
                          <h5 class="text-h6">
                            อัพโหลดรูปบัตรประชาชน
                          </h5>
                        </div>
                        <v-file-input
                          @change="
                            onFileUpload(
                              $event,
                              'idcard_front_file'
                            )
                          "
                          ref="myIdentifyInput"
                          accept="image/*"
                          :rules="fileRules"
                          style="display: none"
                        >
                        </v-file-input>
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
                              selectFile(
                                'idcard_front_file'
                              )
                            "
                            :src="
                              urlIdentity
                                ? urlIdentity
                                : 'https://hilight.kapook.com/img_cms2/user/patcharin/2022/hilight/card1.jpg'
                            "
                          />
                        </v-avatar>
                        <p
                          @click="
                            selectFile('idcard_front_file')
                          "
                          class="text-subtitle-1 font-weight-medium py-2 text-center"
                        >
                          <v-icon>mdi-upload</v-icon>
                          คลิกรูปเพื่ออัพโหลด
                        </p>

                        <v-label
                          class="text-subtitle-1 font-weight-medium py-2"
                          >กรอกเลขบัตรประชาชน</v-label
                        >
                        <v-text-field
                          v-model="dataRegister.idcard_no"
                          :rules="passportRules"
                          class="mb-2"
                          clearable
                          maxLength="13"
                        ></v-text-field>
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
                            อัพโหลดรูปหน้าตรง
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
                              selectFile('person_face_file')
                            "
                            :src="
                              urlFace
                                ? urlFace
                                : 'https://imgv3.fotor.com/images/blog-cover-image/ID-Photo-Requirements-for-Passport-and-Identity-Card.jpg'
                            "
                          />
                        </v-avatar>
                        <p
                          @click="
                            selectFile('person_face_file')
                          "
                          class="text-subtitle-1 font-weight-medium py-2 text-center"
                        >
                          <v-icon>mdi-upload</v-icon>
                          คลิกรูปเพื่ออัพโหลด
                        </p>
                        <v-file-input
                          @change="
                            onFileUpload(
                              $event,
                              'person_face_file'
                            )
                          "
                          ref="myFaceInput"
                          accept="image/*"
                          style="display: none"
                          :rules="fileRules"
                        />
                      </v-card-item>
                    </v-card>
                    <v-card
                      elevation="10"
                      rounded="md"
                      class="mt-5 px-3"
                      v-if="dataRegister.role_id == 4"
                    >
                      <v-card-item class="px-1">
                        <div
                          class="d-flex align-center justify-space-between pb-10"
                        >
                          <h5 class="text-h6">
                            อัพโหลดรูปหน้าสมุดบัญชี
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
                              selectFile('bank_book_file')
                            "
                            :src="
                              urlBookBank
                                ? urlBookBank
                                : 'https://knowledge.bualuang.co.th/wp-content/uploads/2020/08/BookBank-7.png'
                            "
                          />
                        </v-avatar>
                        <p
                          class="text-subtitle-1 font-weight-medium py-2 text-center"
                          @click="
                            selectFile('bank_book_file')
                          "
                        >
                          <v-icon>mdi-upload</v-icon>
                          คลิกรูปเพื่ออัพโหลด
                        </p>
                        <v-file-input
                          @change="
                            onFileUpload(
                              $event,
                              'bank_book_file'
                            )
                          "
                          ref="myBookBank"
                          accept="image/*"
                          :rules="fileRules"
                          style="display: none"
                        />
                      </v-card-item>
                    </v-card>
                    <v-col cols="12" md="12" class="pt-5">
                      <v-checkbox v-model="setPDPA">
                        <template v-slot:label>
                          <div>
                            <v-tooltip location="bottom">
                              <template
                                v-slot:activator="{ props }"
                              >
                                <a
                                  target="_blank"
                                  href="https://vuetifyjs.com"
                                  v-bind="props"
                                  @click.stop
                                >
                                  ยอมรับนโยบายความเป็นส่วนตัว
                                </a>
                              </template>
                            </v-tooltip>
                          </div>
                        </template>
                      </v-checkbox>
                    </v-col>

                    <v-btn
                      size="large"
                      class="mt-5"
                      color="primary"
                      block
                      flat
                      @click="checkRegister()"
                      >สมัคร</v-btn
                    >
                  </v-form>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
