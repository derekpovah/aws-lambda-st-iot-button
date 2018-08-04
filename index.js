var baseUrl = 'https://api.smartthings.com/v1/devices/';
var deviceId;
var deviceStatus;
var request = require('request');

exports.handler = (event, context) => {
  switch(event.clickType) {
    case 'SINGLE':
      deviceId = process.env.SINGLE_PRESS_DEVICE_ID;
      break;
    case 'DOUBLE':
      deviceId = process.env.DOUBLE_PRESS_DEVICE_ID;
      break;
    case 'LONG':
      deviceId = process.env.LONG_PRESS_DEVICE_ID;
  }

  getDeviceStatus(deviceId);
  toggleDevice(deviceId, deviceStatus);
};

function getDeviceStatus(deviceId) {
  var options = {
    url: baseUrl + deviceId + '/status',
    headers: {
      'Authorization': `Bearer ${process.env.ST_ACCESS_TOKEN}`
    }
  };

  request.get(options, function(error, response, body) {
    if(error) throw error;
    var json = JSON.parse(body);
    deviceStatus = json.components.main.switch.switch.value;
  });
}

function toggleDevice(deviceId, deviceStatus) {
  if (deviceStatus === 'on') {
    var switchAction = 'off';
  } else {
    switchAction = 'on';
  }

  var options = {
    url: baseUrl + deviceId + '/commands',
    body: JSON.stringify({commands: [{command: switchAction, capability: 'switch'}]}),
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${process.env.ST_ACCESS_TOKEN}`
    }
  };

  request.post(options, function (error, response, body) {
    if(error) throw error;
  });
}
