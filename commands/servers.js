exports.run = (client, message, args) => {
  let servers = client.guilds.cache.size;
  const guildNames = client.guilds.cache.map(g => g.name).join("\n")
  
  message.channel.send(guildNames);
  message.channel.send(`> No. of servers joined: ${servers}`);
}