<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2 
        v-for="card in listFeed"
        :key="card.key"
      >
        <v-card>
          <v-card-title>
            <h3 class="headline mb-0">{{ card.title }}</h3>
          </v-card-title>
          <v-card-text>
            <div>
              <i>{{ card.date }}</i>
              <p>{{ card.description }}</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn :href=card.url target="_blank" flat color="primary">Open Gist</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'auth',
  data () {
    return {
      listFeed: []
    }
  },
  mounted () {
    this.getFeeds()
    console.log(this.listFeed)
  },
  methods: {
    getFeeds () {
      const user = this.$store.state.authUser

      // Get List Followers (Note : response just 30 follower)
      axios.get(user.followers_url).then(result => {
        result.data.map(item => {
          // Get followers gists
          axios.get(item.gists_url).then((res) => {
            res.data.map(item => {
              this.listFeed.push({
                avatar: item.avatar_url,
                author: item.login,
                title: `Gist ${Object.keys(item.files)}`,
                description: item.description,
                date: item.created_at,
                url: item.html_url
              })
            })
          })
        })
      })
    }
  }
}
</script>
