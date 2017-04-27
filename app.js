'use strict';
var express = require('express');
var hangoutMessageServer = require('./js/hangout/hangoutIntegration');
var app = express();

app.set('port' , 9597);

//hangoutMessageServer.start();
app.get('/:text' , function(req , res ){
	var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  username: '096d93e9-7e86-4407-bf19-d10fb8b5ba97', // replace with username from service key
  password: 'ddIe2r5XH4de',
  'version_date': '2017-02-27'
});

var parameters = {
  'text': `i cant pull data from SalesForce would you just please raise a ticket for me in ServiceNow?`,
  'features': {
  	'emotion' : {},
  	'relations': {},
    'entities': {
      'emotion': true,
      'sentiment': true,
      
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      
    },
    'concepts' : {},
    'categories' : {},
    'semantic_roles': {},
    'sentiment':{}
  }
};

natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    {console.log('error:', err);
    res.status(500).json({'Error' : err});}
  else
   { console.log(JSON.stringify(response, null, 2));
   	res.status(200).json(response);}
});
});
app.listen(app.get('port') , function(){
	console.log(`Listening to port ${app.get('port')}`);

});

