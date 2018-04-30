<template>
    <div class="container">
        <div class="row">

            <b-carousel id="carousel1"
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

                <b-carousel-slide caption="Menu item/pizza name"
                                  text="Description of the pizza"
                                  img-src="static/pizza1.jpeg"
                ></b-carousel-slide>

                <b-carousel-slide caption="Diavola"
                                  text="Tomato, mozzarella, spicy salami, black olives"
                                  img-src="static/pizza2.jpeg"
                ></b-carousel-slide>

                <b-carousel-slide caption="Calzone"
                                  text="Half calzone with mozzarella and love"
                                  img-src="static/pizza1.jpeg"
                ></b-carousel-slide>

                <!-- Slide with blank fluid image to maintain slide aspect ratio -->
                <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                    <p>
                        Upload an image of a pizza only. If an image of the pizza you upload already exists, we
                        will feature your image if it's better than the existing picture. Getting an image featured earns you pizza karma.
                    </p>
                </b-carousel-slide>

            </b-carousel>


            <h2>{{venue.name}}</h2>
            <p class="lead">
                <span v-for="tag of venue.appliedTags" class="badge badge-secondary">{{tag}}</span>
                {{venue.description}}
            </p>

            <b-tabs>
                <b-tab v-if="venue.review" title="Review" active>
                    <div class="card ">
                        <div class="card-body">
                            <h5 class="card-title">Overall</h5>
                            <p class="card-text">Short review of this aspect</p>
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                class="fas fa-star"></i><i class="fas fa-star"></i>
                        </div>
                    </div>

                    <div class="card ">
                        <div class="card-body">
                            <h5 class="card-title">Ingredients</h5>
                            <p class="card-text">Short review of this aspect</p>
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                class="fas fa-star"></i><i class="fas fa-star-half"></i>
                        </div>
                    </div>

                    <div class="card ">
                        <div class="card-body">
                            <h5 class="card-title">Dough</h5>
                            <p class="card-text">This part didnt score as well and thats displayed with empty stars</p>
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                class="far fa-star"></i><i class="far fa-star"></i>


                        </div>
                    </div>
                </b-tab>
                <b-tab v-else title="Review" active>
                    <p v-if="auth">Not yet reviewed</p>
                    <p v-else>Signup to review</p>

                </b-tab>

                <b-tab title="Pizza" >
                    <dl class="row" v-for="mi of venue.menu.items">

                            <dt class="col-sm-3">{{mi.name}}<i v-if="mi.featured"></i></dt>
                            <dd class="col-sm-9">{{mi.desc}}</dd>
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
        },
        loading: true,
      }
    },
    computed: {
      auth () {
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      onSlideStart (slide) {
        this.sliding = true
      },
      onSlideEnd (slide) {
        this.sliding = false
      }
    },

    created () {
      globalAxios.get(`venue/${this.$route.params.name}`)
        .then(res => {
          debugger;
          this.loading = false
          this.venue = res.data
          this.venue.review = false

        })
        .catch(e => {

        })
    }
  }
</script>

<style scoped>

</style>