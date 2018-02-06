<template>
  <v-app>
    <div class="navigation-bar">
      <v-toolbar color="teal lighten-2" dark>
      <v-toolbar-title><router-link tag="button" to="/">{{title}}</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="{name:'signup'}">{{signup}}</v-btn>
        <v-btn flat :to="{name:'signin'}">{{signin}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </div>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      title: 'Pen it',
      signup: 'Sign Up',
      signin: 'Sign In'
    }
  }
}
</script>

<style scoped>
 button{
   font-size: 40px
 }
</style>





