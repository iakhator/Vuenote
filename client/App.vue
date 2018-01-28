<template>
    <v-app>
     <v-toolbar color="teal lighten-2" dark>
        <v-toolbar-title><router-link tag="button" to="/">Vue Todo</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat :to="{name:'signup'}">Sign Up</v-btn>
          <v-btn flat :to="{name:'signin'}">Sign In</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-app>
</template>
<script>
export default {}
</script>




