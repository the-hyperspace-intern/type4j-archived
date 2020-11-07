export const RelationProp = (): PropertyDecorator => (
  target: any,
  propKey: string
) => {
  Reflect.defineMetadata("isRelationProp", true, target, propKey);
};
