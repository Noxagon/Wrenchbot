const { DeckEncoder } = require('runeterra');
const Discord = require('discord.js');
const fs = require('fs');
var data = require("../data/set.json");

exports.run = async(client, message, args) => {
  if (!args.length) {
    return message.channel.send(`Please provide a deck code, ${message.author}!`);
  }
  
  if (args[0] == "help") {
      return message.channel.send(`Guide: 
> h!decklist <deck-code>: To view the deck of the specific code`);
  }

  let embed = new Discord.MessageEmbed(); //.setTitle("Deck List:");
  let deck = null;
  var deckList = [[],[],[],[],[],[],[],[]];

  try {
    deck = DeckEncoder.decode(args[0]);
  } catch(err) {
    //console.log(err);
    return message.channel.send(`Please provide a valid deck code, ${message.author}!`);
  }

  for (var i = 0; i < deck.length; i++) {
    if (deck[i].code.includes("undefined")) {
      deck[i].code = deck[i].code.replace("undefined", "MT");
    }
  }

  for (var i = 0; i < deck.length; i++) {
    for (var j = 0; j < data.length; j++) {
      if (data[j].cardCode == deck[i].code) {
        //console.log(deck[i].code);
        switch(data[j].region) {
          case "Bilgewater": deckList[0][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "Demacia": deckList[1][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "Freljord": deckList[2][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "Ionia": deckList[3][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "Noxus": deckList[4][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "Piltover & Zaun": deckList[5][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "Shadow Isles": deckList[6][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "Targon": deckList[7][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
        }
      }
    }
  }

  if (deckList[0].length > 0) {
    deckList[0].sort();
    const bilgeIcon = client.emojis.cache.get("720912066612822057");
    embed.addField(`${bilgeIcon} Bilgewater`, deckList[0].join("\n"), true);
  }

  if (deckList[1].length > 0) {
    deckList[1].sort();
    const demIcon = client.emojis.cache.get("720919748283465788");
    embed.addField(`${demIcon} Demacia`, deckList[1].join("\n"), true);
  }

  if (deckList[2].length > 0) {
    deckList[2].sort();
    const frelIcon = client.emojis.cache.get("720919748363288636");
    embed.addField(`${frelIcon} Freljord`, deckList[2].join("\n"), true);
  }

  if (deckList[3].length > 0) {
    deckList[3].sort();
    const ionIcon = client.emojis.cache.get("720919747792732172");
    embed.addField(`${ionIcon} Ionia`, deckList[3].join("\n"), true);
  }

  if (deckList[4].length > 0) {
    deckList[4].sort();
    const noxIcon = client.emojis.cache.get("720919748069687296");
    embed.addField(`${noxIcon} Noxus`, deckList[4].join("\n"), true);
  }

  if (deckList[5].length > 0) {
    deckList[5].sort();
    const piltIcon = client.emojis.cache.get("720919748078206986");
    embed.addField(`${piltIcon} Piltover & Zaun`, deckList[5].join("\n"), true);
  }

  if (deckList[6].length > 0) {
    deckList[6].sort();
    const shadIcon = client.emojis.cache.get("720919748027744316");
    embed.addField(`${shadIcon} Shadow Isles`, deckList[6].join("\n"), true);
  }

  if (deckList[7].length > 0) {
    deckList[7].sort();
    const tarIcon = client.emojis.cache.get("749116410122469406");
    embed.addField(`${tarIcon} Targon`, deckList[7].join("\n"), true);
  }
  
  message.channel.send(embed);
  // for (var j = 0; j < data.length; j++) {
  //   if (data[j].cardCode == deck[i].code) {
  //     //cardDetails[i] = `**${deck[i].count}** ${data[j].name}`;
  //     //embed.addField(`${data[j].region}` ,cardDetails[i], true);
  //   }
  // }

  //message.channel.send(deck[i].code);
  //message.channel.send({files: [`./images/${deck[i].code}.png`]});
  /* fs.readFile('./data/sets.json', (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
  }); */

/*
const Discord = require('discord.js');
const Canvas = require('canvas');

const canvas = Canvas.createCanvas(85, 128);
const ctx = canvas.getContext('2d');

var imgArray = new Array();
const background = await Canvas.loadImage(`./images/${deck[i].code}.png`);
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
imgArray[i] = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
message.channel.send(imgArray);

message.channel.send({embed: {
  "fields": [
  {
    "name": `${deck[i].code}`,
    "value": `${deck[i].count}`,
    "inline": true
  }
]
}});
*/
}
