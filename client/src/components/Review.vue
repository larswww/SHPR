<template>

    <div v-if="auth" class="container">

        <PhotoUpload :venueName="venue.name"></PhotoUpload>

        <b-form @submit="onSubmit">
            <h1 v-if="edit">{{$t('Review.review')}} {{venue.name}}</h1>
            <h1 v-else>{{$(t('Review.edit'))}} {{venue.name}} {{$t('Review.review')}}</h1>

            <b-form-select v-model="selectedPizza" :options="pizzaChoice" class="mb-3" size="sm"/>


            <div class="form-row" v-for="aspect of reviewAspects">
                <h6>{{aspect.name}}</h6>
                <b-form-input v-model="aspect.heading" type="text"
                              placeholder="If you could only say one thing"></b-form-input>
                <b-form-textarea v-model="aspect.text" :rows="3" placeholder="Max 140 chars"></b-form-textarea>

                <star-rating v-model="aspect.rating"></star-rating>

            </div>


            <b-button type="submit" variant="primary">{{$t('global.submit')}} {{$t('Review.review')}}</b-button>
        </b-form>

    </div>



    <div v-else class="container">

        <p>{{$t('Review.noAuth')}}</p>
    </div>


</template>

<script>
  import StarRating from 'vue-star-rating'
  import PhotoUpload from './global/PhotoUpload'

  export default {
    name: 'review',
    components: {
      PhotoUpload,
      StarRating
    },
    data () {
      return {
        edit: false,
        pizzaChoice: [],
        selectedPizza: null,
        venue: {
          menu: {
            items: []
          }
        },
        reviewAspects: []

      }
    },
    computed: {
      auth () { //todo this should be a mixin?
        return this.$store.getters.isAuthenticated

      }
    },

    methods: {
      buildPizzaSelect () {
        const menuItems = this.venue.menu
        this.pizzaChoice.push({value: null, text: 'Select the pizza you had'})
        for (let item of menuItems) {
          this.pizzaChoice.push({value: item.name, text: item.name})
        }
      },

      buildReviewAspects () {
        const ratingAspects = ['Overall Review', 'Topping Quality', 'Dough']
        const {heading, text, rating} = ''
        for (let ra of ratingAspects) this.reviewAspects.push({name: ra, heading, text, rating})
      },

      onSubmit (e) {
        e.preventDefault()
        const review = {name: this.venue.name, selectedPizza: this.selectedPizza, reviewAspects: this.reviewAspects}

        this.$store.dispatch('review', review)
          .then(res => {
            debugger
            this.reviewAspects = res.aspects
            this.selectedPizza = res.selectedPizza
            this.flash('Review Saved! Edit below', 'success')

            console.log('review saved')
          })
          .catch(e => {
            console.error(e.message)
          })
      }
    },

    async created () {
      this.buildReviewAspects()

      const nameParam = this.$route.params.name
      if (!this.$store.getters.venue[nameParam]) await this.$store.dispatch('fetchVenue', nameParam)
      this.loading = false
      this.venue = this.$store.getters.venue[nameParam]
      this.buildPizzaSelect()
      if (!this.$store.getters.review[nameParam]) await this.$store.dispatch('fetchReviews')

      const userReview = this.$store.getters.review[nameParam]
      if (userReview) {
        this.reviewAspects = userReview.aspects
        this.selectedPizza = userReview.selectedPizza
        this.edit = true

      }

    }
  }
</script>

<style scoped>

</style>