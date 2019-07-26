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
});
