<template>
    <nav class="navbar fixed-top navbar-light bg-light">
        <a @click="$router.go(-1)"><i class="fas fa-angle-left"></i></a>


        <b-dropdown variant="link" size="lg" no-caret>
            <template slot="button-content">
                <i class="fas fa-language"></i>
            </template>
            <b-dropdown-item @click="setLang('en')">English</b-dropdown-item>
            <b-dropdown-item @click="setLang(languages[city].key)">{{languages[city].name}}</b-dropdown-item>
        </b-dropdown>

    </nav>
</template>

<script>
  export default {
    name: 'NavTop',
    data () {
      return {
        languages: {
          shanghai: {name: '中文', key: 'cn'},
          chiangmai: {name: 'Thai', key: 'th'}
        },
        city: 'shanghai'
      }

    },

    methods: {
      setLang: function (lang) {
        console.log(lang)
        this.$store.dispatch('setLang', lang)
      }
    },

    created () {
      if (window.location.hostname.indexOf('.')) this.city = window.location.hostname.split('.')[0]

      // if user has language set to a lang not available for this city reset it to english
      const currentLang = localStorage.getItem('language')
      if (currentLang && currentLang !== 'en') {
        if (this.languages[this.city].key !== currentLang) localStorage.setItem('language', 'en')
      }
    }
  }
</script>

<style scoped>

</style>