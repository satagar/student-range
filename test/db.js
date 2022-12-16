const {MongoMemoryServer} = require('mongodb-memory-server');
const { default: mongoose } = require('mongoose');
let mongod;
exports.connectDB = async ()=>{
   if(!mongod){
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri();
    await mongoose.connect(uri);
   }
}
exports.clearDB = async ()=>{
    const collections = mongoose.connection.collections;
    for(let key in collections){
        const collData = collections[key]
        await collData.deleteMany()
    }
}
exports.closeDB = async ()=>{
       await mongoose.connection.dropDatabase();
       await mongoose.connection.close();
       if(mongod){
             await mongod.stop()
       }
}