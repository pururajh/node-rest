const config = {
    production: {
        secret: process.env.secret,
        MONGO_URI: process.env.MONGO_URI
    }, development: {
        secret: 'secret',
        MONGO_URI: 'mongodb://localhost:27017/practice'
    }
};

const getConfig = env => config[env] || config.development;
module.exports = getConfig;
