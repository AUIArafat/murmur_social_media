<template>
  <nav class="navbar is-light">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">Murmur App</nuxt-link>
        <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable" v-if="this.$store.state.auth.user!==null">
            <!-- <div class="navbar-item has-dropdown is-hoverable"> -->
            <a class="navbar-link">
              {{user.name}}
            </a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/">Timeline</nuxt-link>
              <hr class="navbar-divider"/>
              <nuxt-link class="navbar-item" to="/userdetails/me">My Profile</nuxt-link>
              <nuxt-link class="navbar-item" to="/users" @click="checkMe">Users</nuxt-link>
              <hr class="navbar-divider"/>
              <a class="navbar-item" @click="logOut">Logout</a>
            </div>
          </div>
          <template v-else>
            <!-- <template> -->
            <nuxt-link class="navbar-item" to="/register">Register</nuxt-link>
            <nuxt-link class="navbar-item" to="/login">Log In</nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  computed: {
    user () { return this.$store.state.auth ? this.$store.state.auth.user : null }
  },
  methods: {
    checkMe () {
      this.$store.dispatch('auth/fetch').then(result => {
        console.log('Check Me Result:', result.data.message)
      })
    },
    logOut () {
      this.$store.dispatch('auth/reset').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>