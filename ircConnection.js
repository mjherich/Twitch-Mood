require('dotenv').config();
const tmi = require('tmi.js'); // Twitch IRC SDK
const detection = require('./detection');

// Create Detector
const Detector = new detection.Detector();

// Define configuration options
console.log('bot username: ', process.env.BOT_USERNAME);
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const message = msg.trim();

  // console.log(message);
  Detector.msgHandler(message);

  console.log(Detector.mostUsedEmote);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
