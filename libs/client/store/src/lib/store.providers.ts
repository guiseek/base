import { ProductService } from './+store/product.service';
import { StoreService } from './+store/store.service';
import { StoreFacade } from './+store/store.facade';

export const storeProviders = [StoreService, StoreFacade, ProductService];
