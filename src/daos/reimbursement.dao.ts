import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlReimbursement } from '../util/reimbursement.converter';
import Reimbursement from '../models/reimbursement';

export async function findByStatusId (statusId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
    
        let queryString = `
        SELECT r.reimbursement_id, au.user_id, au.username, 
            au.first_name, au.last_name, au.email, ur.role_id, 
            ur.role_type, r.amount, r.date_submitted, r.date_resolved, 
            r.resolver, rt.type_id, r.description, rt.reim_type,
            rs.status_id, rs.reim_status
        FROM reimbursement r
            INNER JOIN app_user au
            ON (au.user_id = r.author)
                INNER JOIN app_user u
                ON (u.user_id = r.resolver)
                    INNER JOIN user_role ur
                    ON (ur.role_id = au.role_id)
                        INNER JOIN reimbursement_status rs
                        ON (r.reim_status = rs.status_id)
                            INNER JOIN reimbursement_type rt
                            ON (r.reim_type = rt.type_id)
        WHERE rs.status_id = $1
        `;
        const result = await client.query(queryString, [statusId]);
        return result.rows.map(convertSqlReimbursement); 
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
    return undefined;
};

export async function findByUserId(userId: number){
    let client: PoolClient;
    try {
        client = await connectionPool.connect();

        let queryString = `
        SELECT r.reimbursement_id, au.user_id, au.username, 
            au.first_name, au.last_name, au.email, ur.role_id, 
            ur.role_type, r.amount, r.date_submitted, r.date_resolved, 
            r.resolver, rt.type_id, r.description, rt.reim_type,
            rs.status_id, rs.reim_status
        FROM reimbursement r
            INNER JOIN app_user au
            ON (au.user_id = r.author)
                INNER JOIN app_user u
                ON (u.user_id = r.resolver)
                    INNER JOIN user_role ur
                    ON (ur.role_id = au.role_id)
                        INNER JOIN reimbursement_status rs
                        ON (r.reim_status = rs.status_id)
                            INNER JOIN reimbursement_type rt
                            ON (r.reim_type = rt.type_id)
        WHERE r.author = $1
        `;
        const result = await client.query(queryString, [userId]);
        return result && result.rows.map(convertSqlReimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
    return  undefined;
};

export async function findReimbursementById(reimbursementId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
    
        let queryString = `
        SELECT r.reimbursement_id, au.user_id, au.username, 
            au.first_name, au.last_name, au.email, ur.role_id, 
            ur.role_type, r.amount, r.date_submitted, r.date_resolved, 
            r.resolver, rt.type_id, r.description, rt.reim_type,
            rs.status_id, rs.reim_status
        FROM reimbursement r
            INNER JOIN app_user au
            ON (au.user_id = r.author)
                INNER JOIN app_user u
                ON (u.user_id = r.resolver)
                    INNER JOIN user_role ur
                    ON (ur.role_id = au.role_id)
                        INNER JOIN reimbursement_status rs
                        ON (r.reim_status = rs.status_id)
                            INNER JOIN reimbursement_type rt
                            ON (r.reim_type = rt.type_id)
        WHERE reimbursement_id = $1;
        `;
        const result = await client.query(queryString, [reimbursementId]);
        return result && result.rows.map(convertSqlReimbursement); 
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
    return undefined;
}

export async function save(reimbursement: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
        INSERT INTO reimbursement (author, amount, date_submitted, date_resolved, description, resolver, reim_status, reim_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING reimbursement_id
        `;
        const params = [reimbursement.author.userId, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved,
        reimbursement.description, reimbursement.resolver.userId, reimbursement.status.statusId, reimbursement.type.typeId];
        const result = await client.query(queryString, params);
        return result && result.rows[0].userId;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('greek member has submitted reimbursement hours');
    return undefined;
};

export async function patch(reimbursement: Reimbursement) {
    const prevReimbursement = await findReimbursementById(reimbursement.reimbursementId);
    if (!prevReimbursement)
    {
        return undefined;
    }
    reimbursement = {
        ...prevReimbursement,
        ...reimbursement
    };
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
        UPDATE reimbursement
            SET author = $2, amount = $3, date_submitted = $4, date_resolved = $5, description = $6, 
                resolver = $7, reim_status = $8, reim_type = $9
            WHERE reimbursement_id = $1;
        `;
        const params = [reimbursement.reimbursementId, reimbursement.author.userId, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved,
            reimbursement.description, reimbursement.resolver.userId, reimbursement.status.statusId, reimbursement.type.typeId];
            await client.query(queryString, params);
            return reimbursement;
        } catch (err) {
            console.log(err);
        } finally {
            client && client.release();
        }
        console.log('updated reimbursement hours');
        return undefined;
}