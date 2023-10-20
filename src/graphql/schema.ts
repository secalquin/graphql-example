import { axiosInstance } from "../config/axiosIntance";

export const typeDefs = `#graphql
  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Product {
    id: ID!
    title: String
    price: Float
    category: String
    description: String
    image: String
  }
`;

export const resolvers = {
  Query: {
    products: async () => {
      const dataFetched = await axiosInstance.get("/products");
      return dataFetched.data;
    },
    product: async (_: any, { id }: any) => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        if (response.data) {
          return response.data;
        } else {
          // Si no se encontraron datos, puedes manejarlo de acuerdo a tus necesidades.
          // En este ejemplo, simplemente lanzaremos una excepción para indicar que no se encontraron datos.
          throw new Error("Producto no encontrado");
        }
      } catch (error) {
        // Manejar errores de red u otras excepciones aquí
        throw error; // Puedes lanzar el error o manejarlo de acuerdo a tus necesidades
      }
    },
  },
};
