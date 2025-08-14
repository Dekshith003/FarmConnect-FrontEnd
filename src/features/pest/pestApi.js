import api from "../../services/api";

export const detectPest = (formData) =>
  api({
    method: "POST",
    url: "/pest/detect",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
