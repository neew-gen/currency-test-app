<template>
  <nav class="navbar navbar-light bg-light">
    <ul class="navbar-nav d-flex flex-row justify-content-center flex-fill">
      <li class="nav-item px-4">
        <router-link to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/converter">Converter</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
};
</script>

<style scoped></style>
