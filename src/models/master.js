import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const MasterSchema = new Schema (
    {
        username: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
          },
        fullname: {
            type: String,
            trim: true,
            required: true
        },
        access_level: {
            type: String,
            enum:["developer","tester","collaborator"],
            default: "collaborator",
            trim: true,
            required: true
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