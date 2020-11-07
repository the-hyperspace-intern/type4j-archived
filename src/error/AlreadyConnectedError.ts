export class CannotConnectAlreadyConnectedError extends Error {
    name = 'CannotConnectAlreadyConnectedError';

    constructor(connectionName: string) {
        super();
        Object.setPrototypeOf(this, CannotConnectAlreadyConnectedError.prototype);
        this.message = `Cannot connect to the connection "${connectionName}" because the connection is already established.`;
    }
}
