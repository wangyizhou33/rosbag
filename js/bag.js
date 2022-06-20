const { open } = require('rosbag');
const sleep = require('util').promisify(setTimeout)

let startTime = { sec: 1490150297, nsec: 0 };  // 1490150297
let lastTime = { sec: startTime.sec, nsec: startTime.nsec };

class MessageStore {
    constructor() {
        this.store = new Array(0);
        this.next = 0;
    }

    push(msg) {
        this.store.push(msg);
    }

    length() {
        return this.store.length;
    }

    consume() {
        if (store.length != 0) {
            return this.store.shift();
        }
    }
}

let store = new MessageStore();

function delay(durationSec) {
    return new Promise((resolve) => setTimeout(resolve, durationSec * 1000));
}

function timeDiff(timeA, timeB) {
    return (timeB.sec - timeA.sec) * 1e9 + (timeB.nsec - timeA.nsec);
}

function getAllTopics({ connections }) {
    let topics = new Array();

    for (key in connections) {
        topics[key] = connections[key].topic;
    }

    return topics;
}

function periodicPublish(store) {
    void (async function (store) {

        let lastTime = undefined;

        while (true) {
            const msg = store.consume();

            if (lastTime && msg) {
                const currentTime = msg.timestamp;
                const delayTime = timeDiff(lastTime, currentTime) / 1e9;
                console.log(delayTime);
                await delay(delayTime);
            }
            else {
                await delay(1);
            }
            if (msg != undefined) {
                console.log(msg);
                lastTime = Object.assign({}, msg.timestamp);
            }
            else {
                console.log('no msg');
            }
        }
    })(store);
}

async function logMessagesFromFooBar(store) {

    // open a new bag at a given file location:
    const bag = await open('../demo.bag');
    startTime = bag.startTime;
    topics = getAllTopics(bag);

    await bag.readMessages({
        topics: ["/image_raw"],
        startTime: startTime
    }, (result) => {

        // don't print
        if (false) {
            // topic is the topic the data record was in
            // in this case it will be either '/foo' or '/bar'
            console.log(result.topic);

            // message is the parsed payload
            // this payload will likely differ based on the topic
            // console.log(result.message);

            // message's timestamp
            console.log("message timestamp", result.timestamp)
        }

        store.push({
            timestamp: result.timestamp,
            message: result.message
        });
    });

    // console.log("bag end time", bag.endTime); // sec: 1490150297, nsec: 996942588
    // console.log("bag start time", bag.startTime); // sec: 1490150278, nsec: 1878520
}

const pro = logMessagesFromFooBar(store);
periodicPublish(store)
