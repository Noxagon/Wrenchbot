exports.run = async(client, message, args) => {
  //var resMsg = await msg.channel.send('Ping is being appreciated... :bar_chart:');
  const m = await message.channel.send({embed: {
    title: "PING..."
  }});
  m.edit({embed: {
    title: "PING!",
    description: [
      "**Latency**: `" + (m.createdTimestamp - message.createdTimestamp) + "ms`",
      "**API**: `" + Math.round(client.ws.ping) + "ms`"
    ].join("\n")
  }});
}