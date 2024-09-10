
let cities = ["Zürich", "Cairo", "Alexandria", "Bern", "Luzern", "Basel-Stadt", "Genève", "Thurgau"]

for (city of cities) {
  const content = `<option>${city}</option>`
  document.getElementById("cities-select").innerHTML += content
}

document.getElementById("cities-select").addEventListener("change", function () {
  document.getElementById("city-name").innerHTML = this.value
  let cityName = ""
  for (city of cities) {
    if (city == this.value) {
      cityName = city
    }
  }
  getPrayerTimingsOfCity(cityName)
})

function getPrayerTimingsOfCity(cityName) {
  let params = {
    country: "CH",
    city: cityName
  }

  axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
    .then(function (response) {
      const timings = response.data.data.timings
      fillTimeForPrayer("fajr-time", timings.Fajr)
      fillTimeForPrayer("sunrise-time", timings.Sunrise)
      fillTimeForPrayer("dhuhr-time", timings.Dhuhr)
      fillTimeForPrayer("asr-time", timings.Asr)
      fillTimeForPrayer("maghrib-time", timings.Maghrib)
      fillTimeForPrayer("ishaa-time", timings.Isha)


      const readableDate = response.data.data.date.readable
      const day = response.data.data.date.hijri.day
      const weekDay = response.data.data.date.hijri.weekday.ar
      const month = response.data.data.date.hijri.month.ar
      const hijriYear = response.data.data.date.hijri.year

      const date = readableDate + ", " + " " + hijriYear + " " + weekDay + " " + day + " " + month
      document.getElementById("date").innerHTML = date
      console.log(readableDate + ", " + " " + hijriYear + " " + weekDay + " " + day + " " + month);
    })
    .catch(function (error) {
      console.log(error);
    })
}

getPrayerTimingsOfCity("Zürich")


function fillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time
}
