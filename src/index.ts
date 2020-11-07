import "reflect-metadata";
import { MetadataStore } from "./metadata/MetadataStore";
import { PlatformUtils } from "./platform/Platform";

// abstract class NodeEntity {
//   readonly id: number;

//   private _findProps(): any {
//     const props = {};
//     Object.keys(this).forEach((prop) => {
//       if (Reflect.getMetadata("isGraphProp", this, prop))
//         props[prop] = this[prop];
//     });
//     return props;
//   }

//   save() {
//     const props = this._findProps();
//   }
// }

export function getMetadataArgsStorage(): MetadataStore {
  const globalScope = PlatformUtils.getGlobalVariable();
  if (!globalScope.type4jMetadataStore)
    globalScope.type4jMetadataStore = new MetadataStore();

  return globalScope.type4jMetadataStore;
}
