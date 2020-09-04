const Discord = require('discord.js');
const fs = require('fs');
var data = require("../data/set.json");

exports.run = async(client, message, args) => {
  let amt = 0;
  let regions = ["bw","si","io","fr","nx","pz","de","mt"];
  let units = [];
  let spells = [];
  let champs = [];

  let mana = args[0];
  let reg1 = args[1];
  let reg2 = args[2];

  if (!isNaN(mana)) {
    amt = mana;
  } else {
    return message.channel.send("Please provide a valid mana amount!");
  }

  if (reg1 == null) {
    return message.channel.send("Please provide at least one region, or at most two! \n > Region codes: " +
                                "\n > - BW (Bilgewater) \n > - SI (Shadow Isles) \n > - IO (Ionia) \n > - FR (Freljord)" +
                                "\n > - NX (Noxus) \n > - PZ (Piltover & Zaun) \n > - DE (Demacia) \n > - MT (Targon)");
  }

  let embed = new Discord.MessageEmbed();

  if (reg1 != null) {
    switch (reg1.toLowerCase()) {
      case "bw":
        search("Bilgewater", amt);
        break;
      case "si":
        search("ShadowIsles", amt);
        break;
      case "io":
        search("Ionia", amt);
        break;
      case "fr":
        search("Freljord", amt);
        break;
      case "nx":
        search("Noxus", amt);
        break;
      case "pz":
        search("PiltoverZaun", amt);
        break;
      case "de":
        search("Demacia", amt);
        break;
      case "mt":
        search("Targon", amt);
        break;
    }
  }

  if (reg2 != null) {
    switch (reg2.toLowerCase()) {
      case "bw":
        search("Bilgewater", amt);
        break;
      case "si":
        search("ShadowIsles", amt);
        break;
      case "io":
        search("Ionia", amt);
        break;
      case "fr":
        search("Freljord", amt);
        break;
      case "nx":
        search("Noxus", amt);
        break;
      case "pz":
        search("PiltoverZaun", amt);
        break;
      case "de":
        search("Demacia", amt);
        break;
      case "mt":
        search("Targon", amt);
        break;
    }
  }

  function search(region, amount) {
    for (var j = 0; j < data.length; j++) {
      if (data[j].regionRef == region && data[j].cost == amount) {
        if (data[j].type == "Unit") {
          if (data[j].supertype == "Champion") {
            champs.push("**[" + data[j].attack + "/" + data[j].health + "]** " + data[j].name);
          } else {
            units.push("**[" + data[j].attack + "/" + data[j].health + "]** " + data[j].name);
          }
        }

        if (data[j].type == "Spell") {
          spells.push(data[j].name);
        }
        //console.log(data[j].name);
      }
    }
  }

  if (champs.length > 0) {
      embed.addField("Champions:", champs.join("\n"), true);
  }

  if (units.length > 0) {
    embed.addField("Units:", units.join("\n"), true);
  }

  if (spells.length > 0) {
    embed.addField("Spells:", spells.join("\n"), true);
  }

  message.channel.send(embed);

}
