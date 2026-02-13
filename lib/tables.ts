export type TableType = "indoor" | "outdoor" | "standard";

export type Table = {
  _id: string;
  vendorId: string;
  tableNumber: string;
  seatingCapacity: number;
  tableType: TableType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateTableData = {
  tableNumber: string;
  seatingCapacity: number;
  tableType: TableType;
};

export type UpdateTableData = {
  tableNumber?: string;
  seatingCapacity?: number;
  tableType?: TableType;
  isActive?: boolean;
};

export type TablesStats = {
  totalTables: number;
  activeTables: number;
  inactiveTables: number;
  totalCapacity: number;
};

export type TablesResponse = {
  success: boolean;
  count: number;
  data: {
    tables: Table[];
    stats: TablesStats;
  };
};

export type SingleTableResponse = {
  success: boolean;
  data: Table;
};

export type TableActionResponse = {
  success: boolean;
  message: string;
  data?: Table;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

// Get all tables for the vendor
export async function getTables(): Promise<TablesResponse> {
  const res = await fetch(`${API_URL}/vendor/tables`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tables");
  }

  return res.json();
}

// Get a single table by ID
export async function getTableById(id: string): Promise<SingleTableResponse> {
  const res = await fetch(`${API_URL}/vendor/tables/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch table");
  }

  return res.json();
}

// Create a new table
export async function createTable(
  data: CreateTableData,
): Promise<TableActionResponse> {
  const res = await fetch(`${API_URL}/vendor/tables/new-table`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create table");
  }

  return result;
}

// Update an existing table
export async function updateTable(
  id: string,
  data: UpdateTableData,
): Promise<TableActionResponse> {
  const res = await fetch(`${API_URL}/vendor/tables/update-table/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update table");
  }

  return result;
}

// Delete a table
export async function deleteTable(id: string): Promise<TableActionResponse> {
  const res = await fetch(`${API_URL}/vendor/tables/delete-table/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete table");
  }

  return result;
}

// Toggle table active status
export async function toggleTableStatus(
  id: string,
): Promise<TableActionResponse> {
  const res = await fetch(`${API_URL}/vendor/tables/${id}/toggle`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to toggle table status");
  }

  return result;
}

// Get tables by type
export async function getTablesByType(
  type: TableType,
): Promise<TablesResponse> {
  const res = await fetch(`${API_URL}/vendor/tables/type/${type}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tables by type");
  }

  return res.json();
}
