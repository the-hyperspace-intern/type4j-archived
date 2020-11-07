import { getMetadataArgsStorage } from "../";

//TODO: NodeEntityOptions
export function NodeEntity(name?: string): ClassDecorator {
  return function (target: Function) {
    if (name) Reflect.defineMetadata("4jEntityName", name, target.prototype);

    getMetadataArgsStorage().nodeEntities.push({
      target,
      name,
      //orderBy
      //withNodeid
    });
  };
}
