import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

// sessions is used for authentication
const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,  // How long they stay signed in
    secret: process.env.COOKIE_SECRET
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        //Add initial roles
    }
});

export default withAuth(config({
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
        User,   // Property name and value are the same. 
        Product,
        ProductImage
    }),
    ui: {
        // Show the UI only for people who pass this test
        isAccessAllowed: ({ session }) => {
            // console.log(session);
            return !!session?.data;  // If there is a session and there is a session.data it will return true - logged in. Will return as a boolean due to the !! in front.
        },
    },
    session: withItemData(statelessSessions(sessionConfig), {
        // GraphQL Query
        User: `id`
    })
}));