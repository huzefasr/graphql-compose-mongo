import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';


const PermissionSchema = new Schema (
    {
        entity: {
            type: String,
        },
        level: {
            type: Number
        }
    }
);


export const RolesSchema = new Schema (
    {
        type: {
            type: String,
        },
        created_by: {
            type: String,
          },
        jamaat: {
            type: Schema.Types.ObjectId,
            ref: "Jamaat"
        },
        permission: {
            type: [PermissionSchema],
        }
    },
    {
        collection: 'roles',
    }
);

RolesSchema.plugin(timestamps);

RolesSchema.index({ createdAt: 1, updatedAt: 1 });

export const Roles = mongoose.model('Roles', RolesSchema);
export const RolesTC = composeWithMongoose(Roles);