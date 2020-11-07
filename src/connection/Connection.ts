import neo4j, { Driver, Session } from "neo4j-driver";
import { NeoDriver } from "../driver/DriverFactory";
import { CannotConnectAlreadyConnectedError } from "../error/AlreadyConnectedError";
import { CannotDisconnectWithoutConnection } from "../error/CannotDisconnectWithoutConnection";
import { CouldNotEstablishConnection } from "../error/CouldNotEstablishConnection";
import { ConnectionOptions } from "./ConnectionOptions";

export class Connection {
  readonly name: string;

  // TODO: Connection Options
  readonly options: ConnectionOptions;

  readonly isConnected: boolean;

  readonly driver: NeoDriver;

  // TODO: Logger & EntityManager
  // readonly EntityManager: EntityManager;
  // readonly logger: Logger;

  constructor(options: ConnectionOptions) {
    this.name = options.name || "";
    this.options = options;

    // TODO: Multiple Possible Authentification Methods (DriverFactory)
    this.driver = new NeoDriver(this);
    this.isConnected = false;
  }

  async connect(): Promise<this> {
    if (this.isConnected)
      throw new CannotConnectAlreadyConnectedError(this.name);

    await this.driver.connect();

    // Force ReadOnly Prop;
    (<any>this)["isConnected"] = true;

    return this;
  }

  async close(): Promise<void> {
    if (!this.isConnected)
      throw new CannotDisconnectWithoutConnection(this.name);

    await this.driver.disconnect();

    (<any>this)["isConnected"] = false;
  }
}
