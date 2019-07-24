import Roles from "./roles";

export default class Users {
    constructor (
        public userId = 0,
        public username = '',
        public password = '',
        public firstName = '',
        public lastName = '',
        public email = '',
        public role = new Roles()
    ){}
};