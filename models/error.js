class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.errorName = this.constructor.name;
    }
}

module.exports = class PropertyFileError extends ValidationError {
    constructor(message, statusCode = 500) {
        super(message);
        this.errorName = this.constructor.name;
        this.statusCode = statusCode;
    }

    reqStatusCode() {
        console.log('type request: POST' + ', ' + 'status code: ' + this.statusCode);
    }

    viewStackCall() {
        console.log('line width the error: ' + this.stack);
    }
}