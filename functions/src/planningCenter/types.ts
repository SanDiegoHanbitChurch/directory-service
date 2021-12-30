export type Attributes = {
  [key: string]: string;
};

export type Links = {
  self: string;
  prev?: string;
  next?: string;
};

export type RelationshipLinks = {
  related: string;
};

export type RelationshipData = {
  type: string;
  id: string;
};

export type Relationship = {
  links?: RelationshipLinks;
  data: RelationshipData[];
}
export type Relationships = {
  [key: string]: Relationship;
}

export type PlanningCenterItem = {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
  links: Links;
}

export type PeopleResponse = {
  links: Links;
  data: PlanningCenterItem[];
  included: PlanningCenterItem[]
}
