<template>
    <div class="container" id="venue">
        <div class="row">

            <b-carousel v-if="venue.photos.length" id="carousel1"
                        style="text-shadow: 1px 1px 2px #333;"
                        controls
                        indicators
                        background="#ababab"
                        :interval="4000"
                        img-width="1024"
                        img-height="480"
                        v-model="slide"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
            >

                <template v-for="photo in venue.photos">
                    <b-carousel-slide
                            :img-src="`${baseurl}${photo}`"
                    ></b-carousel-slide>
                </template>


            </b-carousel>

        </div>

        <div class="row">


            <h2>{{venue.name}}</h2>
            <p class="lead">
                <span v-for="tag of venue.appliedTags" class="badge badge-secondary">{{tag}}</span>
                {{venue.description}}
            </p>

        </div>

        <div class="row">
            <button v-if="userReviewed" class="btn-primary btn-link">
                <router-link :to="'/venue/' + venue.name + '/review'">{{$t('Venue.editReview')}}</router-link>
            </button>
            <button v-else class="btn-primary btn-link">
                <router-link :to="'/venue/' + venue.name + '/review'">{{$t('Venue.writeReview')}}</router-link>
            </button>

        </div>

        <div class="row">

            <b-tabs>
                <b-tab v-if="review" title="Review" active>

                    <template v-for="aspect of review.aspects">
                        <div class="card ">
                            <div class="card-body">
                                <h5 class="card-title">{{aspect.name}}: {{aspect.heading}}</h5>
                                <p class="card-text">{{aspect.text}}</p>
                                <template v-for="stars of aspect.rating">
                                    <i class="fas fa-star"></i>
                                </template>
                            </div>
                        </div>
                    </template>

                </b-tab>
                <b-tab v-else title="Review" active>
                    <p v-if="auth">{{$t('Venue.notYetReviewed')}}</p>
                    <p v-else>{{$t('Venue.singupTo')}}</p>

                </b-tab>

                <b-tab title="Pizza">
                    <dl class="row" v-for="mi of venue.menu">

                        <dt class="col-sm-2">{{mi.name}}<i v-if="mi.featured"></i></dt>
                        <dd class="col-sm-8">{{mi.desc}}</dd>
                        <dd class="col-sm-2">{{mi.price}}</dd>
                        <i v-if="mi.featured" class="far fa-gem"></i>
                    </dl>
                </b-tab>
                <b-tab title="Info">


                    <address v-for="address of venue.addresses">
                        <strong>{{address.addressOne}}</strong><br>
                        {{address.addressTwo}}<br>
                        {{address.addressLocal}}<br>
                        <abbr title="Phone">P:</abbr> 021 6248 8985
                    </address>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
  import globalAxios from 'axios'

  export default {
    name: 'venue',
    data () {
      return {
        slide: 0,
        sliding: null,
        venue: {
          name: '',
          addresses: [],
          tags: [],
          menu: [],
          photos: [],
        },
        loading: true,
        review: false,
        userReviewed: false,
        baseurl: `${process.env.base_url}/uploads/`,

      }
    },
    computed: {
      auth () {
        return this.$store.getters.isAuthenticated
      },
    },
    methods: {
      onSlideStart (slide) {
        this.sliding = true
      },
      onSlideEnd (slide) {
        this.sliding = false
      }
    },

    async created () {

      const nameParam = this.$route.params.name.toLowerCase()

      this.userReviewed = this.$store.getters.review[nameParam]

      let masterReview = this.$store.getters.masters[nameParam]
      if (!masterReview && !this.$store.getters.masters) { //check if master reviews are in state, if not get them
        await this.$store.dispatch('getMasters')
        masterReview = this.$store.getters.masters[nameParam]
      }

      //todo fix when how to store the master reviews is decided
      if (masterReview) {
        this.review = masterReview.review
      } else {
        this.review = masterReview

      }

      if (!this.$store.getters.venue[nameParam]) await this.$store.dispatch('fetchVenue', nameParam)
      this.loading = false
      this.venue = this.$store.getters.venue[nameParam]
    }

  }
</script>

<style scoped>

</style>