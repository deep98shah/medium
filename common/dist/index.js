"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateObject = exports.blogPostObject = exports.signInObject = exports.signUpObject = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpObject = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    firstName: zod_1.default.string().optional(),
    lastName: zod_1.default.string().optional(),
});
exports.signInObject = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
exports.blogPostObject = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string().min(8)
});
exports.blogUpdateObject = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string().min(8),
    id: zod_1.default.string()
});
