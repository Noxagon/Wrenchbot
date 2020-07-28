const Discord = require("discord.js");
const fs = require("fs");
//var express = require("express");
var data = require("../data/set.json");

const leftArrow = "⬅️";
const rightArrow = "➡️";
const crossMark = "❌";

exports.run = async (client, message, args) => {
  var unit = [];
  var spell = [];

  if (!args[0]) {
    return message.channel.send(`Please provide a region, ${message.author}!`);
  }
  
  if (!args[1]) {
    return message.channel.send(`Please select either units or spells, ${message.author}!`);
  }

  let regionName = args[0];
  let choice = args[1];
  //let regionName = args.splice(0).join("");
  //console.log(regionName);
  let embed = new Discord.MessageEmbed().setTitle(`${regionName}'s ${choice}`);
  for (var i = 0; i < data.length; i++) {
    if (regionName.toLowerCase() == data[i].regionRef.toLowerCase()) {
      switch (data[i].type.toLowerCase()) {
        case "unit": unit[i] = `**[${data[i].cost}] (${data[i].attack}/${data[i].health})** ${data[i].name} `;
          break;
        case "spell": spell[i] = `**[${data[i].cost}]** ${data[i].name}`;
          break;
      }
    }
  }

  if (choice == "units" && unit.length > 0) {
    unit.sort();
    let array = unit.filter(function () { return true });    
    message.channel.send("Units: \n" + array.join("\n"));
    
    //embed.addField("Units: ", array.join("\n"), true);
    //message.channel.send(embed);
  }
  
  if (choice == "spells" && spell.length > 0) {
    spell.sort();
    let array2 = spell.filter(function () { return true });
    message.channel.send("Spells: \n" + array2.join("\n"));    
    
    //embed.addField("Spells: ", array2.join("\n"), true);
    //message.channel.send(embed);
  }
};
