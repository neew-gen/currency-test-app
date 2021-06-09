<template>
  <div class="col-12 col-md-6 col-xl-6 col-xxl-4">
    <div class="card m-2">
      <div class="card-body">
        <h5 class="card-title fs-6">{{ data.Name }}</h5>
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <div class="p-1 font-weight-bold">1 {{ data.CharCode }}</div>
            <div class="p-1">
              <img
                class="double-arrow"
                src="@/assets/double-arrow.svg"
                alt=""
              />
            </div>
            <div class="p-1 font-weight-bold">{{ data.Value.toFixed(4) }}</div>
          </div>
          <div
            class="d-flex align-items-center"
            :class="isPositiveChange ? 'positive' : 'negative'"
          >
            <img class="arrow" src="@/assets/arrow-top.svg" alt="" />
            {{ currencyChange.toFixed(4) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrencyListItem",
  props: ["data"],
  computed: {
    currencyChange() {
      const previousValue = this.data.Value / this.data.Change;
      return this.data.Value - previousValue;
    },
    isPositiveChange() {
      return this.currencyChange >= 0;
    },
  },
};
</script>

<style scoped lang="scss">
.double-arrow {
  height: 25px;
  width: 30px;
}
.arrow {
  height: 15px;
  width: 15px;
}
.positive {
  color: #00b300;
  > img {
    filter: invert(56%) sepia(58%) saturate(6291%) hue-rotate(92deg)
      brightness(100%) contrast(109%);
  }
}
.negative {
  color: #ff0000;
  > img {
    transform: rotate(180deg);
    filter: invert(14%) sepia(100%) saturate(6837%) hue-rotate(9deg)
      brightness(114%) contrast(122%);
  }
}
</style>
