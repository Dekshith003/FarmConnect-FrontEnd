import api from "../../services/api";
import { apiEndpoints } from "../../utils/Constants";

export const getDashboard = () =>
  api({
    method: apiEndpoints.dashboard.getDashboard.method,
    url: apiEndpoints.dashboard.getDashboard.url,
  });
