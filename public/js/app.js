const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
const head = document.querySelector("#msg-head");
const message3 = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;

  message1.textContent = "Loading...";
  message2.textContent = "";

  fetch("/weather?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = location;
        message2.textContent =
          "Forecast Summary - " +
          data.weather_descriptions[0] +
          ". There is " +
          data.precip +
          "% of rain.";
        head.textContent = "Additional-Info :";
        message3.textContent =
          "Temperature - " +
          data.temperature +
          "C, Pressure - " +
          data.pressure +
          "Pa, Humidity - " +
          data.humidity +
          ", Visibility - " +
          data.visibility;
      }
    });
  });
});
