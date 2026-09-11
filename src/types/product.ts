export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  image: any;
  price: string | number;
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