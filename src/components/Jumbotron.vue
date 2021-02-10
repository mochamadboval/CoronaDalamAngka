<template>
  <div class="container mt-5 pt-5">
    <h1 class="display-1"><span class="text-danger">Pandemi</span> belum berakhir!</h1>
    <p class="lead">
      Setahun sudah pandemi COVID-19 melanda dunia. Namun, perjuangan belumlah usai. 
      Selalu terapkan protokol kesehatan 3M demi memutus penyebaran virus ini: <br>
      <fa-icon icon="head-side-mask" /> Memakai masker yang direkomendasikan oleh WHO! <br>
      <fa-icon icon="people-arrows" /> Menjaga jarak dan menghindari kerumunan! <br>
      <fa-icon icon="hands-wash" /> Mencuci tangan dengan sabun di air mengalir sekurang-kurangnya selama 20 detik!
    </p>
    <hr class="mt-4">
  </div>
</template>

<script>
export default {
  name: 'Jumbotron',
  props: {
    msg: String
  }
}
</script>
