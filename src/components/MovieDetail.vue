<template>
  <div class="movie-detail col col-sm-12 row p-5 my-5">
    <p class="loader" v-if="isLoading">{{ textContent.general.loading }}</p>
    <div class="col col-md-4 m-3">
      <h1 class="mb-4 fw-bold">{{ movie.Title }}</h1>
      <img :src="movie.Poster" />
    </div>
    <div class="col col-md-7 m-3">
      <ul>
        <li>
          <span class="fw-bold">{{ textContent.movie.type }}</span
          ><br />{{ movie.Type }}
        </li>
        <li class="mt-4">
          <span class="fw-bold">{{ textContent.movie.year }}</span
          ><br />{{ movie.Year }}
        </li>
        <li class="mt-4">
          <span class="fw-bold">{{ textContent.movie.rated }}</span
          ><br />{{ movie.Rated }}
        </li>
        <ul class="mt-4 p-0" v-html="constructList(movie.Genre, textContent.movie.genre)"></ul>
        <li class="mt-4">
          <span class="fw-bold">{{ textContent.movie.director }}</span
          ><br />{{ movie.Director }}
        </li>
        <ul class="mt-4 p-0" v-html="constructList(movie.Writer, textContent.movie.writer)"></ul>
        <ul class="mt-4 p-0" v-html="constructList(movie.Actors, textContent.movie.actors)"></ul>

        <li class="mt-4" :class="{ compact: movie.Plot.length > 200 && !isOpen }">
          <span class="fw-bold">{{ textContent.movie.plot }}</span
          ><br />
          {{ movie.Plot }}<br />
          <button
            v-if="movie.Plot.length > 200"
            class="btn btn-primary mt-2"
            @click.prevent="showPlot"
          >
            {{ mapPlotButton }}
          </button>
        </li>
        <li class="mt-4">
          <span class="fw-bold">{{ textContent.movie.awards }}</span
          ><br />{{ movie.Awards }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MovieDetail',
  props: {
    movieId: String
  },
  inject: ['key', 'textContent'],
  data() {
    return {
      movie: {},
      isOpen: false,
      isLoading: false
    }
  },
  mounted() {
    this.isLoading = true
    axios
      .get(`http://www.omdbapi.com/?i=${this.movieId}&apiKey=${this.key}`)
      .then(response => (this.movie = response.data))
      .finally((this.isLoading = false))
  },
  computed: {
    mapPlotButton() {
      if (!this.isOpen) {
        return this.textContent.general.readMore
      }
      return this.textContent.general.readLess
    }
  },
  methods: {
    constructList(movieValue, title) {
      return (
        '<li><span class="fw-bold">' +
        title +
        '</span><br/>' +
        movieValue.split(',').join('</li><li>') +
        '</li>'
      )
    },
    showPlot() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
