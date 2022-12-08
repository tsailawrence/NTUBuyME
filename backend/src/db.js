import mongoose from 'mongoose'

export default {
    connect: () => {
        mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((res) => console.log('mongo db connection created'))
    },
}
