import { createClient } from 'redis';
let client,data ;
// client.on("error", (err) => console.error("Redis Error:", err,process.env.REDIS_URL));

export const connectRedis = async () => {
  try {
    data={
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASS,
      socket:{
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10)
      }
    }
    client = createClient(data);
    client.on("error", (err) => console.error("Redis Error:", err));
    if (!client.isOpen) {  // Prevents multiple connections
      await client.connect();
      console.log("\u{2705} Connected to Redis Cloud");
    }
  } catch (err) {
    console.error("\u{274C} Redis Connection Error:", err);
  }
};

export const getRedisClient = () => {
  return client;
}


export default client;

