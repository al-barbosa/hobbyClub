"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.code = code;
    }
}
exports.default = ErrorHandler;
