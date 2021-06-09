<template>
  <div class="container">
    <div class="row">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar,
  },
  mounted() {
    this.$store.dispatch("fetchCurrencyData");
  },
};
</script>

<style lang="scss">
@import "~mdb-ui-kit/css/mdb.min.css";
</style>
