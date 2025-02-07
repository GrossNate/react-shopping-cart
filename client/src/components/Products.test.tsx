import { ProductsRow } from "./Products"; 
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { CatalogItem } from "../../types";

test("Clicking on 'edit' button shows edit form", async () => {
  const dummyRow: CatalogItem = {
    _id: "123",
    title: "Dummy Item",
    price: 42,
    quantity: 8
  };
  render(<ProductsRow
    _id={dummyRow._id}
    title={dummyRow.title}
    price={dummyRow.price}
    quantity={dummyRow.quantity}
    onAddItem={vi.fn()}
    onDeleteProduct={vi.fn()}
    onEditItem={vi.fn()}/>);
  const user = userEvent.setup();
  const showEditProductButton = screen.getByRole("button", {name: /Edit/i});
  await user.click(showEditProductButton);
  const editForm = await screen.findByRole("form");
  expect(editForm).toBeInTheDocument();
});