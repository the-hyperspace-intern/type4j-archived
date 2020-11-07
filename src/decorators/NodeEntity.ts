import { getMetadataArgsStorage } from "../";

//TODO: NodeEntityOptions
export function NodeEntity(name?: string): ClassDecorator {
  return function (target) {
    getMetadataArgsStorage().nodeEntities.push({
      target,
      name,
      //orderBy
      //withNodeid
    });
  };
}
