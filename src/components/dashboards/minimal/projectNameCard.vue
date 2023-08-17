<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeMount,
  onUnmounted,
  onUpdated
} from "vue";
defineProps<{
  projectName: string;
}>();
</script>
<template>
  <VCard class="overflow-hidden" elevation="10">
    sdfsdf
    <!-- <img style="width: 100%" src="@/assets/images/backgrounds/blog-bg-2x.jpg"/> -->
    <v-card-text>
      sdfsdf
      <v-chip class="mr-2" label color="primary">
        <!-- {{ projectName }} -->
      </v-chip>
    </v-card-text>
  </VCard>
</template>
