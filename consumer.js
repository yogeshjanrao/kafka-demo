//Creating kafka consumer

const { kafka } = require('./client');

//Creating group while run 
const group = process.argv[2];

//Connecting to kafka consumer
async function init() {
    //Connecting to consumer with group
    const consumer = kafka.consumer({ groupId: group });

    await consumer.connect();

    //Subscribe producer topic
    await consumer.subscribe({
        topics: ["rider-updates"],
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({
            topic, partition, message, heartbeat, pause
        }) => {
            console.log(
                `${group}: [${topic}] : PART: ${partition}`,
                message.value.toString());
        }
    })
}

init()