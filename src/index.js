const {dotenv} = require('dotenv');
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import mongoose from 'mongoose';

import './utils/db';
import schema from './schema';

dotenv.config();
import { jwtHandler } from './utils/jwtUtil'
// dotenv.config();

const app = express();


const server = new ApolloServer ({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/',
    context: ({req}) => {
        // const token = req.headers.authorization || '';
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZUlkIjoyLCJwZXJtaXNzaW9uIjpbeyJlbnRpdHkiOiJNYXN0ZXIiLCJsZXZlbCI6IjEifV19.DTtvFCuIj4_jewbmZ71-FGpQ9DusE_LEJP-gdBjKSHM"
        if(token){
            const decodedJwt = jwtHandler(token);
            return { decodedJwt };
        }
        return {}
    }
});

server.applyMiddleware({
    app,
    path: '/',
    cors: true,
    onHealthCheck: () =>
        // eslint-disable-next-line no-undef
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        }),
});

app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    console.log(`Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});