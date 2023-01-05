import mongoose from 'mongoose';
import dotenv from "dotenv-defaults"; 

dotenv.config();

export default{
    connect: () =>{
        // mongoose 
        mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }) 
        .then((res) => console.log("mongo db connection created"));

        // 開啟mongos DB
        const db = mongoose.connection;
        db.on("error", (err) => console.log(err));
        // db.once("open", async () => {
          
        // });
    }
}

