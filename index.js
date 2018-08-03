exports.handler = (event, context) => {
  var deviceId;

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

  toggleSwitch(deviceId);
};

function toggleSwitch(deviceId) {
  var baseUrl = 'https://api.smartthings.com/v1/devices/';
  var request = require('request');
  
  var getOptions = {
    url: baseUrl + deviceId + '/status',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${process.env.ST_ACCESS_TOKEN}`
    }
  };

  request.get(getOptions, function(error, response, body) {
    if(error) throw error;
    response = JSON.parse(body);

    if (response.components.main.switch.switch.value === 'on') {
      var switchAction = 'off';
    } else {
      switchAction = 'on';
    }

    var postOptions = {
      url: baseUrl + deviceId + '/commands',
      body: JSON.stringify({commands: [{command: switchAction, capability: 'switch'}]}),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.ST_ACCESS_TOKEN}`
      }
    };

    request.post(postOptions, function (error, response, body) {
      if(error) throw error;
    });
  });
}
