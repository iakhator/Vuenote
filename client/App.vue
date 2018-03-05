<template>
  <v-app>
    <div class="navigation-bar">
      <v-toolbar color="teal lighten-2" dark>
        <v-toolbar-title><router-link tag="button" to="/">{{title}}</router-link></v-toolbar-title>
        <v-toolbar-items class="hidden-sm-and-down" mr-2>
           <v-card-text style="height: 100px">
            <v-btn
              v-if="$store.getters.isAuthenticated"
              absolute
              dark
              fab
              right
              :to="{name:'newnote'}"
              class="float-button"
              color="pink"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-if="!$store.getters.isAuthenticated" flat :to="{name:'signup'}">{{signup}}</v-btn>
          <v-btn v-if="!$store.getters.isAuthenticated" flat :to="{name:'signin'}">{{signin}}</v-btn>
          <v-btn v-if="$store.getters.isAuthenticated" flat>{{userDetails.name}}</v-btn>
          <v-btn v-if="$store.getters.isAuthenticated" flat v-on:click="logOut">{{logout}}</v-btn>
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
      signin: 'Sign In',
      logout: 'log Out',
      userDetails: ''
    }
  },
  created: function () {
    if (this.$store.getters.userDetails) this.userDetails = this.$store.getters.userDetails
  },
  updated: function () {
    if (this.$store.getters.userDetails) this.userDetails = this.$store.getters.userDetails
  },
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style scoped>
 button{
   font-size: 40px
 }
 .float-button{
   margin-right: 0.5em;
   margin-top: 3em;
 }
</style>





