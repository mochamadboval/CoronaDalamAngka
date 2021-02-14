<template>
  <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark shadow">
    <div class="container">
      <a class="navbar-brand" href="#"><fa-icon icon="virus" /> Corona Dalam Angka</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#Menu" aria-label="Menu Navigasi">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="Menu">
        <div class="navbar-nav">
          <a class="nav-link" href="#Indonesia"><fa-icon icon="globe-asia" /> Indonesia</a>
          <a class="nav-link" href="#Provinsi"><fa-icon icon="map-marker-alt" /> Provinsi</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderNav',
  props: {
    msg: String
  }
}
</script>
