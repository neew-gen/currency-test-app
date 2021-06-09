<template>
  <div class="home">
    <div class="d-flex justify-content-center flex-wrap">
      <Search />
      <DefaultCurrency />
    </div>
    <CurrencyList />
  </div>
</template>

<script>
// @ is an alias to /src

import Search from "@/components/Search";
import CurrencyList from "@/components/CurrencyList";
import DefaultCurrency from "@/components/DefaultCurrency";
export default {
  name: "Home",
  components: { DefaultCurrency, CurrencyList, Search },
};
</script>
