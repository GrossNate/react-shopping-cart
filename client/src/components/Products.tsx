import { ReactEventHandler, useState } from "react";
import { CatalogItem } from "../../types";

interface ProductsProps {
  products: CatalogItem[];
  onAddItem: (productId: Pick<CatalogItem, "_id">) => Promise<void>;
  onEditItem: (product: CatalogItem) => Promise<void>;
  onDeleteProduct: (productId: Pick<CatalogItem, "_id">) => Promise<void>;
}

interface ProductsRowProps extends CatalogItem, Pick<ProductsProps, "onAddItem" | "onEditItem" | "onDeleteProduct"> { }

export const ProductsRow = ({ _id, title, price, quantity, onAddItem, onEditItem, onDeleteProduct }: ProductsRowProps) => {
  const [showEditProduct, setShowEditProduct] = useState(false);
  const toggleShowEditProduct = () => setShowEditProduct(prev => !prev);
  const handleAddItem = () => {
    onAddItem({ _id });
  }
  const handleDeleteProduct = () => {
    onDeleteProduct({ _id });
  }
  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart" disabled={quantity < 1} onClick={handleAddItem}>Add to Cart</button>
          <button className="edit" onClick={toggleShowEditProduct}>Edit</button>
        </div>
        <button className="delete-button" onClick={handleDeleteProduct}><span>X</span></button>
      </div>
      {
        showEditProduct ?
          <EditProduct _id={_id} title={title} quantity={quantity} price={price} setShowEditProduct={setShowEditProduct} onEditItem={onEditItem} /> :
          null
      }
    </li>
  );
};

const Products = ({ products, onAddItem, onEditItem, onDeleteProduct }: ProductsProps) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(({ _id, title, price, quantity }) => <ProductsRow key={_id} _id={_id} title={title} price={price} quantity={quantity} onAddItem={onAddItem} onEditItem={onEditItem} onDeleteProduct={onDeleteProduct} />)}
      </ul>
    </div>

  );
};


interface EditProductProps extends Omit<ProductsRowProps, "onAddItem" | "onDeleteProduct"> {
  setShowEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditProduct = ({ _id, title, quantity, price, setShowEditProduct, onEditItem }: EditProductProps) => {
  const [productDetails, setProductDetails] =
    useState<CatalogItem>({ _id, title, quantity, price });

  const set = (fieldName: string): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
    return ({ target: { value } }) => setProductDetails(details => ({ ...details, [fieldName]: value }));
  };

  const handleEditItem: ReactEventHandler = (event) => {
    event.preventDefault();
    onEditItem(productDetails);
    setShowEditProduct(false);
  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form role="form">
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={productDetails.title}
            onChange={set("title")}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={productDetails.price}
            onChange={set("price")}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={productDetails.quantity}
            onChange={set("quantity")}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit" onClick={handleEditItem}>Update</button>
          <button type="button" onClick={() => setShowEditProduct(false)}>Cancel</button>
        </div>
      </form>
    </div>

  );
};

export default Products;
