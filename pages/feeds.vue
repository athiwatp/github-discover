<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        Feeds
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'auth',
  mounted () {
    this.getFeeds()
  },
  methods: {
    getFeeds () {
      axios.get('https://api.github.com/users/muhibbudins/gists').then((data) => {
        console.log(data)
      })
    }
  }
}
</script>
