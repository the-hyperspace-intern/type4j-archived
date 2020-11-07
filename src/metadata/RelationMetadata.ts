interface RelationProps {
  [key: string]: boolean | number | string;
}

export interface RelationMetadata {
  target: Function | string;
  name: string;
  props: RelationProps;
}
