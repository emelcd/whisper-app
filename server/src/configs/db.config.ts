import { connect } from 'mongoose'

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://192.168.122.251:27017/super'

connect(MONGO_URI, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to MongoDB')
  }
})
