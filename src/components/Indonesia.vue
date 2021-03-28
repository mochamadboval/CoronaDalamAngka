<template>
  <div class="container mt-5">
    <div class="d-flex align-items-center">
      <h3 id="Indonesia" class="d-inline m-0 me-auto">Indonesia</h3>
      <span><fa-icon icon="calendar-day" /> {{ lastUpdate }}</span>
    </div>
    <hr />
    <div class="row">
      <!-- Daily Stats -->
      <div class="col-lg mb-3 mb-lg-0">
        <div class="card bg-dark border-0">
          <canvas id="lineChart" height="285"></canvas>
        </div>
      </div>
      <!-- Cases -->
      <div class="col-lg">
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
          <span class="me-auto">Suspek</span>
          <span>{{ suspect }}</span>
        </p>
        <hr />
      </div>
    </div>
    <p class="text-center">
      Tingkat Kesembuhan:
      <strong class="text-success"> {{ recovered.rate }} %</strong>
      <span class="d-none d-sm-inline"> |</span> <br class="d-sm-none" />
      Tingkat Kematian:
      <strong class="text-danger"> {{ deaths.rate }} %</strong>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";

export default {
  name: "Indonesia",
  props: {
    msg: String,
  },
  data() {
    return {
      confirmed: {
        total: 0,
        new: 0,
      },
      recovered: {
        total: 0,
        new: 0,
        rate: 0,
      },
      deaths: {
        total: 0,
        new: 0,
        rate: 0,
      },
      treated: 0,
      suspect: 0,
      lastUpdate: "0/0/0000 00.00",
    };
  },
  mounted() {
    axios
      .get("https://apicovid19indonesia-v2.vercel.app/api/indonesia/more")
      .then((response) => {
        const data = response.data;

        this.confirmed.total = data.total.positif.toLocaleString("id-ID");
        this.confirmed.new = data.penambahan.positif.toLocaleString("id-ID");
        this.recovered.total = data.total.sembuh.toLocaleString("id-ID");
        this.recovered.new = data.penambahan.sembuh.toLocaleString("id-ID");
        this.recovered.rate = (
          (Number(data.total.sembuh) / Number(data.total.positif)) *
          100
        ).toFixed(2);
        this.deaths.total = data.total.meninggal.toLocaleString("id-ID");
        this.deaths.new = data.penambahan.meninggal.toLocaleString("id-ID");
        this.deaths.rate = (
          (Number(data.total.meninggal) / Number(data.total.positif)) *
          100
        ).toFixed(2);
        this.treated = data.total.dirawat.toLocaleString("id-ID");
        this.suspect = data.data.odp.toLocaleString("id-ID");
        this.lastUpdate = new Date(data.total.lastUpdate)
          .toLocaleString("id-ID")
          .slice(0, -3);
      });

    axios
      .get("https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian")
      .then((response) => {
        const data = response.data;

        const labels = data.slice(-14).map((label) => {
          return label.tanggal.slice(5, 10);
        });
        const confirmedChart = [];
        const recoveredChart = [];
        const deathsChart = [];

        for (let i = 0; i < data.length; i++) {
          confirmedChart.push(data[i].positif);
          recoveredChart.push(data[i].sembuh);
          deathsChart.push(data[i].meninggal);
        }

        const ctx = document.getElementById("lineChart");
        new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Positif",
                data: confirmedChart.slice(-14),
                backgroundColor: "rgba(255, 193, 7, 0)",
                borderColor: "rgba(255, 193, 7, 1)",
                pointBackgroundColor: "rgba(255, 193, 7, 1)",
                pointBorderColor: "rgba(255, 193, 7, 1)",
                pointBorderWidth: "2",
                pointHoverBorderWidth: "2",
              },
              {
                label: "Sembuh",
                data: recoveredChart.slice(-14),
                backgroundColor: "rgba(25, 135, 84, 0)",
                borderColor: "rgba(25, 135, 84, 1)",
                pointBackgroundColor: "rgba(25, 135, 84, 1)",
                pointBorderColor: "rgba(25, 135, 84, 1)",
                pointBorderWidth: "2",
                pointHoverBorderWidth: "2",
              },
              {
                label: "Meninggal",
                data: deathsChart.slice(-14),
                backgroundColor: "rgba(220, 53, 69, 0)",
                borderColor: "rgba(220, 53, 69, 1)",
                pointBackgroundColor: "rgba(220, 53, 69, 1)",
                pointBorderColor: "rgba(220, 53, 69, 1)",
                pointBorderWidth: "2",
                pointHoverBorderWidth: "2",
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: "rgba(87, 90, 93, .5)",
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    color: "rgba(87, 90, 93, .5)",
                  },
                },
              ],
            },
          },
        });
      });
  },
};
</script>
