import mongoose from 'mongoose';

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}

const connectToDb = async () => {
    const connectUrl = 'mongodb+srv://jcashley4363:72dLTnyrHnIM7tUs@cluster0.fzyfrtb.mongodb.net/'

    mongoose.connect(connectUrl, configOptions).then(() => console.log('we done did connected to the database')).catch(err => console.error('gettin error from db connection', err.message))

}

export default connectToDb;