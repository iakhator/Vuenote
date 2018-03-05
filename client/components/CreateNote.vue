<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md3 xl4 mr-5>
        <side-bar :handleClick="onClick" />
      </v-flex>
      <v-flex md8 xl8>
        <v-card>
          <v-toolbar color="teal lighten-2" dark>
            <v-toolbar-title> Add Note</v-toolbar-title>
          </v-toolbar>
          <v-text-field
          box
          label="title"
          :rules="titleRules"
          v-model="title"
          color="teal lighten-2"
          persistent-hint
          ></v-text-field>
          <v-text-field 
          box
          multi-line 
          label="Note"
          color="teal lighten-2"
          v-model="note"></v-text-field>
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
            @click="addNote"
            @click.native="snackbar = true"
            color="teal lighten-2" dark
          >
            Add Note
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import SideBar from './SideBar.vue'
export default {
  data () {
    return {
      title: '',
      note: '',
      snackbar: false,
      mode: '',
      message: '',
      y: 'top',
      timeout: 6000,
      error: null,
      valid: false,
      titleRules: [
        v => {
          return !!v || 'Title is required'
        }
      ]
    }
  },
  components: {
    SideBar
  },
  methods: {
    onClick () {
      console.log('sidebar')
    },
    addNote () {
      this.$store.dispatch('addNote', {title: this.title, note: this.note})
        .then(() => {
          this.message = this.$store.getters.getMessage
          this.error = this.$store.getters.getError
          if (this.message) {
            this.$router.push('dashboard')
          }
        })
    }
  }
}
</script>



