<template>
    <div id="app">
        <flash-message class="myCustomClass"></flash-message>
        <router-view/>
        <NavBottom/>
    </div>
</template>

<script>
  import 'es6-promise/auto'
  import NavBottom from './components/global/NavBottom'

  export default {
    name: 'App',
    components: {
      NavBottom
    },

    data () {
      return {}
    },

    methods: {},

    created () {
      this.$store.dispatch('tryAutoLogin')
    },
  }
</script>

<style lang="scss">
    @import '../node_modules/bootstrap/scss/bootstrap.scss';
    @import './assets/custom.scss';
</style>
