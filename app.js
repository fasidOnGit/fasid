'use strict';
var express = require('express');
var hangoutMessageServer = require('./js/hangout/hangoutIntegration');
var app = express();

app.set('port' , 9597);

hangoutMessageServer.start();
app.listen(app.get('port') , function(){
	console.log(`Listening to port ${app.get('port')}`);

});
