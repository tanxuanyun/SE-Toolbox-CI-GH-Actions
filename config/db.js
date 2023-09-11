const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      console.log('Using Mock DB!')
      const { MongoMemoryServer } = require('mongodb-memory-server')
      const mongoServer = await MongoMemoryServer.create()
      await mongoose.connect(mongoServer.getUri(), { dbName: "test-db" })
    } else if (process.env.NODE_ENV === 'ci') {
      console.log('Using MongoDB with GitHub Actions!');
      await mongoose.connect('mongodb://127.0.0.1:27017/test-db');
    } else {
      const con = await mongoose.connect(process.env.MONGO_URI)
      console.log(`MongoDB Connected: ${con.connection.host}`)
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
