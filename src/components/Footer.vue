<template>
  <div class="container mt-5 mb-3 pt-5 text-center">
    <hr />
    <small>
      <fa-icon icon="code" /> menggunakan <fa-icon :icon="['fab', 'html5']" />
      <fa-icon :icon="['fab', 'css3-alt']" />
      <fa-icon :icon="['fab', 'js-square']" />
      <fa-icon :icon="['fab', 'bootstrap']" />
      <fa-icon :icon="['fab', 'vuejs']" />
      <fa-icon :icon="['fab', 'font-awesome']" /> oleh
      <strong
        ><a href="https://boval.my.id/" rel="noreferrer" target="_blank"
          >Mochamad Boval</a
        ></strong
      >
      <br />
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
          href="https://github.com/mochamadboval?tab=repositories"
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
