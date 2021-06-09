<template>
  <div class="col-12 col-lg-6 d-flex justify-content-center py-2">
    <div class="form-outline">
      <input type="text" placeholder="Search" :value="search" @input="update" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Search",
  computed: {
    ...mapGetters({ search: "getSearch" }),
  },
  methods: {
    ...mapActions(["updateSearch"]),
    update(e) {
      this.updateSearch(e.target.value);
    },
  },
};
</script>

<style scoped></style>
