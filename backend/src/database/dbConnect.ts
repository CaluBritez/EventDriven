import mongoose from "mongoose";

interface IConfiguration {
    mongoUrl: string;
}

export class DbConnect {
    private mongoUri: string;

    constructor({ mongoUrl }: IConfiguration) {
        this.mongoUri = mongoUrl;
    };

    async connect() {
        try {
            await mongoose.connect(this.mongoUri)
            console.log('Database connected')
        } catch (error) {
            console.error('Database connection failed');
        }
    }
};