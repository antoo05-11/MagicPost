export default class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    statusCode() {
        return this.status;
    }
}