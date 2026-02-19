// Menu API utilities

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export interface MenuUploadResponse {
  success: boolean;
  message: string;
  data?: any;
  preview?: boolean;
}

// Get all menu items
export async function getMenuItems(
  category?: string,
  isAvailable?: boolean,
): Promise<MenuItem[]> {
  try {
    let url = `${API_URL}/vendor/menu`;
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (isAvailable !== undefined)
      params.append("is_available", String(isAvailable));

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch menu items");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Get menu items error:", error);
    throw error;
  }
}

// Upload CSV menu
export async function uploadMenuCSV(
  file: File,
  preview: boolean = true,
): Promise<MenuUploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const url = `${API_URL}/vendor/menu/upload-csv?preview=${preview}`;

    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to upload CSV");
    }

    return data;
  } catch (error: any) {
    console.error("Upload CSV error:", error);
    throw error;
  }
}

// Upload PDF menu
export async function uploadMenuPDF(
  file: File,
  preview: boolean = true,
): Promise<MenuUploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const url = `${API_URL}/vendor/menu/upload-pdf?preview=${preview}`;

    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to upload PDF");
    }

    return data;
  } catch (error: any) {
    console.error("Upload PDF error:", error);
    throw error;
  }
}

// Update menu item
export async function updateMenuItem(
  id: string,
  updates: Partial<MenuItem>,
): Promise<MenuItem> {
  try {
    const res = await fetch(`${API_URL}/vendor/menu/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update menu item");
    }

    return data.data;
  } catch (error) {
    console.error("Update menu item error:", error);
    throw error;
  }
}

// Delete menu item
export async function deleteMenuItem(id: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/vendor/menu/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete menu item");
    }
  } catch (error) {
    console.error("Delete menu item error:", error);
    throw error;
  }
}

// Analyze CSV structure
export async function analyzeCSV(file: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/vendor/menu/analyze-csv`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to analyze CSV");
    }

    return data.analysis;
  } catch (error) {
    console.error("Analyze CSV error:", error);
    throw error;
  }
}
