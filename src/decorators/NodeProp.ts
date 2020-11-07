// Prop Decorator
export const GraphProp = (): PropertyDecorator => (
  target: any,
  propKey: string
) => {
  Reflect.defineMetadata("isNodeProp", true, target, propKey);
};
