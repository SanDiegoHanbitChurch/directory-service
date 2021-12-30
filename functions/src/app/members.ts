import { Member } from "./types";
import { PlanningCenterInterface } from "../planningCenter";
import { toMembers } from "./convert";

export type MembersInterface = {
  getMemberById: (id: string) => Promise<Member | undefined>;
  getAllMembers: (offset: number) => Promise<Member[]>;
  searchMembers: (query: string) => Promise<Member[]>;
};

export default (planningCenter: PlanningCenterInterface): MembersInterface => {
  const { getById, getAll, search } = planningCenter;

  const getMemberById = async (id: string): Promise<Member | undefined> => {
    const people = await getById(id);
    const members = toMembers(people);

    return members.length === 0 ? undefined : members[0];
  };

  const getAllMembers = async (offset: number): Promise<Member[]> => {
    const people = await getAll(offset);
    return toMembers(people);
  };

  const searchMembers = async (query: string): Promise<Member[]> => {
    const people = await search(query);
    return toMembers(people);
  };

  return {
    getMemberById,
    getAllMembers,
    searchMembers,
  };
};
