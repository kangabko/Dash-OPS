/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  Package, 
  ShoppingCart, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Warehouse, 
  Clock, 
  ChevronRight,
  Filter,
  MoreVertical,
  Search
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from './lib/utils';
import { MOCK_POS, MOCK_QC_DATA, MOCK_ZONES, MOCK_ACTIONS, MOCK_SKUS } from './constants';
import { POStatus } from './types';

const StatCard = ({ title, value, icon: Icon, color, subtitle }: { 
  title: string; 
  value: string | number; 
  icon: any; 
  color: string;
  subtitle?: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-5 flex items-start justify-between"
  >
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
    <div className={cn("p-3 rounded-lg", color)}>
      <Icon size={20} className="text-white" />
    </div>
  </motion.div>
);

const StatusBadge = ({ status }: { status: POStatus }) => {
  const colors: Record<POStatus, string> = {
    'Draft': 'bg-slate-100 text-slate-600',
    'Approved': 'bg-blue-100 text-blue-600',
    'Sent to Supplier': 'bg-indigo-100 text-indigo-600',
    'In Transit': 'bg-amber-100 text-amber-600',
    'Received Partial': 'bg-cyan-100 text-cyan-600',
    'Received Complete': 'bg-emerald-100 text-emerald-600',
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", colors[status])}>
      {status}
    </span>
  );
};

export default function App() {
  const summaryStats = useMemo(() => ({
    openPO: MOCK_POS.filter(p => p.status !== 'Received Complete').length,
    waitingInbound: MOCK_POS.filter(p => p.status === 'In Transit').reduce((acc, p) => acc + p.itemsCount, 0),
    pendingQC: MOCK_QC_DATA[MOCK_QC_DATA.length - 1].rejected + MOCK_QC_DATA[MOCK_QC_DATA.length - 1].syariReject,
    stockTurnover: "4.2x"
  }), []);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-syari-primary rounded-xl flex items-center justify-center shadow-lg shadow-syari-primary/20">
                <Warehouse className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">SyariOps Dashboard</h1>
                <p className="text-xs text-slate-500">Operational Control • Muslim Fashion Syari</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search PO, SKU, or Supplier..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-syari-accent/20 transition-all w-64"
                />
              </div>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                <Filter size={20} />
              </button>
              <div className="w-8 h-8 bg-syari-secondary rounded-full flex items-center justify-center text-syari-primary font-bold text-xs">
                KA
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Summary Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total PO Open" 
            value={summaryStats.openPO} 
            icon={ShoppingCart} 
            color="bg-blue-500" 
            subtitle="Belum dikirim supplier"
          />
          <StatCard 
            title="Waiting Inbound" 
            value={summaryStats.waitingInbound.toLocaleString()} 
            icon={Package} 
            color="bg-amber-500" 
            subtitle="Dalam perjalanan ke gudang"
          />
          <StatCard 
            title="Pending QC" 
            value={summaryStats.pendingQC} 
            icon={AlertTriangle} 
            color="bg-rose-500" 
            subtitle="Gagal QC / Butuh review"
          />
          <StatCard 
            title="Stock Turnover" 
            value={summaryStats.stockTurnover} 
            icon={TrendingUp} 
            color="bg-emerald-500" 
            subtitle="Performa SKU terlaris"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Purchasing & Action Required */}
          <div className="lg:col-span-2 space-y-8">
            {/* Purchasing Monitoring */}
            <section className="glass-card overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Purchasing Monitoring</h2>
                  <p className="text-xs text-slate-500">Status Purchase Order & Supplier OTD</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
                    <Clock size={14} />
                    OTD: 92%
                  </div>
                  <button className="text-syari-accent hover:text-syari-primary text-xs font-semibold flex items-center gap-1">
                    View All <ChevronRight size={14} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3 font-semibold">PO ID</th>
                      <th className="px-5 py-3 font-semibold">Supplier</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3 font-semibold">Items</th>
                      <th className="px-5 py-3 font-semibold">ETA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_POS.map((po) => (
                      <tr key={po.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-5 py-4 text-sm font-medium text-slate-900">
                          <div className="flex items-center gap-2">
                            {po.id}
                            {po.isOverdue && (
                              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" title="Overdue" />
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">{po.supplier}</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={po.status} />
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600 font-mono">{po.itemsCount}</td>
                        <td className="px-5 py-4 text-sm text-slate-500">{po.eta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Inbound & QC Monitoring */}
            <section className="glass-card p-5">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Inbound & QC Performance</h2>
                  <p className="text-xs text-slate-500">Daily throughput vs Quality Control results</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                    <span className="text-slate-600">Pass</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-rose-400 rounded-sm" />
                    <span className="text-slate-600">Reject (General)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-syari-primary rounded-sm" />
                    <span className="text-slate-600">Reject (Syari)</span>
                  </div>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_QC_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#94a3b8' }} 
                      tickFormatter={(val) => val.split('-').slice(1).join('/')}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="passed" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} barSize={32} />
                    <Bar dataKey="rejected" stackId="a" fill="#fb7185" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="syariReject" stackId="a" fill="#5d4037" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-syari-primary/5 rounded-lg border border-syari-primary/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-syari-primary shrink-0" size={18} />
                  <div>
                    <p className="text-xs font-bold text-syari-primary uppercase tracking-wider">Syari Quality Alert</p>
                    <p className="text-sm text-slate-700 mt-0.5">
                      Terdeteksi 15 unit gamis dengan bahan transparan pada batch hari ini. Segera review standar vendor kain.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Warehouse & Actions */}
          <div className="space-y-8">
            {/* Action Required */}
            <section className="glass-card overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-rose-50/30">
                <h2 className="text-base font-bold text-rose-900 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Action Required
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {MOCK_ACTIONS.map((action) => (
                  <div key={action.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className={cn(
                        "text-[10px] font-bold uppercase px-1.5 py-0.5 rounded",
                        action.priority === 'High' ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                      )}>
                        {action.priority} Priority
                      </span>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{action.issue}</p>
                    <p className="text-xs text-slate-500 mt-1">{action.recommendation}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-[10px] text-slate-400 font-medium">PIC: {action.pic}</span>
                      <button className="text-xs font-bold text-syari-accent hover:underline">Resolve</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Warehouse Status (Heatmap) */}
            <section className="glass-card p-5">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Warehouse Capacity</h2>
                  <p className="text-xs text-slate-500">Rack occupancy by zone</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">74%</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Avg Occupancy</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {MOCK_ZONES.map((zone) => (
                  <div key={zone.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{zone.category}</span>
                      <span className={cn(
                        "text-xs font-bold",
                        zone.occupancy > 80 ? "text-rose-600" : zone.occupancy > 50 ? "text-amber-600" : "text-emerald-600"
                      )}>
                        {zone.occupancy}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${zone.occupancy}%` }}
                        className={cn(
                          "h-full rounded-full",
                          zone.occupancy > 80 ? "bg-rose-500" : zone.occupancy > 50 ? "bg-amber-500" : "bg-emerald-500"
                        )}
                      />
                    </div>
                    <p className="text-xs font-medium text-slate-700 mt-2">{zone.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Stock Alerts */}
            <section className="glass-card p-5">
              <h2 className="text-base font-bold text-slate-900 mb-4">Stock & Aging Alerts</h2>
              <div className="space-y-4">
                {MOCK_SKUS.map((sku) => (
                  <div key={sku.sku} className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      sku.stock < sku.safetyStock ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                    )}>
                      {sku.stock < sku.safetyStock ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-bold text-slate-900 truncate">{sku.name}</p>
                        <span className="text-[10px] font-mono text-slate-400">{sku.sku}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-slate-400">Stock:</span>
                          <span className={cn("font-bold", sku.stock < sku.safetyStock ? "text-rose-600" : "text-slate-700")}>
                            {sku.stock}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-slate-400">Aging:</span>
                          <span className={cn("font-bold", sku.agingDays > 60 ? "text-amber-600" : "text-slate-700")}>
                            {sku.agingDays}d
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer / KPI Summary */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">PO Cycle Time</p>
            <p className="text-xl font-bold text-slate-900">2.8 Days</p>
            <p className="text-xs text-emerald-600 font-medium">Target: &lt;3 Days</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Supplier OTD</p>
            <p className="text-xl font-bold text-slate-900">92.4%</p>
            <p className="text-xs text-rose-500 font-medium">Target: &ge;95%</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">First Pass Yield</p>
            <p className="text-xl font-bold text-slate-900">94.1%</p>
            <p className="text-xs text-emerald-600 font-medium">Target: &ge;90%</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Inventory Accuracy</p>
            <p className="text-xl font-bold text-slate-900">99.2%</p>
            <p className="text-xs text-emerald-600 font-medium">Target: &ge;99%</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Days of Inventory</p>
            <p className="text-xl font-bold text-slate-900">38 Days</p>
            <p className="text-xs text-emerald-600 font-medium">Target: &lt;45 Days</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
