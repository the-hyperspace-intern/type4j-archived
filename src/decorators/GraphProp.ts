// Prop Decorator
export const GraphProp = (): PropertyDecorator => (
  target: any,
  propKey: string
) => {
  Reflect.defineMetadata("isGraphProp", true, target, propKey);
};
