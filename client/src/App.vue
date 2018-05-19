<template>
    <div id="app">
        <NavTop/>
        <flash-message class="myCustomClass"></flash-message>
        <router-view/>
        <NavBottom/>
    </div>
</template>

<script>
  import 'es6-promise/auto'
  import NavTop from './components/global/NavTop'
  import NavBottom from './components/global/NavBottom'

  export default {
    name: 'App',
    components: {
      NavTop,
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
