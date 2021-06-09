<template>
  <div class="d-flex flex-wrap">
    <CurrencyListItem
      v-for="item in currencyData"
      :key="item.CharCode"
      :data="item"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CurrencyListItem from "@/components/CurrencyListItem";

export default {
  name: "CurrencyList",
  components: { CurrencyListItem },
  computed: {
    ...mapGetters({
      currencyData: "getCurrencyData",
    }),
  },
};
</script>

<style scoped></style>
