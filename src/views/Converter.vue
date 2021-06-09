<template>
  <div class="d-flex justify-content-center align-items-center flex-wrap">
    <ConverterFrom />
    <CurrencySwapButton />
    <ConverterTo />
  </div>
</template>
<script>
import ConverterFrom from "@/components/ConverterFrom";
import ConverterTo from "@/components/ConverterTo";
import CurrencySwapButton from "@/components/CurrencySwapButton";
export default {
  components: { CurrencySwapButton, ConverterTo, ConverterFrom },
};
</script>
