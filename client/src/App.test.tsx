import { App } from './App';
import { render, screen } from '@testing-library/react';
import { getCart, getProducts } from './services/product';
import { CartItem, CatalogItem } from '../types';
import { mockCart, mockProducts } from '../mockData/data.ts';

vi.mock('./services/product.ts');

const mockedGetCart = vi.mocked(getCart);
const mockedGetProducts = vi.mocked(getProducts);

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

it('renders empty cart and empty products', async () => {
  const mockEmptyCart: CartItem[] = [];
  const mockEmptyProducts: CatalogItem[] = [];

  mockedGetCart.mockResolvedValue(mockEmptyCart);
  mockedGetProducts.mockResolvedValue(mockEmptyProducts);

  render(<App />);

  const mainHead = await screen.findByRole('heading', {
    level: 1,
    name: /The Shop/i,
  });

  expect(mainHead).toBeInTheDocument();
});

it('renders cart and products', async () => {
  mockedGetCart.mockResolvedValue(mockCart);
  mockedGetProducts.mockResolvedValue(mockProducts);

  render(<App />);
  const cartItemTitle = await screen.findByRole('cell', {
    name: RegExp(mockCart[0].title, 'i'),
  });
  expect(cartItemTitle).toBeInTheDocument();

  const catalogItemTitle = await screen.findByRole('heading', {
    level: 3,
    name: RegExp(mockProducts[1].title, 'i'),
  });
  expect(catalogItemTitle).toBeInTheDocument();
});
