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

// Complete registration step (Step 2 or Step 3)
export async function completeRegistrationStep(stepData: {
  currentStep: number;
  companyName?: string;
  businessRegistrationNo?: string;
  vendorMobile?: string;
  businessCategory?: string;
  location?: {
    businessName?: string;
    streetAddress: string;
    city: string;
    district?: string;
    postalCode?: string;
    country?: string;
  };
  website?: string;
  description?: string;
}): Promise<{
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor/profile/complete`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stepData),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || "Failed to complete registration step",
      };
    }

    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("Registration step error:", error);
    return {
      success: false,
      error: "Unable to reach server. Please check your connection.",
    };
  }
}

// Get current vendor profile
export async function getCurrentVendor(): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor/profile`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || "Failed to fetch profile",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Get profile error:", error);
    return {
      success: false,
      error: "Unable to reach server",
    };
  }
}
