import { useEffect, useState } from "react";
import { CartItem, CatalogItem, NewItem } from "../types";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import { addItem, addProduct, checkout, deleteProduct, editProduct, getCart, getProducts } from "./services/product";

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [products, setProducts] = useState<CatalogItem[]>([]);

  const [showAddProductDialog, setShowAddProductDialog] = useState(false);

  const refreshCart = (item: CartItem) => {
    if (cart.some(({ _id }) => _id === item._id)) {
      setCart(cart => cart.map(cartItem => cartItem._id === item._id ? item : cartItem));
    } else {
      setCart(cart => cart.concat(item));
    }
  };

  const refreshProducts = (product: CatalogItem) => {
    if (products.some(({ _id }) => _id === product._id)) {
      setProducts(products => products.map(catalogItem => catalogItem._id === product._id ? product : catalogItem));
    } else {
      setProducts(products => products.concat(product));
    }
  }

  const handleAddProduct = async (newCatalogItem: NewItem) => {
    const addedItem = await addProduct(newCatalogItem);
    if (addedItem) {
      // setProducts(products => [...products].concat(addedItem));
      refreshProducts(addedItem);
    }
  };

  const handleDeleteProduct = async (productId: Pick<CatalogItem, "_id">) => {
    const deleted = await deleteProduct(productId);
    if (deleted) {
      setProducts(products => products.filter(product => product._id !== productId._id));
    }
  }

  const handleCheckout = async () => {
    const checkedOut = await checkout();
    if (checkedOut) {
      setCart([]);
    }
  };

  const handleAddItem = async (productId: Pick<CatalogItem, "_id">) => {
    const addedItemRemovedProduct = await addItem(productId);
    if (addedItemRemovedProduct) {
      const { item, product } = addedItemRemovedProduct;
      refreshCart(item);
      refreshProducts(product);
    }
  }

  const handleEditItem = async (product: CatalogItem) => {
    const editedProduct = await editProduct(product);
    if (editedProduct) {
      refreshProducts(editedProduct);
    }
  }

  const toggleAddProductDialog = () => {
    setShowAddProductDialog(prev => !prev);
  }

  useEffect(() => {
    const asyncWrapper = async () => {
      const products = await getProducts();
      if (products) {
        setProducts(products);
      }
      const cart = await getCart();
      if (cart) {
        setCart(cart);
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
        <Products products={products} setProducts={setProducts} onAddItem={handleAddItem} onEditItem={handleEditItem} onDeleteProduct={handleDeleteProduct} />
        <p>
          <button className="add-product-button" onClick={toggleAddProductDialog}>Add A Product</button>
        </p>
        <AddProduct show={showAddProductDialog} closeModal={toggleAddProductDialog} onAddProduct={handleAddProduct} />
      </main>
    </div>
  )
}

export default App

