import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../util/user.converter';
import Users from '../models/users';


export async function findAll(){
    console.log('Finding all greek members');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`
        SELECT * FROM app_user 
            JOIN user_role USING(role_id) 
            ORDER BY role_id, user_id`);
        return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release(); 
    }
    console.log('Found all greek members');
    return undefined;
};

export async function findByUsernameAndPassword(username: string, password: string){
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT app_user.*, user_role.role_type 
            FROM app_user
            LEFT JOIN user_role
            ON app_user.role_id = user_role.role_id
                WHERE username = $1 AND userpassword = $2
        `;
        const result = await client.query(queryString, [username, password]);
        const sqlUser = result.rows[0];
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release(); 
    }
    return undefined;
};

export async function findById (userId: number) {
    console.log('Finding greek member by id: ' + userId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`
        SELECT au.*, ur.role_type  
            FROM app_user AS au
            LEFT JOIN user_role AS ur
            ON au.role_id = ur.role_id WHERE user_id = $1`, [userId]);
        const sqlUser = result.rows[0];
        //console.log(sqlUser);
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}; 

export async function create(user: Users) {
    console.log('Creating new greek user');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        INSERT INTO app_user (username, userpassword, first_name, last_name, email, role_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id;`
        const params = [user.username, user.password, user.firstName, 
        user.lastName, user.email, user.role.roleId];
        const sqlUser = await client.query(queryString, params);
        return sqlUser && sqlUser.rows[0];
    } catch (err) {
        console.log(err)
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function update(user: Partial<Users>) {
    const oldUser = await findById(user.userId);
    //console.log(oldUser);
    if (!oldUser) {
        return undefined;
    }
    user = {
        ...oldUser,
        ...user
    };
    console.log(user);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            UPDATE app_user SET username = $1, userpassword = $2, first_name = $3, last_name = $4, email = $5, role_id = $6
            WHERE user_id = $7
            RETURNING *
        `;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.role.roleId, user.userId];
        const result = await client.query(queryString, params);
        const sqlUser = result.rows[0];
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log(`Updated members' information`);
    return undefined;
};