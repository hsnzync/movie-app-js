<template>
  <div id="app">
    <NavigationBar @searched="searchMovies" @value="searchedValue" @plot="searchedPlot" />
    <div class="container my-5">
      <router-view :movies="movies" :is-loading="isLoading"></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { NavigationBar } from './components'
import { textContent } from './assets/data/textContent'

export default {
  name: 'App',
  components: { NavigationBar },
  data() {
    return {
      name: process.env.VUE_APP_TITLE,
      key: process.env.VUE_APP_API_KEY,
      movies: [],
      search: '',
      plot: '',
      isLoading: false,
      preview: ['interstellar', 'batman', 'spiderman', 'avengers', 'dragon ball'],
      textContent: textContent
    }
  },
  provide() {
    return {
      name: this.name,
      key: this.key,
      textContent: this.textContent
    }
  },
  watch: {
    search() {
      if (this.search == '') {
        this.searchMovies(this.preview[this.featuredMovie], 2)
      }
    }
  },
  mounted() {
    this.searchMovies(this.preview[this.featuredMovie], 2)
  },
  computed: {
    featuredMovie() {
      return Math.floor(Math.random() * this.preview.length)
    }
  },
  methods: {
    searchMovies(movie, amount) {
      this.isLoading = true
      axios
        .get(`http://www.omdbapi.com/?s=${this.search || movie}&apiKey=${this.key}`)
        .then(
          response => (this.movies = response.data.Search.slice(0, amount || 5))
          //.filter(movie => {
          // if (this.plot == 'short') {
          //   return movie.Plot.length < 200
          // }
          // return movie
          // }
        )
        .finally((this.isLoading = false))
    },
    searchedValue(value) {
      this.search = value
    },
    searchedPlot(value) {
      this.plot = value
    }
  }
}
</script>
