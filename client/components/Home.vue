<template>
<div>
  <v-layout row wrap>
    <v-flex xs8 md8 xl8>
      <v-card><img src="../assets/images/books1.jpg" alt=""></v-card>
    </v-flex>
    <v-flex xs4 md4 xl4>
      <v-card-text><h1>{{message.message}}</h1></v-card-text>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        message: ''
      }
    },
    async created () {
      try {
        const response = await axios.get(`/home`)
        this.message = response.data
      } catch (error) {
        this.errors.push(error)
      }
    }
  }
</script>
<style scoped>
  img {
    width: 100%;
    height: 86vh;
  }
</style>

