// Admin utility functions for pricing and RBAC

import type { AdminRole } from '../types/admin';

export type PermissionDomain = 
  | 'products' 
  | 'orders' 
  | 'customers' 
  | 'staff' 
  | 'settings' 
  | 'content';

const rolePermissions: Record<AdminRole, PermissionDomain[]> = {
  SUPER_ADMIN: ['products', 'orders', 'customers', 'staff', 'settings', 'content'],
  PRODUCT_MANAGER: ['products', 'content'],
  INVENTORY_MANAGER: ['products'],
  ORDER_MANAGER: ['orders', 'customers'],
  CONTENT_MANAGER: ['content'],
};

export function hasAdminPermission(role: AdminRole, domain: PermissionDomain): boolean {
  return rolePermissions[role]?.includes(domain) ?? false;
}

export function validateAndComputePricing(price: number, compareAtPrice?: number) {
  const validPrice = Math.max(0, price);
  const validComparePrice = compareAtPrice ? Math.max(0, compareAtPrice) : undefined;
  
  return {
    price: validPrice,
    compareAtPrice: validComparePrice,
    discount: validComparePrice && validComparePrice > validPrice 
      ? Math.round(((validComparePrice - validPrice) / validComparePrice) * 100)
      : 0,
  };
}

export function validateProductImageFile(file: { mimetype: string; size: number }): {
  valid: boolean;
  error?: string;
} {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.mimetype)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 5MB limit.' };
  }

  return { valid: true };
}
