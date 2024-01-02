import mongoose from "mongoose";
require('dotenv').config()

console.log(process.env)

const user = process.env.MONGOUSER
const password = process.env.MONGOPASS
const cluster = process.env.MONGOCLUST

const configOptions = {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectToDB = async () => {
    const connectionUrl =
        // try {
        `mongodb+srv://${user}:${password}@${cluster}.fzyfrtb.mongodb.net/`;

    console.log(connectionUrl)

    mongoose
        .connect(connectionUrl, configOptions)
        .then(() => console.log("Mongo database connected successfully!"))
        .catch((err) =>
            console.log(`Getting Error from DB connection ${err.message}`)
        );

    // } catch (error) {
    //     console.log(error);
    //     console.log("Error in connection to the database");
    // }
};

export default connectToDB;