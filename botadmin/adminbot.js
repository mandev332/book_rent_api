import { config } from "dotenv";
config();

import fs from "fs";
import path from "path";
import TelegramBot from "node-telegram-bot-api";
import geoFinder from "../utils/geoFinder.js";
console.log(process.env.API_KEY);
const bot = new TelegramBot(process.env.API_KEY, {
  polling: true,
});
export default bot;
