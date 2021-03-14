import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

// sessions is used for authentication
const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,  // How long they stay signed in
    secret: process.env.COOKIE_SECRET
};

export default config({
    // @ts-ignore
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL
        // Add data seeding here
    },
    lists: createSchema({
        // Schema items go in here
    }),
    ui: {
        // Change this for roles
        isAccessAllowed: () => true
    },
    // Add session values here
});