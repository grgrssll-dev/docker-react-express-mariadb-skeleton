require('dotenv').config();

const config = {
    env: process.env.NODE_ENV === "production" ? 'production' : 'development',
    port: process.env.PORT || 3001,
    db: {
        logging: (process.env.SQL_LOG === '1' || false),
        maxConnections: +(process.env.DB_MAX_CONNECTIONS as string) || 5,
        timeout: +(process.env.DB_TIMEOUT as string) || 3600,
        database: process.env.DB_NAME || 'map_quiz',
        host: process.env.DB_HOST ? process.env.DB_HOST.split(',') : [''],
        port: +(process.env.DB_PORT as string) || 3306,
        user: process.env.DB_USER || 'map',
        pass: process.env.DB_PASS || 'abcd',
    }
};

export default config;
