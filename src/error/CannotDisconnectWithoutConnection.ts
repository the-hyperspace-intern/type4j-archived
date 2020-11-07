import { fail } from 'assert';

export class CannotDisconnectWithoutConnection extends Error {
    name = 'CannotDisconnectWithoutConnection';

    constructor(connectionName: string) {
        super();
        Object.setPrototypeOf(this, CannotDisconnectWithoutConnection.prototype);
        this.message = `Cannot disconnect the connection "${connectionName}" without it being connected`;
    }
}
