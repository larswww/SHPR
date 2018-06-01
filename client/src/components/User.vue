<template>
    <div v-if="auth" class="container" id="userpage">

        <h2>{{ $t('User.yourReviewed') }}</h2>

        <p v-if="loadingReviews">{{$t('global.loading')}}...</p>

        <p v-if="reviews && reviews.length === 0">{{$t('User.noExp')}}</p>

        <ul>
            <li v-for="r in reviews">
                <router-link :to="'/venue/' + r.name">{{r.name}}</router-link>
                <template v-for="tag in r.tags">
                    <span class="badge badge-pill badge-secondary">{{tag}}</span>
                </template>
            </li>
        </ul>


        <h2>{{$t('User.toTry')}}</h2>
        <p v-if="loadingNotReviewed">{{$t('global.loading')}}...</p>

        <ul>
            <li v-for="r in notReviewed">
                <router-link :to="'/venue/' + r.name">{{r.name}}</router-link>
                <template v-for="tag in r.tags">
                    <span class="badge badge-pill badge-secondary">{{tag}}</span>
                </template>
            </li>
        </ul>

        <button class="btn-danger" v-if="auth" @click="logout()">{{$t('global.logout')}}</button>

        <div v-if="isAdmin">
            <h2>Admin</h2>
            <router-link :to="'/createVenue/'">Create New Venue</router-link>

        </div>


    </div>
    <div v-else class="container">
        <h2>{{$t('User.loginTo')}}</h2>

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
      },

      isAdmin () {
        return this.$store.getters.isAdmin
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