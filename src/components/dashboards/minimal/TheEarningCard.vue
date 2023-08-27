<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getSecondary } from "@/utils/UpdateColors";

// props
const props = defineProps<{
  listBus: string[];
  typeBus: string[];
}>();

const reduceAmountListBus = computed(() => {
  return props.listBus.reduce((acc, cur) => {
    return acc + Number(cur.amount);
  }, 0);
});

function convertCar(value: string) {
  const busType = props.typeBus.find(
    (item) => item.id === value
  );
  return busType?.name;
}

const reduceByBusTypeID = computed(() => {
  return props.listBus.reduce((allNames, name) => {
    let currCount: any = Object.hasOwn(
      allNames,
      convertCar(name.bus_type_id)
    )
      ? allNames[convertCar(name.bus_type_id)]
      : 0;

    return {
      ...allNames,
      [convertCar(name.bus_type_id)]: currCount + 1
    };
  }, {});
});

const showChart = computed(() => {
  return reduceByBusTypeID ? true : false;
});

const listBusName = computed<string[]>(() => {
  return Object.keys(reduceByBusTypeID.value);
});

const listBusAmount = computed(() => {
  return Object.values(reduceByBusTypeID.value);
});

const listBusTotal = computed<number>(() => {
  return listBusAmount?.value?.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );
});

const colorBus = computed(() => {
  return ["primary", "secondary", "warning", "error"];
});

/*Chart 1*/
const Chart = computed(() => {
  return {
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
    series: listBusAmount.value,
    labels: listBusName.value,
    colors: [
      "#1e4db7",
      getSecondary.value,
      "#fec90f",
      "#FFAB91"
    ],
    chart: {
      toolbar: {
        show: false
      },
      foreColor: "#adb0bb",
      fontFamily: "sans-serif",
      type: "donut",
      height: 145
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 5
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
function currencyComma(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
</script>
<template>
  <v-row>
    <v-col cols="12" sm="12" lg="3">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template v-slot:default="{ expanded }">
              <v-row no-gutters>
                <v-col
                  cols="4"
                  class="d-flex justify-start"
                >
                </v-col>
                <v-col cols="12" class="text-grey">
                  <v-fade-transition leave-absolute>
                    <span v-if="expanded" key="0">
                      <div class="text-h5 mt-1">
                        ข้อมูลใบขอเบิกค่ารถ (บท 01)
                      </div>
                    </span>
                    <span v-else key="1">
                      <div class="text-h5 mt-1">
                        เบิกค่ารถทั้งหมด
                        {{
                          currencyComma(
                            reduceAmountListBus.toString()
                          )
                        }}
                        บาท
                      </div>
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
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
                    {{
                      currencyComma(
                        reduceAmountListBus.toString()
                      )
                    }}
                    บาท
                  </h6>
                </div>
                <!-- <div
                  class="ml-auto font-weight-medium text-subtitle-1 text-medium-emphasis"
                  v-text="list.rank"
                ></div> -->
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col cols="12" sm="12" lg="3">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template v-slot:default="{ expanded }">
              <v-row no-gutters>
                <!-- <v-col
                  cols="12"
                  class="d-flex justify-start"
                >
                  <div class="text-h5 mt-1">
                    จำนวนรถทั้งหมด {{ listBusTotal }} คัน
                  </div>
                </v-col> -->
                <v-col cols="8" class="text-grey">
                  <v-fade-transition leave-absolute>
                    <span v-if="expanded" key="0">
                      <div class="text-h5 mt-1">
                        ข้อมูลรถโดยสาร
                      </div>
                    </span>
                    <span v-else key="1">
                      <div class="text-h5 mt-1">
                        จำนวนรถทั้งหมด
                        {{ listBusTotal }} คัน
                      </div>
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col sm="6">
                <div
                  class="d-flex flex-wrap align-center justify-space-between"
                >
                  <span
                    v-for="(item, index) of listBus"
                    :key="index"
                    class="d-flex align-center"
                  >
                    <span class="text-overline">
                      <i
                        class="mdi mdi-brightness-1 text-primary mx-1"
                        :class="'text-' + colorBus[index]"
                      ></i>
                    </span>
                    <span class="font-weight-regular">{{
                      convertCar(item.bus_type_id)
                    }}</span>
                  </span>
                </div>
              </v-col>
              <v-col sm="6" v-if="showChart">
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
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>
