import { keys } from "lodash";
import { PeopleResponse } from "../planningCenter/types";
import { Member } from "./types";
import { PlanningCenterItem, Relationships } from "../planningCenter/types";

type IncludedHashType = {
  [key: string]: PlanningCenterItem;
};

const getRelationshipDataHashKey = (
  relationships: Relationships,
  key: string
): string => {
  const { type, id } = relationships[key].data[0];
  return `${type}${id}`;
};

const hasRelationshipData = (
  relationships: Relationships,
  key: string
): boolean => {
  return relationships[key].data && relationships[key].data.length > 0;
};

export const toMembers = (people: PeopleResponse): Member[] => {
  const { data, included } = people;

  const includedHash = included.reduce<IncludedHashType>((prev, curr) => {
    const { type, id } = curr;
    const key = `${type}${id}`;

    prev[key] = curr;

    return prev;
  }, {} as IncludedHashType);

  // TODO: Refactor!!!
  return data.map((planningCenterItem): Member => {
    const { id, attributes, relationships } = planningCenterItem;

    return keys(relationships).reduce<Member>(
      (prev, curr) => {
        if (hasRelationshipData(relationships, curr)) {
          if (curr === "addresses") {
            const addressHashKey = getRelationshipDataHashKey(
              relationships,
              "addresses"
            );
            const { street, city, state, zip } =
              includedHash[addressHashKey].attributes;

            return {
              ...prev,
              address: {
                street,
                city,
                state,
                zip,
              },
            };
          } else if (curr === "emails") {
            const emailHashKey = getRelationshipDataHashKey(
              relationships,
              "emails"
            );

            return {
              ...prev,
              email: includedHash[emailHashKey].attributes["address"],
            };
          } else if (curr === "phone_numbers") {
            const phoneHashKey = getRelationshipDataHashKey(
              relationships,
              "phone_numbers"
            );

            return {
              ...prev,
              phone: includedHash[phoneHashKey].attributes["number"],
            };
          }
        }

        return prev;
      },
      {
        id,
        name: `${attributes["given_name"]} (${attributes["name"]})`,
        avatar: attributes["avatar"],
      }
    );
  });
}