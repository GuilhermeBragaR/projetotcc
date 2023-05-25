const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(`mongodb+srv://Guilherme:${process.env.DB_PASSWORD}@cluster0.hpjbors.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    } catch {
        console.log(error)
        process.exit()
    }
}

module.exports = { connectDatabase }
