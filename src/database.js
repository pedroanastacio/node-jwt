import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const config = {
    uri: 'mongodb://localhost:27017/node-mongoose2',
    options: {
        useNewUrlParser: true,
        useFindAndModify: false,
    },
}

mongoose.connection.on('open', () => {
    console.log('Successfully connected to database')
})

mongoose.connection.on('error', () => {
    console.log('Could not connect to database')
})

export default {
    connect: () => mongoose.connect(config.uri, config.options)
}