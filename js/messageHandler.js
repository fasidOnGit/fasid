var watsonService=require('./watson/watsonService');

module.exports.processMessageToWatson=function(from , msg , processMessageToUser){

		watsonService.startConvo(from , msg , function(from , watsonResponse){
			console.log(`processWatsonReponse : ${watsonResponse.output.text}`);
			if (watsonResponse.output.action) {

			} else {
				processMessageToUser(from , JSON.stringify(watsonResponse.output.text.join(), null, 2));
			}
		});

};

//exports.processMessageToWatson=processMessageToWatson;
