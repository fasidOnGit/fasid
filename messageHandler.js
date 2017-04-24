var watsonService=require('./watsonService');

module.exports.getWatsonResponse=function(userId , message){
	watsonService.startConvo(userId , message , function(userId , response){
			console.log(response.text);
	});
};