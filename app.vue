<template>
  <div class="md:mx-auto p-8 my-8">
    <div class="grid grid-cols-5 gap-4" disabled="disabled">
      <div class="col-span-1 bg-stone-50 p-6">
        <div v-show="!showSellBuy" class="col-span-2 mb-4">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 ">Symbol</label>
          <input v-model="asset.symbol" :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        </div>
        <div v-show="!showSellBuy" class="col-span-2 mb-4">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Group</label>
          <input v-model="asset.group" :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        </div>
        <div v-show="!showSellBuy" class="col-span-2 mb-4">
          <label for="number" class="block mb-2 text-sm font-medium text-gray-900">Amount</label>
          <input v-model="asset.amount" type="number" step="0.1" :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        </div>
        <div v-show="!showSellBuy" class="col-span-2 mb-4 flex flex-col justify-end">
          <button @click="addOrEdit" :disabled="loading"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Add/Edit</button>
        </div>
        <div v-show="!showSellBuy" class="col-span-1 mb-4 flex flex-col justify-end">
          <button @click="canceleSellBuy()" :disabled="loading"
            class="w-full text-white bg-orange-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Clear</button>
        </div>

        <div v-show="showSellBuy" class="col-span-2 mb-4">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Symbol</label>
          <input v-model="asset['symbol']" :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        </div>
        <div v-show="showSellBuy" class="col-span-2 mb-4">
          <label for="number" class="block mb-2 text-sm font-medium text-gray-900">Amount</label>
          <input v-model="asset['amount']" type="number" step="0.1" :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        </div>
        <div v-show="showSellBuy" class="col-span-1 mb-4 flex flex-col justify-end">
          <button @click="sellBuy('buy')" :disabled="loading"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">BUY</button>
        </div>
        <div v-show="showSellBuy" class="col-span-1 mb-4 flex flex-col justify-end">
          <button @click="sellBuy('sell')" :disabled="loading"
            class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">SELL</button>
        </div>
        <div v-show="showSellBuy" class="col-span-1 mb-4 flex flex-col justify-end">
          <button @click="canceleSellBuy()" :disabled="loading"
            class="w-full text-white bg-orange-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Cancel</button>
        </div>


      </div>
      <div class="col-span-4 bg-stone-50 p-6">
        <div v-for="(group, groupName) in assetsGroups">
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
                <td v-else-if="symbol.dollor >= avgInEachGroup[groupName]" class="text-center px-6 py-2">
                  <span class="text-lime-600 text-xl">{{ (symbol.dollor - avgInEachGroup[groupName]).toFixed(2) }}
                    $</span>
                </td>
                <td v-else class="text-center px-6 py-2">
                  <span class="text-red-600 text-xl">{{ (symbol.dollor - avgInEachGroup[groupName]).toFixed(2) }}
                    $</span>
                </td>
                <td v-if="symbol.bids == 0" class="text-center px-6 py-2">
                  Not Updated
                </td>
                <td v-else-if="symbol.dollor >= avgInEachGroup[groupName]" class="text-center px-6 py-2">
                  <span class="text-lime-600 text-xl">{{ ((symbol.dollor - avgInEachGroup[groupName]) / symbol.bids
                  ).toFixed(2) }}</span>
                </td>
                <td v-else class="text-center px-6 py-2">
                  <span class="text-red-600 text-xl">{{ ((symbol.dollor - avgInEachGroup[groupName]) /
                    symbol.asks).toFixed(2)
                    }}</span>
                </td>
                <td v-if="symbol.bids == 0" class="text-center px-6 py-2">
                  Not Updated
                </td>
                <td v-else-if="symbol.dollor >= avgInEachGroup[groupName]" class="text-center px-6 py-2">
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
          <div class="columns-2 text-center mt-6">
            AVG : {{ avgInEachGroup[groupName].toFixed(2) }} $ &nbsp&nbsp&nbsp&nbsp&nbsp TOTAL : {{
              totalNumberInEachGroup[groupName].toFixed(2) }} $
          </div>
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
import pako from 'pako';


const url = 'wss://socket.coinex.com/v2/spot';


