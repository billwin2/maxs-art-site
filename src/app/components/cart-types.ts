// Money nominal type to prevent mixing raw numbers by accident
export type Cents = number & { readonly __brand: 'cents'};
export const cents = (n:number): Cents => n as Cents;

export type ProductType = 'original' | 'print';

export type ProductBase = {
  id: string;           // stable id (use src or a slug)
  title: string;        // User-friendly title
  image: string;        // image URL
  priceCents: Cents;   // store prices in cents
  type: ProductType;    // 'original' | 'print'
};

export type OriginalProduct = ProductBase & {
  type: 'original';
  maxQty?: 1; // Originals cap at 1
  soldOut?: boolean;
}

// This will allow the print to be bought with different sizes and/or finishes
export type PrintVariant = {
  variantId: string; // '8x10-matte'
  label: string; //'8x10 Matte'
  priceCents?: Cents; // Override base price if needed
};


export type PrintProduct = ProductBase & {
  type: 'print';
  variants?: PrintVariant[]; // optional; empty = use base price
};

export type Product = OriginalProduct | PrintProduct;

// Quantity type must be positive int
export type Quantity = number & { readonly __brand: 'quantity>0'};
export const qty = (n: number) => Math.max(1, Math.floor(n)) as Quantity;

// What is actually going in the cart (snapshot)
// Cart item = Product + quantity (+ optional print variant info)
export type CartItem = Product & {
  qty: number;
  variantId?: string;
  variantLabel?: string;
};


// Entire cart state
export type CartState ={
  v:1;  // version for localStorage migration
  items: CartItem[];
};

//Type guards
export const isOriginal = (p: Product): p is OriginalProduct => p.type === 'original';
export const isPrint= (p: Product): p is PrintProduct => p.type === 'print';
