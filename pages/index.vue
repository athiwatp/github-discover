<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-form v-model="valid" ref="form" @submit.prevent="login" lazy-validation>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Welcome Back!</h3>
              <div>Discover your social activity on Github.</div>
            </div>
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Github Username"
              v-model="username"
              :rules="usernameRules"
              required
            ></v-text-field>
            <v-btn
              flat
              color="blue"
              @click="login"
              :disabled="!valid"
            >
              Sign In
            </v-btn>
            <v-btn
              flat
              @click="clear"
            >
              Clear
            </v-btn>
          </v-card-text>
        </v-card>
        <v-alert v-if="formError" color="error" icon="warning" value="true">
          {{ formError }}
        </v-alert>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      invisible: true,
      username: '',
      usernameRules: [
        (v) => (!!v) || 'Github Username',
        (v) => (v && v.length >= 3) || 'Username must be more than 3 characters'
      ],
      formError: null
    }
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('login', {
          username: this.username
        }).then(() => {
          this.$router.replace({ path: '/feeds' })
        }).catch((e) => {
          console.log(e.message)
          this.formError = e.message
        })
      }
    },
    clear () {
      this.formError = null
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
.container {
  padding: 100px;
}
.error {
  color: red;
}
</style>