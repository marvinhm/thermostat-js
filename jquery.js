$(document).ready(function() {
  var thermostat = new Thermostat();
    updateTemperature();

  $('#temperature-up').click(function() {
    thermostat.up();
    updateTemperature();
  });

  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperature();
  });

  $('#temperature-reset').click(function() {
    thermostat.reset();
    updateTemperature();
  });


  $('#powersaving-on').click(function() {
    thermostat.isPowerSavingModeOn();
    $('#power-saving-status').text('On')
  });

  $('#powersaving-off').click(function() {
    thermostat.isPowerSavingModeOn();
    $('#power-saving-status').text('Off')
  });

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.displayUsage())
  };

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    $('#current-temperature').text(data.main.temp);
  });
});


$('#current-city').change(function() {
  var city = $('#current-city').val();
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    $('#current-temperature').text(data.main.temp)
  })
});



$.get('http://api.openweathermap.org/data/2.5/weather?q=New+York&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
 console.log(data);
});





