<script setup lang="ts">
/* Register form */
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="d-flex justify-center align-center">
                <v-col cols="12" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0 mx-auto" max-width="450">
                        <v-card-item class="pa-sm-8">
                            <h5 class="text-h5 text-medium-emphasis d-flex justify-center align-center mt-3 mb-5">สมัครสมาชิก</h5>
                            <!-- <div class="text-h6 text-medium-emphasis text-center mb-6">Your Social Campaigns</div> -->
                            <RegisterForm />
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
