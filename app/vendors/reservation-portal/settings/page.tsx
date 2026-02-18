"use client";

import { useState, useEffect } from "react";
import { ReservationPortalLayout } from "@/components/vendors/reservation-portal-layout";
import { Plus, Settings as SettingsIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateSectionDialog } from "@/components/vendors/create-section-dialog";
import { SectionCard } from "@/components/vendors/section-card";
import { useToast } from "@/hooks/use-toast";
import {
  getSections,
  createSection,
  updateSection,
  deleteSection,
  Section,
  CreateSectionData,
  UpdateSectionData,
} from "@/lib/sections";

export default function SettingsPage() {
  const { toast } = useToast();
  const [sections, setSections] = useState<Section[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch sections on mount
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      const response = await getSections();
      if (response.success) {
        setSections(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching sections:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch sections",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSection = async (sectionData: CreateSectionData) => {
    try {
      setIsSubmitting(true);
      const response = await createSection(sectionData);

      if (response.success) {
        setIsCreateDialogOpen(false);
        fetchSections(); // Refresh the list
        toast({
          title: "Success!",
          description: response.message || "Section created successfully!",
          variant: "default",
        });
      }
    } catch (error: any) {
      console.error("Error creating section:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create section",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSection = async (sectionId: string, sectionData: UpdateSectionData) => {
    try {
      setIsSubmitting(true);
      const response = await updateSection(sectionId, sectionData);

      if (response.success) {
        fetchSections(); // Refresh the list
        toast({
          title: "Success!",
          description: response.message || "Section updated successfully!",
          variant: "default",
        });
      }
    } catch (error: any) {
      console.error("Error updating section:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update section",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      setIsSubmitting(true);
      const response = await deleteSection(sectionId);

      if (response.success) {
        fetchSections(); // Refresh the list
        toast({
          title: "Success!",
          description: response.message || "Section deleted successfully!",
          variant: "default",
        });
      }
    } catch (error: any) {
      console.error("Error deleting section:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete section",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ReservationPortalLayout pageTitle="Settings">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-bebas text-2xl tracking-tight text-gray-900 mb-2">
                  Restaurant Sections
                </h2>
                <p className="font-poppins text-sm text-gray-500">
                  Manage your restaurant dining areas and sections
                </p>
              </div>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-black hover:bg-gray-900 font-poppins flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Section
              </Button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
                <p className="font-poppins text-sm text-gray-500">
                  Loading sections...
                </p>
              </div>
            ) : sections.length === 0 ? (
              <div className="text-center py-12">
                <SettingsIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-bebas text-xl text-gray-900 mb-2">
                  No Sections Yet
                </h3>
                <p className="font-poppins text-sm text-gray-500 mb-6">
                  Create your first dining area section to get started
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  variant="outline"
                  className="font-poppins"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Section
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => (
                  <SectionCard
                    key={section._id}
                    section={section}
                    onEdit={handleEditSection}
                    onDelete={handleDeleteSection}
                    isLoading={isSubmitting}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateSectionDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateSection}
        isLoading={isSubmitting}
      />
    </ReservationPortalLayout>
  );
}
