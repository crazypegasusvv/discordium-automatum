import dotenv from 'dotenv';
import { ShardingManager } from 'discord.js';

dotenv.config()
const manager = new ShardingManager('./bot.js', { token: process.env.BOT_TOKEN });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();