const { client, fetchConfig } = require("./eurekaClient");
require("dotenv").config();
const { default: axios } = require("axios");
const CircuitBreaker = require("opossum");

const options = {
  timeout: 3000, // If the function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000, // After 30 seconds, try again.
};

let config = {};

fetchConfig(process.env.SERVICE_NAME).then((conf) => {
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

async function getDropPointInstance() {
  const instances = client.getInstancesByAppId("drop_point");
  if (!instances || instances.length === 0) {
    throw new Error("No instances of Bar Service available");
  }
  return instances[Math.floor(Math.random() * instances.length)];
}

async function fetchDataFromWarehouse_Service() {
  const instance = await getWarehouse_ServiceInstance();
  console.log(instance);
  const url = `http://${instance.hostName}:${instance.port.$}${config["getAllBeverages.data.endpoint"]}`;
  const response = await axios.get(url);
  return response.data;
}

async function sendReplenishmentRequest(data) {
  const instance = await getWarehouse_ServiceInstance();
  const url = `http://${instance.hostName}:${instance.port.$}${config["replenishBar.data.endpoint"]}`;
  const response = await axios.post(url, data);

  return response.data;
}

async function sendEmptiesToWarehouse(emptyBottles) {
  const instance = await getDropPointInstance();
  const url = `http://${instance.hostName}:${instance.port.$}${config["emptyBottles.data.endpoint"]}`;
  const response = await axios.post(url, emptyBottles);

  return response.data;
}

const fetchBreaker = new CircuitBreaker(
  fetchDataFromWarehouse_Service,
  options
);
const replenishmentBreaker = new CircuitBreaker(
  sendReplenishmentRequest,
  options
);
const emptyBottlesBreaker = new CircuitBreaker(sendEmptiesToWarehouse, options);

function setupCircuitBreakerEventHandlers(breaker) {
  breaker.on("open", () => console.warn("Circuit breaker is open"));
  breaker.on("halfOpen", () => console.warn("Circuit breaker is half-open"));
  breaker.on("close", () => console.log("Circuit breaker is closed"));
  breaker.on("fire", () => console.log("Circuit breaker fired"));
  breaker.on("reject", () => console.warn("Circuit breaker rejected request"));
  breaker.on("timeout", () =>
    console.error("Circuit breaker request timed out")
  );
  breaker.on("success", () => console.log("Circuit breaker request succeeded"));
  breaker.on("failure", (error) =>
    console.error("Circuit breaker request failed:", error)
  );
}

fetchBreaker.fallback(() => "Warehouse is currently unavailable.");

replenishmentBreaker.fallback(
  () => "Warehouse Service is currently unavailable."
);

emptyBottlesBreaker.fallback(() => "Drop point is currently unavailable.");

setupCircuitBreakerEventHandlers(fetchBreaker);
setupCircuitBreakerEventHandlers(replenishmentBreaker);
setupCircuitBreakerEventHandlers(emptyBottlesBreaker);

module.exports = { fetchBreaker, replenishmentBreaker, emptyBottlesBreaker };
