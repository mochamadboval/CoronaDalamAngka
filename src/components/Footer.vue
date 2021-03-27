<template>
  <div class="container mt-5 mb-3 pt-5 text-center">
    <hr />
    <small>
      Sumber Data dari
      <strong>
        <a href="https://covid19.go.id/" rel="noreferrer" target="_blank">
          Satgas Penanganan COVID-19
        </a>
      </strong>
      melalui
      <strong>
        <a
          href="https://github.com/Reynadi531/api-covid19-indonesia-v2"
          rel="noreferrer"
          target="_blank"
        >
          Reynadi531 API
        </a>
      </strong>
      <br />
      Sumber Kode di
      <strong>
        <a
          href="https://github.com/mochamadboval/CoronaDalamAngka"
          rel="noreferrer"
          target="_blank"
        >
          <fa-icon :icon="['fab', 'github']" /> Github
        </a>
      </strong>
    </small>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
small a {
  color: #f8f9fa;
  text-decoration: none;
}
small a:hover {
  color: #f8f9fa;
  text-decoration: underline dotted;
}
</style>
