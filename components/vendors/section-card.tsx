"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  UtensilsCrossed,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { EditSectionDialog } from "./edit-section-dialog";
import { Section } from "@/lib/sections";

type SectionCardProps = {
  section: Section;
  onEdit: (sectionId: string, data: any) => void;
  onDelete: (sectionId: string) => void;
  isLoading?: boolean;
};

const getSectionTypeColor = (type: string) => {
  switch (type) {
    case "indoor":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "outdoor":
      return "bg-green-50 text-green-700 border-green-200";
    case "vip":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "rooftop":
      return "bg-orange-50 text-orange-700 border-orange-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getSectionTypeIcon = (type: string) => {
  return <UtensilsCrossed className="h-4 w-4" />;
};

export function SectionCard({
  section,
  onEdit,
  onDelete,
  isLoading = false,
}: SectionCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = (data: any) => {
    onEdit(section._id, data);
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete(section._id);
  };

  const handleToggleStatus = () => {
    onEdit(section._id, { isActive: !section.isActive });
  };

  return (
    <>
      <div
        className={`border rounded-lg p-6 transition-all duration-200 ${
          section.isActive
            ? "border-gray-200 hover:shadow-md bg-white"
            : "border-gray-200 bg-gray-50 opacity-75"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-poppins font-semibold text-lg text-gray-900">
                    {section.sectionName}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium font-poppins border ${getSectionTypeColor(
                      section.sectionType,
                    )}`}
                  >
                    {getSectionTypeIcon(section.sectionType)}
                    {section.sectionType.charAt(0).toUpperCase() +
                      section.sectionType.slice(1)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium font-poppins border ${
                      section.isActive
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {section.isActive ? (
                      <ToggleRight className="h-4 w-4" />
                    ) : (
                      <ToggleLeft className="h-4 w-4" />
                    )}
                    {section.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {section.description && (
              <p className="font-poppins text-sm text-gray-600">
                {section.description}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:ml-4">
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              variant="outline"
              size="sm"
              className="w-full lg:w-32 font-poppins text-sm"
              disabled={isLoading}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>

            <Button
              onClick={handleToggleStatus}
              variant="outline"
              size="sm"
              className={`w-full lg:w-32 font-poppins text-sm ${
                section.isActive
                  ? "border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                  : "border-green-300 text-green-700 hover:bg-green-50"
              }`}
              disabled={isLoading}
            >
              {section.isActive ? (
                <>
                  <ToggleLeft className="h-4 w-4 mr-2" />
                  Deactivate
                </>
              ) : (
                <>
                  <ToggleRight className="h-4 w-4 mr-2" />
                  Activate
                </>
              )}
            </Button>

            <Button
              onClick={() => setIsDeleteDialogOpen(true)}
              variant="outline"
              size="sm"
              className="w-full lg:w-32 font-poppins text-sm border-red-300 text-red-700 hover:bg-red-50"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <EditSectionDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEdit}
        section={section}
        isLoading={isLoading}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Section"
        description={`Are you sure you want to delete "${section.sectionName}"? This action cannot be undone.`}
      />
    </>
  );
}
