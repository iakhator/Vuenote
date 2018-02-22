<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md3 xl4 mr-5>
        <side-bar :handleClick="onClick" />
      </v-flex>
      <v-flex md8 xl8>
        <v-card>
        <v-toolbar color="teal lighten-2" dark>
          <v-toolbar-title> All Notes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile avatar v-else :key="item.title" @click="onClick">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import SideBar from './SideBar.vue'
export default {
  components: {
    SideBar
  },
  data () {
    return {
      items: [
        { header: 'Today' },
        { title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { divider: true, inset: true },
        { title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
        { divider: true, inset: true },
        { title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" }
      ]
    }
  },
  methods: {
    onClick () {
      console.log('sidebar')
    }
  }
}
</script>


