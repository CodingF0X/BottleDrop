const { client } = require("./eurekaClient");
require("dotenv").config();
const { default: axios } = require("axios");

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
  const url = `http://${instance.hostName}:${instance.port.$}/api/warehouse/getAllBeverages`;
  const response = await axios.get(url);
  return response.data;
}

module.exports = { fetchDataFromWarehouse_Service };
