import { Client, GatewayIntentBits, Events } from "discord.js";
import { checkAbuse } from "./chat/check_abuse";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once(Events.ClientReady, () => {
    console.log(`🤖 Logged in as ${client.user?.tag}`);
});

client.on(Events.MessageCreate, async(message) => {
  if (message.author.bot) return;

  const msg = message.content;
  console.log(msg);
  try {
    if (await checkAbuse(msg)) {
      message.reply('detect');
    } else {
      console.log(`not detect : ${msg}`);
    }
  } catch(e) {
    console.warn(`error : ${msg}`);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);