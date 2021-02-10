<template>
  <div id="app">
    <HeaderNav />
    <Jumbotron />
    <div class="container mt-5 pt-5">
      <h2 class="text-center">Data Kasus COVID-19 Terbaru</h2>
    </div>
    <Indonesia />
    <Province />
    <Footer />
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'
import Jumbotron from './components/Jumbotron.vue'
import Indonesia from './components/Indonesia.vue'
import Province from './components/Province.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    HeaderNav,
    Jumbotron,
    Indonesia,
    Province,
    Footer
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap');

html {
  scroll-padding-top: 5rem;
}
body {
  font-family: 'Sen', sans-serif !important;
}
select {
  cursor: pointer;
}
</style>
