// Checkout and order utility functions

import type { OrderStatus, PaymentMethodType } from '../types/admin';

export const DEFAULT_COUPONS = [
  {
    id: 'coupon-1',
    code: 'WELCOME10',
    discountType: 'percentage' as const,
    discountValue: 10,
    minOrderValue: 500,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    active: true,
  },
];

export const DEFAULT_PAYMENT_SETTINGS = {
  codEnabled: true,
  minCodAmount: 0,
  maxCodAmount: 50000,
  cardEnabled: true,
  upiEnabled: true,
};

export function calculateServerOrderTotals(items: Array<{ price: number; quantity: number }>) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
}

export function validateCodEligibility(amount: number): { eligible: boolean; reason?: string } {
  if (amount < DEFAULT_PAYMENT_SETTINGS.minCodAmount) {
    return { eligible: false, reason: 'Order amount too low for COD' };
  }
  if (amount > DEFAULT_PAYMENT_SETTINGS.maxCodAmount) {
    return { eligible: false, reason: 'Order amount exceeds COD limit' };
  }
  return { eligible: true };
}

export function canCustomerCancelOrder(status: OrderStatus): boolean {
  return ['Pending', 'Processing'].includes(status);
}

export function canCustomerRequestReturn(status: OrderStatus): boolean {
  return status === 'Delivered';
}
