import { INVALID_CREDENTIALS, RETRY } from "@/lib/constants/message-types";

export class CustomError extends Error {
    message: string;
    code: number;
    constructor(messageType: string, message: string, code: number){
        super();
        switch(messageType){
            case RETRY:
                this.message = "Please try again";
                break;
            case INVALID_CREDENTIALS:
                this.message = "Invalid Credentials";
                break;
            default:
                this.message = message;
                break;
        }
        this.code = code;
    }

    toJSON(){
        return {
            message: this.message,
            code: this.code
        }
    }
}

export class AuthError extends Error{
    message: string = "Authentication Error";
    code: number = 401;
    constructor(message: string, code: number){
        super();
        this.message = message;
        this.code = code;
    }
    toJSON(){
        return {
            message: this.message,
            code: this.code
        }
    }
}

export class SuccessResponse{
    message: string = "Success";
    code: number = 200;
    constructor(message: string = this.message, code: number = this.code){
        this.message = message;
        this.code = code;
    }
    toJSON(){
        return {
            message: this.message,
            code: this.code
        }
    }
}

