<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useContactStore } from "@/stores/apps/contact";

import contact from "@/_mockApis/apps/contact";
import { useRouter } from "vue-router";
import { busStore } from "@/stores/myStore/bus";

// store
const store = useContactStore();
const busStoreData = busStore();

onMounted(() => {
  store.fetchContacts();
  busStoreData.fetchProject();
});
const getContacts: any = computed(() => {
  return store.contacts;
});
const router = useRouter();
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
const listProject = computed(() => {
  return busStoreData.project;
});
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
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  }, 300);
}
function save() {
  if (editedIndex.value > -1) {
    Object.assign(
      desserts.value[editedIndex.value],
      editedItem.value
    );
  } else {
    desserts.value.push(editedItem.value);
  }
  close();
}

function goToExpenseList(item: any) {
  router.push({
    name: "expense",
    params: { id: item.name }
  });
}

//Computed Property
const formTitle = computed(() => {
  return editedIndex.value === -1
    ? "เพิ่มใบ บท-01"
    : "แก้ไข บท-01";
});

onMounted(() => {
  console.log("Component mounted!");
});
</script>
<template>
  <div>
    <v-table class="mt-5">
      <thead>
        <tr>
          <!-- <th class="text-subtitle-1 font-weight-semibold">Id</th> -->
          <th class="text-subtitle-1 font-weight-semibold">
            งานบุญทั้งหมด
          </th>
          <th></th>
          <!-- <th class="text-subtitle-1 font-weight-semibold">Phone</th>
                    <th class="text-subtitle-1 font-weight-semibold">Joining Date</th>
                    <th class="text-subtitle-1 font-weight-semibold">Role</th> -->
          <!-- <th class="text-subtitle-1 font-weight-semibold">Actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in listProject"
          :key="index"
        >
          <!-- <td class="text-subtitle-1">{{ item.id }}</td> -->
          <td @click="goToExpenseList(item)">
            <div class="d-flex align-center py-4">
              <!-- <div>
                                <v-img :src="item.avatar" width="45px" class="rounded-circle img-fluid"></v-img>
                            </div> -->

              <div class="ml-5">
                <h4 class="text-h6">
                  {{ item }}
                </h4>
                <!-- <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.usermail }}</span> -->
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
