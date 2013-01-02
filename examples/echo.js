var mc = require('../');
var client = mc.createClient({
  username: process.env.MC_USERNAME,
  email: process.env.MC_EMAIL,
  password: process.env.MC_PASSWORD,
  verbose: true,
});
client.on('connect', function() {
  console.info("connected");
});
client.on('packet', function(packet) {
  if (packet.id !== 0x03) return;
  var match = packet.message.match(/^<(.+?)> (.*)$/);
  if (! match) return;
  var username = match[1];
  var msg = match[2];
  if (username === client.username) return;
  client.writePacket(0x03, {message: msg});
});
