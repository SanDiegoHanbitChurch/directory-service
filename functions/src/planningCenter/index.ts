import axios from "axios";
import {PeopleResponse} from "./types";

const DEFAULT_PARAMS = {
  "where[status]": "active",
  "include": "addresses,emails,phone_numbers",
};

export type PlanningCenterConfig = {
  baseUrl: string;
  applicationId: string;
  secret: string;
};

export interface PlanningCenterInterface {
  getById: (id: string) => Promise<PeopleResponse>;
  getAll: (offset?: number) => Promise<PeopleResponse>;
  search: (query: string) => Promise<PeopleResponse>;
}

export default (config: PlanningCenterConfig): PlanningCenterInterface => {
  const instance = axios.create({
    baseURL: config.baseUrl,
    auth: {
      username: config.applicationId,
      password: config.secret,
    },
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const get = async (params?: any): Promise<PeopleResponse> => {
    const {data} = await instance.get<PeopleResponse>("/people", {
      params,
    });

    return data;
  };

  const getById = async (id: string): Promise<PeopleResponse> => {
    const params = {
      "include": "addresses,emails,phone_numbers",
      "where[id]": id,
    };

    return await get(params);
  };

  const getAll = async (offset = 0): Promise<PeopleResponse> => {
    const params = {
      ...DEFAULT_PARAMS,
      offset,
    };

    return await get(params);
  };

  const search = async (query: string): Promise<PeopleResponse> => {
    const params = {
      ...DEFAULT_PARAMS,
      "where[search_name_or_email_or_phone_number]": query,
    };

    return await get(params);
  };

  return {
    getById,
    getAll,
    search,
  };
};
