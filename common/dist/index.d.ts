import zod from "zod";
export declare const signUpObject: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
    firstName: zod.ZodOptional<zod.ZodString>;
    lastName: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export type SignUpObject = zod.infer<typeof signUpObject>;
export declare const signInObject: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignInObject = zod.infer<typeof signInObject>;
export declare const blogPostObject: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type BlogPostObject = zod.infer<typeof blogPostObject>;
export declare const blogUpdateObject: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    id: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type BlogUpdateObject = zod.infer<typeof blogUpdateObject>;
