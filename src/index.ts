import "reflect-metadata";
import { Connection } from "./connection/Connection";
import { MetadataStore } from "./metadata/MetadataStore";
import { PlatformUtils } from "./platform/Platform";

export function getMetadataArgsStorage(): MetadataStore {
  const globalScope = PlatformUtils.getGlobalVariable();
  if (!globalScope.type4jMetadataStore)
    globalScope.type4jMetadataStore = new MetadataStore();

  return globalScope.type4jMetadataStore;
}

export function getConnection(): Connection {
  const globalScope = PlatformUtils.getGlobalVariable();
  return globalScope.type4jConnection;
}

export function setConnection(connection?: Connection) {
  const globalScope = PlatformUtils.getGlobalVariable();
  globalScope.type4jConnection = connection;
}
