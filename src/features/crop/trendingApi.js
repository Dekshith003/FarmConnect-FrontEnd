import api from "../../services/api";

export const getTrendingCrops = () =>
  api({
    method: "GET",
    url: "/trending",
  });
