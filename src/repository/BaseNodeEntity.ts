import { stringify } from "querystring";
import { getConnection } from "..";
import { QueryBuilder } from "../query/QueryBuilder";

export function _findProps(entity: BaseNodeEntity): any {
  const props = {};
  Object.keys(entity).forEach((prop) => {
    if (Reflect.getMetadata("isGraphProp", entity, prop))
      props[prop] = entity[prop];
  });
  return props;
}

export class BaseNodeEntity {
  _getNodeType() {
    //TODO: Custom Name
    const _reflectedName = Reflect.getMetadata("4jEntityName", this);
    const _className = (<any>this).constructor.name;
    return _reflectedName ?? _className;
  }

  async save(): Promise<this> {
    const queryBuilder = new QueryBuilder();
    queryBuilder.create(this);
    await queryBuilder.run(getConnection());

    return this;
  }
}
