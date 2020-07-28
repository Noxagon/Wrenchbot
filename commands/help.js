const { DeckEncoder } = require('runeterra');
const Discord = require('discord.js');
const fs = require('fs');
var data = require("../data/set.json");

exports.run = async(client, message, args) => {

  let embed = new Discord.MessageEmbed(); //.setTitle("Choose your region:");
  
  embed.addField("h!decklist <deck-code>", " - To view the deck list of the code");
  embed.addField("h!rank <empty|name|rank>", " - To view the list of Masters or details by name/rank");
  embed.addField("h!card <card-name>", " - To view a specific card by name, and related ones too");

  message.channel.send(embed);
}
