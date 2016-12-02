//////////////////////////////////////////////
const Discord = require('discord.js');      //
const client = new Discord.Client();        //
const vm = require('vm');                   //
//////////////////////////////////////////////
var imgur = require('imgur-node-api'),
path = require('path');


var prefix = '>';

//var util = require('util');
var YouTube = require('youtube-node');

var youTube = new YouTube();

var enabletranslation = false;

client.on('ready', () => {
  console.log('Welcome to GLaDOS 2.0');

  //init imgur
  imgur.setClientID("bf01b508a810247");

  youTube.setKey('AIzaSyCVqkO07JjKZyenxdEub4n2RE22a7P3Qhs');
//	youtube.addParam('type', 'video');

  //init youtube
 // youTube.setKey('AIzaSyCVqkO07JjKZyenxdEub4n2RE22a7P3Qhs');

    enabletranslation = true;
});

var googleTranslate = require('google-translate')('AIzaSyCVqkO07JjKZyenxdEub4n2RE22a7P3Qhs');

//////////////////////////////////////////////////////////////////////////
//
//  Get Parameter from whole command. (workaround for multi parameters..)
//
//////////////////////////////////////////////////////////////////////////
function parameter(len,parameter_)
{
    return parameter_.substr(len + prefix.length + 1,parameter_.length);
}
//////////////////////////////////////////////////////////////////////////
//
//  Client on Message Callbacks
//
//////////////////////////////////////////////////////////////////////////

//https://eslachance.gitbooks.io/discord-js-bot-guide/content/samples/message_reply_array.html

var channelresponses = {
    'myid' : "gay", 
};

var botcommands = {
  "myid" : {
    process : function(client,message)
    {
      message.reply('s ID is ' + message.author.id);
    }
  }
}

function _implcheckid(id,callback)
{
  var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('IDS.txt')
  });

  lineReader.on('line', function (line) {
  console.log('Verifying id:', line);
  found = false;
 if (line === id)
    {
      console.log("Found admin ID!");
     callback(true);
    }
  });
}

var md5 = require("md5");

function createHash(myString)
{
    return md5(myString);
}

function setgamehandler(msg)
{
  _implcheckid(msg.author.id,function(t)
  {
      if (t)
      {
  //      let args = msg.content.split(" ").slice(1);
  // args[0]
        let gametext = parameter(7,msg.content);
        client.user.setGame(gametext);
        //!!!!!!!
        msg.channel.sendMessage("it can be that you have to reload the catche (F5) to see the game changed!");
      }
//uhm wont ever be called ... 'ide' should know lol
      else
      {
          console.log("missing permission!");
      }
  });
}

var gamevar = "NULL";
var spamvar = "fuck";
var spambool = false;

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

