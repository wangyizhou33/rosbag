const { open } = require('rosbag');

async function logMessagesFromFooBar() {
    // open a new bag at a given file location:
    const bag = await open('../demo.bag');

    // read all messages from both the '/foo' and '/bar' topics:
    await bag.readMessages({
        topics: ['/radar/tracks'],
        startTime: { sec: 1490150297, nsec: 0 }
    }, (result) => {
        // topic is the topic the data record was in
        // in this case it will be either '/foo' or '/bar'
        console.log(result.topic);

        // message is the parsed payload
        // this payload will likely differ based on the topic
        console.log(result.message);

        // message's timestamp
        console.log("message timestamp", result.timestamp)
    });

    console.log("bag end time", bag.endTime); // sec: 1490150297, nsec: 996942588
    console.log("bag start time", bag.startTime); // sec: 1490150278, nsec: 1878520
}

logMessagesFromFooBar();