<script setup lang="ts">
import { ref, computed } from "vue";
import { getSecondary } from "@/utils/UpdateColors";

/*Chart 1*/
const Chart = computed(() => {
  return {
    series: [1, 1, 1, 3],
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "2px",
              color: "#dfsda",
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: "12px",
              color: "#98aab4",
              offsetY: -5
            },
            total: {
              show: true,
              fontSize: "12px",
              label: "ทั้งหมด",
              offsetY: 5,
              color: "#98aab4"
            }
          }
        }
      }
    },
    labels: [
      "ตู้",
      "บัสพัดลม",
      "บัสแอร์ 1 ชั้น",
      "บัสแอร์ 2 ชั้น"
    ],
    colors: [
      getSecondary.value,
      "#1e4db7",
      "#fec90f",
      "#FFAB91"
    ],
    chart: {
      toolbar: {
        show: false
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      type: "donut",
      height: 145
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    legend: {
      show: false
    },
    stroke: {
      colors: ["transparent"]
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false
    }
  };
});
</script>
<template>
  <v-row>
    <v-col cols="12" sm="12" lg="3">
      <v-card elevation="10">
        <v-card-item class="pb-sm-8 pb-6">
          <v-card-title class="text-h5"
            >ข้อมูลใบขอเบิกค่ารถ (บท 01)</v-card-title
          >

          <div class="mt-sm-10 mt-5">
            <div class="d-flex align-center mt-6">
              <v-avatar
                :class="'rounded-md bg-lightprimary'"
                size="40"
              >
                <component
                  is="ShoppingCartIcon"
                  class="text-primary"
                  stroke-width="2"
                  size="20"
                />
              </v-avatar>
              <div class="pl-4 mt-n1">
                <h5 class="text-h6">ชื่อบัญชีธนาคาร</h5>
                <h6
                  class="text-subtitle-1 text-medium-emphasis"
                >
                  พงษ์ศธร
                </h6>
              </div>
              <!-- <div
                  class="ml-auto font-weight-medium text-subtitle-1 text-medium-emphasis"
                  v-text="list.rank"
                ></div> -->
            </div>
          </div>
          <div class="mt-sm-10 mt-5">
            <div class="d-flex align-center mt-6">
              <v-avatar
                :class="'rounded-md bg-lightsecondary'"
                size="40"
              >
                <component
                  is="MapPinIcon"
                  class="text-secondary"
                  stroke-width="2"
                  size="20"
                />
              </v-avatar>
              <div class="pl-4 mt-n1">
                <h5 class="text-h6">จังหวัด</h5>
                <h6
                  class="text-subtitle-1 text-medium-emphasis"
                >
                  เพชรบูรณ์
                </h6>
              </div>
              <!-- <div
                  class="ml-auto font-weight-medium text-subtitle-1 text-medium-emphasis"
                  v-text="list.rank"
                ></div> -->
            </div>
          </div>
          <div class="mt-sm-10 mt-5">
            <div class="d-flex align-center mt-6">
              <v-avatar
                :class="'rounded-md bg-lightsuccess'"
                size="40"
              >
                <component
                  is="CurrencyDollarIcon"
                  class="text-success"
                  stroke-width="2"
                  size="20"
                />
              </v-avatar>
              <div class="pl-4 mt-n1">
                <h5 class="text-h6">
                  จำนวนค่าเบิกรถทั้งหมด
                </h5>
                <h6
                  class="text-subtitle-1 text-medium-emphasis"
                >
                  50,000 บาท
                </h6>
              </div>
              <!-- <div
                  class="ml-auto font-weight-medium text-subtitle-1 text-medium-emphasis"
                  v-text="list.rank"
                ></div> -->
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" lg="3">
      <v-card elevation="10">
        <v-card-text>
          <v-row>
            <v-col sm="6">
              <h3 class="text-h4">2</h3>
              <div
                class="text-subtitle-1 font-weight-regular mt-1"
              >
                จำนวนรถทั้งหมด (คัน)
              </div>
              <div
                class="d-flex align-center justify-space-between mt-4"
              >
                <span class="d-flex align-center">
                  <span class="text-overline">
                    <i
                      class="mdi mdi-brightness-1 text-primary mx-1"
                    ></i>
                  </span>
                  <span class="font-weight-regular"
                    >รถตู้</span
                  >
                </span>
                <span class="d-flex align-center">
                  <span class="text-overline">
                    <i
                      class="mdi mdi-brightness-1 text-secondary mx-1"
                    ></i>
                  </span>
                  <span class="font-weight-regular">
                    รถบัสพัดลม
                  </span>
                </span>
              </div>
              <div
                class="d-flex align-center justify-space-between"
              >
                <span class="d-flex align-center">
                  <span class="text-overline">
                    <i
                      class="mdi mdi-brightness-1 text-warning mx-1"
                    ></i>
                  </span>
                  <span class="font-weight-regular"
                    >รถบัสแอร์ 1 ชั้น</span
                  >
                </span>
                <span class="d-flex align-center">
                  <span class="text-overline">
                    <i
                      class="mdi mdi-brightness-1 mx-1 text-accent"
                    ></i>
                  </span>
                  <span class="font-weight-regular"
                    >รถบัสแอร์ 2 ชั้น</span
                  >
                </span>
              </div>
            </v-col>
            <v-col sm="6">
              <div class="position-relative ml-auto">
                <apexchart
                  type="donut"
                  height="145px"
                  :options="Chart"
                  :series="Chart.series"
                ></apexchart>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
