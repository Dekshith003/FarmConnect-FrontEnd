import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCrops, addCrop, updateCrop, deleteCrop } from "./cropApi";

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

export const editCrop = createAsyncThunk(
  "crop/editCrop",
  async ({ id, cropData }, { rejectWithValue }) => {
    try {
      const res = await updateCrop(id, cropData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

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
