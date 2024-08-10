class CustomError extends Error {
    message: string;
    code: number;
    constructor(message: string, code: number){
        super();
        this.message = message;
        this.code = code;
    }
}