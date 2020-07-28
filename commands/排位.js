const Discord = require("discord.js");
const fs = require("fs");
var snekfetch = require("snekfetch");
var premData = require("../data/servers.json");

const leftArrow = '⬅️';
const rightArrow = '➡️';
const crossMark = '❌';

exports.run = async(client, message, args) => {
  const api = `https://sea.api.riotgames.com/lor/ranked/v1/leaderboards?api_key=${client.config.riot}`;
  let len = 100;
  
  let data = snekfetch.get(api).then(r => {
    let body = r.body;
    let key = args[0];
    let errName = false;
    
    //New updates
    let count = 1;
    let extra = body.players.length % 25;
    let value = Math.ceil(body.players.length / 25);
    //console.log(value);
    
    if (body.players.length < len) {
      len = body.players.length;
    }
    
    if (!args.length) {
      createMessage(body);
    } else if (isNaN(key)) {
      //Search by username
      for (var i = 0; i < body.players.length; i++) {
        if (key.toLowerCase() == body.players[i].name.toLowerCase()) {
          errName = false;
          return message.channel.send(`**Name:** ${key}\n**Rank:** ${body.players[i].rank + 1}\n**LP:** ${body.players[i].lp}`);
        } else { errName = true; }
      }
      
      if (errName == true) {
        message.channel.send(`The player is currently not in Masters, ${message.author}!`);
      }
    } else {
      //Search by user rank
      if (key > body.players.length || key == 0) {
        return message.channel.send(`The rank is out of range, ${message.author}!`);
      }
      message.channel.send(`**Name:** ${body.players[key-1].name}\n**Rank:** ${body.players[key-1].rank + 1}\n**LP:** ${body.players[key-1].lp}`);
    }

    let server = premData.find(data => data.id === message.guild.id);
    //console.log(server);
    
    if (server == null) {
      const embed = {
        "title": "Thanks for choosing us!",
        "description": "Feel free to support our Patreon page [here](https://www.patreon.com/wrenchbot) to keep the bot running 24/7, it would mean a lot to us too! \n\n**Invite link:** [https://discord.com/api/oauth2/authorize...](https://discord.com/api/oauth2/authorize?client_id=719897354794303548&permissions=387136&scope=bot)",
        "url": "https://www.patreon.com/wrenchbot",
        "color": 15644545,
        "thumbnail": {
          "url": "attachment://wrench.jpg"
        }
      };

      message.channel.send({
        embed,
        files: [{
          attachment:'images/wrench.jpg',
          name:'wrench.jpg'
        }]
      });
    }
  });
  
  function createMessage(body) {
      let embed = new Discord.MessageEmbed().setTitle("Leaderboard:");
      let leaderboard = [[],[],[]];
      
      for (var i = 0; i < 100; i++) {
        if (body.players[i] != null) {
          leaderboard[0].push(body.players[i].rank + 1);
          leaderboard[1].push(body.players[i].name);
          leaderboard[2].push(body.players[i].lp);
        }
      }
        
      embed.addField(`No:`, leaderboard[0].join("\n"), true);
      embed.addField(`Name:`, leaderboard[1].join("\n"), true);
      embed.addField(`LP:`, leaderboard[2].join("\n"), true);
    
      embed.setDescription(
        `Note that g! command runs on glitch.com, 
        which currently serves as a development platform`);
      
      message.channel.send(embed);
    }
}