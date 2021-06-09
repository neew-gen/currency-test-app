<template>
  <div class="col-12 col-lg-6 d-flex justify-content-center py-2">
    <CurrencyDropdown
      :text="dropdownText"
      @updateCurrencyDropdown="updateCurrencyDropdown"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CurrencyDropdown from "@/components/CurrencyDropdown";
export default {
  name: "DefaultCurrency",
  components: { CurrencyDropdown },
  computed: {
    ...mapGetters({
      currencyDataKeys: "getCurrencyDataKeys",
      currentCurrencyKey: "getCurrentCurrencyKey",
    }),
    dropdownText() {
      return `Default Currency: ${this.currentCurrencyKey}`;
    },
  },
  methods: {
    ...mapActions(["updateCurrentCurrencyKey"]),
    updateCurrencyDropdown(e) {
      this.updateCurrentCurrencyKey(e);
    },
  },
};
</script>

<style scoped></style>
