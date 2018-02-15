<template>
   <v-container>
     <v-layout row wrap>
        <v-flex xs12 md6 xl8 offset-md3 offset-xl2>
          <h1>Signup</h1>
          <v-form v-model="valid">
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              color="teal lighten-2"
              required
            > </v-text-field>
            <v-text-field
              label="Name"
              v-model="name"
              :rules="nameRules"
              color="teal lighten-2"
              required
            > </v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              :rules="passwordRules"
              type="password"
              color="teal lighten-2"
              :counter="4"
              required
            ></v-text-field>
            <div v-if="error">
              <v-snackbar
                :timeout="timeout"
                :top="y === 'top'"
                :multi-line="mode === 'multi-line'"
                :vertical="mode === 'vertical'"
                v-model="snackbar"
              >
                {{ error }}
                <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
              </v-snackbar>
            </div>
            <div v-if="message">
              <v-snackbar
                :timeout="timeout"
                :top="y === 'top'"
                :multi-line="mode === 'multi-line'"
                :vertical="mode === 'vertical'"
                v-model="snackbar"
              >
                {{ message }}
                <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
              </v-snackbar>
            </div>
            <v-btn
              @click="signUp"
              @click.native="snackbar = true"
              color="teal lighten-2" dark
              :disabled="!valid"
            >
              sign up
            </v-btn>
          </v-form>
        </v-flex>
     </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      snackbar: false,
      mode: '',
      y: 'top',
      timeout: 6000,
      message: null,
      error: null,
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length > 4 || 'Name must be greater than 4 characters'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length > 4 || 'Password must be greater than 4 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    signUp () {
      this.$store.dispatch('signUp', {name: this.name, email: this.email, password: this.password})
        .then(() => {
          this.$router.push('dashboard')
        })
        .catch((error) => {
          this.error = error.response.data.error
        })
    }
  }
}
</script>
<style scoped>
h1{
  font-family: 'Nanum Pen Script', cursive;
  margin-top: 40px;
  font-size: 35px;
}
label{
  font-family: 'Nanum Pen Script', cursive;
}

</style>