interface Asset {
  symbol: string,
  amount: number,
  group: string
}
interface groupAssets {
  [key: string]: {
    symbol: string,
    asks: number,
    bids: number,
    amount: number,
    group: string,
    dollor: number
  }[]
};
const runtimeConfig = useRuntimeConfig()/* 
const access_id = ref<string>('');//coinex access_id
const hash = ref<string>('');//coinex secret string that combine with timestamp */


const assets = ref<{ id: number, symbol: string, amount: number, group: string, created_at: string }[]>([]);
const asset = ref<Asset>({
  symbol: '',
  amount: 0,
  group: '-1'
});
const showSellBuy = ref(false);
const socket = ref<any>();
const prices = ref<{ [key: string]: { asks: [number, number][], bids: [number, number][], last: number } }>({});
const msg = ref('');
const loading = ref(false);
const connected = ref(false);
const assetsGroups = ref<groupAssets>({});
const totalNumberInEachGroup = ref<{ [key: string]: number }>({})
const avgInEachGroup = ref<{ [key: string]: number }>({})
const delay = ref(true);




//methods
const init = async () => {
  try {
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

    assets.value = (await resSymbols.json()).assets;
    refresh()
    //initial socket 
    /* socket.value = new WebSocket(url);
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
    } */

  } catch (error) {
    console.error("Error posting data:", error);
  }
}
const refresh = () => {
  let tmpArr = []
  //console.log(assets.value);
  for (const asset of assets.value) {
    let symbol = asset.symbol.replace("/", "").toUpperCase();
    let amount = asset.amount
    let group = asset.group;




    if (prices.value.hasOwnProperty(`${symbol}USDT`) &&
      prices.value[`${symbol}USDT`].bids.length > 0) {
      tmpArr.push({
        symbol: symbol,
        bids: prices.value[`${symbol}USDT`].bids[0][0],
        asks: prices.value[`${symbol}USDT`].asks[0][0],
        amount: amount,
        group: group,
        dollor: 0
      });
    } else {
      tmpArr.push({
        symbol: symbol,
        bids: 0,
        asks: 0,
        amount: amount,
        group: group,
        dollor: 0
      });
    }
  }


  let groups = tmpArr.reduce((groups: groupAssets, asset) => {
    const group = (groups[asset.group] || []);
    group.push(asset);
    groups[asset.group] = group;
    return groups;
  }, {});
  assetsGroups.value = groups;
  for (let g in assetsGroups.value) {
    let group = assetsGroups.value[g];


    let bidSum = 0, askSum = 0;
    let num = 0;
    for (let key in group) {
      bidSum += group[key].bids;
      askSum += group[key].asks;
      num++;
    }
    let mainSum = 0;
    for (let key in group) {
      group[key].dollor = group[key].bids * group[key].amount;
      mainSum += group[key].dollor;
    }

    totalNumberInEachGroup.value[g] = mainSum;
    avgInEachGroup.value[g] = mainSum / num;
  }

  for (let g in assetsGroups.value) {
    let group = assetsGroups.value[g];
    group.sort(function (a, b) {
      return b.dollor - a.dollor;
    })
  }
}

const addOrEdit = async () => {
  if (asset.value.symbol && asset.value.amount > 0 && asset.value.group) {
    loading.value = true;
    asset.value.symbol = asset.value.symbol.replace("/", "").toUpperCase();
    asset.value.group = asset.value.group.toUpperCase();
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
      canceleSellBuy();
      console.log("Response from API:", responseData);
    } catch (error) {
      console.error("Error posting data:", error);
      canceleSellBuy();
    }
  } else {
    msg.value = "Wrong input.";
  }
}
const deleteSymbol = async (symbol: any) => {
  if(!confirm("Are You Sure TO Delete : "+ symbol.symbol)){
    return true;
  }
  console.log(assets.value);
  console.log(symbol);
  let index = assets.value.findIndex((sym) => {
    return sym.symbol.toUpperCase() == symbol.symbol.toUpperCase() && sym.group.toUpperCase() == symbol.group.toUpperCase();
  });
  if (index > -1) {
    let target = assets.value[index];
    try {
      const resSymbols = await fetch(`${runtimeConfig.public.apiBase}symbols/${target.id}`, {
        method: "DELETE", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON format
          "Authorization": runtimeConfig.public.apiAuth
        },
      });

      if (!resSymbols.ok) {
        // Check if response is successful
        throw new Error(`HTTP error! status: ${resSymbols.status}`);
      }
      assets.value = (await resSymbols.json()).assets;
      refresh()

    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }else{
    console.log("not found");
  }

}

