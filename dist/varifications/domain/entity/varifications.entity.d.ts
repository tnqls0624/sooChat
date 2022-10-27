export declare enum VerificationTypeEnum {
    MAIL = "MAIL",
    SIGNNAME = "SIGNNAME",
    PASSWORD = "PASSWORD"
}
export declare class Varification {
    id: number;
    type: VerificationTypeEnum;
    to: string;
    token: string;
    key: string;
    signname: string;
    created_at: Date;
    updated_at: Date;
}
