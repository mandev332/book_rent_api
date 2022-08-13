import { config } from "dotenv";
config();

import fs from "fs";
import path from "path";
import TelegramBot from "node-telegram-bot-api";
import geoFinder from "../utils/geoFinder.js";
const bot = new TelegramBot(process.env.API_KEY, {
  polling: true,
});

bot.onText(/\/start/, async (msg) => {
  if (msg.from.is_bot) return;
  console.log(msg);
  if (msg.from.id == "21351") {
    await bot.sendSticker(
      admin,
      "https://tlgrm.eu/_/stickers/380/9fb/3809fbe6-317b-3085-99e6-09e74c1044b0/2.webp"
    );
  } else {
    await bot.sendSticker(
      msg.from.id,
      "https://tlgrm.eu/_/stickers/fc2/01a/fc201aad-5ea0-48fd-b779-f8a237ff21ae/2.webp"
    );
    await bot.sendMessage(
      msg.from.id,
      "Assalomu alaykum! " +
        "\n" +
        msg.from.first_name +
        "\nRO'YXAT 📋ni bosing!"
    );
  }
});

export default bot;
