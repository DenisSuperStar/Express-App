class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.errorName = this.constructor.name;
    }
}

module.exports = class PropertyFileError extends ValidationError {}

module.exports = class ServerError extends Error {
    constructor(message) {
        super(message);
        this.ServerErrorName = this.constructor.name;
        this.statusCode = 500;
    }

    reqStatusCode() {
        console.log(this.statusCode);
        return this.statusCode;
    }
}