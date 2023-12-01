import { post } from "@/axios";

export const getExpTemplatesByUserId = async (payload: Object) => {
  return post("/v1/experiment/getExperimentTemplateByUserId", payload);
};

export const deleteExpTemplateById = async (payload: Object) => {
  return post("/v1/experiment/deleteExperimentTemplateById", payload);
};

const expTemplateManager = {
  getExpTemplatesByUserId,
  deleteExpTemplateById,
};

export default expTemplateManager;
