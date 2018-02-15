<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md3 xl4>
        <side-bar></side-bar>
      </v-flex>
      <v-flex md9 xl8>
        <h1>Dashboard</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import SideBar from './SideBar.vue'
export default {
  components: {
    SideBar
  }
}
</script>


