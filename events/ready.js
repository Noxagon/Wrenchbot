module.exports = (client) => {
  console.log(`HeimerBot is ready!`);
  client.user.setPresence({ activity: { name: 'Legends of Runeterra', type: 'WATCHING' }, status: 'online' });
}
