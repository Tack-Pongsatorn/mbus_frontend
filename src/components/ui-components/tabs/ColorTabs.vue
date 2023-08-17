<script setup lang="ts">
import ExpenseList from "@/views/ExpenseList.vue";
import C7 from "@/views/C7.vue";
import { ref } from "vue";
import {
	CarIcon,
	SportBillardIcon
} from "vue-tabler-icons";
const tab6 = ref(null);
</script>
<template>
	<div>
		<v-tabs v-model="tab6" class="mb-3">
			<v-tab value="111111" color="secondary">
				<SportBillardIcon
					stroke-width="1.5"
					width="20"
					class="v-icon--start"
				/>
				บท-01
			</v-tab>
			<v-tab value="222222" color="warning">
				<CarIcon
					stroke-width="1.5"
					width="20"
					class="v-icon--start"
				/>
				C7
			</v-tab>
		</v-tabs>
		<v-window v-model="tab6" class="mb-0">
			<v-window-item value="111111">
				<ExpenseList />
			</v-window-item>
			<v-window-item value="222222">
				<C7 />
			</v-window-item>
		</v-window>
	</div>
</template>
