import axios from "axios";

const BASE_URL = "http://localhost:8000/api/"
const TOKEN = ""

export const poblicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` }
})