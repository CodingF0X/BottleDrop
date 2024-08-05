const Eureka = require("eureka-js-client").Eureka;
const axios = require("axios");
require("dotenv").config();

const eurekaPort = process.env.EUREKA_PORT;
const configServerUrl = process.env.CONFIG_SERVER_URL_LOCAL_MACHINE;

async function fetchConfig(serviceName) {
  try {
    const response = await axios.get(
      `${configServerUrl}/${serviceName}/default`
    );
    console.log(response.data.propertySources[0].source);
    return response.data.propertySources[0].source;
  } catch (error) {
    console.error("Failed to fetch config:", error);
    return {};
  }
}

const client = new Eureka({
  instance: {
    app: process.env.SERVICE_NAME,
    hostName: "localhost",
    ipAddr: "127.0.0.1",
    statusPageUrl: `http://localhost:${process.env.PORT}`,
    port: {
      $: process.env.PORT,
      "@enabled": true,
    },
    vipAddress: process.env.SERVICE_NAME,
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    host: "eureka-server" || "localhost",
    port: eurekaPort,
    servicePath: "/eureka/apps/",
  },
});

module.exports = {
  client,
  fetchConfig,
};
