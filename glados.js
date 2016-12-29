//////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const vm = require('vm');
const bot = require('bot-commander');
const fs = require('fs');
const request = require('request');
const split = require('split');
const http = require('http');
const url = require('url');
const cheerio = require('cheerio');
const cleverbot = require('cleverbot.io');
const ytdl = require('ytdl-core');
const ytinfo = require('youtube-info');
const moment = require("moment");
const momentformat = require("moment-duration-format");
const comics = require("xkcd-imgs");

//////////////////////////////////////////////
var prefix = '>',
  imgur = require('imgur-node-api'),
  path = require('path'),
  YouTube = require('youtube-node'),
  youTube = new YouTube(),
  path2 = process.cwd(),
  enabletranslation = false,
  sqlite3 = require('sqlite3').verbose(),
  db = new sqlite3.Database('glados.db', sqlite3.OPEN_READWRITE),
  pastebin = "",
  webport = 8080,
  invitelink = "",
  norights = "Insufficient client rights!",
  voiceC = null;

//////////////////////////////////////////////

function GetElemenent(element, callback) {
    fs.createReadStream(path2 + '/data/settings.xf')
            .pipe(split())
            .on('data', function (line) {
                //each chunk now is a seperate line!
                ///remove spaces.
                if (line.includes(element)) {
                    ///remove spaces.
                    var process = line.replace(/ /g, "");

                    //delete all brakets.
                    var removebrakets = process.substring(1, process.length - 1);

                    callback(removebrakets.substr(element.length + 1, removebrakets.length - 1));
                    return;
                }
            });
}

//////////////////////////////////////////////

GetElemenent("dtoken", function (eleme) {
    client.login(eleme);
});

////////////////////////////////////////////

client.on('ready', () => {
    console.log('Welcome to GLaDOS 2.0');
    //voice connect
    var vc = client.channels.get('252077307710144512');
    vc.join().catch("Can't connect to voice!");
    exports.voiceC = vc;

    //init plugins
    fs.readdir('./plugins/', (err, files) => {
        files.forEach(file => {
            console.log("Loading plugin: " + file);
            bot.load('./plugins/' + file);
        });
    });

    console.log("Loading Settings...");

    //now 3rd party stuff
    GetElemenent("imgurtoken", function (eleme) {
        imgur.setClientID(eleme);
    });
    GetElemenent("yttoken", function (eleme) {
        youTube.setKey(eleme);
    });
    GetElemenent("pastebintoken", function (eleme) {
        exports.pastebin = eleme;
    });
    GetElemenent("defaultgame", function (eleme) {
        client.user.setGame(eleme);
    });
    //random startup image setting
    GetElemenent("rndavartar", function (eleme) {
        if (eleme == "true")
        {
            //2 images
            var avartar = Math.random() * (3 - 1) + 1;
            switch (Math.ceil(avartar - 1))
            {
                case 1:
                    client.user.setAvatar('./data/strtup/avatar/glados_1.jpg');
                    break;
                case 2:
                    client.user.setAvatar('./data/strtup/avatar/glados_2.jpg');
                    break;
            }
        }
    });
    //our bot invite link
    exports.invitelink = 'https://discordapp.com/oauth2/authorize?client_id=' + client.user.id + '&scope=bot&permissions=0';
    console.log("Finished loading Settings");
    enabletranslation = true;
});

//////////////////////////////////////////////

client.on('message', msg => {
    bot.parse(msg.content, msg);
});

//////////////////////////////////////////////

exports.isAdmin = function (discordid, callback) {
    db.get("SELECT COUNT(*) AS co FROM admins WHERE discordid = ?1", {
        1: discordid
    }, function (err, row) {
        if (err) {
            console.log("ERROR isAdmin: " + err);
            callback(false);
        }
        callback(row.co);
    });
}

//////////////////////////////////////////////

exports.main = {
    prefix: prefix,
    Discord: Discord,
    imgur: imgur,
    youTube: youTube,
    vm: vm,
    sqlite3: sqlite3,
    db: db,
    request: request,
    http: http,
    url: url,
    webport: webport,
    cheerio: cheerio,
    client: client,
    norights: norights,
    comics : comics,
    ytdl: ytdl,
    cleverbot: cleverbot,
    ytinfo: ytinfo,
    moment: moment,
    momentformat: momentformat
};
