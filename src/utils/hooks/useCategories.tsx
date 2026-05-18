"use client";

import { adminCategoryService } from "@/services/category/caseType.service";
import { CategoryItem } from "@/services/category/category.type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useCategories = () => {
  const [caseTypes, setCaseTypes] = useState<CategoryItem[]>(
    [],
  );

  const [interviewCategories, setInterviewCategories] =
    useState<CategoryItem[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [caseTypesRes, interviewRes] = await Promise.all([
        adminCategoryService.getCaseTypes(),
        adminCategoryService.getInterviewCategories(),
      ]);

      setCaseTypes(caseTypesRes);
      setInterviewCategories(interviewRes);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    loading,
    caseTypes,
    interviewCategories,
    fetchAll,
  };
};