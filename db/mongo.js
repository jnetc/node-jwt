const mongoose = require('mongoose');

const mongoClient = async () => {
  const user = process.env.LOGIN;
  const pass = process.env.PASS;

  try {
    const db = await mongoose.connect(
      `mongodb+srv://${user}:${pass}@nodejs.eg0pt.mongodb.net/jwt`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log(`=> Connected to database...`);
    return db;
  } catch (error) {
    console.log(`=> Connection to database is failed!!!`);
    console.log(error);
  }
};

module.exports = mongoClient();
