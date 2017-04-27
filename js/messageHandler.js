var watsonService=require('./watson/watsonService');

module.exports.processMessageToWatson=function(from , msg , processMessageToUser){

		watsonService.startConvo(from , msg , function(from , watsonResponse){
			console.log(`processWatsonReponse : ${watsonResponse.output.text[0]}`);
			if (watsonResponse.output.action) {

			} else {
				processMessageToUser(from , watsonResponse.output.text[0]);
			}
		});

};

//exports.processMessageToWatson=processMessageToWatson;
