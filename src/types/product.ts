export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  shortName: string;
  image: any;
  price: number;
  description: string;
  strap: string;
  color: string;
  warranty: string;
  liked: boolean;
  specs: ProductSpec[];
  details: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductSearch {
  id: string;
  brand: string;
  name: string;
  shortName: string;
  image: any;
  price: number;
  color: string;
  strap: string;
  warranty: string;
  specs: ProductSpec[];
}