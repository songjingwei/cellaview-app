import { post } from "@/axios";

const getExpTemplatesByUserId = async (payload: Object) => {
  return post("/v1/experiment/getExperimentTemplateByUserId", payload);
};

const expTemplateManager = {
  getExpTemplatesByUserId,
};

export default expTemplateManager;
