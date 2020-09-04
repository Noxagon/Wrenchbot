exports.run = (client, message, args) => {
  let servers = client.guilds.cache.size;
  const guildNames = client.guilds.cache.map(g => g.name).join(", ")

  let guildList = guildNames.split(", ");
  guildList.sort();
  message.channel.send(guildList);
  message.channel.send(`> No. of servers joined: ${servers}`);
}
