(function () {
  const { MongoClient, ServerApiVersion } = require("mongodb");

  const uri =
    "mongodb+srv://startek591:Github34736@cluster0.lqomoad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("✅ Successfully connected to MongoDB Atlas");
    } finally {
      await client.close();
    }
  }
  run().catch(console.error);
})();
