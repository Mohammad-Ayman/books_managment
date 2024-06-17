interface IBook {
  ID: number;
  title: string;
  author: string;
  isbn: string;
  "Created At"?: string;
}

interface IBookResponse {
  ID: number;
  title: string;
  author: string;
  isbn: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}
