//Kafka producer process

const { log } = require('console');
const { kafka } = require('./client');

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function init() {
    //Connection for kafka producer 
    const producer = kafka.producer();

    log('Connecting producer ...');
    await producer.connect();

    log('Connected successfully ...');

    //Create promt message for producer

    rl.setPrompt('> ');
    rl.prompt();

    rl.on("line", async function (line) {
        const [riderName, location] = line.split(' ');
        
        //Producer set messages 
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() == "north" ? 0 : 1,
                    key: "location-updated",
                    value: JSON.stringify({name: riderName, location}) 
                }
            ]
        })
    }).on("close", async ()=> {
        //Disconnect producer 
        await producer.disconnect();
    });
}

init();