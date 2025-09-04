import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCrops,
  addCrop,
  deleteCrop,
  getFarmerCrops,
  toggleSoldApi,
} from "./cropApi";

export const fetchCrops = createAsyncThunk(
  "crop/fetchCrops",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCrops();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createCrop = createAsyncThunk(
  "crop/createCrop",
  async (cropData, { rejectWithValue }) => {
    try {
      const res = await addCrop(cropData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// delete crops
export const removeCrop = createAsyncThunk(
  "crop/removeCrop",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCrop(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch crops for a specific farmer
export const fetchFarmerCrops = createAsyncThunk(
  "crop/fetchFarmerCrops",
  async (farmerId, { rejectWithValue }) => {
    try {
      const res = await getFarmerCrops(farmerId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const toggleSoldStatus = createAsyncThunk(
  "crop/toggleSoldStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await toggleSoldApi(id);
      return res.data.crop;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
