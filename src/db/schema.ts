// Database schema definitions

export const STOCK_ALERTS_TABLE_NAME = 'stock_alerts';

export const STOCK_ALERTS_TABLE_SCHEMA = {
  id: 'string',
  productId: 'string',
  email: 'string',
  createdAt: 'string',
  notified: 'boolean',
};

export const STOCK_ALERTS_SQL_SCHEMA = `
  CREATE TABLE IF NOT EXISTS stock_alerts (
    id TEXT PRIMARY KEY,
    productId TEXT NOT NULL,
    email TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    notified INTEGER DEFAULT 0,
    UNIQUE(productId, email)
  )
`;
