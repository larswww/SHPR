<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="btn-toolbar my-3" role="toolbar" aria-label="Toolbar with button groups">
                    <button type="button" class="btn btn-light btn-sm">American</button>
                    <button type="button" class="btn btn-light btn-sm">Romana</button>
                    <button type="button" class="btn btn-light btn-sm">Neapolitan</button>
                    <button type="button" class="btn btn-light btn-sm">Delivery</button>
                    <button type="button" class="btn btn-light btn-sm">Value</button>
                    <button type="button" class="btn btn-light btn-sm">Fancy</button>
                    <button type="button" class="btn btn-light btn-sm">Bar</button>

                </div>


                <table class="table table-striped main-list">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">🍕</th>
                        <th scope="col">{{ $t('Home.listHeading')}}</th>
                        <th scope="col"><button class="btn btn-secondary btn-sm dropdown-toggle my-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fal fa-star"></i>

                        </button>
                            <div class="dropdown-menu">
                                ...
                            </div></th>
                    </tr>
                    </thead>
                    <tbody v-if="masters">
                    <tr  v-for="(venue, key, i) of masters">
                        <th scope="row">{{i + 1}}</th>
                        <td><router-link :to="'/venue/' + venue.name">{{venue.name}}</router-link>

                            <template v-for="tag in venue.appliedTags">
                                <span class="badge badge-pill badge-secondary">{{tag}}</span>
                            </template>
                        </td>
                        <td>{{venue.review.aspects[0].rating}}</td>
                    </tr>
                    </tbody>
                </table>

            </div>

        </div>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        masters: null,

      }
    },
    methods: {
    },

    async created() {
      await this.$store.dispatch('getMasters')
      this.masters = this.$store.getters.masters
    }
  }
</script>