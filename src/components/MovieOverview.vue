<template>
  <div class="overview">
    <div class="row justify-content-sm-center">
      <div class="col col-lg-3 movie p-4 m-4" v-for="movie in movies" :key="movie.index">
        <router-link :to="{ name: 'detail', params: { movieId: movie.imdbID } }">
          <img class="mb-4" :src="movie.Poster" />
          <h4 class="fw-bold">{{ movie.Title }}</h4>
          <p>{{ movie.Year }}</p>
          <span class="badge rounded-pill bg-primary float-end">{{ movie.Type }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieOverview',
  props: {
    movies: Array,
    isLoading: Boolean
  },
  data() {
    return {
      plot: ''
    }
  }
}
</script>
