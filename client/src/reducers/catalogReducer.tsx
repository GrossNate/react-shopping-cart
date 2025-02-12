import {
  CatalogItem,
  Catalog,
  SortState,
  CatalogSortColumn,
  CatalogSortOrder,
} from '../../types';

interface CatalogRefreshAction {
  type: 'CATALOG_REFRESH';
  payload: CatalogItem[];
}
interface CatalogAddProductAction {
  type: 'CATALOG_ADD_PRODUCT';
  payload: CatalogItem;
}
interface CatalogDeleteProductAction {
  type: 'CATALOG_DELETE_PRODUCT';
  payload: Pick<CatalogItem, '_id'>;
}
interface CatalogEditProductAction {
  type: 'CATALOG_EDIT_PRODUCT';
  payload: CatalogItem;
}
interface CatalogSortAction {
  type: 'CATALOG_SORT';
  payload: SortState;
}

type CatalogAction =
  | CatalogRefreshAction
  | CatalogAddProductAction
  | CatalogDeleteProductAction
  | CatalogEditProductAction
  | CatalogSortAction;

export const CatalogAction = {
  CatalogRefresh: (payload: Catalog): CatalogRefreshAction => ({
    type: 'CATALOG_REFRESH',
    payload,
  }),
  CatalogAddProduct: (payload: CatalogItem): CatalogAddProductAction => ({
    type: 'CATALOG_ADD_PRODUCT',
    payload,
  }),
  CatalogDeleteProduct: (
    payload: Pick<CatalogItem, '_id'>
  ): CatalogDeleteProductAction => ({
    type: 'CATALOG_DELETE_PRODUCT',
    payload,
  }),
  CatalogEditProduct: (payload: CatalogItem): CatalogEditProductAction => ({
    type: 'CATALOG_EDIT_PRODUCT',
    payload,
  }),
  CatalogSort: (payload: SortState): CatalogSortAction => ({
    type: 'CATALOG_SORT',
    payload,
  }),
};

const sortCatalog = (
  currentCatalog: Catalog,
  newSortState?: SortState
): Catalog => {
console.log("sort called", currentCatalog, newSortState);
  const { sortColumn, sortOrder } = newSortState ??
    currentCatalog.sortState ?? {
      sortColumn: CatalogSortColumn.Title,
      sortOrder: CatalogSortOrder.Asc,
    };
  const newSorted: Catalog = [...currentCatalog];
  newSorted.sort((a, b) => {
    if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === 'ASC' ? 1 : -1;
    } else if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === 'ASC' ? -1 : 1;
    } else {
      return 0;
    }
  });
  newSorted.sortState = { sortColumn, sortOrder };
  return newSorted;
};

const catalogReducer = (currentCatalog: Catalog, action: CatalogAction) => {
  const { type } = action;
  switch (type) {
    case 'CATALOG_SORT': {
      return sortCatalog(currentCatalog, action.payload);
    }
    case 'CATALOG_REFRESH': {
      return sortCatalog(action.payload);
    }
    case 'CATALOG_DELETE_PRODUCT': {
      const { payload } = action;
      const returnCatalog: Catalog = currentCatalog.filter(({ _id }) => _id !== payload._id);
      returnCatalog.sortState = currentCatalog.sortState;
      return sortCatalog(returnCatalog);
    }
    case 'CATALOG_ADD_PRODUCT': {
      const returnCatalog: Catalog = [ ...currentCatalog, action.payload];
      returnCatalog.sortState = currentCatalog.sortState;
      return sortCatalog(returnCatalog);
    }
    case 'CATALOG_EDIT_PRODUCT': {
      const { payload } = action;
      if (currentCatalog.some(({ _id }) => _id === payload._id)) {
        return sortCatalog(
          currentCatalog.map((product) =>
            product._id === payload._id ? payload : product
          )
        );
      } else {
        return sortCatalog([...currentCatalog, payload]);
      }
    }
    default:
      throw new Error('Catalog Reducer error!');
  }
};

export default catalogReducer;
