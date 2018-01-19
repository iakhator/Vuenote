<template>
  <h1>{{message.message}}</h1>
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
<style>
</style>

