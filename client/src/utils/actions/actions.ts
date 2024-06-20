"use server";

import endpoints from "@/config/server";
import { unstable_noStore } from "next/cache";

export const getAllBooks = async () => {
  try {
    unstable_noStore();
    const response = await fetch(endpoints.getBooks);
    const data = await response.json();

    const transformedData = data.data.map((book: IBookResponse) => {
      const { DeletedAt, UpdatedAt, CreatedAt, ...rest } = book;
      const formattedCreatedAt = CreatedAt.split("T")[0];
      return { ...rest, "Created At": formattedCreatedAt };
    });

    return transformedData;
  } catch (error: any) {
    console.error("Error fetching books:", error);
  }
};

export const deleteBook = async (id: number) => {
  try {
    const apiUrl = endpoints.deleteBook + `${id}`;
    unstable_noStore();
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete book. Error: ${errorData.message}`);
    }
    return true;
  } catch (error: any) {
    console.error("Error deleting book:", error);
  }
};
