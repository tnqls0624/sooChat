export declare enum UserTypeEnum {
    KAKAO = "KAKAO",
    GOOGLE = "GOOGLE",
    NAVER = "NAVER",
    SIGNNAME = "SIGNNAME"
}
export declare class Users {
    id: number;
    method: UserTypeEnum;
    signname: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    varifymail: string;
    withdraw: string;
    created_at: Date;
    updated_at: Date;
    withdraw_at: string;
}
