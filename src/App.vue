<template>
  <b-container>
    <NavBar></NavBar>
      <router-view/>
  </b-container>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar}
}
</script>