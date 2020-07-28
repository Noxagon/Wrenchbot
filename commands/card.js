const Discord = require("discord.js");
const fs = require('fs');
//var express = require("express");
var data = require("../data/set.json");
var stringSimilarity = require('string-similarity');

const leftArrow = '⬅️';
const rightArrow = '➡️';
const crossMark = '❌';

exports.run = async(client, message, args) => {
  var assoc = [];
  if (!args.length) {
    return message.channel.send(`Please name me a card, ${message.author}!`);
  }
  
  if (args[0] == "help") {
      return message.channel.send("h!help");
  }

  let cardName = args.splice(0).join(" ");
  for (var i = 0; i < data.length; i++) { 
    if (stringSimilarity.compareTwoStrings(cardName.toLowerCase(), data[i].name.toLowerCase()) > 0.65) {
      assoc[0] = data[i].cardCode;
      if (data[i].associatedCardRefs.length > 0) {
        Array.prototype.push.apply(assoc, data[i].associatedCardRefs)
      }
      break;
    }
  }

  let num = 0;
  if (assoc.length > 0) {
    createMessage(num);
  }

  async function createMessage(num) {
    //console.log("https://cdn.glitch.com/26dc575a-5306-48e2-a9f6-5438d8c8383f%2F"+assoc[num]+".png?v=1592192713896");
    let image = await message.channel.send({files: [`./images/${assoc[num]}.png`]}); //{files: ["https://cdn.glitch.com/26dc575a-5306-48e2-a9f6-5438d8c8383f%2F"+assoc[num]+".png?v=1592192713896"] });

    if (num > 0) {
      image.react(leftArrow);
    }

    image.react(crossMark);

    if (num < assoc.length - 1) {
      image.react(rightArrow);
    }

    const backFilter = (reaction, user) => reaction.emoji.name === leftArrow && user.id === message.author.id;
    const exitFilter = (reaction, user) => reaction.emoji.name === crossMark && user.id === message.author.id;
    const forwFilter = (reaction, user) => reaction.emoji.name === rightArrow && user.id === message.author.id;

    const back = image.createReactionCollector(backFilter, {time: 30000});
    const exit = image.createReactionCollector(exitFilter, {time: 30000});
    const forw = image.createReactionCollector(forwFilter, {time: 30000});

    back.on('collect', r=> {
      image.delete().catch(error => {
	if (error.code !== Discord.Constants.APIErrors.UNKNOWN_MESSAGE) {
		console.error('Failed to delete the message:', error);
	}
      });
      num = num - 1;
      createMessage(num)
    })

    exit.on('collect', r=> {
      image.delete().catch(error => {
	if (error.code !== Discord.Constants.APIErrors.UNKNOWN_MESSAGE) {
		console.error('Failed to delete the message:', error);
	}
      });
    });

    exit.on('end', r=> {
      image.delete().catch(error => {
	if (error.code !== Discord.Constants.APIErrors.UNKNOWN_MESSAGE) {
		console.error('Failed to delete the message:', error);
	}
      });
    });

    forw.on('collect', r=> {
      image.delete().catch(error => {
	if (error.code !== Discord.Constants.APIErrors.UNKNOWN_MESSAGE) {
		console.error('Failed to delete the message:', error);
	}
      });
      num = num + 1;
      createMessage(num)
    });
  }
}
