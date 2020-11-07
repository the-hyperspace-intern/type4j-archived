import { getMetadataArgsStorage } from "../";

//TODO: NodeEntityOptions
export function NodeEntity(name?: string): ClassDecorator {
  return function (target: Function) {
    const _className = target.name;

    Reflect.defineMetadata("4jNodeName", name ?? _className, target.prototype);

    getMetadataArgsStorage().nodeEntities.push({
      target,
      name,
      //orderBy
      //withNodeid
    });
  };
}
