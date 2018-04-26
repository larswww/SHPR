<template>
    <div class="container">
        <div class="row">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>

                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="static/pizz1.jpeg" alt="First slide">
                        <div class="carousel-caption d-md-block">
                            <h5>Menu Item Name</h5>
                            <p>Half calzone with mozzarella and love</p>
                        </div>
                    </div>

                    <div class="carousel-item">
                        <img class="d-block w-100" src="data/pizza2.jpeg" alt="Second slide">
                        <div class="carousel-caption d-md-block">
                            <h5>Diavola</h5>
                            <p>Tomato, mozzarella, spicy salami, black olives</p>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            <h2>{{name}}</h2>
            <p class="lead">
                <span v-for="tag of tags" class="badge badge-secondary">{{tag}}</span>
                {{description}}
            </p>

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                       aria-controls="review" aria-selected="true">Review</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                       aria-controls="pizza" aria-selected="false">Pizza</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab"
                       aria-controls="info" aria-selected="false">Info</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="review-tab">

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

                </div>

                <!--Pizza menu section-->
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="pizza-tab">

                    <dl class="row" v-for="mi of menu">

                        <div v-for="mi of menu">
                            <dt class="col-sm-3">{{mi.name}}<i v-if="mi.featured"></i></dt>
                            <dd class="col-sm-9">{{mi.desc}}</dd>
                        </div>
                    </dl>

                </div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="info-tab">

                    <address v-for="address of addresses">
                        <strong>{{address.addressOne}}</strong><br>
                        {{address.addressTwo}}<br>
                        {{address.addressLocal}}<br>
                        <abbr title="Phone">P:</abbr> 021 6248 8985
                    </address>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
  import globalAxios from 'axios'
  export default {
    name: 'venue',
    data () {
      return {
        venue: {
          name: '',
          addresses: [],
          tags: [],
          menu: [],
        },
        loading: true,
      }
    },
    methods: {},
    created () {

      globalAxios.get(`venue/${this.$route.params.name}`)
        .then(res => {
          this.loading = false
          this.venue = res
        })
        .catch(e => {

        })
    }
  }
</script>

<style scoped>

</style>