import AddProduct from './AddProduct';
import { render, screen } from '@testing-library/react';

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

it('contains a dialog element', async () => {
  render(
    <AddProduct show={true} closeModal={vi.fn()} onAddProduct={vi.fn()} />
  );
  const dialog = await screen.findByRole('dialog', { hidden: true });
  expect(dialog).toBeInTheDocument();
});
