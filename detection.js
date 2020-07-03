const LRU = require("lru-cache");
const emotes = require('./emotes');

class Detector {
  constructor(maxMsg) {
    this.mostUsed = {};
    this.mostUsedEmote = "";
    this.mostUsedEmoteCount = 0;

    // Initialize LRU Cache
    const options = {
      max: maxMsg,
      maxAge: 1000 * 60 * 60
    }
    this.LRU = new LRU()
    console.log('Created Detector...');
  }

  msgHandler(msg) {
    const words = msg.split(" ");

    let mostCommonEmote = "";
    let mostCommonEmoteCount = 0;
    let chatEmotes = {};
    for (let word of words) {
      if (emotes.STANDARD_EMOTES.has(word) || emotes.BETTER_TTV_EMOTES.has(word)) {
        if (word in chatEmotes) {
          chatEmotes[word] += 1;
        } else {
          chatEmotes[word] = 1;
        }
        if (chatEmotes[word] > mostCommonEmoteCount) {
          mostCommonEmote = word;
          mostCommonEmoteCount = chatEmotes[word];
        }
      }
    }
    
    if (true) {
      // LRU implementation
      this.LRU.set(mostCommonEmote, 1);
      if (this.LRU.has(mostCommonEmote)) {
        this.LRU.set(mostCommonEmote, this.LRU.get(mostCommonEmote) + 1);
      } else if (mostCommonEmote !== "") {
        this.LRU.set(mostCommonEmote, 1);
      }

      if (this.LRU.get(mostCommonEmote) > this.mostUsedEmoteCount) {
        this.mostUsedEmote = mostCommonEmote;
        this.mostUsedEmoteCount = this.mostUsed[mostCommonEmote];
      }
    } else {
      // Old implementation
      if (mostCommonEmote in this.mostUsed) {
        this.mostUsed[mostCommonEmote] += 1;
      } else if (mostCommonEmote !== ""){
        this.mostUsed[mostCommonEmote] = 1;
      }
      // Update most used
      if (this.mostUsed[mostCommonEmote] > this.mostUsedEmoteCount) {
        this.mostUsedEmote = mostCommonEmote;
        this.mostUsedEmoteCount = this.mostUsed[mostCommonEmote];
      }
    }
  }

  getMostUsed() {
    return {
      "emote": this.mostUsedEmote,
      "count": this.mostUsedEmoteCount
    }
  }
}

module.exports = { Detector };