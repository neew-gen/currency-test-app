<template>
  <div class="col-12 col-md-5 col-xl-4 col-xxl-3">
    <div class="card m-2">
      <div class="card-body converter">
        <div>
          <h5 class="card-title fs-6">
            {{ this.getConverterName(converterFromKey) }}
          </h5>
          <div class="d-flex">
            <CurrencyDropdown
              :text="this.converterFromKey"
              @updateCurrencyDropdown="updateCurrencyDropdown"
            />
            <input
              class="form-control"
              type="number"
              placeholder="Value"
              :value="this.converterFromValue.toFixed(0)"
              @input="updateInput"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CurrencyDropdown from "@/components/CurrencyDropdown";

export default {
  name: "ConverterFrom",
  components: { CurrencyDropdown },
  computed: {
    ...mapGetters({
      converterFromKey: "getConverterFromKey",
      getConverterName: "getConverterName",
      converterFromValue: "getConverterFromValue",
    }),
  },
  methods: {
    ...mapActions(["updateConverterFromKey", "updateConverterFromValue"]),
    updateCurrencyDropdown(e) {
      this.updateConverterFromKey(e);
    },
    updateInput(e) {
      this.updateConverterFromValue(e.target.value);
    },
  },
};
</script>

<style scoped>
.converter {
  height: 150px;
  display: flex;
  align-items: center;
}
</style>
