const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
i;

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
      }
    });
  });
});
