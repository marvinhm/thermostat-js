'use strict';

describe('Thermostat', function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('increases in temperature with up()', function() {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('decreases in temperature with down()', function() {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it('has minimum of 10 degrees', function() {
    for(var i = 0; i < 11; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('has power saving mode on by default', function() {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('can switch PSM off', function(){
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('can switch PSM back on', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  describe('PSM off', function() {
    beforeEach(function() {
      thermostat.switchPowerSavingModeOff();
    });
    it('has an upper limit of 32 degrees, outside power-saving-mode', function() {
       expect(thermostat.isPowerSavingModeOn()).toBe(false);
       for (var i = 1; i <= 12; i++) {
         thermostat.up();
       }
       expect(thermostat.getCurrentTemperature()).toEqual(32);
       expect(function(){ thermostat.up(); }).toThrowError('Error: Cannot raise thermostat above maximum temperature.');
     });
  });

  describe('PSM on', function() {
    it('has an upper limit of 25 degrees', function() {
      for (var i = 1; i <= 5; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
      expect(function(){ thermostat.up(); }).toThrowError('Error: Cannot raise thermostat above maximum temperature.');
    });
  });

  it('can reset the thermostat', function() {
    thermostat.up();
    thermostat.reset();
    expect(thermostat.getCurrentTemperature()).toEqual(20)
  });

  describe('displays usage level', function() {
    describe('when the temperature is below 18 degrees', function() {
      it('shows low usage', function() {
        for (var i = 0; i <= 2; i++) {
          thermostat.down();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(17);
        expect(thermostat.displayUsage()).toEqual('low usage');
      });
    });
    describe('when the temperature is between 18 and 25 degrees', function() {
      it('shows medium usage', function() {
        expect(thermostat.displayUsage()).toEqual('medium usage');
      });
    });
    describe('when the temperature is above 24 degrees', function() {
      it('shows high usage', function() {
        for (var i = 0; i <= 4; i++) {
          thermostat.up();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(25);
        expect(thermostat.displayUsage()).toEqual('high usage');
      });
    });
  });
});
