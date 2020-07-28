const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let embed = new Discord.MessageEmbed().setTitle("Choose your region:");
  const asIcon = client.emojis.cache.get("720919748283465788");
  const euIcon = client.emojis.cache.get("720919748283465788");
  const seaIcon = client.emojis.cache.get("720919748283465788");
  const usIcon = client.emojis.cache.get("720919748283465788");
  
  embed.addField("Asia", "h!rankas <empty|name|rank>");
  embed.addField("Europe", "h!rankeu <empty|name|rank>");
  embed.addField("SEA", "h!ranksea <empty|name|rank>");
  embed.addField("Americas", "h!rankna <empty|name|rank>");
  
  message.channel.send(embed);
}