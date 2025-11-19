import pkg from "ioredis";
const { createClient } = pkg;
let client ;
// client.on("error", (err) => console.error("Redis Error:", err,process.env.REDIS_URL));

export const connectRedis = async () => {
  try {
    client = createClient({
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASS,
      host: 'redis-14718.c301.ap-south-1-1.ec2.cloud.redislabs.com',
      port: 14718
      
    });
    client.on("error", (err) => console.error("Redis Error:", err));
    if (!client.isOpen) {  // Prevents multiple connections
      await client.connect();
      console.log("\u{2705} Connected to Redis Cloud");
    }
  } catch (err) {
    console.error("\u{274C} Redis Connection Error:", err);
  }
};

export default client;
