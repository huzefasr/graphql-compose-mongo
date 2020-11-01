import {RolesTC} from '../models/roles';

export const RoleQuery = {
    jamaats: RolesTC.getResolver('findMany'),
    jamaatById: RolesTC.getResolver('findById'),
    testArgs: RolesTC.getResolver('findById')
};

export const RoleMutation = {
    createRole: RolesTC.getResolver('createOne'),
    editRole: RolesTC.getResolver("updateById"),
    removeRole: RolesTC.getResolver('removeOne'),
};
