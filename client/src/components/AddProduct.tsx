import { useRef, useEffect, useState, ReactEventHandler } from "react";
import { CatalogItem } from "../../types";

interface AddProductProps {
  show: boolean;
  closeModal: () => void;
  onAddProduct: (newCatalogItem: Omit<CatalogItem, "_id">) => void;
}

const AddProduct = ({ show, closeModal, onAddProduct }: AddProductProps) => {
  const ref = useRef(null);
  const [addProductDetails, setAddProductDetails] =
    useState<Omit<CatalogItem, "_id">>({ title: "", quantity: 0, price: 0 });

  const set = (fieldName: string): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
    return ({ target: { value } }) => setAddProductDetails(details => ({ ...details, [fieldName]: value }));
  };

  const handleAddProduct: ReactEventHandler = (e) => {
    e.preventDefault();
    onAddProduct(addProductDetails);
    setAddProductDetails({ title: "", quantity: 0, price: 0 });
    closeModal();
  };

  useEffect(() => {
    if (show) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [show]);

  return (
    <dialog id="add-form-dialog" ref={ref} onCancel={closeModal}>
      <div>
        <h3>Add Product</h3>
        <form>
          <div className="input-group">
            <label htmlFor="product-name">Product Name:</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              value={addProductDetails.title}
              onChange={set("title")}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-price">Price:</label>
            <input
              type="number"
              id="product-price"
              name="product-price"
              value={addProductDetails.price}
              onChange={set("price")}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-quantity">Quantity:</label>
            <input
              type="number"
              id="product-quantity"
              name="product-quantity"
              value={addProductDetails.quantity}
              onChange={set("quantity")}
              min="0"
              required
            />
          </div>
          <div className="actions form-actions">
            <button type="submit" onClick={handleAddProduct}>Add</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>

  );
}

export default AddProduct;
