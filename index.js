exports.handler = (event, context) => {
  var request = require('request');
  var baseUrl = 'https://api.smartthings.com/v1/devices/';
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
  
  var options = {
    url: baseUrl + deviceId + '/commands',
    body: JSON.stringify({commands: [{command: 'on', capability: 'switch'}]}),
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${process.env.ST_ACCESS_TOKEN}`
    }
  };
  
  request.post(options, function (error, response, body) {
    if(error) throw error;
 });
};
