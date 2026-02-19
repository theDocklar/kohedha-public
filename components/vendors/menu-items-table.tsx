"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteMenuItem, updateMenuItem } from "@/lib/menu";
import { useToast } from "@/hooks/use-toast";
import { MenuItem } from "@/app/vendors/menu/page";

interface MenuItemsTableProps {
  menuItems: MenuItem[];
  onRefresh: () => void;
}

export function MenuItemsTable({ menuItems, onRefresh }: MenuItemsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      setIsDeleting(true);
      await deleteMenuItem(selectedItem._id);
      toast({
        title: "Success",
        description: "Menu item deleted successfully",
      });
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete menu item",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      await updateMenuItem(item._id, {
        is_available: !item.is_available,
      });
      toast({
        title: "Success",
        description: `Menu item ${item.is_available ? "disabled" : "enabled"}`,
      });
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update menu item",
        variant: "destructive",
      });
    }
  };

  const openDeleteDialog = (item: MenuItem) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  // Group items by category
  const groupedItems = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, MenuItem[]>,
  );

  const categories = Object.keys(groupedItems).sort();

  return (
    <>
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="font-bebas text-xl text-gray-900 mb-3 flex items-center gap-2">
              {category}
              <Badge variant="secondary" className="font-poppins">
                {groupedItems[category].length}
              </Badge>
            </h3>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-poppins font-semibold">
                      Item Name
                    </TableHead>
                    <TableHead className="font-poppins font-semibold">
                      Description
                    </TableHead>
                    <TableHead className="font-poppins font-semibold text-right">
                      Price
                    </TableHead>
                    <TableHead className="font-poppins font-semibold text-center">
                      Status
                    </TableHead>
                    <TableHead className="font-poppins font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedItems[category].map((item) => (
                    <TableRow key={item._id} className="hover:bg-gray-50">
                      <TableCell className="font-poppins font-medium">
                        {item.name}
                      </TableCell>
                      <TableCell className="font-poppins text-sm text-gray-600 max-w-md truncate">
                        {item.description || "-"}
                      </TableCell>
                      <TableCell className="font-poppins text-right font-semibold">
                        {item.currency} {item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={item.is_available ? "default" : "secondary"}
                          className="font-poppins"
                        >
                          {item.is_available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="font-poppins">
                              Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleToggleAvailability(item)}
                              className="font-poppins cursor-pointer"
                            >
                              {item.is_available ? (
                                <>
                                  <EyeOff className="mr-2 h-4 w-4" />
                                  Mark Unavailable
                                </>
                              ) : (
                                <>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Mark Available
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openDeleteDialog(item)}
                              className="font-poppins text-red-600 cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bebas text-xl">
              Delete Menu Item
            </AlertDialogTitle>
            <AlertDialogDescription className="font-poppins">
              Are you sure you want to delete "{selectedItem?.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-poppins">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 font-poppins"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
