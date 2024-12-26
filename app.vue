<template>
  <div class="md:mx-auto p-8 my-8">
    <div class="grid grid-cols-5 gap-4" disabled="disabled">
      <div class="col-span-1 bg-stone-50 p-6">
        <div class="col-span-2 mb-4">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Symbol</label>
          <input v-model="asset.symbol"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="col-span-2 mb-4">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Group</label>
          <input v-model="asset.group"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="col-span-2 mb-4">
          <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount</label>
          <input v-model="asset.amount" type="number" step="0.1"
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
import CryptoJS from 'crypto-js';
import pako from 'pako';


const url = 'wss://socket.coinex.com/v2/spot';


interface Asset {
  symbol: string,
  amount: number,
  group: string
}

const runtimeConfig = useRuntimeConfig()/* 
const access_id = ref<string>('');//coinex access_id
const hash = ref<string>('');//coinex secret string that combine with timestamp */


const assets = ref([]);
const asset = ref<Asset>({
  symbol: '',
  amount: 0,
  group: '-1'
});
const sb = ref<Asset>({
  symbol: '',
  amount: 0,
  group: '-1'
});
const showSellBuy = ref(false);
const socket = ref<any>();
const token = ref(null);
const id = ref(null);
const prices = ref<{ [key: string]: { asks: [], bids: [] } }>({});
const avgs = ref({});
const totals = ref({});
const inDollors = ref({});
const refRes = ref({});
const msg = ref('');
const loading = ref(false);
const connected = ref(false);




//methods
const init = async () => {
  try {
    //fetch exchanges keys 
    const resKeys = await fetch(`${runtimeConfig.public.apiBase}keys`, {
      method: "GET", // HTTP method
      headers: {
        "Content-Type": "application/json", // Specify JSON format
        "Authorization": runtimeConfig.public.apiAuth
      },
    });

    if (!resKeys.ok) {
      throw new Error(`HTTP error! status: ${resKeys.status}`);
    }

    const keyData = await resKeys.json();
    /* access_id.value = keyData.key;
    hash.value = keyData.hash; */

    //fetch assets
    const resSymbols = await fetch(`${runtimeConfig.public.apiBase}symbols`, {
      method: "GET", // HTTP method
      headers: {
        "Content-Type": "application/json", // Specify JSON format
        "Authorization": runtimeConfig.public.apiAuth
      },
    });

    if (!resSymbols.ok) {
      // Check if response is successful
      throw new Error(`HTTP error! status: ${resSymbols.status}`);
    }

    assets.value = await resSymbols.json();

    //initial socket 
    //socket.value = new WebSocket(url);
    socket.value.binaryType = "arraybuffer";




    socket.value.onopen = () => {
      console.log('WebSocket connection established');
      depthSign();
    };

    socket.value.onping = () => {
      console.log('Received ping from server')
      socket.value.pong()
    }
    socket.value.onmessage = async (data: any, flags: any) => {
      message(data, flags);
    }
    socket.value.onerror = function (evt: any) {//since there is an error, sockets will close so...
      console.log(evt);
    }
    socket.value.onclose = async function (e: any) {
      console.log("WebSocket Closed:");
      console.log("Code:", e.code);          // Close code
      console.log("Reason:", e.reason);      // Close reason (if available)
      console.log("Was clean?", e.wasClean); // If the closure was clean (i.e., no error)
    }

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
const depthSign = async () => {
  /* let current_time = new Date().getTime();
  let sign_str = "access_id=" + access_id.value + "&tonce=" + current_time + "&secret_key=" + hash.value;
  const hashS = CryptoJS.MD5(sign_str).toString(CryptoJS.enc.Hex).toUpperCase(); */

  /* const timestamp = new Date().getTime().toString();
  const prepared_str = timestamp;
  const hmac = CryptoJS.HmacSHA256(prepared_str, hash.value);
  const signed_str = hmac.toString(CryptoJS.enc.Hex).toLowerCase();



  let param = {
    "id": 1,
    "method": "server.sign",
    "params": {
      "access_id": access_id.value,
      "signed_str": signed_str,
      "timestamp": timestamp
    },
  };
  await socket.value.send(JSON.stringify(param)); */
  let param = {
    "id": 1,
    "method": "depth.subscribe",
    "params": {
      "market_list": [
        ["BTCUSDT", 10, "0", true],
        ["ETHUSDT", 10, "0", false]
      ]
    },
  };
  await socket.value.send(JSON.stringify(param));
  console.log('Authintication Sent...');
}
const message = async (data: any, flags: any) => {
  const buffer = data.data;

  try {
    // Decompress the buffer using pako (zip compression)
    const decompressed = pako.inflate(new Uint8Array(buffer), { to: 'string' });
    // You can parse the JSON if it's in JSON format
    const strData = JSON.parse(decompressed);
    console.log("Parsed JSON:", strData);
    if (strData.method == 'depth.update') {
      let isFul = strData.params[0];
      let update = strData.params[1];
      let market = strData.params[2];

      if (!prices.value[market]) {
        prices.value[market] = {
          asks: [],
          bids: [],
        }
      }

      if (isFul) {
        prices.value[market]['asks'] = update.asks.map((arr: string[]) => {
          return arr.map((e) => {
            return parseFloat(e)
          });
        });
        prices.value[market]['bids'] = update.bids.map((arr: string[]) => {
          return arr.map((e) => {
            return parseFloat(e)
          });
        });;
      } else {
        if (update.bids) {
          prices.value[market]['bids'] = updateRePrices(prices.value[market]['bids'], update.bids);
        }
        if (update.asks) {
          prices.value[market]['asks'] = updatePrices(prices.value[market]['asks'], update.asks);
        }
      }

      this.emit(`depth.update.${market}`, prices.value[market]);
    }

  } catch (error) {
    console.error("Error decompressing message:", error);
  }
}
const updateRePrices = (main, update) => {
  update.map(depth => {
    let index = main.findIndex(e => e[0] == parseFloat(depth[0]));
    if (index > -1) {//if element exist need to replace
      main[index][1] = parseFloat(depth[1]);
    } else {//if element not exist need to add
      main.push(depth.map((e) => {
        return parseFloat(e)
      }));
    }
  });

  main = main.filter(b => b[1] > 0);
  main = main.sort(function (a, b) {
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  });

  return main;

}
onMounted(() => {
  init();
});

</script>
