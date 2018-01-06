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
              label="Username"
              v-model="username"
              :rules="usernameRules"
              :counter="10"
              required
            ></v-text-field>
            <v-text-field
              name="input-10-1"
              label="Password"
              hint="At least 6 characters"
              v-model="password"
              :rules="passwordRules"
              min="8"
              :append-icon="visible ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (visible = !visible)"
              :type="visible ? 'password' : 'text'"
              :counter="10"
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
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      visible: false,
      username: '',
      usernameRules: [
        (v) => (!!v) || 'Username is required',
        (v) => (v && v.length <= 4) || 'Username must be less than 4 characters'
      ],
      password: '',
      passwordRules: [
        (v) => (!!v) || 'Passowrd is required',
        (v) => (v && v.length <= 6) || 'Passowrd must be less than 6 characters'
      ],
      formError: null
    }
  },
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.username = ''
          this.password = ''
          this.formError = null
          this.$router.replace({ path: '/feeds' })
        }).catch((e) => {
          this.formError = e.message
        })
      }
    },
    clear () {
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