client.on('message', message => {
  
  if (message.content === prefix  + 'hi') {
    message.channel.sendMessage('I am a simple GLaDOS test written in nodejs!');
  }
  else if (message.content === prefix  + 'botinfo') {
    message.reply('how are you ?');
  }
  /*
  else if (message.content === prefix  + 'setprefix') {
    message.channel.sendMessage('Set the parameter to' + parameter(message.content.length,message.content));
    prefix = parameter(9,message.content);
    console.log(parameter(9,message.content));
  }*/
  else if (message.content === prefix  + 'bemyfriend') {
    message.reply('Send you a friend request!');
    message.client.user.addFriend();
  }
  else if (message.content === prefix  + 'messageid') {
    var idm = message.id();
    message.reply('s Id is : ' + idm);
  }
  else if (message.content === prefix  + 'myid') {
    message.reply('s ID is ' + message.author.id);
  }
  else if (message.content === prefix  + 'spam') {
    let args = message.content.split(" ").slice(1);
    var repeatvar = 1;
    repeatvar = parseInt(args[1],16);
    message.channel.sendMessage('spamming now ' + repeatvar + ' times xd');

    for (i = 0; i < repeatvar; i++)
    {
      message.channel.sendMessage(args[0]);
    }
  }
  else if (message.content.startsWith(prefix + 'say')) {
    let args = message.content.split(" ").slice(1);
  //  message.channel.sendMessage(parameter(3,message.content));
  /*
    let repeat = 1;
   // if (args.length ==)
   // {

     if (message.content.includes("TIMES");

    repeat = args.length - 1;
    console.log(repeat);
   // }*/

    let arg = args.join();
    //remove those ugly ","
    let newstring = arg.split(",").join(" ");
    /*
    for (i = 0; i < repeat; i++)
    {
      message.channel.sendMessage(newstring);
    }*/
    message.channel.sendMessage(newstring);
  }
  else if (message.content.startsWith(prefix + 'voice')) {
  //  let args = message.content.split(" ").slice(1);
    message.channel.sendTTSMessage(parameter(5,message.content));
  }
  else if (message.content === prefix + 'meme')
  {
    message.client.user.sendFile("cat.png","cat");
  }

  else if (message.content.includes(spamvar))
  {
   // message.reply("!rank");
   //@GLaDOS, LANGUAGE!!!:rage:
   /*
   if (spambool)
   {
     spambool = true;
      message.channel.sendMessage("fuck");
   }*/

    message.reply("Fuck you too..");
   
  }
  else if (message.content.includes('Force 67'))
  {
    message.reply("he is the best!");
  }
   else if (message.content.includes('force67'))
  {
    message.reply("he is the best!");
  }
  else if (message.content.startsWith(prefix + 'setgame'))
  {
    //implement changegame handler
    setgamehandler(message);
  }
  else if (message.content.startsWith(prefix + 'md5'))
  {
      let args = message.content.split(' ').split(1);
      try
      {
      message.reply(createHash(args[0]));
      }
      catch (err)
      {
        message.reply("u dun fucked up!");
      }
  }
  else if(message.content.search(prefix + "eval") == 0)
  {
     //eval
     
        try
        {
            const script = new vm.Script(message.content.substr(6), { filename: 'myfile.vm' });
            message.channel.sendMessage(script.runInThisContext());
        }
        catch (e) 
        {
          message.channel.sendMessage( "exception: " + e.message );
        }
   }
  else if (message.content.startsWith(prefix + 'imgur')) {
  let args = message.content.split(" ").slice(1);
  //var link = "NULL";
  imgur.upload(args[0], function (err,res)  { message.channel.sendMessage(res.data.link); });

  // 3 cause most images end with .gif , .png , .jpg
  //let imageid = link.substr(link.search("/"),link.length - 4);

 // message.channel.sendMessage(imageid);
  /*
  //title, description...
  if (args.length == 3)
  {
  imgur.update({   id: imageid,  title: args[1],  description: args[2] }, function (err,res) {
  message.channel.sendMessage(res.data);  });  }*/
  }
  else if (message.content.startsWith(prefix + 'yt')) {
    let args = message.content.split(" ").slice(1);
    //1
     youTube.search(args[0], 1, function(error, result) {
     if (error) {
      message.channel.sendMessage(error);
    }
     else {
       try {
         //1
          message.channel.sendMessage("http://www.youtube.com/watch?v=" + result.items[0].id.videoId );
    //      message.channel.sendMessage("video created by" + result.items[0].snippet[0].channelTitle);
       }
       catch (err)
       {
         console.log("ws " + err);
       }
 //  console.log(JSON.stringify(result, null, 2));
   }
    });




   // message.channel.sendMessage(requests);
  }
  else if (message.content.startsWith(prefix + 'play'))
  {
    try
    {
      var connection = client.internal.voiceConnection;
    }
    catch (err)
    {
      message.channel.sendMessage(err);
    }
      
  }
  else if (message.content.startsWith(prefix + 'trs'))
  {
      let args = message.content.split(" ").slice(1);
      if (enabletranslation)
      { 
        try
        {

          googleTranslate.translate(args[0], 'es', function(err, translation) {
          message.channel.sendMessage(translation.translatedText);
          // =>  Mi nombre es Brandon
          });
        }
        catch (err)
        {
          message.channel.sendMessage('Exeption at @ ' + err);
        }

      }
      else
      {
        message.channel.sendMessage('translate module not unlocked yet !');
      }
  }
  else if (message.content.startsWith(prefix + 'status'))
  {
    let args = message.content.split(" ").slice(1);
    try
    {
    if (args[0] == "1")
    {
        client.user.setStatus('online');
    }
    else if (args[0] == "2")
    {
        client.user.setStatus('idle');
        console.log("Bot is now in idle!");
    }
    else if (args[0] == "3")
    {
        client.user.setStatus('offline');
        console.log("Bot is now 'offline'")
    }
    else if (args[0] == "4")
    {
        client.user.setStatus('dnd');
        console.log("Bot is now in dnd mode!");
    }
    }
    catch (err)
    {
      message.channel.sendMessage(err);
  }
  }
})
;

client.login('MjM2MjQxODY4ODEwMjIzNjE2.CuGQ6A.KPIZIfTWQAbDXnaQXnOsb2VFV24');

//https://m.photofunia.com/effects/retro-wave/?text1=gay&text2=very&text3=cool