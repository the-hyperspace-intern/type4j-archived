import { Result } from "neo4j-driver";
import { ConnectOpts } from "net";
import { Connection } from "../connection/Connection";
import { PlatformUtils } from "../platform/Platform";
import { BaseNodeEntity } from "../repository/BaseNodeEntity";

export interface EntityStore {
  [key: string]: BaseNodeEntity;
}

export class QueryBuilder {
  entityStore: EntityStore = {};

  _queryRaw = "";
  _queryArgs = {};

  getEntityIndice(entity: BaseNodeEntity) {
    return PlatformUtils.getKeyByValue(this.entityStore, entity);
  }

  create(entity: BaseNodeEntity): QueryBuilder {
    const indice = PlatformUtils.randomIndice(5);

    this._queryRaw = `CREATE(${indice}:${entity._getNodeType()} $props_${indice}) `;
    this._queryArgs[`props_${indice}`] = BaseNodeEntity._findProps(entity);
    this.entityStore[indice] = entity;

    return this;
  }

  ret(r: string[]): this {
    this._queryRaw += `RETURN ${r.join(", ")}`;
    return this;
  }

  findOne(id: number): [QueryBuilder, string] {
    const indice = PlatformUtils.randomIndice(5);
    this._queryRaw = `MATCH(${indice}) WHERE ID(${indice}) = $id_${indice} `;
    this._queryArgs[`id_${indice}`] = id;
    return [this, indice];
  }

  del(indices: string[]) {
    this._queryRaw += `DETACH DELETE ${indices.join(", ")}`;
  }

  async run(connection: Connection): Promise<Result> {
    return await connection.driver.session.run(this._queryRaw, {
      ...this._queryArgs,
    });
  }
}
