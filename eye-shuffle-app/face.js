
function face() {
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
  return new Promise( (resolve, reject) => (
    request.post({
      'url' : url,
      //'headers' : { 'Content-Type' : 'application/octet-stream', 'Ocp-Apim-Subscription-Key' : subscriptionKey}, 
      //'body' : data, 
      'headers' : { 'Content-Type' : 'application/json'},
      'body' : { 'url' : 'http://images4.fanpop.com/image/photos/22700000/http-www-google-com-imgres-imgurl-http-upload-thegioihoathinh-com-images-278889prison_break11-jp-prison-break-22733317-375-500.jpg'},
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        resolve(body);
        }
      }
    )
  ));
}

