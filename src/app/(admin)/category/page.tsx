"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CategoryItem } from "@/services/category/category.type";
import { useCategories } from "@/utils/hooks/useCategories";
import { adminCategoryService } from "@/services/category/caseType.service";
import PageHeader from "./_components/CategoryHeader";
import SectionCard from "./_components/CategoryCard";
import CategoryTable from "./_components/CategoryTable";
import CreateCategoryModal from "./_components/CreateCategoryModal";
import EditCategoryModal from "./_components/EditCategoryModal";
import DeleteCategoryModal from "./_components/DeleteCategoryModal";



export default function CategoriesPage() {
  const {
    loading,
    caseTypes,
    interviewCategories,
    fetchAll,
  } = useCategories();

  const [createType, setCreateType] = useState<
    "case" | "interview" | null
  >(null);

  const [editingItem, setEditingItem] =
    useState<CategoryItem | null>(null);

  const [editingType, setEditingType] = useState<
    "case" | "interview" | null
  >(null);

  const [deleteItem, setDeleteItem] =
    useState<CategoryItem | null>(null);

  const [deleteType, setDeleteType] = useState<
    "case" | "interview" | null
  >(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const handleCreate = async (name: string) => {
    try {
      if (createType === "case") {
        await adminCategoryService.createCaseType({
          name,
        });
      }

      if (createType === "interview") {
        await adminCategoryService.createInterviewCategory(
          {
            name,
          },
        );
      }

      toast.success("Created successfully");

      fetchAll();
    } catch (error) {
      toast.error("Creation failed");
      console.error(error);
    }
  };

  const handleUpdate = async (
    id: number,
    payload: { name: string },
  ) => {
    try {
      if (editingType === "case") {
        await adminCategoryService.updateCaseType(
          id,
          payload,
        );
      }

      if (editingType === "interview") {
        await adminCategoryService.updateInterviewCategory(
          id,
          payload,
        );
      }

      toast.success("Updated successfully");

      fetchAll();
    } catch (error) {
      toast.error("Update failed");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      setDeleteLoading(true);

      if (deleteType === "case") {
        await adminCategoryService.deleteCaseType(
          deleteItem.id,
        );
      }

      if (deleteType === "interview") {
        await adminCategoryService.deleteInterviewCategory(
          deleteItem.id,
        );
      }

      toast.success("Deleted successfully");

      fetchAll();

      setDeleteItem(null);
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <PageHeader />
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <SectionCard
          title="Case Types"
          action={
            <button
              onClick={() => setCreateType("case")}
              className="rounded-xl bg-black px-5 py-2 text-white"
            >
              Add Case Type
            </button>
          }
        >
          <CategoryTable
            data={caseTypes}
            onEdit={(item) => {
              setEditingItem(item);
              setEditingType("case");
            }}
            onDelete={(item) => {
              setDeleteItem(item);
              setDeleteType("case");
            }}
          />
        </SectionCard>

        <SectionCard
          title="Interview Categories"
          action={
            <button
              onClick={() => setCreateType("interview")}
              className="rounded-xl bg-black px-5 py-2 text-white"
            >
              Add Category
            </button>
          }
        >
          <CategoryTable
            data={interviewCategories}
            onEdit={(item) => {
              setEditingItem(item);
              setEditingType("interview");
            }}
            onDelete={(item) => {
              setDeleteItem(item);
              setDeleteType("interview");
            }}
          />
        </SectionCard>
      </div>

      <CreateCategoryModal
        open={!!createType}
        title={
          createType === "case"
            ? "Create Case Type"
            : "Create Interview Category"
        }
        onClose={() => setCreateType(null)}
        onSubmit={handleCreate}
      />

      <EditCategoryModal
        open={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onSubmit={handleUpdate}
      />

      <DeleteCategoryModal
        open={!!deleteItem}
        title={deleteItem?.name || ""}
        loading={deleteLoading}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
      />

      {loading && (
        <div className="text-center text-zinc-500">
          Loading...
        </div>
      )}
    </div>
  );
}