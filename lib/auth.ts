export async function signOutVendor(): Promise<void> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor/logout`,
      {
        method: "POST",
        credentials: "include", // Important: sends cookies
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      console.error("Logout request failed:", res.status);
    }
  } catch (error) {
    console.error("Sign out error:", error);
  }
}

export async function checkVendorAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.ok;
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
}
