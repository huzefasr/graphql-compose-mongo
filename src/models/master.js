import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const MasterSchema = new Schema(
    {
        username: {
            type: String ,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        access_level:{
            type: String,
            enum: ["developer", "maintainer", "tester"]
        }
    },
    {
        collection: 'master',
    }
);

MasterSchema.plugin(timestamps);

MasterSchema.index({ createdAt: 1, updatedAt: 1 });

export const Master = mongoose.model('Master', MasterSchema);
export const MasterTC = composeWithMongoose(Master);