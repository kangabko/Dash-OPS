export type POStatus = 'Draft' | 'Approved' | 'Sent to Supplier' | 'In Transit' | 'Received Partial' | 'Received Complete';

export interface PurchaseOrder {
  id: string;
  supplier: string;
  status: POStatus;
  itemsCount: number;
  eta: string;
  isOverdue: boolean;
}

export interface QCResult {
  date: string;
  passed: number;
  rejected: number;
  syariReject: number; // Specific to Syari Fashion
}

export interface WarehouseZone {
  id: string;
  name: string;
  occupancy: number; // 0-100
  category: 'Hijab' | 'Gamis' | 'Blouse' | 'Aksesoris';
}

export interface ActionItem {
  id: string;
  issue: string;
  recommendation: string;
  pic: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface SKUStock {
  sku: string;
  name: string;
  stock: number;
  safetyStock: number;
  agingDays: number;
}
