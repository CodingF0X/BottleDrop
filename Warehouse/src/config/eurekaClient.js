const Eureka = require('eureka-js-client').Eureka;
const axios = require('axios');
require('dotenv').config();

const SERVICE_NAME = process.env.SERVICE_NAME
const eurekaPort = process.env.EUREKA_PORT


const client = new Eureka({
    instance: {
      app: SERVICE_NAME,
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      statusPageUrl: `http://localhost:${process.env.PORT}`,
      port: {
        '$': process.env.PORT,
        '@enabled': true,
      },
      vipAddress: SERVICE_NAME,
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: 'localhost',
      port: eurekaPort,
      servicePath: '/eureka/apps/'
    }
  });
  
  module.exports = {
    client
};
  