const serverUrl = process.env.serverUrl || "http://localhost:8080/api";

const endpoints = {
  getBooks: `${serverUrl}/book`,
  getBook: `${serverUrl}/book/`,
  addBook: `${serverUrl}/book`,
  updateBook: `${serverUrl}/book/`,
  deleteBook: `${serverUrl}/book/`,
};

export default endpoints;
