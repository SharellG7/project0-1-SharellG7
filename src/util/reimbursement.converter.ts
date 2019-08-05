import Reimbursement from "../models/reimbursement";
import Users from "../models/users";
import Roles from "../models/roles";
import ReimbursementStatus from "../models/reimbursement-status";
import ReimbursementType from "../models/reimbursement-type";

export function convertSqlReimbursement (row: any) {
    return new Reimbursement(row.reimbursement_id,
        
        new Users(row.author, row.username, '', row.first_name,
        row.last_name, row.email, new Roles(row.role_id, row.role_type)),
        
        row.amount, row.date_submitted,
        row.date_resolved, row.description, 
        
        new Users(row.resolver, row.resolver_username, '', row.resolver_fN,
        row.resolver_lN, row.resolver_email, new Roles(row.role_id, row.role_type)), 
        
        new ReimbursementStatus(row.status_id, row.reim_status),
        
        new ReimbursementType(row.type_id, row.reim_type))
};

// export function convertSqlReimbursement(row: any) {
//    return new Reimbursement(row.reimbursement_id, row.author, 
//     row.amount, row.date_submitted, row.date_resolved, 
//     row.description, row.resolver, row.status, row.reimbursetype);
// }