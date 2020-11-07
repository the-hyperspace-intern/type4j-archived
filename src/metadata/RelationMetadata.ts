interface RelationProps {
  [key: string]: any;
}

export type RelationDirection = "bidirectional" | "unidirectional";

export interface RelationMetadata {
  target: Function | string;
  name: string;
  // props: RelationProps;
  // type: RelationDirection;
}
