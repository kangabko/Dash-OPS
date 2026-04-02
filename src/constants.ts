import { PurchaseOrder, QCResult, WarehouseZone, ActionItem, SKUStock } from './types';

export const MOCK_POS: PurchaseOrder[] = [
  { id: 'PO-2024-001', supplier: 'Kain Sejahtera', status: 'In Transit', itemsCount: 500, eta: '2024-03-28', isOverdue: true },
  { id: 'PO-2024-002', supplier: 'Aksesoris Hijab Co', status: 'Sent to Supplier', itemsCount: 1200, eta: '2024-04-05', isOverdue: false },
  { id: 'PO-2024-003', supplier: 'Gamis Prima', status: 'Received Partial', itemsCount: 300, eta: '2024-03-30', isOverdue: false },
  { id: 'PO-2024-004', supplier: 'Batik Syari Indah', status: 'Approved', itemsCount: 150, eta: '2024-04-10', isOverdue: false },
  { id: 'PO-2024-005', supplier: 'Khimar Exclusive', status: 'In Transit', itemsCount: 800, eta: '2024-04-01', isOverdue: true },
];

export const MOCK_QC_DATA: QCResult[] = [
  { date: '2024-03-25', passed: 450, rejected: 50, syariReject: 15 },
  { date: '2024-03-26', passed: 520, rejected: 30, syariReject: 5 },
  { date: '2024-03-27', passed: 480, rejected: 45, syariReject: 20 },
  { date: '2024-03-28', passed: 600, rejected: 20, syariReject: 2 },
  { date: '2024-03-29', passed: 550, rejected: 40, syariReject: 12 },
  { date: '2024-03-30', passed: 400, rejected: 60, syariReject: 25 },
  { date: '2024-03-31', passed: 580, rejected: 25, syariReject: 8 },
];

export const MOCK_ZONES: WarehouseZone[] = [
  { id: 'Z-1', name: 'Zone Hijab A', occupancy: 85, category: 'Hijab' },
  { id: 'Z-2', name: 'Zone Hijab B', occupancy: 40, category: 'Hijab' },
  { id: 'Z-3', name: 'Zone Gamis A', occupancy: 92, category: 'Gamis' },
  { id: 'Z-4', name: 'Zone Gamis B', occupancy: 65, category: 'Gamis' },
  { id: 'Z-5', name: 'Zone Blouse', occupancy: 30, category: 'Blouse' },
  { id: 'Z-6', name: 'Zone Aksesoris', occupancy: 15, category: 'Aksesoris' },
];

export const MOCK_ACTIONS: ActionItem[] = [
  { id: 'A-1', issue: 'PO #PO-2024-001 overdue 5 hari', recommendation: 'Follow up supplier Kain Sejahtera', pic: 'Purchasing', priority: 'High' },
  { id: 'A-2', issue: '200 pcs gamis gagal QC (Transparan)', recommendation: 'Retur + cari pengganti kain', pic: 'WH + Purchasing', priority: 'High' },
  { id: 'A-3', issue: 'Stok Khimar Hitam S menipis', recommendation: 'Reorder segera', pic: 'Purchasing', priority: 'Medium' },
];

export const MOCK_SKUS: SKUStock[] = [
  { sku: 'KM-BLK-S', name: 'Khimar Polos Hitam S', stock: 15, safetyStock: 50, agingDays: 10 },
  { sku: 'GM-BRK-M', name: 'Gamis Brokat M', stock: 120, safetyStock: 30, agingDays: 65 },
  { sku: 'HJ-PST-L', name: 'Hijab Pashmina Tosca', stock: 200, safetyStock: 100, agingDays: 5 },
  { sku: 'GM-SYR-XL', name: 'Gamis Syari Basic XL', stock: 5, safetyStock: 20, agingDays: 12 },
];
