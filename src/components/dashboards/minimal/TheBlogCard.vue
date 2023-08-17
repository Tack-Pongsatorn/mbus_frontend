<script setup lang="ts">
import {
  ClockHour4Icon,
  MessageCircle2Icon,
  MessageCircleIcon
} from "vue-tabler-icons";
</script>

<template>
  <VCard class="overflow-hidden" elevation="10">
    <!-- <img style="width: 100%" src="@/assets/images/backgrounds/blog-bg-2x.jpg"/> -->
    <v-card-text >
      <v-chip class="mr-2" label color="primary">
        ชื่อบัญชี
      </v-chip>
      <h5 class="mb-2 mt-1 text-h5 text-truncate">คุณ พงษ์ศธร</h5>

      <v-chip class="mr-2 mt-5" label color="error">
        จังหวัด
      </v-chip>
      <h5 class="mb-2 mt-1 text-h5">เพชรบูรณ์</h5>

      <v-chip class="mr-2 mt-5" label color="secondary">
        จำนวนเงินรวม
      </v-chip>
      <h5 class="mb-2 mt-1 text-h5">25,000</h5>

      <!-- <div class="d-flex align-center mt-4">
        <v-avatar size="40">
          <img width="40" src="@/assets/images/profile/1.jpg" alt="John" />
        </v-avatar>
        <v-avatar size="40" class="ml-2">
          <img width="40" src="@/assets/images/profile/2.jpg" alt="John" />
        </v-avatar>
        <v-avatar size="40" class="ml-2">
          <img width="40" src="@/assets/images/profile/3.jpg" alt="John" />
        </v-avatar>
        <div class="ml-auto">
          <v-btn icon variant="flat">
            <v-avatar size="large" class="textSecondary">
                        <MessageCircle2Icon size="22" />
                    </v-avatar>
          </v-btn>
        </div>
      </div> -->
    </v-card-text>
  </VCard>
</template>
