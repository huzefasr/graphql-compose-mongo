import dotenv from 'dotenv'
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import mongoose from 'mongoose';

import './utils/db';
import schema from './schema';
import { jwtHandler } from './utils/jwtUtil'


dotenv.config();

const app = express();

const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/',
    context: ({req}) => {
        // const token = req.headers.authorization || '';
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZUlkIjoyLCJqYW1hYXQiOiI1ZjlhZGMwMzU2NjNiNjA3MTRiZjNhM2EiLCJwZXJtaXNzaW9uIjpbeyJlbnRpdHkiOiJVc2VyIiwibGV2ZWwiOiIxIn1dfQ.gQ1y5SggtqLhxCldSjif83LAmVr5ngRgIt9eWBZ6lzY"
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