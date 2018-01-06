<template>
  <v-app>
    <v-navigation-drawer
      v-if="$store.state.authUser"
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile 
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar v-if="$store.state.authUser" fixed app :clipped-left="clipped" dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="logout">Sign Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'dashboard', title: 'Feeds', to: '/feeds' },
          { icon: 'dns', title: 'Projects', to: '/projects' },
          { icon: 'supervisor_account', title: 'Followers', to: '/followers' },
          { icon: 'subject', title: 'Gists', to: '/gists' },
          { icon: 'turned_in', title: 'Issues', to: '/issues' },
          { icon: 'settings', title: 'Settings', to: '/settings' }
        ],
        miniVariant: false,
        title: 'Github Discover'
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout').then(
          () => this.$router.replace({ path: '/' })
        )
      }
    }
  }
</script>
