import axiosInstance from "@/config/axios.config";
import { ApiResponse, CategoryItem } from "./category.type";

const CASE_TYPE_URL = "/cases/admin/case-types/";
const INTERVIEW_CATEGORY_URL = "/quizzes/admin/interview-categories/";

export const adminCategoryService = {
  async getCaseTypes() {
    const res =
      await axiosInstance.get<ApiResponse<CategoryItem[]>>(CASE_TYPE_URL);

    return res.data.data;
  },

  async createCaseType(payload: { name: string }) {
    const res = await axiosInstance.post(CASE_TYPE_URL, payload);

    return res.data;
  },

  async updateCaseType(id: number, payload: { name: string }) {
    const res = await axiosInstance.patch(`${CASE_TYPE_URL}${id}/`, payload);

    return res.data;
  },

  async deleteCaseType(id: number) {
    const res = await axiosInstance.delete(`${CASE_TYPE_URL}${id}/`);

    return res.data;
  },

  async getInterviewCategories() {
    const res = await axiosInstance.get<ApiResponse<CategoryItem[]>>(
      INTERVIEW_CATEGORY_URL,
    );

    return res.data.data;
  },

  async createInterviewCategory(payload: { name: string }) {
    const res = await axiosInstance.post(INTERVIEW_CATEGORY_URL, payload);

    return res.data;
  },

  async updateInterviewCategory(id: number, payload: { name: string }) {
    const res = await axiosInstance.patch(
      `${INTERVIEW_CATEGORY_URL}${id}/`,
      payload,
    );

    return res.data;
  },

  async deleteInterviewCategory(id: number) {
    const res = await axiosInstance.delete(`${INTERVIEW_CATEGORY_URL}${id}/`);

    return res.data;
  },
};
