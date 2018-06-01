<template>
    <div class="container" id="createVenue">
        <div class="row">
            <div class="col">
                <form>

                    <h1>{{ $t('CreateVenue.addNew')}}</h1>

                    <div class="form-group row">
                        <label for="inputVName" class="col-sm-2 col-form-label">{{ $t('CreateVenue.name')}}</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="name" id="inputVName"
                                   placeholder="Venue Name">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="venueDescription">{{ $t('CreateVenue.desc')}}</label>
                        <textarea v-model="description" class="form-control" id="venueDescription" rows="3"></textarea>
                    </div>


                    <h6>{{ $t('CreateVenue.locations')}}</h6>

                    <div v-for="address of addresses">
                        <div class="form-group">
                            <input v-model="address.addressOne" type="text" class="form-control" id="inputAddress"
                                   placeholder="Street name">
                        </div>
                        <div class="form-group">
                            <input v-model="address.addressTwo" type="text" class="form-control" id="inputAddress2"
                                   placeholder="Second address line, cross street etc">
                        </div>

                        <div class="form-group">
                            <input v-model="address.addressLocal" type="text" class="form-control" id="inputAddress3"
                                   placeholder="Local language address">
                        </div>
                    </div>


                    <div class="col-auto my-1">
                        <button @click="toggleField($event, true, 'address', 'addresses')" type="button" class="btn btn-primary btn-sm">+</button>
                        <button @click="toggleField($event, false, 'address', 'addresses')" type="button" class="btn btn-secondary btn-sm">-</button>
                    </div>

                    <h6>{{ $t('CreateVenue.catTags')}}</h6>


                    <div class="form-group row">
                        <div class="col-sm-2">Categories</div>
                        <div class="col-sm-10" v-for="tag of tags">
                            <div class="form-check">
                                <input v-model="appliedTags" class="form-check-input" type="checkbox" :value="tag" :id="tag + 'check'">
                                <label class="form-check-label" :for="tag + 'check'">
                                    {{tag}}
                                </label>
                            </div>

                        </div>
                    </div>


                    <h6>{{ $t('CreateVenue.menu')}}</h6>

                    <div class="form-row align-items-center" v-for="mi of menu">
                        <div class="col-sm-2 my-1">
                            <label class="sr-only" for="inlineFormInputName">Name</label>
                            <input v-model="mi.name" type="text" class="form-control" id="inlineFormInputName"
                                   placeholder="Name">
                        </div>

                        <div class="col-sm-4 my-1">
                            <label class="sr-only" for="inlineFormInputDesc">Description</label>
                            <input v-model="mi.desc" type="text" class="form-control" id="inlineFormInputDesc"
                                   placeholder="Description">
                        </div>

                        <div class="col-sm-4 my-1">
                            <label class="sr-only" for="inlineFormInputDescLocal">Local Language Description</label>
                            <input v-model="mi.localLang" type="text" class="form-control" id="inlineFormInputDescLocal"
                                   placeholder="Local Language Description">
                        </div>

                        <div class="col-sm-2 my-1">
                            <label class="sr-only" for="inlineFormInputGroupUsername">Price</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">元</div>
                                </div>
                                <input v-model="mi.price" type="number" class="form-control"
                                       id="inlineFormInputGroupUsername" placeholder="75">
                            </div>
                        </div>
                        <div class="col-auto my-1">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
                                <label class="form-check-label" for="autoSizingCheck2"><i class="fal fa-gem"></i>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-auto my-1">
                        <button @click="toggleField($event, true, 'menuItem', 'menu')" type="button" class="btn btn-primary btn-sm">+</button>
                        <button @click="toggleField($event, false, 'menuItem', 'menu')" type="button" class="btn btn-secondary btn-sm">-</button>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-10">
                            <button @click="submit()" type="submit" class="btn btn-primary">{{ $t('global.submit')}}</button>
                        </div>
                    </div>
                </form>

                <div v-if="success" class="alert alert-primary" role="alert">
                    {{success}}
                </div>

                <div v-if="error" class="alert alert-danger" role="alert">
                    {{error}}
                </div>


            </div>
        </div>
    </div>
</template>

<script>

  export default {
    data () {
      return {
        name: '',
        description: '',
        menuItem: {name: '', price: 'e', localLang: '', desc: '', featured: false},
        menu: [{name: '', price: '', localLang: '', desc: '', featured: false}],
        address: {addressOne: '', addressTwo: '', addressLocal: ''
        },
        addresses: [{addressOne: '', addressTwo: '', addressLocal: '',
        }],
        tags: ['neapolitan', 'american', 'fancy', 'bar', 'delivery', 'romana'],
        appliedTags: [],
        error: false,
        success: false
      }
    },
    methods: {
      toggleField(e, add, item, arr) {
        e.preventDefault()
        if (add) {
          this[arr].push(this[item])
        } else {
          this[arr].pop()
        }
      },

      submit() {
        //todo validate
        this.$store.dispatch('createVenue', this.$data)
          .then(res => {
            this.success = 'Venue Created!'
          })
          .catch(e => {
            this.error = e.message
          })
      }
    }
  }

</script>
