<script setup lang="ts">
import { ref } from 'vue';
import 'v-calendar/dist/style.css';

const date = ref(new Date());
const valid = ref(true);
const dataRegister = ref({
    fname: '',
    lname: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    birthday: '',
    status: ''
});
const requiredRules = ref([(v: string) => !!v || 'กรุณากรอก']);
// phoneRule chcek phone number regex 10 digit and start with 08 , 09 , 06
const phoneRules = ref([
    (v: string) => !!v || 'กรุณากรอก',
    (v: string) => (v && v.length == 10) || 'กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก',
    (v: string) => (v && v.startsWith('08')) || (v && v.startsWith('09')) || (v && v.startsWith('06')) || 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง'
]);

// emailRule if email empty is not require but email is not empty check email regex
const emailRules = ref([(v: string) => !v || /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const stepRegister = ref(1);
const rules = ref([(value: { size: number }) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!']);

function checkRegister(this: any) {
    const type = this.dataRegister.status;
    console.log('type :>> ', type);

    if (type == 'monk') {
        if (stepRegister.value == 1) {
            if (dataRegister.value.fname == '' || dataRegister.value.lname == '' || dataRegister.value.phone == '') {
                valid.value = false;
            } else {
                valid.value = true;
                stepRegister.value = 2;
            }
        } else if (stepRegister.value == 2) {
            if (dataRegister.value.email == '' || dataRegister.value.password == '') {
                valid.value = false;
            } else {
                valid.value = true;
                stepRegister.value = 3;
            }
        }
    } else if (type == 'back') {
        if (stepRegister.value == 2) {
            stepRegister.value = 1;
        } else if (stepRegister.value == 3) {
            stepRegister.value = 2;
        }
    }
}
</script>

<template>
    <v-container fill-height fluid>
        <v-row>
            <v-col cols="12" lg="12">
                <v-form ref="form" v-model="valid" lazy-validation class="mt-2" v-if="stepRegister == 1">
                    <v-alert variant="tonal" type="warning" color="primary" class="mb-6"> Person Info </v-alert>
                    <v-label class="text-subtitle-1 font-weight-medium py-2">ชื่อ</v-label>
                    <v-text-field v-model="dataRegister.fname" :rules="requiredRules" class="mb-2" clearable></v-text-field>

                    <v-label class="text-subtitle-1 font-weight-medium py-2">นามสกุล</v-label>
                    <v-text-field v-model="dataRegister.lname" :rules="requiredRules" class="mb-2" clearable></v-text-field>

                    <v-label class="text-subtitle-1 font-weight-medium py-2">เบอร์มือถือ</v-label>
                    <v-text-field v-model="dataRegister.phone" :rules="phoneRules" class="mb-2" clearable maxLength="10"></v-text-field>

                    <v-label class="text-subtitle-1 font-weight-medium py-2">อีเมล (ถ้ามี)</v-label>
                    <v-text-field v-model="dataRegister.email" :rules="emailRules" class="mb-2" clearable></v-text-field>

                    <v-label class="text-subtitle-1 font-weight-medium pb-2">วันเดือนปีเกิด</v-label>
                    <v-text-field
                        color="primary"
                        variant="outlined"
                        type="date"
                        label=""
                        v-model="dataRegister.birthday"
                        class="mb-2"
                    ></v-text-field>

                    <v-label class="text-subtitle-1 font-weight-medium pb-2">เพศ</v-label>
                    <v-radio-group v-model="dataRegister.gender" inline>
                        <v-radio label="บรรพชิต" value="monk" color="primary"></v-radio>
                        <v-radio label="ชาย" value="male" color="primary"></v-radio>
                        <v-radio label="หญิง" value="female" color="primary"></v-radio>
                    </v-radio-group>

                    <v-label class="text-subtitle-1 font-weight-medium pb-2">สถานภาพ</v-label>
                    <v-radio-group v-model="dataRegister.status" inline>
                        <v-radio label="ผู้เบิกจ่าย" value="monk" color="primary"></v-radio>
                        <v-radio label="ผู้นำรถ" value="male" color="primary"></v-radio>
                        <v-radio label="พนักงาน" value="female" color="primary"></v-radio>
                    </v-radio-group>

                    <v-btn size="large" class="mt-2" color="primary" block flat @click="checkRegister()">{{
                        dataRegister.status == 'monk' ? 'ต่อไป' : 'สมัคร'
                    }}</v-btn>
                </v-form>

                <v-form ref="form" v-model="valid" lazy-validation class="mt-2" v-if="stepRegister == 2">
                    <v-alert variant="tonal" type="warning" color="primary" class="mb-6"> Address Info </v-alert>
                    <v-label class="text-subtitle-1 font-weight-medium py-2">วัด / ศูนย์ / หน่วยงาน</v-label>
                    <v-text-field v-model="dataRegister.fname" :rules="requiredRules" class="mb-2" clearable></v-text-field>

                    <v-label class="text-subtitle-1 font-weight-medium py-2">สังกัดจังหวัด</v-label>
                    <v-text-field v-model="dataRegister.fname" :rules="requiredRules" class="mb-2" clearable></v-text-field>

                    <v-label class="text-subtitle-1 font-weight-medium py-2">อำเภอ / เขต</v-label>
                    <v-text-field v-model="dataRegister.fname" :rules="requiredRules" class="mb-2" clearable></v-text-field>

                    <v-label class="text-subtitle-1 font-weight-medium py-2">จุดออกรถ(เฉพาะ กทมและปริมณฑล)</v-label>
                    <v-text-field v-model="dataRegister.fname" :rules="requiredRules" class="mb-2" clearable></v-text-field>

                    <v-btn size="large" class="mt-2" color="primary" block flat @click="checkRegister()">{{
                        dataRegister.status == 'monk' ? 'ต่อไป' : 'สมัคร'
                    }}</v-btn>
                </v-form>

                <v-form ref="form" v-model="valid" lazy-validation class="mt-2" v-if="stepRegister == 3">
                    <v-alert variant="tonal" type="warning" color="primary" class="mb-6">อัพโหลดรูป</v-alert>
                    <v-card elevation="10" rounded="md">
                        <v-card-item>
                            <!-- <div class="d-flex align-center justify-space-between">
                                <h5 class="text-h6">อัพโหลดรูปหน้าตรง</h5>
                            </div> -->
                            <v-avatar rounded="lg" class="w-100 mt-2 mb-6" size="160">
                                <img
                                    class="w-100"
                                    src="https://imgv3.fotor.com/images/blog-cover-image/ID-Photo-Requirements-for-Passport-and-Identity-Card.jpg"
                                />
                            </v-avatar>
                            <v-label class="text-subtitle-1 font-weight-medium py-2">อัพโหลดรูปหน้าตรง</v-label>
                            <v-file-input
                                :rules="rules"
                                accept="image/png, image/jpeg, image/bmp"
                                prepend-icon=""
                                prepend-inner-icon="mdi-camera"
                                variant="outlined"
                                hide-details="auto"
                            ></v-file-input>
                        </v-card-item>
                    </v-card>
                    <v-card elevation="10" rounded="md" class="mt-5">
                        <v-card-item>
                            <!-- <div class="d-flex align-center justify-space-between">
                                <h5 class="text-h6">อัพโหลดรูปบัตรประชาชน</h5>
                            </div> -->
                            <v-avatar rounded="lg" class="w-100 mt-2 mb-6" size="160">
                                <v-img class="w-100" src="https://hilight.kapook.com/img_cms2/user/patcharin/2022/hilight/card1.jpg" />
                            </v-avatar>
                            <v-label class="text-subtitle-1 font-weight-medium py-2">อัพโหลดรูปบัตรประชาชน</v-label>
                            <v-file-input
                                :rules="rules"
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="Pick an avatar"
                                prepend-icon=""
                                prepend-inner-icon="mdi-camera"
                                variant="outlined"
                                hide-details="auto"
                            ></v-file-input>
                            <v-label class="text-subtitle-1 font-weight-medium py-2">กรอกเลขบัตรประชาชน</v-label>
                            <v-text-field v-model="dataRegister.fname" :rules="requiredRules" class="mb-2" clearable></v-text-field>
                        </v-card-item>
                    </v-card>
                    <v-card elevation="10" rounded="md" class="mt-5">
                        <v-card-item>
                            <!-- <div class="d-flex align-center justify-space-between">
                                <h5 class="text-h6">อัพโหลดรูปบัตรประชาชน</h5>
                            </div> -->
                            <v-avatar rounded="lg" class="w-100 mt-2 mb-6" size="160">
                                <v-img  src="https://knowledge.bualuang.co.th/wp-content/uploads/2020/08/BookBank-7.png" />
                            </v-avatar>
                            <v-label class="text-subtitle-1 font-weight-medium py-2">อัพโหลดรูปหหน้าสมุดบัญชีธนาคาร</v-label>
                            <v-file-input
                                :rules="rules"
                                accept="image/png, image/jpeg, image/bmp"
                                prepend-icon=""
                                prepend-inner-icon="mdi-camera"
                                variant="outlined"
                                hide-details="auto"
                            ></v-file-input>
                        </v-card-item>
                    </v-card>
                    <v-btn size="large" class="mt-5" color="primary" block flat @click="checkRegister()">{{
                        dataRegister.status == 'monk' ? 'ต่อไป' : 'สมัคร'
                    }}</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
