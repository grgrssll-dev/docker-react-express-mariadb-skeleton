import { ReplicationOptions, ModelStatic, Sequelize } from 'sequelize';
import * as modelFiles from './models/index';
import config from './config';

type ModelFiles = Record<string, unknown>;
type Models = Record<string, ModelStatic<any>>;

const dbConfig = config.db;

console.log(JSON.stringify(dbConfig, null, 4));

function registerModels(modelFiles: ModelFiles, sequelize: Sequelize, tablePrefix = ''): void {
    const models: Models = {};
    const associateFunctions: ((models: Models) => void)[] = [];

    Object.keys(modelFiles).forEach((model) => {
        // @ts-ignore
        modelFiles[model].default(sequelize, tablePrefix);
        // @ts-ignore
        models[model] = modelFiles[model][model];
        // @ts-ignore
        if (modelFiles[model]?.associate) {
            // @ts-ignore
            associateFunctions.push(modelFiles[model].associate);
        }
    });

    associateFunctions.forEach((fn) => fn(models));
};

type DBConfig = {
    database: string;
    host: string[];
    port: number;
    user: string;
    pass: string;
};


const getReplicationConfig = (conf: DBConfig): ReplicationOptions => {
    const dbs = conf.host.map((nodeHost) => ({
        host: nodeHost,
        port: conf.port,
        username: conf.user,
        password: conf.pass,
    }));

    return {
        read: dbs,
        write: dbs[0],
    };
};

const replication = getReplicationConfig(dbConfig);

export const sequelize = new Sequelize(dbConfig.database, '', '', {
    logging: dbConfig.logging,
    dialect: 'mariadb',
    dialectOptions: { useUTC: false },
    timezone: '-7:00',
    replication,
    pool: {
        max: dbConfig.maxConnections,
        min: 0,
        acquire: dbConfig.timeout,
        idle: dbConfig.timeout,
    },
});

export default async function connectToDB(): Promise<Sequelize> {
    await sequelize
        .authenticate()
        .then(() => registerModels(modelFiles, sequelize))
        .then(() => {
            if (config.env === 'DEVELOPMENT') {
                const line1 = 'DATABASE';
                const line2 = ` \`${dbConfig.database}\` db connection has been established successfully.`;
                const line3 = ` Read DBs: ${replication.read.map((db) => db.host).join(',')}.`;
                const line4 = ` Write DBs: ${replication.write.host}.`;
                console.log( // eslint-disable-line no-console
                    ` ╔${'═'.repeat(78)}╗\n`,
                    `║${' '.repeat(Math.floor((78 - line1.length) / 2))}${line1}${' '.repeat(Math.ceil((78 - line1.length) / 2))}║\n`,
                    `╠${'═'.repeat(78)}╣\n`,
                    `║${line2}${' '.repeat(78 - line2.length)}║\n`,
                    `║${line3}${' '.repeat(78 - line3.length)}║\n`,
                    `║${line4}${' '.repeat(78 - line4.length)}║\n`,
                    `╚${'═'.repeat(78)}╝`,
                );
            }
        })
        .catch((err) => console.error('Unable to connect to the database:', err)); // eslint-disable-line no-console
    return sequelize
}
