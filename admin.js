//Kafka admin process

const { kafka } = require('./client');

async function init() {
    
    //Connection for kafka admin
    const admin = kafka.admin();
    console.log('Admin connecting ...');
    await admin.connect();
    console.log('Admin connect success ...');
    
    //Create topic
    console.log('Creating topic [rider-updates]');
    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numPartitions: 2
            }
        ]
        
    });
    console.log('Topic Created Success [rider-updates]');
    
    //Disconnect admin
    console.log('Disconnecting Admin ...');
    await admin.disconnect();
}

init();