var xmpp = require('node-xmpp');
var messageHandler = require("../messageHandler");
var credentials={
  jid: "fasidmpm@gmail.com",
     password: "melapalayam",
     host: "talk.google.com",
     port: 5222

// preferredSaslMechanism : 'OAUTH2'

};

var Gchat = function(creds){
  var self = this,
      hangout = this.client = new xmpp.Client(creds);
  hangout.on('online' , function(){
    console.log("Online");
    hangout.send(new xmpp.Element('presence'));
  });
  hangout.on('stanza' , function(stanza){
    if (stanza.is('presence')) {
        hangout.emit('presence' , stanza);
    } else if (stanza.is('message')) {
        hangout.emit('message' , stanza);
    }
  });
  hangout.on('presence' , function(p){
      console.log(`User : ${p.attrs.from}`);
      var show = p.getChild('show');
      if(show) console.log(`${show.getText()}`);
  });

  hangout.on("message" ,function(msg){
    var from = msg.attrs.from,
        body=msg.getChild('body'),
        text=msg.getChildText('body'),
        inactive = msg.getChild('cha:inactive'),
  			composing = msg.getChild('http://jabber.org/protocol/chatstates:composing'),
  			paused = msg.getChild('http://jabber.org/protocol/chatstates:paused');

        if(text!=null){
          console.log(`New Message from ${from} \n`);
          console.log(`Message : ${text}`);
          messageHandler.processMessageToWatson(from , text , function(to , text){
            var reply = new xmpp.Client.Stanza('message' , {
              to : to,
              type : 'chat'
            });
            reply.c('body').t(text);
            hangout.send(reply);
          });
        }

  });

};

function start(){
  var hang = new Gchat(credentials);
  console.log('Started Hangout Service');
};
exports.start=start;
