function face(data) {
  var request = require('request');

  // Replace the subscriptionKey string value with your valid subscription key.
  var subscriptionKey = "fd65229578bd4f45948951f483544b61";

  // Replace or verify the region.
  //
  // You must use the same region in your REST API call as you used to obtain your subscription keys.
  // For example, if you obtained your subscription keys from the westus region, replace
  // "westcentralus" in the URI below with "westus".
  //
  // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
  // a free trial subscription key, you should not need to change this region.
  var url = "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";

  // Request parameters.
  return new Promise((resolve, reject) => {
    request.post({
      'url' : url,
      'headers' : { 'Content-Type' : 'application/octet-stream', 'Ocp-Apim-Subscription-Key' : subscriptionKey}, 
      'body' : data, 
    }, function(err, response, body) {
      if (!err && response.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  });
}

module.exports = face;
