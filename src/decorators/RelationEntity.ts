import { getMetadataArgsStorage } from "../";

export function RelationEntity(name?: string): ClassDecorator {
  return function (target: Function) {
    const _className = target.name;

    Reflect.defineMetadata(
      "4jRelationName",
      name ?? _className,
      target.prototype
    );

    getMetadataArgsStorage().relations.push({
      target,
      name,
    });
  };
}
