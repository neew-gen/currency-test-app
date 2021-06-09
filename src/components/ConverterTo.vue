<template>
  <div class="col-12 col-md-5 col-xl-4 col-xxl-3">
    <div class="card m-2">
      <div class="card-body converter">
        <div>
          <h5 class="card-title fs-6">
            {{ getConverterName(converterToKey) }}
          </h5>
          <div class="d-flex">
            <CurrencyDropdown
              :text="converterToKey"
              @updateCurrencyDropdown="updateCurrencyDropdown"
            />
            <input
              disabled
              class="form-control"
              type="number"
              placeholder="Value"
              :value="converterToValue"
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
  name: "ConverterTo",
  components: { CurrencyDropdown },
  computed: {
    ...mapGetters({
      converterToKey: "getConverterToKey",
      getConverterName: "getConverterName",
      converterToValue: "getConverterToValue",
    }),
  },
  methods: {
    ...mapActions(["updateConverterToKey"]),
    updateCurrencyDropdown(e) {
      this.updateConverterToKey(e);
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
