import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCurrencyKey: "RUB",
    currencyData: {},
    search: "",
    converterFromKey: "RUB",
    converterFromValue: 0,
    converterToKey: "EUR",
  },
  actions: {
    async fetchCurrencyData({ commit }) {
      const result = await axios.get(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      );
      const { Valute: currencyData } = result.data;
      commit("fetchCurrencyData", currencyData);
    },
    updateCurrentCurrencyKey({ commit }, payload) {
      commit("updateCurrentCurrencyKey", payload);
    },
    updateSearch({ commit }, payload) {
      commit("updateSearch", payload);
    },
    updateConverterFromKey({ commit }, payload) {
      commit("updateConverterFromKey", payload);
    },
    updateConverterFromValue({ commit }, payload) {
      commit("updateConverterFromValue", payload);
    },
    updateConverterToKey({ commit }, payload) {
      commit("updateConverterToKey", payload);
    },
  },
  mutations: {
    fetchCurrencyData(state, payload) {
      state.currencyData = payload;
    },
    updateCurrentCurrencyKey(state, payload) {
      state.currentCurrencyKey = payload;
    },
    updateSearch(state, payload) {
      state.search = payload;
    },
    updateConverterFromKey(state, payload) {
      state.converterFromKey = payload;
    },
    updateConverterFromValue(state, payload) {
      state.converterFromValue = payload;
    },
    updateConverterToKey(state, payload) {
      state.converterToKey = payload;
    },
  },
  getters: {
    getCurrentCurrencyKey(state) {
      return state.currentCurrencyKey;
    },
    getFetchedCurrencyData(state) {
      return state.currencyData;
    },
    getCurrencyData(state) {
      const preparedData = prepareData(state.currencyData);
      const foundData = findData(preparedData);
      const updatedData = updateDataDependingCurrency(foundData);

      function prepareData(data) {
        const currencyData = [];
        for (const key in data) {
          const currency = data[key];
          const { CharCode, Name, Value, Previous, Nominal } = currency;
          const valueOfOne = Value / Nominal;
          const change = Value / Previous;
          currencyData.push({
            CharCode,
            Name,
            Value: valueOfOne,
            Change: change,
          });
        }
        return currencyData;
      }

      function findData(data) {
        if (!state.search) {
          return data;
        }
        const findResult = [];
        for (const currency of data) {
          const regex = new RegExp(state.search, "i");
          if (regex.exec(currency.CharCode) || regex.exec(currency.Name)) {
            findResult.push(currency);
          }
        }
        return findResult;
      }

      function updateDataDependingCurrency(data) {
        if (state.currentCurrencyKey === "RUB") {
          return data;
        }
        const {
          Value: currentCurrencyValue,
          Previous: currentCurrencyPrevious,
        } = state.currencyData[state.currentCurrencyKey];
        const updatedData = [];
        const rubValue = 1 / currentCurrencyValue;
        const rubChange = currentCurrencyValue / currentCurrencyPrevious;
        updatedData.push({
          CharCode: "RUB",
          Name: "Российский рубль",
          Value: rubValue,
          Change: rubChange,
        });
        for (const currency of data) {
          if (currency.CharCode !== state.currentCurrencyKey) {
            currency.Value = currentCurrencyValue / currency.Value;
            updatedData.push(currency);
          }
        }
        return updatedData;
      }

      return updatedData;
    },
    getCurrencyDataKeys(state) {
      return Object.keys(state.currencyData);
    },
    getSearch(state) {
      return state.search;
    },
    getConverterFromKey(state) {
      return state.converterFromKey;
    },
    getConverterFromValue(state) {
      return state.converterFromValue;
    },
    getConverterToKey(state) {
      return state.converterToKey;
    },
    getConverterToValue(state) {
      const fromKey = state.converterFromKey;
      const fromValue = state.converterFromValue;
      const toKey = state.converterToKey;
      if (fromKey === "RUB") {
        if (toKey === "RUB") {
          return fromValue;
        } else {
          if (!state.currencyData[toKey]) return;
          const toKeyExchangeRate =
            state.currencyData[toKey].Value / state.currencyData[toKey].Nominal;
          return fromValue / toKeyExchangeRate;
        }
      } else {
        if (toKey === "RUB") {
          const toKeyExchangeRate =
            state.currencyData[fromKey].Value /
            state.currencyData[fromKey].Nominal;
          return fromValue * toKeyExchangeRate;
        } else {
          if (!state.currencyData[toKey]) return;
          const fromKeyExchangeRate =
            state.currencyData[fromKey].Value /
            state.currencyData[fromKey].Nominal;
          const toKeyExchangeRate =
            state.currencyData[toKey].Value / state.currencyData[toKey].Nominal;
          const exchangeRate = fromKeyExchangeRate / toKeyExchangeRate;
          return fromValue * exchangeRate;
        }
      }
    },
    getConverterName: (state) => (key) => {
      if (key === "RUB") return "Российский рубль";
      if (!state.currencyData[key]) return;
      return state.currencyData[key].Name;
    },
  },
  modules: {},
});
