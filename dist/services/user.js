"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsername = exports.createUser = void 0;
const db_1 = __importDefault(require("../util/db"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, first_name, last_name, encrypted_pass, profile_picture_url } = userData;
    const result = yield db_1.default.query(`INSERT INTO users (username, email, first_name, last_name, encrypted_pass, profile_picture_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`, [username, email, first_name, last_name, encrypted_pass, profile_picture_url]);
    return result.rows[0];
});
exports.createUser = createUser;
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return result.rows[0] || null;
});
exports.findUserByUsername = findUserByUsername;
