<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md3 xl3>
      </v-flex>
      <v-flex md8 xl8>
        <v-card class="mr-5" v-if="note.length > 0">
          <v-card-title>
            <h1 class="title">{{note[0].title | capitalize}}</h1>
          </v-card-title>
          <v-card-text>
            <p>{{note[0].note}}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md1 xl1 mt-5>
        <p @click="onEdit(note[0]._id)"><v-icon class="edit-mode edit">mode_edit</v-icon></p>
        <p><v-icon class="edit-mode delete">delete</v-icon></p>
        <p><v-icon flat icon color="green lighten-2" class="edit-mode up">thumb_up</v-icon></p>
        <p><v-icon flat color="grey lighten-1" class="edit-mode favourite">star_border</v-icon></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      note: [],
      error: ''
    }
  },
  props: ['id'],
  created: function () {
    axios.get(`/singlenote/${this.$route.params.id}`)
      .then(response => {
        this.note = response.data.note
      })
      .catch(error => {
        this.error = error.response.data.error
      })
  },
  methods: {
    onEdit (id) {
      this.$router.push(`/edit/${id}`)
    }
  }
}
</script>

<style scoped>
.edit-mode {
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 3px 3px 2px #e1e1e1;
}
.delete {
  color: #FC5356;
  padding: 5px;
  border-radius: 50%;
}
.edit{
  color: #2C98F0;
  padding: 5px;
  border-radius: 50%;
}
.up {
  color: #FC5356;
  padding: 5px;
  border-radius: 50%;
}
.favourite {
  padding: 5px;
  border-radius: 50%;
}
.title{
  text-decoration: underline;
  font-weight: bold;
}
</style>


