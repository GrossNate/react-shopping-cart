import { useEffect, useReducer, useState } from 'react';
import {
  CatalogItem,
  CatalogSortColumn,
  CatalogSortOrder,
  NewItem,
  SortState,
} from '../types';
import Cart from './components/Cart';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import {
  addItem,
  addProduct,
  checkout,
  deleteProduct,
  editProduct,
  getCart,
  getProducts,
} from './services/product';
import cartReducer, { CartAction } from './reducers/cartReducer';
import catalogReducer, { CatalogAction } from './reducers/catalogReducer';

export const App = () => {
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  const [catalog, dispatchCatalog] = useReducer(catalogReducer, []);

  const [showAddProductDialog, setShowAddProductDialog] = useState(false);

  const handleAddProduct = async (newCatalogItem: NewItem) => {
    const addedItem = await addProduct(newCatalogItem);
    if (addedItem) {
      dispatchCatalog(CatalogAction.CatalogAddProduct(addedItem));
    }
  };

  const handleDeleteProduct = async (productId: Pick<CatalogItem, '_id'>) => {
    const deleted = await deleteProduct(productId);
    if (deleted) {
      dispatchCatalog(CatalogAction.CatalogDeleteProduct(productId));
    }
  };

  const handleCheckout = async () => {
    const checkedOut = await checkout();
    if (checkedOut) {
      dispatchCart(CartAction.CartCheckout());
    }
  };

  const handleAddItem = async (productId: Pick<CatalogItem, '_id'>) => {
    const addedItemRemovedProduct = await addItem(productId);
    if (addedItemRemovedProduct) {
      const { item, product } = addedItemRemovedProduct;
      dispatchCart(CartAction.CartAddItem(item));
      dispatchCatalog(CatalogAction.CatalogEditProduct(product));
    }
  };

  const handleEditProduct = async (product: CatalogItem) => {
    const editedProduct = await editProduct(product);
    if (editedProduct) {
      dispatchCatalog(CatalogAction.CatalogEditProduct(product));
    }
  };

  const handleSortProducts = async (newSortState: SortState) => {
    console.log('handleSortProducts called', newSortState);
    dispatchCatalog(CatalogAction.CatalogSort(newSortState));
  };

  const toggleAddProductDialog = () => {
    setShowAddProductDialog((prev) => !prev);
  };

  useEffect(() => {
    console.log("useEffect ran");
    const asyncWrapper = async () => {
      const products = await getProducts();
      if (products) {
        dispatchCatalog(CatalogAction.CatalogRefresh(products));
      }
      const cart = await getCart();
      if (cart) {
        dispatchCart(CartAction.CartRefresh(cart));
      }
    };
    asyncWrapper();
  }, []);

  return (
    <div id="app">
      <header>
        <h1>The Shop!</h1>
        <Cart cart={cart} onCheckout={handleCheckout} />
      </header>
      <main>
        <Products
          products={catalog}
          onAddItem={handleAddItem}
          onEditItem={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onSortProducts={handleSortProducts}
          sortState={
            catalog.sortState ?? {
              sortColumn: CatalogSortColumn.Title,
              sortOrder: CatalogSortOrder.Asc,
            }
          }
        />
        <p>
          <button
            className="add-product-button"
            onClick={toggleAddProductDialog}
          >
            Add A Product
          </button>
        </p>
        <AddProduct
          show={showAddProductDialog}
          closeModal={toggleAddProductDialog}
          onAddProduct={handleAddProduct}
        />
      </main>
    </div>
  );
};

export default App;
