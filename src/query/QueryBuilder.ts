import { ConnectOpts } from "net";
import { Connection } from "../connection/Connection";
import { PlatformUtils } from "../platform/Platform";
import { BaseNodeEntity, _findProps } from "../repository/BaseNodeEntity";

export interface EntityStore {
  [key: string]: BaseNodeEntity;
}

export class QueryBuilder {
  entityStore: EntityStore = {};

  _queryRaw = "";
  _queryArgs = {};

  create(entity: BaseNodeEntity): [this, EntityStore] {
    const indice = PlatformUtils.randomIndice(5);

    this._queryRaw = `CREATE(${indice}:${entity._getNodeType()} $props_${indice}) `;
    this._queryArgs[`props_${indice}`] = _findProps(entity);
    this.entityStore[indice] = entity;

    return [this, this.entityStore];
  }

  ret(r: string[]): this {
    this._queryRaw += `RETURN ${r.join(", ")}`;
    return this;
  }

  async run(connection: Connection): Promise<any> {
    return await connection.driver.session.run(this._queryRaw, {
      ...this._queryArgs,
    });
  }
}
