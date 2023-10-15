export default ({
    PORT: process.env.PORT ?? 8080,
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET ?? 'secret_token',
    MONGO_URI: process.env.MONGO_URL ?? 'mongodb+srv://contacts:k4aHFj2MuI2vIGp4@cluster0.ty29as1.mongodb.net/?retryWrites=true&w=majority'
})