import { Server, IndexController } from '@scripty/server';
import { Logger } from '@scripty/logger';
import { mongo } from '@scripty/mongo';
import ArticlesController from '../src';
import dotenv from 'dotenv'

const init = async () => {
    Logger.info('server is initializing');
    dotenv.config();

    const server = new Server();

    const mongoConfig = {
        server: process.env.server,
        db: process.env.db,
        user: process.env.user,
        password: process.env.password,
        port: process.env.port || 27017,
        options: {
            "encrypt": true
        }
    }

    const mongoose = await mongo(mongoConfig);

    await server.setDatabase(mongoose);

    await server.addController(
        new ArticlesController(),
        new IndexController({ title: 'articles' })
    );

    server.start(3014);
};

init().catch((err) => {
    console.error(err.message);
});
