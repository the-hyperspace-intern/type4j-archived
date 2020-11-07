import neo4j, { Driver, Session } from 'neo4j-driver';
import { ConnectionOptions } from 'tls';
import { Connection } from '../connection/Connection';
import { CouldNotEstablishConnection } from '../error/CouldNotEstablishConnection';
import { NeoConnectionOptions } from './NeoConnectionOptions';

// TODO: Pools
export class NeoDriver {
    connection: Connection;
    options: NeoConnectionOptions;
    database: string;
    driver: Driver;
    session: Session;
    constructor(connection: Connection) {
        this.connection = connection;
        this.options = {
            ...connection.options,
        } as NeoConnectionOptions;

        this.options.database;
    }

    // TODO: Handle non async nature of the native driver
    async connect(): Promise<void> {
        this.driver = neo4j.driver(this.options.host, neo4j.auth.basic(this.options.username, this.options.password));
        try {
            this.session = this.driver.session();
            await this.session.run(`Match (n)
            Return n
            Order by n.created_at desc
            Limit 1`);
        } catch (err) {
            this.driver.close();
            this.session.close();

            throw new CouldNotEstablishConnection(err.code);
        }

        return;
    }

    async disconnect(): Promise<void> {
        await this.session.close();
        await this.driver.close();
    }

    async wipe(): Promise<void> {
        await this.session.run("MATCH (e) DETACH DELETE e")
    }
}
