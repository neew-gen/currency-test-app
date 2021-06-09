<template>
  <div>
    <button class="btn btn-light" type="button" @click="swap">
      <img src="@/assets/double-arrow.svg" alt="swap-btn" />
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { cloneDeep } from "lodash";

export default {
  name: "CurrencySwapButton",
  computed: {
    ...mapGetters({
      converterFromKey: "getConverterFromKey",
      converterToKey: "getConverterToKey",
      converterToValue: "getConverterToValue",
    }),
  },
  methods: {
    ...mapActions([
      "updateConverterFromKey",
      "updateConverterFromValue",
      "updateConverterToKey",
    ]),
    swap() {
      const converterFromKeyCopy = cloneDeep(this.converterFromKey);
      const converterToKeyCopy = cloneDeep(this.converterToKey);
      const converterToValueCopy = cloneDeep(this.converterToValue);
      this.updateConverterToKey(converterFromKeyCopy);
      this.updateConverterFromKey(converterToKeyCopy);
      this.updateConverterFromValue(converterToValueCopy);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  > img {
    height: 20px;
    width: 20px;
  }
}
</style>
