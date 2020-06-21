const emotes = require('./emotes');

class Detector {
  constructor() {
    this.mostUsed = {};
    this.mostUsedEmote = "";
    this.mostUsedEmoteCount = 0;
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

  getMostUsed() {
    return {
      "emote": this.mostUsedEmote,
      "count": this.mostUsedEmoteCount
    }
  }
}

module.exports = { Detector };