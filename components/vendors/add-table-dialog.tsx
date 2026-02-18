"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableShape } from "@/lib/tables";
import { Loader2 } from "lucide-react";

interface AddTableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    tableNumber: string;
    seatingCapacity: number;
    shape: TableShape;
  }) => Promise<void>;
  selectedShape: TableShape | null;
}

const tableShapes: { value: TableShape; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
  { value: "rectangle-h", label: "Rectangle (Horizontal)" },
  { value: "rectangle-v", label: "Rectangle (Vertical)" },
];

export function AddTableDialog({
  open,
  onOpenChange,
  onSubmit,
  selectedShape,
}: AddTableDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    tableNumber: "",
    seatingCapacity: 4,
    shape: (selectedShape || "square") as TableShape,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.tableNumber.trim()) {
      newErrors.tableNumber = "Table name is required";
    }
    if (formData.seatingCapacity < 1) {
      newErrors.seatingCapacity = "Capacity must be at least 1";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit(formData);
      // Reset form
      setFormData({
        tableNumber: "",
        seatingCapacity: 4,
        shape: (selectedShape || "square") as TableShape,
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
      setErrors({});
      // Reset form
      setFormData({
        tableNumber: "",
        seatingCapacity: 4,
        shape: (selectedShape || "square") as TableShape,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Add New Table</DialogTitle>
          <DialogDescription>
            Create a new table with custom name and seating capacity
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tableNumber">
              Table Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="tableNumber"
              value={formData.tableNumber}
              onChange={(e) =>
                setFormData({ ...formData, tableNumber: e.target.value })
              }
              placeholder="e.g., Table 1, VIP-01, Window-5"
              disabled={isLoading}
              autoFocus
            />
            {errors.tableNumber && (
              <p className="text-xs text-red-500">{errors.tableNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="seatingCapacity">
              Seating Capacity <span className="text-red-500">*</span>
            </Label>
            <Input
              id="seatingCapacity"
              type="number"
              min="1"
              max="50"
              value={formData.seatingCapacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seatingCapacity: parseInt(e.target.value) || 1,
                })
              }
              disabled={isLoading}
            />
            {errors.seatingCapacity && (
              <p className="text-xs text-red-500">{errors.seatingCapacity}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shape">Table Shape</Label>
            <Select
              value={formData.shape}
              onValueChange={(value: TableShape) =>
                setFormData({ ...formData, shape: value })
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent>
                {tableShapes.map((shape) => (
                  <SelectItem key={shape.value} value={shape.value}>
                    {shape.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Table
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
