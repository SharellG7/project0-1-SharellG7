import Users from "./users";
import ReimbursementType from "./reimbursement-type";
import ReimbursementStatus from "./reimbursement-status";

export default class Reimbursement {
    constructor (
        public reimbursementId = 0,
        public author = new Users,
        public amount = 0,
        public dateSubmitted = 0,
        public dateResolved = 0,
        public description = " ",
        public resolver = new Users,
        public status = new ReimbursementStatus, 
        public type = new ReimbursementType
    ){}
};