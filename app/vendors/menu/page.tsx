"use client";

import { useState, useEffect } from "react";
import { VendorLayout } from "@/components/vendors/vendor-layout";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { MenuItemsTable } from "@/components/vendors/menu-items-table";
import { CSVUploadDialog } from "@/components/vendors/csv-upload-dialog";
import { PDFUploadDialog } from "@/components/vendors/pdf-upload-dialog";
import { getMenuItems } from "@/lib/menu";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export interface MenuItem {
  _id: string;
  category: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  is_available: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const items = await getMenuItems();
      setMenuItems(items);
    } catch (error: any) {
      console.error("Failed to fetch menu items:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load menu items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleUploadSuccess = () => {
    setCsvDialogOpen(false);
    setPdfDialogOpen(false);
    fetchMenuItems();
    toast({
      title: "Success",
      description: "Menu items uploaded successfully",
    });
  };

  return (
    <VendorLayout pageTitle="Menu Management">
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Upload Buttons */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-gray-100">
            <h2 className="text-xl font-bebas text-gray-900 mb-4">
              Upload Menu
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setCsvDialogOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-poppins"
                size="lg"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                Upload CSV
              </Button>
              <Button
                onClick={() => setPdfDialogOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-poppins"
                size="lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                Upload PDF
              </Button>
            </div>
            <p className="text-sm text-gray-500 font-poppins mt-4">
              Upload your menu using CSV for structured data or PDF for
              AI-powered extraction
            </p>
          </div>

          {/* Menu Items Table */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bebas text-gray-900">
                Menu Items ({menuItems.length})
              </h2>
              <Button
                onClick={fetchMenuItems}
                variant="outline"
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Refresh"
                )}
              </Button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : menuItems.length === 0 ? (
              <div className="text-center py-12">
                <Upload className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-poppins font-medium text-gray-900 mb-2">
                  No menu items yet
                </h3>
                <p className="text-gray-500 font-poppins mb-6">
                  Upload your first menu using CSV or PDF
                </p>
              </div>
            ) : (
              <MenuItemsTable
                menuItems={menuItems}
                onRefresh={fetchMenuItems}
              />
            )}
          </div>
        </div>
      </div>

      {/* Upload Dialogs */}
      <CSVUploadDialog
        open={csvDialogOpen}
        onOpenChange={setCsvDialogOpen}
        onSuccess={handleUploadSuccess}
      />
      <PDFUploadDialog
        open={pdfDialogOpen}
        onOpenChange={setPdfDialogOpen}
        onSuccess={handleUploadSuccess}
      />
    </VendorLayout>
  );
}
