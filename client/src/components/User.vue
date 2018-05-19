<template>
    <div v-if="auth" class="container" id="userpage">

        <h2>Your Reviewed Venues</h2>

        <p v-if="loadingReviews">Loading...</p>

        <p v-if="reviews && reviews.length === 0">You have no pizza experience! Try and review some of the pizza below and your reviews and experience will appear here.</p>

        <ul v-for="r in reviews">
            <li>
                <router-link :to="'/venue/' + r.name">{{r.name}}</router-link>
                <template v-for="tag in r.tags">
                    <span class="badge badge-pill badge-secondary">{{tag}}</span>
                </template>
            </li>
        </ul>


        <h2>Pizza to try</h2>
        <p v-if="loadingNotReviewed">Loading...</p>

        <ul v-for="r in notReviewed">
            <li>
                <router-link :to="'/venue/' + r.name">{{r.name}}</router-link>
                <template v-for="tag in r.tags">
                    <span class="badge badge-pill badge-secondary">{{tag}}</span>
                </template>
            </li>
        </ul>

        <button class="btn-danger" v-if="auth" @click="logout()">Logout</button>
    </div>
    <div v-else class="container">
        <h2>Login to see userpage</h2>

    </div>

</template>

<script>
  //list venues not reviewed
  //list venues reviewed
  //link to create venue if admin
  import axios from 'axios'

  export default {
    name: 'user',

    data () {
      return {
        loadingReviews: true,
        loadingNotReviewed: true,
        reviews: false,
        notReviewed: false,
      }
    },

    computed: {
      auth () {
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
      },

      build (what, venues) {
        this[what] = []
        for (let v of venues) {
          let obj = {}
          obj.name = v.name
          obj.tags = v.appliedTags
          this[what].push(obj)
        }

      },

    },

    async created () {
      axios.get('/venue/reviewed').then(res => {
        this.loadingReviews = false
        this.build('reviews', res.data)
      }).catch(e => {
        console.error('User, /api/venue/reviewed', e)
      })

      axios.get('/venue/notReviewed').then(res => {
        this.loadingNotReviewed = false
        this.build('notReviewed', res.data)

      }).catch(e => {
        console.error('User, /api/venue/notReviewed', e)
      })
    }
  }
</script>

<style scoped>

</style>