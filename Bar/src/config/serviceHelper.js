const { client, fetchConfig } = require("./eurekaClient");
require("dotenv").config();
const { default: axios } = require("axios");
const CircuitBreaker = require('opossum');

const options = {
    timeout: 3000, // If the function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
  };


let config = {};

fetchConfig(process.env.SERVICE_NAME).then(conf => {
  config = conf;
//   console.log('Config fetched:', config);
});


async function getWarehouse_ServiceInstance() {
  const instances = client.getInstancesByAppId("Warehouse_Service");
  if (!instances || instances.length === 0) {
    throw new Error("No instances of Bar Service available");
  }
  return instances[Math.floor(Math.random() * instances.length)];
}

async function fetchDataFromWarehouse_Service() {
  const instance = await getWarehouse_ServiceInstance();
  console.log(instance);
  const url = `http://${instance.hostName}:${instance.port.$}${config['getAllBeverages.data.endpoint']}`;
  const response = await axios.get(url);
  return response.data;
}

async function sendReplenishmentRequest(data) {
    const instance = await getWarehouse_ServiceInstance();
    //console.log(instance)

    const url = `http://${instance.hostName}:${instance.port.$}${config['replenishBar.data.endpoint']}`;
    //console.log(url)
    const response = await axios.post(url, data);
   // console.log('cirkit')
    //console.log(response.data)
    return response.data;
  }


const fetchBreaker = new CircuitBreaker(fetchDataFromWarehouse_Service, options);
const replenishmentBreaker = new CircuitBreaker(sendReplenishmentRequest, options);

fetchBreaker.fallback((error) => {
    console.error('Circuit breaker fallback:', error);
    return 'Warehouse is currently unavailable.';
  });

replenishmentBreaker.fallback(() => 'Warehouse Service is currently unavailable.');



replenishmentBreaker.on('open', () => console.warn('Circuit breaker is open'));
replenishmentBreaker.on('halfOpen', () => console.warn('Circuit breaker is half-open'));
replenishmentBreaker.on('close', () => console.log('Circuit breaker is closed'));
replenishmentBreaker.on('fire', () => console.log('Circuit breaker fired'));
replenishmentBreaker.on('reject', () => console.warn('Circuit breaker rejected request'));
replenishmentBreaker.on('timeout', () => console.error('Circuit breaker request timed out'));
replenishmentBreaker.on('success', () => console.log('Circuit breaker request succeeded'));
replenishmentBreaker.on('failure', (error) => console.error('Circuit breaker request failed:', error));


module.exports = { fetchBreaker, replenishmentBreaker };
