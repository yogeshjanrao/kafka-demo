//Kafka broker connection

const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    clientId: "kafka-test",
    brokers:["192.168.1.47:9092"]
});