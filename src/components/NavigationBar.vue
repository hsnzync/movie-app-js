<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">{{ name }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse show" id="navbarColor01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">{{
              textContent.navigation.home
            }}</router-link>
          </li>
        </ul>
        <div class="form-check form-check-inline" v-if="currentRouteName != 'detail'">
          <input
            class="form-check-input"
            type="radio"
            id="inlineRadio1"
            value="short"
            v-model="plot"
          />
          <label class="form-check-label" for="inlineRadio1">{{
            textContent.navigation.shortPlot
          }}</label>
        </div>
        <div class="form-check form-check-inline" v-if="currentRouteName != 'detail'">
          <input
            class="form-check-input"
            type="radio"
            id="inlineRadio2"
            value="full"
            v-model="plot"
          />
          <label class="form-check-label" for="inlineRadio2">{{
            textContent.navigation.fullPlot
          }}</label>
        </div>
        <div class="d-flex" v-if="currentRouteName != 'detail'">
          <input
            class="form-control me-2"
            type="search"
            v-model="search"
            @keydown="searchMovies"
            placeholder="Search for a movie"
            aria-label="Search"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  inject: ['name', 'textContent'],
  data() {
    return {
      search: '',
      plot: ''
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    searchMovies() {
      this.$emit('searched')
      this.$emit('value', this.search)
      this.$emit('plot', this.plot)
    }
  }
}
</script>
