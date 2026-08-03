export type PageType = 
  | 'home' 
  | 'pressure-cookers' 
  | 'stainless-steel' 
  | 'tri-ply' 
  | 'black-beauty' 
  | 'heritage-aluminum' 
  | 'cookware' 
  | 'cookware-tri-ply'
  | 'cookware-honeycomb'
  | 'about' 
  | 'contact' 
  | 'enquiry-list'
  | 'faqs'
  | 'product-detail'
  | 'blog'
  | 'policies'
  | 'manuals'
  | 'dealer'
  | 'warranty'
  | 'pan-india'
  | '404';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  image: string;
  size: string;
  sku: string;
  quantity: number;
}

export interface InquiryFormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}
