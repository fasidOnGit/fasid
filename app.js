'use strict';
var express = require('express');
var watsonService=require('./watsonService');
var app = express();
var i=2;
process.on('start' ,	function() { 
	watsonService.startConvo('sh72hssnsn' , 'Hi' , function(err , response){
	console.log(response.output.text[0]);
	while(i<5){
		process.emit('start');
		i++;
	}
	
})
});


process.emit('start');

app.set('port' , 9597);

app.listen(app.get('port') , function(){
	console.log(`Listening to port ${app.get('port')}`);	
	
});