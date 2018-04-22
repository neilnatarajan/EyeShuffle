import React, { Component } from 'react';

class Feels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emotions: { }
    };
  }

  componentDidMount() {
    this.createWebRTCFeed();
  }

  render() {
    return <div>{this.props.children}</div>
  }

  createWebRTCFeed() {
    // Initialize web cam
  }

  startUpdateLoop() {
    setInterval(() => this.updateEmotions(), 1000);
  }

  getImageData() {
    // TODO: get binary data from web cam
  }

  updateEmotions() {
	// TODO: Get emotions from the current image data and update the
    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************
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
    var url = "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion";

    // Request parameters.

	request.post({
		'url' : url,
/*		'headers' : { 'Content-Type' : 'application/octet-stream',
					  'Ocp-Apim-Subscription-Key' : subscriptionKey}, 
		'body' : data, */
		'headers' : { 'Content-Type' : 'application/json'},
		'body' { 'url' : 'http://images4.fanpop.com/image/photos/22700000/http-www-google-com-imgres-imgurl-http-upload-thegioihoathinh-com-images-278889prison_break11-jp-prison-break-22733317-375-500.jpg'}


	}, function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body)
	        }
	    }
	);
    // document.querySelector("#sourceImage").src = sourceImageUrl;

    // Perform the REST API call.
/*    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function(data) {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
            jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });*/

	// emotions state.
	}
}