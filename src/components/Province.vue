<template>
  <div class="container mt-5">
    <div class="d-flex align-items-center">
      <h3 id="Provinsi" class="d-inline m-0 me-auto">Provinsi</h3>
      <span><fa-icon icon="calendar-day" /> {{ lastUpdate }}</span>
    </div>
    <hr />
    <div class="row justify-content-center mb-3">
      <div class="col-9">
        <select
          id="Provinces"
          class="form-select bg-dark text-light"
          aria-label="Pilih Provinsi"
        >
          <option hidden>Pilih Provinsi</option>
          <option v-for="province in provincesSorted" :key="province.provinsi">
            {{ province.provinsi }}
          </option>
        </select>
      </div>
      <div class="col-auto">
        <button
          type="button"
          class="btn btn-outline-light"
          aria-label="Lihat Data"
          @click="getProvince"
        >
          <fa-icon icon="search-location" />
        </button>
      </div>
    </div>
    <div class="row">
      <!-- Cases -->
      <div class="col-lg mb-2 mb-lg-0">
        <hr class="mt-0" />
        <p class="d-flex">
          <span class="me-auto">Positif</span>
          <span>
            <strong class="text-warning"
              ><fa-icon icon="angle-up" /> {{ confirmed.new }}</strong
            >
            {{ confirmed.total }}
          </span>
        </p>
        <hr />
        <p class="d-flex">
          <span class="me-auto">Sembuh</span>
          <span>
            <strong class="text-success"
              ><fa-icon icon="angle-up" /> {{ recovered.new }}</strong
            >
            {{ recovered.total }}
          </span>
        </p>
        <hr />
        <p class="d-flex">
          <span class="me-auto">Meninggal</span>
          <span>
            <strong class="text-danger"
              ><fa-icon icon="angle-up" /> {{ deaths.new }}</strong
            >
            {{ deaths.total }}
          </span>
        </p>
        <hr />
        <p class="d-flex">
          <span class="me-auto">Dalam Perawatan</span>
          <span>{{ treated }}</span>
        </p>
        <hr />
        <p class="d-flex">
          <span class="me-auto">Kasus Terbanyak ke-</span>
          <span>{{ rank }}</span>
        </p>
        <hr />
      </div>
      <!-- Gender -->
      <div class="col-md mb-2 mb-lg-0">
        <div class="card mb-3 bg-dark border-0">
          <canvas id="pieChart"></canvas>
        </div>
        <p class="d-flex">
          <span class="me-auto">
            <strong class="text-primary"><fa-icon icon="mars" /></strong>
            {{ gender.male }}
          </span>
          <span>
            {{ gender.female }}
            <strong class="text-danger"><fa-icon icon="venus" /></strong>
          </span>
        </p>
      </div>
      <!-- Age -->
      <div class="col-md">
        <table class="table table-dark table-bordered text-center">
          <thead>
            <tr>
              <th>Usia</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0-5</td>
              <td>{{ age.toddler }}</td>
            </tr>
            <tr>
              <td>6-18</td>
              <td>{{ age.child }}</td>
            </tr>
            <tr>
              <td>19-30</td>
              <td>{{ age.youngAdult }}</td>
            </tr>
            <tr>
              <td>31-45</td>
              <td>{{ age.adult }}</td>
            </tr>
            <tr>
              <td>46-59</td>
              <td>{{ age.oldAdult }}</td>
            </tr>
            <tr>
              <td>>= 60</td>
              <td>{{ age.elderly }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.plugins.unregister(ChartDataLabels);

export default {
  name: "Province",
  props: {
    msg: String,
  },
  data() {
    return {
      provinces: [],
      provincesSorted: [],
      confirmed: {
        total: 0,
        new: 0,
      },
      recovered: {
        total: 0,
        new: 0,
      },
      deaths: {
        total: 0,
        new: 0,
      },
      treated: 0,
      rank: 0,
      gender: {
        male: 0,
        malePercent: 0,
        female: 0,
        femalePercent: 0,
      },
      age: {
        toddler: 0,
        child: 0,
        youngAdult: 0,
        adult: 0,
        oldAdult: 0,
        elderly: 0,
      },
      lastUpdate: "0/0/0000",
    };
  },
  mounted() {
    axios
      .get(
        "https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more"
      )
      .then((response) => {
        const data = response.data;
        this.provinces = data;

        const sorted = [...this.provinces];
        sorted.sort((a, b) => (a.provinsi > b.provinsi ? 1 : -1));
        this.provincesSorted = sorted;
      });
  },
  methods: {
    getProvince() {
      const provinceSelected = document.getElementById("Provinces")
        .selectedOptions[0].text;

      if (provinceSelected === "Pilih Provinsi") {
        alert("Pilih Provinsi terlebih dahulu!");
      } else {
        const data = this.provinces;

        this.rank =
          data.findIndex((province) => province.provinsi === provinceSelected) +
          1;

        data.find((province) => {
          if (province.provinsi === provinceSelected) {
            this.confirmed.total = province.kasus.toLocaleString("id-ID");
            this.confirmed.new = province.penambahan.positif.toLocaleString(
              "id-ID"
            );
            this.recovered.total = province.sembuh.toLocaleString("id-ID");
            this.recovered.new = province.penambahan.sembuh.toLocaleString(
              "id-ID"
            );
            this.deaths.total = province.meninggal.toLocaleString("id-ID");
            this.deaths.new = province.penambahan.meninggal.toLocaleString(
              "id-ID"
            );
            this.treated = province.dirawat.toLocaleString("id-ID");
            this.gender.male = province.jenis_kelamin[
              "laki-laki"
            ].toLocaleString("id-ID");
            this.gender.female = province.jenis_kelamin.perempuan.toLocaleString(
              "id-ID"
            );
            this.age.toddler = province.kelompok_umur[0]["0-5"].toLocaleString(
              "id-ID"
            );
            this.age.child = province.kelompok_umur[1]["6-18"].toLocaleString(
              "id-ID"
            );
            this.age.youngAdult = province.kelompok_umur[2][
              "19-30"
            ].toLocaleString("id-ID");
            this.age.adult = province.kelompok_umur[3]["31-45"].toLocaleString(
              "id-ID"
            );
            this.age.oldAdult = province.kelompok_umur[4][
              "46-59"
            ].toLocaleString("id-ID");
            this.age.elderly = province.kelompok_umur[5]["≥ 60"].toLocaleString(
              "id-ID"
            );
            this.lastUpdate = new Date(province.last_date)
              .toLocaleString("id-ID")
              .slice(0, -9);

            const genderTotal =
              Number(this.gender.male) + Number(this.gender.female);
            this.gender.malePercent = (
              (Number(this.gender.male) / genderTotal) *
              100
            ).toFixed(2);
            this.gender.femalePercent = (
              (Number(this.gender.female) / genderTotal) *
              100
            ).toFixed(2);
          }

          const ctx = document.getElementById("pieChart");
          new Chart(ctx, {
            type: "pie",
            data: {
              labels: ["Laki-laki", "Perempuan"],
              datasets: [
                {
                  data: [this.gender.malePercent, this.gender.femalePercent],
                  backgroundColor: [
                    "rgba(13, 110, 253, 1)",
                    "rgba(220, 53, 69, 1)",
                  ],
                  datalabels: {
                    color: "rgba(248, 249, 250, 1)",
                  },
                },
              ],
            },
            plugins: [ChartDataLabels],
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/custom.scss";
@import "bootstrap/scss/bootstrap.scss";
</style>
