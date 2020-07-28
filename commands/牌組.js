const { DeckEncoder } = require('runeterra');
const Discord = require('discord.js');
const fs = require('fs');
var data = require("../data/set-ch.json");

exports.run = async(client, message, args) => {
  if (!args.length) {
    return message.channel.send(`Please provide a deck code, ${message.author}!`);
  }
  
  if (args[0] == "help") {
      return message.channel.send(`Guide: 
> h!decklist <deck-code>: To view the deck of the specific code`);
  }

  let embed = new Discord.MessageEmbed().setTitle("Deck List:");
  let deck = null;
  var deckList = [[],[],[],[],[],[],[]];

  try {
    deck = DeckEncoder.decode(args[0]);
  } catch(err) {
    console.log(err);
    return message.channel.send(`Please provide a valid deck code, ${message.author}!`);
  }

  for (var i = 0; i < deck.length; i++) {
    for (var j = 0; j < data.length; j++) {
      if (data[j].cardCode == deck[i].code) {
        //console.log(deck[i].code);
        switch(data[j].region) {
          case "比爾吉沃特": deckList[0][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "蒂瑪西亞": deckList[1][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "弗雷爾卓德": deckList[2][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "愛歐尼亞": deckList[3][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "諾克薩斯": deckList[4][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "皮爾托福 & 佐恩": deckList[5][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
          case "闇影島": deckList[6][i] = `**[${data[j].cost}]** ${data[j].name} x${deck[i].count}`; break;
        }
      }
    }
  }

  if (deckList[0].length > 0) {
    deckList[0].sort();
    const bilgeIcon = client.emojis.cache.get("720912066612822057");
    embed.addField(`${bilgeIcon} 比爾吉沃特`, deckList[0].join("\n"), true);
  }

  if (deckList[1].length > 0) {
    deckList[1].sort();
    const demIcon = client.emojis.cache.get("720919748283465788");
    embed.addField(`${demIcon} 蒂瑪西亞`, deckList[1].join("\n"), true);
  }

  if (deckList[2].length > 0) {
    deckList[2].sort();
    const frelIcon = client.emojis.cache.get("720919748363288636");
    embed.addField(`${frelIcon} 弗雷爾卓德`, deckList[2].join("\n"), true);
  }

  if (deckList[3].length > 0) {
    deckList[3].sort();
    const ionIcon = client.emojis.cache.get("720919747792732172");
    embed.addField(`${ionIcon} 愛歐尼亞`, deckList[3].join("\n"), true);
  }

  if (deckList[4].length > 0) {
    deckList[4].sort();
    const noxIcon = client.emojis.cache.get("720919748069687296");
    embed.addField(`${noxIcon} 諾克薩斯`, deckList[4].join("\n"), true);
  }

  if (deckList[5].length > 0) {
    deckList[5].sort();
    const piltIcon = client.emojis.cache.get("720919748078206986");
    embed.addField(`${piltIcon} 皮爾托福 & 佐恩`, deckList[5].join("\n"), true);
  }

  if (deckList[6].length > 0) {
    deckList[6].sort();
    const shadIcon = client.emojis.cache.get("720919748027744316");
    embed.addField(`${shadIcon} 闇影島`, deckList[6].join("\n"), true);
  }

  message.channel.send(embed);
}
