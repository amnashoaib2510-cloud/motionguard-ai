const dns = require("dns");

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://motionadmin:MotionGuard12345@motionadmin.wcirb5u.mongodb.net/motiondb?retryWrites=true&w=majority&appName=motionadmin";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log("Connecting...");
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    console.log("✅ Connected Successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();