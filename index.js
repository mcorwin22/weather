$(document).ready(function () {
  var temp_c = 0;
  var temp_f = 0;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      var request =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lat +
        "&lon=" +
        long;

      $.getJSON(request, function (json) {
        var location = json.name;
        var weather = json.weather[0].main;
        var icon = json.weather[0].icon;
        temp_c = json.main.temp;
        temp_f = temp_c * 1.8 + 32;
        temp_c = Math.round(temp_c);
        temp_f = Math.round(temp_f);
        fahrenheit = true;
        $("#welcome").html("");
        $("#location").html("<h3>" + location + "</h3>");
        $("#weather").html("<h4>" + weather + "</h4>");
        $("#icon").html('<img src="' + icon + '" alt="icon">');
        $("#temp").html(
          '<h3 style= "display:inline;">' +
            temp_f +
            '</h3><h4 style= "display:inline;"><sup>&#176;F</sup></h4>'
        );
        $("#unit-switch").css("display", "block");
      });
    });
  }

  $("#unit-switch").click(function () {
    if (fahrenheit) {
      $("#temp").html(
        '<h3 style= "display:inline;">' +
          temp_c +
          '</h3><h4 style= "display:inline;"><sup>&#176;C</sup></h4>'
      );
      $("#unit-switch").html("&#176;F");
      fahrenheit = false;
    } else {
      $("#temp").html(
        '<h3 style= "display:inline;">' +
          temp_f +
          '</h3><h4 style= "display:inline;"><sup>&#176;F</sup></h4>'
      );
      $("#unit-switch").html("&#176;C");
      fahrenheit = true;
    }
  });
});
