'use strict';

function Thermostat() {
  this.DEFAULT_TEMPERATURE = 20;
  this.PSM_MAX_TEMPERATURE = 25;
  this.MAXIMUM_TEMPERATURE = 32;
  this.MINIMUM_TEMPERATURE = 10;
  this.temperature = this.DEFAULT_TEMPERATURE;
  this.powerSavingMode = true;
};

Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.up = function() {
  if (this.getCurrentTemperature() === this.maximumTemperature()) {
    throw new Error('Error: Cannot raise thermostat above maximum temperature.')
  }
  this.temperature += 1;
};

Thermostat.prototype.down = function() {
  if (this.isMinimumTemperature()) {
    return;
  }
  this.temperature -= 1;
};

Thermostat.prototype.isMinimumTemperature = function() {
  return this.temperature === this.MINIMUM_TEMPERATURE;
};

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this.powerSavingMode === true;
};

Thermostat.prototype.switchPowerSavingModeOff = function() {
  this.powerSavingMode = false;
};

Thermostat.prototype.switchPowerSavingModeOn = function() {
  this.powerSavingMode = true;
};

Thermostat.prototype.maximumTemperature = function () {
  if (this.isPowerSavingModeOn()) {
    return this.PSM_MAX_TEMPERATURE
  }
  else { return this.MAXIMUM_TEMPERATURE };
};

Thermostat.prototype.reset = function() {
    this.temperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.displayUsage = function () {
  if (this.getCurrentTemperature() < 18) {
    return 'low usage'
  }
  else if (this.getCurrentTemperature() < 25) {
    return 'medium usage'
  }
  else { return 'high usage' };
};
