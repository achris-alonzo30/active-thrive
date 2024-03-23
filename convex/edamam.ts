"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";

export const getFoods = action({
  args: {
    ingr: v.string(),
  },
  handler: async (ctx, { ingr }) => {
    const endpoint = "https://api.edamam.com/api/food-database/v2/parser";
    const paramsObj = {
      app_id: "70ca9d9a",
      app_key: "162ecbc665cc84f1f2e3643412261b86",
      ingr,
    };

    const searchParams = new URLSearchParams(paramsObj);
    const url = new URL(endpoint);
    url.search = searchParams.toString();

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data from the API");
    }
  },
});
