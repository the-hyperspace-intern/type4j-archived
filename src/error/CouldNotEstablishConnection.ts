import { fail } from 'assert';

export class CouldNotEstablishConnection extends Error {
    name = 'CouldNotEstablishConnection';

    constructor(failReason: string) {
        super();
        Object.setPrototypeOf(this, CouldNotEstablishConnection.prototype);
        this.message = `Could not establish connection : ${failReason}`;
    }
}
