// Review and product utility functions

import type { ProductReviewRecord } from '../types/admin';

export type ReviewSortOption = 'newest' | 'highest' | 'lowest' | 'helpful';
export type ReviewStarFilter = 'all' | '5' | '4' | '3' | '2' | '1';

export function calculateRatingSummary(reviews: ProductReviewRecord[]) {
  const total = reviews.length;
  if (total === 0) {
    return { average: 0, total: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = sum / total;

  const distribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return { average, total, distribution };
}

export function filterAndSortReviews(
  reviews: ProductReviewRecord[],
  sortBy: ReviewSortOption,
  starFilter: ReviewStarFilter
): ProductReviewRecord[] {
  let filtered = [...reviews];

  // Apply star filter
  if (starFilter !== 'all') {
    const stars = parseInt(starFilter);
    filtered = filtered.filter(r => r.rating === stars);
  }

  // Apply sorting
  switch (sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'highest':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'lowest':
      filtered.sort((a, b) => a.rating - b.rating);
      break;
    case 'helpful':
      filtered.sort((a, b) => b.helpful - a.helpful);
      break;
  }

  return filtered;
}

export function hasVerifiedPurchaseForProduct(customerId: string, productId: string): boolean {
  // Placeholder - in real app, check order history
  return false;
}

export function toggleHelpfulVoterList(
  review: ProductReviewRecord,
  voterId: string,
  isHelpful: boolean
): ProductReviewRecord {
  const voterIds = new Set(review.voterIds || []);
  
  if (voterIds.has(voterId)) {
    voterIds.delete(voterId);
    return {
      ...review,
      helpful: isHelpful ? review.helpful - 1 : review.helpful,
      notHelpful: !isHelpful ? review.notHelpful - 1 : review.notHelpful,
      voterIds: Array.from(voterIds),
    };
  } else {
    voterIds.add(voterId);
    return {
      ...review,
      helpful: isHelpful ? review.helpful + 1 : review.helpful,
      notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful,
      voterIds: Array.from(voterIds),
    };
  }
}

export function validateReviewSubmission(
  rating: number,
  title: string,
  comment: string
): { valid: boolean; error?: string } {
  if (rating < 1 || rating > 5) {
    return { valid: false, error: 'Rating must be between 1 and 5' };
  }
  if (title.trim().length < 3) {
    return { valid: false, error: 'Title must be at least 3 characters' };
  }
  if (comment.trim().length < 10) {
    return { valid: false, error: 'Comment must be at least 10 characters' };
  }
  return { valid: true };
}

export function validateStockAlertEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email address' };
  }
  return { valid: true };
}

export function validateProductAvailabilityForStockAlert(stock: number): boolean {
  return stock <= 0;
}

export function upsertStockAlertSubscription(
  productId: string,
  email: string,
  existingAlerts: Array<{ productId: string; email: string }>
): Array<{ productId: string; email: string }> {
  const exists = existingAlerts.some(
    alert => alert.productId === productId && alert.email === email
  );
  
  if (exists) {
    return existingAlerts;
  }
  
  return [...existingAlerts, { productId, email }];
}
