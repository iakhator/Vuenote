<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md3 xl4 mr-5>
        <side-bar :handleClick="onClick" />
      </v-flex>
      <v-flex  v-if="getNotes" md8 xl8>
        <v-card>
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
          <v-toolbar color="teal lighten-2" dark>
            <v-toolbar-title> All Notes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <template v-for="(item, index) in getNotes">
              <router-link :to="{name: 'note', params: { id: item._id }}" tag="li" :key="index">
                <v-list-tile avatar ripple>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">{{ item.note }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.createdAt | date }}</v-list-tile-action-text>
                    <v-icon color="grey lighten-1">star_border</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </router-link>
              <v-divider v-if="index + 1 < getNotes.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex v-else  md8 xl8>
        <h4 class="text-xs-center mt-5">No Notes Available</h4>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SideBar from './SideBar.vue'
export default {
  data () {
    return {
      snackbar: false,
      mode: '',
      message: '',
      y: 'top',
      timeout: 6000
    }
  },
  components: {
    SideBar
  },
  computed: {
    getNotes () {
      return this.$store.getters.getNotes
    },
    getMessage () {
      this.message = this.$store.getters.getMessage
    }
  },
  created: function () {
    this.$store.dispatch('getNotes').then(() => {
      return this.$store.getters.getNotes
    })
  },
  methods: {
    onClick () {
      console.log('sidebar')
    }
  }
}
</script>

<style scoped>
h4{
  font-size: larger;
}
</style>



