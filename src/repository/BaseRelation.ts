import { RelationDirection } from "../metadata/RelationMetadata";
import { BaseNodeEntity } from "./BaseNodeEntity";

export class BaseRelation {
  fromEntity: BaseNodeEntity;
  toEntity: BaseNodeEntity;
  direction: RelationDirection;
  constructor(
    fromEntity: BaseNodeEntity,
    toEntity: BaseNodeEntity,
    direction: RelationDirection
  ) {
    this.fromEntity = fromEntity;
    this.toEntity = toEntity;
    this.direction = direction;
  }

  static _findProps(entity: BaseNodeEntity): any {
    const props = {};
    Object.keys(entity).forEach((prop) => {
      if (Reflect.getMetadata("isRelationProp", entity, prop))
        props[prop] = entity[prop];
    });
    return props;
  }

  _getRelationType() {
    const _reflectedName = Reflect.getMetadata("4jRelationName", this);
    return _reflectedName;
  }

  async link() {}
}
