// Admin and E-commerce Type Definitions

export type AdminRole = 
  | 'SUPER_ADMIN' 
  | 'PRODUCT_MANAGER' 
  | 'INVENTORY_MANAGER' 
  | 'ORDER_MANAGER' 
  | 'CONTENT_MANAGER';

export type OrderStatus = 
  | 'Pending' 
  | 'Processing' 
  | 'Shipped' 
  | 'Delivered' 
  | 'Cancelled' 
  | 'Returned';

export type PaymentMethodType = 
  | 'COD' 
  | 'Card' 
  | 'UPI' 
  | 'NetBanking' 
  | 'Wallet';

export interface AdminStaffUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: AdminRole;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categoryId: string;
  brandId?: string;
  stock: number;
  images: string[];
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
}

export interface AdminBrand {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: CustomerAddress;
  paymentMethod: PaymentMethodType;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface CustomerAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CustomerNotification {
  id: string;
  customerId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface StorefrontConfig {
  siteName: string;
  siteDescription: string;
  logo?: string;
  primaryColor: string;
  accentColor: string;
  footerText: string;
}

export interface CouponCodeRecord {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  active: boolean;
}

export interface PaymentGatewaySettings {
  provider: string;
  apiKey: string;
  apiSecret: string;
  webhookUrl?: string;
}

export interface PaymentTransactionRecord {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethodType;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: string;
}

export interface ReturnRequestRecord {
  id: string;
  orderId: string;
  customerId: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface PriceHistoryEntry {
  id: string;
  productId: string;
  price: number;
  compareAtPrice?: number;
  changedBy: string;
  changedAt: string;
}

export interface StockHistoryEntry {
  id: string;
  productId: string;
  previousStock: number;
  newStock: number;
  changeReason: string;
  changedBy: string;
  changedAt: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface ProductReviewRecord {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpful: number;
  notHelpful: number;
  voterIds: string[];
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductReviewReport {
  id: string;
  reviewId: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'dismissed';
  createdAt: string;
}

export interface ProductQuestionRecord {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  question: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
  createdAt: string;
}

export interface ProductAnswerRecord {
  id: string;
  questionId: string;
  answer: string;
  answeredBy: string;
  answeredAt: string;
}

export interface StockAlertRecord {
  id: string;
  productId: string;
  email: string;
  createdAt: string;
  notified: boolean;
}
