const { DeckEncoder } = require('runeterra');
const Discord = require('discord.js');
const fs = require('fs');
var data = require("../data/set.json");

exports.run = async(client, message, args) => {

  let embed = new Discord.MessageEmbed(); //.setTitle("Choose your region:");

  embed.addField("h!decklist <deck-code>", " - To view the deck list of the code");
  embed.addField("h!rank <empty|name|rank>", " - To view the list of Masters or details by name/rank");
  embed.addField("h!card <card-name>", " - To view the specified card by name, and related ones too");
  embed.addField("h!mana <amt> <reg_1> <reg_2 (optional)>", " - To view a list of card with specified amount of mana \n > - BW (Bilgewater) \n > - SI (Shadow Isles) \n > - IO (Ionia) \n > - FR (Freljord) \n > - NX (Noxus) \n > - PZ (Piltover & Zaun) \n > - DE (Demacia) \n > - MT (Targon) ");

  message.channel.send(embed);
}
