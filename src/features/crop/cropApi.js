import api from "../../services/api";
import { apiEndpoints } from "../../utils/Constants";

export const getCrops = () =>
  api({
    method: apiEndpoints.crop.getCrops.method,
    url: apiEndpoints.crop.getCrops.url,
  });

export const addCrop = (cropData) =>
  api({
    method: apiEndpoints.crop.addCrop.method,
    url: apiEndpoints.crop.addCrop.url,
    data: cropData,
  });

export const updateCrop = (id, cropData) =>
  api({
    method: apiEndpoints.crop.updateCrop.method,
    url: apiEndpoints.crop.updateCrop.url.replace(":id", id),
    data: cropData,
  });

export const deleteCrop = (id) =>
  api({
    method: apiEndpoints.crop.deleteCrop.method,
    url: apiEndpoints.crop.deleteCrop.url.replace(":id", id),
  });
