import { NodeEntityMetadata } from "./NodeEntityMetadata";
import { RelationMetadata } from "./RelationMetadata";

export class MetadataStore {
  readonly nodeEntities: NodeEntityMetadata[] = [];
  readonly relations: RelationMetadata[] = [];
}
