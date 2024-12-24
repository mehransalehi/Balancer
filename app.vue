<template>
  <div class="md:mx-auto p-8 my-8">
    <div class="grid grid-cols-5 gap-4" disabled="disabled">
      <div class="col-span-1 bg-stone-50 p-6">
        <div class="col-span-2 mb-4">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Symbol</label>
          <input v-model="asset['symbol']"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="col-span-2 mb-4">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Group</label>
          <input v-model="asset['group']"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="col-span-2 mb-4">
          <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount</label>
          <input v-model="asset['amount']" type="number" step="0.1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="col-span-2 mb-4 flex flex-col justify-end">
          <button @click="addOrEdit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add/Edit</button>
        </div>

        <hr class="my-6" />


        <div v-show="showSellBuy" class="col-span-2 mb-4">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Symbol</label>
          <input v-model="sb['symbol']"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div v-show="showSellBuy" class="col-span-2 mb-4">
          <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount</label>
          <input v-model="sb['amount']" type="number" step="0.1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div v-show="showSellBuy" class="col-span-1 mb-4 flex flex-col justify-end">
          <button @click="sellBuy('buy')"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">BUY</button>
        </div>
        <div v-show="showSellBuy" class="col-span-1 mb-4 flex flex-col justify-end">
          <button @click="sellBuy('sell')"
            class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SELL</button>
        </div>


      </div>
      <div class="col-span-4 bg-stone-50 p-6">
        <div v-for="(group, groupName) in inDollors">
          <h2 class="text-center my-6">{{ groupName }}</h2>

          <table class="col-span-12 md:col-span-1 w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" class="text-center px-6 py-2">
                  Symbol
                </th>
                <th scope="col" class="text-center px-6 py-2">
                  Amount
                </th>
                <th scope="col" class="text-center px-6 py-2">
                  IN $
                </th>
                <th scope="col" class="text-center px-6 py-2">
                  Diff
                </th>
                <th scope="col" class="text-center px-6 py-2">
                  Number
                </th>
                <th scope="col" class="text-center px-6 py-2">
                  Price
                </th>
                <th scope="col" class="text-center px-6 py-2">
                  S/B
                </th>
                <th scope="col" class="text-center px-6 py-2">
                  */*
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="symbol in group" class="border-b">
                <td class="text-center px-6 py-2">
                  {{ symbol['symbol'] }}
                </td>
                <td class="text-center px-6 py-2">
                  {{ symbol.amount.toFixed(2) }}
                </td>
                <td v-if="symbol.bids == 0" class="text-center px-6 py-2">
                  Not Updated
                </td>
                <td v-else class="text-center px-6 py-2">
                  {{ (symbol.dollor).toFixed(2) }} $
                </td>
                <td v-if="symbol.bids == 0" class="text-center px-6 py-2">
                  Not Updated
                </td>
                <td v-else-if="symbol.dollor >= avgs[groupName]" class="text-center px-6 py-2">
                  <span class="text-lime-600 text-xl">{{ (symbol.dollor - avgs[groupName]).toFixed(2) }} $</span>
                </td>
                <td v-else class="text-center px-6 py-2">
                  <span class="text-red-600 text-xl">{{ (symbol.dollor - avgs[groupName]).toFixed(2) }} $</span>
                </td>
                <td v-if="symbol.bids == 0" class="text-center px-6 py-2">
                  Not Updated
                </td>
                <td v-else-if="symbol.dollor >= avgs[groupName]" class="text-center px-6 py-2">
                  <span class="text-lime-600 text-xl">{{ ((symbol.dollor - avgs[groupName]) / symbol.bids
                  ).toFixed(2) }}</span>
                </td>
                <td v-else class="text-center px-6 py-2">
                  <span class="text-red-600 text-xl">{{ ((symbol.dollor - avgs[groupName]) / symbol.asks).toFixed(2)
                    }}</span>
                </td>
                <td v-if="symbol.bids == 0" class="text-center px-6 py-2">
                  Not Updated
                </td>
                <td v-else-if="symbol.dollor >= avgs[groupName]" class="text-center px-6 py-2">
                  <span class="text-lime-600 text-xl">{{ symbol.bids < 1000 ? symbol.bids.toFixed(4) :
                    symbol.bids.toFixed(2) }}</span>
                </td>
                <td v-else class="text-center px-6 py-2">
                  <span class="text-red-600 text-xl">{{ symbol.asks < 1000 ? symbol.asks.toFixed(4) :
                    symbol.asks.toFixed(2) }}</span>
                </td>
                <td class="text-center px-6 py-2">
                  <i @click="initSellBuy(symbol)" class='fa fa-plus cursor-pointer'></i> /
                  <i @click="initSellBuy(symbol)" class='fa fa-minus cursor-pointer'></i>
                </td>
                <td class="text-center px-6 py-2">
                  <i @click="editSymbol(symbol)" class='fa fa-edit cursor-pointer'></i> /
                  <i @click="deleteSymbol(symbol)" class='fa fa-trash cursor-pointer'></i>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="columns-2 text-center mt-6">
            AVG : {{ avgs[groupName].toFixed(2) }} $ &nbsp&nbsp&nbsp&nbsp&nbsp TOTAL : {{ totals[groupName].toFixed(2) }} $
          </div> -->
        </div>
      </div>

      <div class="text-center mt-6 text-2xl" v-show="msg">{{ msg }}</div>
      <br />
      <div class="text-center mt-6 text-2xl" v-show="loading"><i class="fa fa-spinner fa-spin"></i></div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { onMounted } from 'vue';

interface Symbol {
  symbol: string,
  amount: number,
  group: string
}

const runtimeConfig = useRuntimeConfig()


const assets = ref([]);
const asset = ref<Symbol | null>({
  symbol: '',
  amount: 0,
  group: '-1'
});
const sb = ref<Symbol | null>({
  symbol: '',
  amount: 0,
  group: '-1'
});
const showSellBuy = ref(false);
const socket = ref(null);
const token = ref(null);
const id = ref(null);
const prices = ref({});
const avgs = ref({});
const totals = ref({});
const inDollors = ref({});
const refRes = ref({});
const msg = ref(false);
const loading = ref(false);




//methods
const init = async () => {
  try {
    const response = await fetch(`${runtimeConfig.public.apiBase}symbols`, {
      method: "GET", // HTTP method
      headers: {
        "Content-Type": "application/json", // Specify JSON format
        "Authorization": runtimeConfig.public.apiAuth
      },
    });

    if (!response.ok) {
      // Check if response is successful
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

const addOrEdit = async () => {
  if (asset.value.symbol && asset.value.amount > 0 && asset.value.group) {

    try {
      const response = await fetch(`${runtimeConfig.public.apiBase}symbols`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON format
          "Authorization": runtimeConfig.public.apiAuth
        },
        body: JSON.stringify(asset.value), // Convert the data to JSON string
      });

      if (!response.ok) {
        // Check if response is successful
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json(); // Parse the response
      console.log("Response from API:", responseData);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  } else {
    msg.value = "Wrong input.";
  }
}

onMounted(() => {
  init();
});

</script>
