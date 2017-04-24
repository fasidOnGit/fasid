var ConversationV1 = require('watson-developer-cloud/conversation/v1');

  // var versionDate=getDate(new Date());
  // console.log(versionDate);
// Set up Conversation service wrapper.
var conversation = new ConversationV1({
  username: '0eaf0c1d-59e8-4cba-b7a0-c9f6210e86ba', // replace with username from service key
  password: 'SVy6m774gy8M', // replace with password from service key
  path: { workspace_id: 'c1fe7f37-49b4-44a7-ac1c-e30d0ec1d66e' }, // replace with workspace ID
  version_date: '2017-04-22'
});
var context={};
var startConvo = function(userId , message, processResponse){
  console.log(context[userId]);
  conversation.message({
   input: { text: message },
  context : context[userId],
}, function(err , response){
      if (err) {
    console.error(err); // something went wrong
    processReponse(err , null);
  }
  else {
    context[userId]=response.context;  
  processResponse(null , response);
  }
});

};
module.exports.startConvo=startConvo;
// function getDate(newDate){
//   var dateString='';
// dateString += newDate.getFullYear()+ "-"; 
//   dateString += (newDate.getMonth() + 1) + "-";  
// dateString += newDate.getDate();
// return dateString.toString();
// }
// /*dateString += (newDate.getMonth() + 1) + "/";  
// dateString += newDate.getDate() + "/";  
// dateString += newDate.getFullYear();  
// */