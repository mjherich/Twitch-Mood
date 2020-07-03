const detector = require('./detection');

const msg1 = "test Kappa test KKona Kappa";
const msg2 = "test KKona test KKona Kappa";
const msg3 = "test KKona test KKona Kappa";
const emptyMsg = "test weiner";


// create new detector

describe("Testing the detector class", () => {
    it('keeps track of most common emote', () => {
        let Detector = new detector.Detector(50);
        Detector.msgHandler(msg1);
        expect(Detector.getMostUsed().emote).toBe('Kappa');
        
        Detector.msgHandler(msg2);
        expect(Detector.getMostUsed().emote).toBe('Kappa');

        Detector.msgHandler(msg3);
        expect(Detector.getMostUsed().emote).toBe('KKona');
    })

    it(' doesn\'t log anything if no emote detected', () => {
        let Detector = new detector.Detector();
        Detector.msgHandler(emptyMsg);
        expect(Detector.mostUsed).toMatchObject({});
    })
});