const editSymbol = (symbol: any) => {
  asset.value.symbol = symbol.symbol;
  asset.value.amount = symbol.amount;
  asset.value.group = symbol.group;

}
const depthSign = async () => {
  let param = {
    "id": 1,
    "method": "depth.subscribe",
    "params": {
      "market_list": [
        ["BTCUSDT", 10, "0", true],
        ["XRPUSDT", 10, "0", true],
        ["ADAUSDT", 10, "0", true],
        ["BNBUSDT", 10, "0", true],
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
    // console.log("Parsed JSON:", strData);
    if (strData.method == 'depth.update' && delay.value) {
      delay.value = false;
      const updateData = strData.data;
      let isFul = updateData.is_full;
      let depth = updateData.depth;
      let market = updateData.market;

      if (!prices.value[market]) {
        prices.value[market] = {
          asks: [],
          bids: [],
          last: 0
        }
      }
      prices.value[market].last = depth.last;
      if (isFul) {
        prices.value[market]['asks'] = depth.asks.map((arr: [string, string]) => {
          return arr.map((e) => {
            return parseFloat(e)
          });
        });
        prices.value[market]['bids'] = depth.bids.map((arr: [string, string]) => {
          return arr.map((e) => {
            return parseFloat(e)
          });
        });
      } else {
        if (depth.bids) {
          prices.value[market]['bids'] = updateRePrices(prices.value[market]['bids'], depth.bids);
        }
        if (depth.asks) {
          prices.value[market]['asks'] = updatePrices(prices.value[market]['asks'], depth.asks);
        }
      }

      window.setTimeout(() => {
        delay.value = true;
      }, 5000);
      refresh();
    }
  } catch (error) {
    console.error("Error decompressing message:", error);
  }
}
const updatePrices = (main: [number, number][], update: [string, string][]) => {
  update.map(depth => {
    let index = main.findIndex(e => e[0] == parseFloat(depth[0]));
    if (index > -1) {//if element exist need to replace
      main[index][1] = parseFloat(depth[1]);
    } else {//if element not exist need to add
      main.push([parseFloat(depth[0]), parseFloat(depth[1])]);
    }
  });

  main = main.filter(b => b[1] > 0);
  main = main.sort(function (a, b) {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  });

  return main;
}
const updateRePrices = (main: [number, number][], update: [string, string][]) => {
  update.map((depth: [string, string]) => {
    let index = main.findIndex(e => e[0] == parseFloat(depth[0]));
    if (index > -1) {//if element exist need to replace
      main[index][1] = parseFloat(depth[1]);
    } else {//if element not exist need to add
      main.push([parseFloat(depth[0]), parseFloat(depth[1])]);
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
const sellBuy = (side: string) => {
  if (loading.value) {
    msg.value = `Not Compeleted Yet >>> ${msg.value}`;
    return true;
  }
  let index = assets.value.findIndex((sym) => {
    return sym.symbol == asset.value.symbol.toUpperCase() && sym.group == asset.value.group.toUpperCase();
  })
  if (asset.value.symbol != '' && index >= 0) {
    loading.value = true;
    msg.value = 'Saving...';
    let target = assets.value[index];

    side == 'buy' ?
      asset.value.amount = target.amount + asset.value.amount :
      asset.value.amount = target.amount - asset.value.amount;

    addOrEdit();
  }

}
const initSellBuy = (symbol: any) => {
  showSellBuy.value = true;
  asset.value.symbol = symbol.symbol;
  asset.value.group = symbol.group;
}
const canceleSellBuy = () => {
  showSellBuy.value = false;
  asset.value.symbol = '';
  asset.value.amount = 0;
  asset.value.group = '-1';
  loading.value = false;
  refresh();
}

onMounted(() => {
  init();
});

</script>
