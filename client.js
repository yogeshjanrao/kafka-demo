//Kafka broker connection

const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    clientId: "kafka-test",
    brokers:["<PRIVATE-IP>:9092"]
});