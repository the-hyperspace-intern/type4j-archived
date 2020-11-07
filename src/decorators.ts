// Prop Decorator
export const GraphProp = () => (target: any, propKey: string) => {
    Reflect.defineMetadata('isGraphProp', true, target, propKey);
};
