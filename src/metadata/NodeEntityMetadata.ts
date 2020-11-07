export interface NodeEntityMetadata {
  target: Function | string;
  name?: string;
  // TODO: Default "orderBy"
  database?: string;
  withNodeid?: boolean;
}
