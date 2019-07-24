import User from '../models/users';
import Roles from '../models/roles';

export function convertSqlUser(row: any) {
    return new User(row.user_id, row.username, row.password, row.first_name, row.last_name, 
    row.email, new Roles(row.role_id, row.role_type));
};