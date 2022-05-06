const mangoose  = require('mongoose');
const uri       = "mongodb://127.0.0.1:27017/YellowPages?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1";

const connection = async ()=>{
    try {
        await mangoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database Connected');
    } catch (error) {
        console.log("Can't Connect To Database, "+error);
    }
}

module.exports = connection;