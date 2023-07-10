import mongoose from "mongoose";

export default class connectMongo {
    private db: void | typeof mongoose | null;
    static connectDB: any;
    constructor() {
        this.db = null
    }

    public async connectDB() {
        try {
            this.db = await mongoose.connect(process.env.DB_URL || "").then(()=> {
                console.error('Connect mongodb!!')
            }).catch(err => {
                console.error('Database connection error: ' + err.message);
            })
            // return cb(null, {
            //     db: this.db
            // })
        } catch (error) {
            throw error
        }
    }
}