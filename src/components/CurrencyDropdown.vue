<template>
  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      @click="toggleDropdown"
    >
      {{ text }}
    </button>
    <ul class="dropdown-menu" ref="dropdownMenu">
      <li>
        <div class="dropdown-item" @click="setCurrency('RUB')">RUB</div>
      </li>
      <li
        v-for="item in currencyDataKeys"
        :key="item"
        @click="setCurrency(item)"
      >
        <div class="dropdown-item">
          {{ item }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CurrencyDropdown",
  computed: {
    ...mapGetters({
      currencyDataKeys: "getCurrencyDataKeys",
    }),
  },
  props: ["text"],
  methods: {
    toggleDropdown() {
      this.$refs.dropdownMenu.classList.toggle("show");
    },
    setCurrency(key) {
      this.$emit("updateCurrencyDropdown", key);
      this.toggleDropdown();
    },
  },
};
</script>

<style scoped></style>
