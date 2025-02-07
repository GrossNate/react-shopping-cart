import axios from 'axios';
import {
  cartItemAddedSchema,
  cartItemsSchema,
  CatalogItem,
  catalogItemSchema,
  catalogItemsSchema,
  NewItem,
} from '../../types';

export const addProduct = async (newProduct: NewItem) => {
  const { data } = await axios.post('/api/products', newProduct);
  if (data) {
    return catalogItemSchema.parse(data);
  }
};

export const getProducts = async () => {
  const { data } = await axios.get('/api/products');
  if (data) {
    return catalogItemsSchema.parse(data);
  }
};

export const editProduct = async (product: CatalogItem) => {
  const { data } = await axios.put(`/api/products/${product._id}`, {
    title: product.title,
    price: product.price,
    quantity: product.quantity,
  });
  if (data) {
    return catalogItemSchema.parse(data);
  }
};

export const deleteProduct = async (productId: Pick<CatalogItem, '_id'>) => {
  const { status } = await axios.delete(`/api/products/${productId._id}`);
  return status === 200;
};

export const getCart = async () => {
  const { data } = await axios.get('/api/cart');
  if (data) {
    return cartItemsSchema.parse(data);
  }
};

export const checkout = async () => {
  const { status } = await axios.post('/api/checkout');
  return status === 200;
};

export const addItem = async (productId: Pick<CatalogItem, '_id'>) => {
  const { data } = await axios.post('/api/add-to-cart', {
    productId: productId._id,
  });
  if (data) {
    return cartItemAddedSchema.parse(data);
  }
};
