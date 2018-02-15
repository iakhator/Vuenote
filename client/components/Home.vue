<template>
  <div class="bg">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md6 xl8 offset-md3>
          <i class="material-icons">{{icon}}</i>
          <v-card-text><h1>{{message}}</h1></v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        message: 'Pen it down to remember',
        icon: 'assessment'
      }
    }
  }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nanum+Pen+Script');
  v-layout {
    background: #ffffff;
  }

  .bg{
    background:linear-gradient(
      rgba(178, 223, 219, 0.2), 
      rgba(178, 223, 219, 0.7)
    ),url("../assets/images/books.jpg") no-repeat center fixed;
    height: 91vh;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font-family: 'Nanum Pen Script', cursive;
  }

  .bg h1{
    font-size: 40px
  }

  .material-icons{
    font-size: 150px;
    margin-top: 70px;
  }
</style>

