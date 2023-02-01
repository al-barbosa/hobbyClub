"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const ErrorHelper_1 = __importDefault(require("./ErrorHelper"));
const secret = process.env.JWT_SECRET;
const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '1d',
};
class TokenHandler {
    constructor() {
        this.createToken = (user) => jwt.sign(Object.assign({}, user), secret, jwtConfig);
        this.validateToken = (req, res, next) => {
            const { authorization: token } = req.headers;
            if (!token)
                throw new ErrorHelper_1.default('Email already registered', 404);
            // return res.status(404).json({ message: 'Token not found' });
            jwt.verify(token, secret, (err, user) => {
                if (err)
                    throw new ErrorHelper_1.default('Email already registered', 404);
                //  res.status(404).json({ message: 'Invalid token' });
                next();
            });
        };
    }
}
exports.default = TokenHandler;
