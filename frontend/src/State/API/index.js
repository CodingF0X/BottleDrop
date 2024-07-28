import axios from "axios";

const API_Warehouse = axios.create({baseURL: 'http://localhost:5000'})
const API_Bar = axios.create({baseURL: 'http://localhost:9000'})


//-- Warehouse Routes --//
export const fetchWarehouseDetails = () => API_Warehouse.get('/api/warehouse/getAllBeverages')
export const addBeverage = (beverage) => API_Warehouse.post('/api/warehouse/beverage', beverage)

//-- Bar Routes --//
export const fetchAllBars = () => API_Bar.get('/api/bar/getAllBars');
export const getBarDetails = (id) => API_Bar.get(`/api/bar/${id}`)
export const replenishBar = (data,id) => API_Bar.patch(`/api/bar/${id}`,data)