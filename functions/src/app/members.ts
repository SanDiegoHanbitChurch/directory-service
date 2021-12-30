import { keys } from "lodash";
import { Member } from "./types";
import { PlanningCenterInterface } from "../planningCenter";
import { PlanningCenterItem, Relationships } from "../planningCenter/types";

export type MembersInterface = {
  getMemberById: (id: string) => Promise<Member | undefined>;
  getAllMembers: (offset: number) => Promise<Member[]>;
  searchMembers: (query: string) => Promise<Member[]>;
};

export default (planningCenter: PlanningCenterInterface): MembersInterface => {
  const { getById, getAll, search } = planningCenter;

  const getMemberById = async (id: string): Promise<Member | undefined> => {
    console.log("getMemberById", { id });

    const { data } = await getById(id);

    if (data.length === 0) {
      return undefined;
    }

    const { attributes } = data[0];

    return {
      id,
      name: attributes["name"],
      avatar: attributes["avatar"],
      phone: "858-555-1212",
      email: "sangyum@gmail.com",
      address: {
        street: "100 Main St.",
        city: "San Diego",
        state: "CA",
        zip: "29222",
      },
    };
  };

  type IncludedHashType = {
    [key: string]: PlanningCenterItem;
  };

  const getRelationshipDataHashKey = (
    relationships: Relationships,
    key: string
  ): string => {
    console.log("relationships[key]", relationships[key]);
    const { type, id } = relationships[key].data[0];
    return `${type}${id}`;
  };

  const hasRelationshipData = (
    relationships: Relationships,
    key: string
  ): boolean => {
    return relationships[key].data && relationships[key].data.length > 0;
  };

  const getAllMembers = async (offset: number): Promise<Member[]> => {
    const { data, included } = await getAll(offset);

    const includedHash = included.reduce<IncludedHashType>((prev, curr) => {
      const { type, id } = curr;
      const key = `${type}${id}`;

      prev[key] = curr;

      return prev;
    }, {} as IncludedHashType);

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
  };

  const searchMembers = async (query: string): Promise<Member[]> => {
    const { data } = await search(query);

    return data.map((planningCenterItem): Member => {
      const { id, attributes } = planningCenterItem;

      return {
        id,
        name: attributes["name"],
        avatar: attributes["avatar"],
        phone: "858-555-1212",
        email: "sangyum@gmail.com",
        address: {
          street: "100 Main St.",
          city: "San Diego",
          state: "CA",
          zip: "29222",
        },
      };
    });
  };

  return {
    getMemberById,
    getAllMembers,
    searchMembers,
  };
};
