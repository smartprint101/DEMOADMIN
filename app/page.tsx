'use client';

import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  Clock3,
  Command,
  CreditCard,
  Download,
  Eye,
  FileText,
  Filter,
  Globe2,
  Grid2X2,
  HelpCircle,
  History,
  Image as ImageIcon,
  LayoutDashboard,
  ListFilter,
  LockKeyhole,
  LogOut,
  Megaphone,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Package,
  PanelLeft,
  Pencil,
  Plus,
  RefreshCcw,
  RotateCcw,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Tags,
  Trash2,
  TrendingUp,
  Truck,
  UploadCloud,
  UserRound,
  UsersRound,
  Warehouse,
  X,
  Zap,
} from 'lucide-react';

type Section =
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'categories'
  | 'customers'
  | 'inventory'
  | 'courier'
  | 'tracking'
  | 'marketing'
  | 'analytics'
  | 'banners'
  | 'landing'
  | 'coupons'
  | 'media'
  | 'reviews'
  | 'faq'
  | 'content'
  | 'whatsapp'
  | 'social'
  | 'adminusers'
  | 'activity'
  | 'settings';

type Category = {
  id: number;
  name: string;
  bnName: string;
  description: string;
  products: string;
  subcategories: string;
  revenue: string;
  updated: string;
  status: 'Active' | 'Draft';
  tone: string;
  icon: LucideIcon;
};

type DraftCategory = {
  bnName: string;
  name: string;
  description: string;
  parent: string;
  status: 'Active' | 'Draft';
};

const imageUrls = {
  bag: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=85',
  watch: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=85',
  dress: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=85',
  shoe: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=85',
};

const navGroups: { label: string; items: { id: Section; label: string; icon: LucideIcon; badge?: string }[] }[] = [
  {
    label: 'ওভারভিউ',
    items: [
      { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
      { id: 'analytics', label: 'অ্যানালিটিক্স', icon: BarChart3 },
    ],
  },
  {
    label: 'ক্যাটালগ',
    items: [
      { id: 'orders', label: 'অর্ডার', icon: ShoppingCart, badge: '২৪' },
      { id: 'products', label: 'পণ্য', icon: Package },
      { id: 'categories', label: 'ক্যাটাগরি', icon: Tags },
      { id: 'inventory', label: 'ইনভেন্টরি', icon: Warehouse, badge: '০৮' },
    ],
  },
  {
    label: 'অপারেশন',
    items: [
      { id: 'customers', label: 'কাস্টমার', icon: UsersRound },
      { id: 'courier', label: 'কুরিয়ার ও শিপিং', icon: Truck },
      { id: 'tracking', label: 'অর্ডার ট্র্যাকিং', icon: Activity },
      { id: 'reviews', label: 'রিভিউ', icon: Star, badge: '১২' },
    ],
  },
  {
    label: 'গ্রোথ',
    items: [
      { id: 'marketing', label: 'মার্কেটিং ও পিক্সেল', icon: Megaphone },
      { id: 'banners', label: 'ব্যানার', icon: ImageIcon },
      { id: 'landing', label: 'ল্যান্ডিং পেজ', icon: Globe2 },
      { id: 'coupons', label: 'কুপন ও অফার', icon: Zap },
    ],
  },
  {
    label: 'কনটেন্ট',
    items: [
      { id: 'media', label: 'মিডিয়া লাইব্রেরি', icon: Grid2X2 },
      { id: 'content', label: 'ওয়েবসাইট কনটেন্ট', icon: FileText },
      { id: 'faq', label: 'FAQ', icon: HelpCircle },
    ],
  },
];

const initialCategories: Category[] = [
  { id: 1, name: 'Fashion', bnName: 'ফ্যাশন', description: 'পোশাক ও দৈনন্দিন স্টাইল', products: '১২৮', subcategories: '০৬', revenue: '৳ ৪.৮৫ লাখ', updated: '২ ঘণ্টা আগে', status: 'Active', tone: 'from-[#f8d9ca] to-[#f8ede7]', icon: Sparkles },
  { id: 2, name: 'Watches', bnName: 'ঘড়ি ও অ্যাক্সেসরিজ', description: 'প্রিমিয়াম ঘড়ি এবং অ্যাক্সেসরিজ', products: '৬৪', subcategories: '০৪', revenue: '৳ ২.৯২ লাখ', updated: 'গতকাল', status: 'Active', tone: 'from-[#d9e5f8] to-[#edf4ff]', icon: Clock3 },
  { id: 3, name: 'Beauty & Care', bnName: 'বিউটি ও কেয়ার', description: 'স্কিনকেয়ার এবং বিউটি এসেনশিয়াল', products: '৯৬', subcategories: '০৮', revenue: '৳ ২.৪৮ লাখ', updated: '৩ দিন আগে', status: 'Active', tone: 'from-[#f1d8e8] to-[#fff0f8]', icon: Star },
  { id: 4, name: 'Footwear', bnName: 'ফুটওয়্যার', description: 'স্নিকার্স, স্যান্ডেল এবং জুতা', products: '৫৬', subcategories: '০৩', revenue: '৳ ১.৮৬ লাখ', updated: '৫ দিন আগে', status: 'Draft', tone: 'from-[#dcead9] to-[#eff8ee]', icon: Package },
];

const products = [
  { name: 'মিনিমাল লেদার ব্যাগ', category: 'Fashion', price: '৳ ১,৮৫০', stock: '৪৮', status: 'In stock', image: imageUrls.bag },
  { name: 'অটোমেটিক ক্রোনোগ্রাফ', category: 'Watches', price: '৳ ২,৪৫০', stock: '১২', status: 'Low stock', image: imageUrls.watch },
  { name: 'সফট কটন কুর্তি', category: 'Fashion', price: '৳ ১,২৮০', stock: '৩৬', status: 'In stock', image: imageUrls.dress },
  { name: 'সিগনেচার রানার', category: 'Footwear', price: '৳ ৩,২০০', stock: '০৮', status: 'Low stock', image: imageUrls.shoe },
];

const orders = [
  { id: '#IMS-10482', customer: 'সাদিয়া রহমান', meta: 'আজ, ১০:৪২ AM', items: '৩টি পণ্য', total: '৳ ২,৪৫০', status: 'নতুন', tone: 'blue' },
  { id: '#IMS-10481', customer: 'তানভীর হাসান', meta: 'আজ, ০৯:১৮ AM', items: '২টি পণ্য', total: '৳ ১,৮৫০', status: 'প্রস্তুত হচ্ছে', tone: 'amber' },
  { id: '#IMS-10480', customer: 'মেহেদী ইসলাম', meta: 'গতকাল, ০৮:৫৪ PM', items: '১টি পণ্য', total: '৳ ৩,২০০', status: 'ডেলিভারড', tone: 'green' },
  { id: '#IMS-10479', customer: 'নুসরাত জাহান', meta: 'গতকাল, ০৫:৩২ PM', items: '৪টি পণ্য', total: '৳ ৪,৬২০', status: 'রিটার্ন', tone: 'rose' },
];

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function BrandMark({small = false}: {small?: boolean}) {
  return <span className={cn('brand-mark', small && 'brand-mark-small')}><span>CP</span></span>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('premium-card', className)}>{children}</div>;
}

function StatusPill({ status, tone = 'green' }: { status: string; tone?: string }) {
  const styles: Record<string, string> = {
    green: 'bg-[#eaf8f1] text-[#16825b]',
    blue: 'bg-[#edf4ff] text-[#326dcc]',
    amber: 'bg-[#fff7e7] text-[#b57818]',
    rose: 'bg-[#fff0f1] text-[#cc5d66]',
    slate: 'bg-[#f1f4f8] text-[#68778e]',
  };
  return <span className={cn('status-pill', styles[tone] || styles.slate)}><span className="status-dot" />{status}</span>;
}

function SectionHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
    <div>
      {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
      <h1 className="page-title">{title}</h1>
      {description && <p className="page-description">{description}</p>}
    </div>
    {action}
  </div>;
}

function StatCard({ icon: Icon, label, value, change, trend, tone }: { icon: LucideIcon; label: string; value: string; change: string; trend: 'up' | 'down'; tone: 'violet' | 'cyan' | 'orange' | 'green' }) {
  const tones = {
    violet: 'stat-icon-violet',
    cyan: 'stat-icon-cyan',
    orange: 'stat-icon-orange',
    green: 'stat-icon-green',
  };
  return <Card className="stat-card">
    <div className="flex items-start justify-between gap-3">
      <div className={cn('stat-icon', tones[tone])}><Icon size={19} strokeWidth={2.2} /></div>
      <span className={cn('trend-label', trend === 'up' ? 'trend-up' : 'trend-down')}>{trend === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{change}</span>
    </div>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className="mt-1 text-[11px] text-[#9aa5b6]">গত ৩০ দিনের তুলনায়</div>
  </Card>;
}

function MiniChart() {
  return <div className="relative h-[220px] w-full overflow-hidden pt-3">
    <div className="chart-grid absolute inset-0" />
    <div className="relative z-[1] flex h-full items-end justify-between px-1 pb-6 text-[10px] text-[#9aa5b6]">
      <span>০১ জুন</span><span>০৭ জুন</span><span>১৪ জুন</span><span>২১ জুন</span><span>৩০ জুন</span>
    </div>
    <svg className="absolute inset-x-0 top-5 z-[2] h-[165px] w-full" viewBox="0 0 700 170" preserveAspectRatio="none" aria-label="Sales graph">
      <defs><linearGradient id="sales-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8d7cff" stopOpacity=".24" /><stop offset="1" stopColor="#8d7cff" stopOpacity="0" /></linearGradient></defs>
      <path d="M0,132 C52,122 70,136 106,114 S166,78 210,101 S270,115 316,76 S386,88 426,59 S489,89 532,42 S602,63 700,19 V170 H0Z" fill="url(#sales-area)" />
      <path d="M0,132 C52,122 70,136 106,114 S166,78 210,101 S270,115 316,76 S386,88 426,59 S489,89 532,42 S602,63 700,19" className="chart-line-violet" />
      <circle cx="532" cy="42" r="5" fill="#fff" stroke="#7667ec" strokeWidth="3" />
    </svg>
    <div className="chart-tooltip absolute right-[18%] top-[2px] z-[3]"><span>২১ জুন</span><strong>৳ ৪৮,৫২০</strong></div>
  </div>;
}

function Dashboard({ go, openCategory }: { go: (section: Section) => void; openCategory: () => void }) {
  return <div className="space-y-6 fade">
    <SectionHeading
      eyebrow="মঙ্গলবার, ২৪ জুন ২০২৫"
      title="শুভ সকাল, রাইহান 👋"
      description="আপনার স্টোরের আজকের গুরুত্বপূর্ণ আপডেট এক নজরে দেখুন।"
      action={<div className="flex items-center gap-3"><button className="secondary-button"><Download size={15} /> রিপোর্ট</button><button onClick={openCategory} className="primary-button"><Plus size={17} /> ক্যাটাগরি যোগ করুন</button></div>}
    />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={CircleDollarSign} label="মোট বিক্রি" value="৳ ৪৮,৫২০" change="১২.৮%" trend="up" tone="violet" />
      <StatCard icon={ShoppingCart} label="মোট অর্ডার" value="১২৮" change="৮.৪%" trend="up" tone="cyan" />
      <StatCard icon={UsersRound} label="নতুন কাস্টমার" value="৮৬" change="৫.৬%" trend="up" tone="orange" />
      <StatCard icon={Package} label="পেন্ডিং অর্ডার" value="২৪" change="২.১%" trend="down" tone="green" />
    </div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.85fr)]">
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><div className="card-kicker">PERFORMANCE</div><h2 className="card-title mt-1">বিক্রির ওভারভিউ</h2><div className="mt-2 flex items-baseline gap-3"><span className="text-[27px] font-extrabold tracking-[-.04em] text-[#18243a]">৳ ৯.৪২ লাখ</span><span className="trend-label trend-up"><ArrowUpRight size={13} /> ১৮.২%</span></div></div>
          <div className="date-select"><CalendarDays size={14} /><span>গত ৩০ দিন</span><ChevronDown size={14} /></div>
        </div>
        <MiniChart />
      </Card>
      <Card className="relative overflow-hidden bg-[#182946] text-white">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#7667ec33] blur-2xl" /><div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[#35c8bb26] blur-2xl" />
        <div className="relative z-[1] flex h-full flex-col"><div className="flex items-center justify-between"><span className="card-kicker text-[#a9b8d4]">TODAY&apos;S CHECKLIST</span><span className="rounded-full bg-[#ffffff16] px-2.5 py-1 text-[10px] font-bold text-[#d7e2f5]">৩ / ৫ সম্পন্ন</span></div><h2 className="mt-4 text-[19px] font-bold tracking-[-.02em]">আজকের কাজগুলো গুছিয়ে নিন</h2><p className="mt-2 text-xs leading-5 text-[#afbdd2]">দৈনন্দিন অপারেশন আরও দ্রুত করতে গুরুত্বপূর্ণ কাজগুলো সম্পন্ন করুন।</p><div className="mt-6 space-y-3">{[['নতুন অর্ডার রিভিউ করুন', '২৪টি অর্ডার অপেক্ষমাণ', true], ['লো-স্টক পণ্য আপডেট করুন', '৮টি পণ্য কম স্টকে', false], ['নতুন ক্যাটাগরি সাজান', '৩টি ড্রাফট ক্যাটাগরি', false]].map(([label, meta, done]) => <button key={label as string} onClick={() => label === 'নতুন ক্যাটাগরি সাজান' && openCategory()} className="flex w-full items-center gap-3 rounded-xl border border-[#ffffff12] bg-[#ffffff0a] p-3 text-left transition hover:bg-[#ffffff16]"><span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-full border', done ? 'border-[#64d8bc] bg-[#64d8bc] text-[#182946]' : 'border-[#ffffff38] text-transparent')}><Check size={14} strokeWidth={3} /></span><span className="min-w-0 flex-1"><span className={cn('block text-xs font-semibold', done && 'text-[#a6b3c7] line-through')}>{label as string}</span><span className="mt-0.5 block text-[10px] text-[#93a4c0]">{meta as string}</span></span><ChevronRight size={14} className="text-[#8295b4]" /></button>)}</div><button onClick={() => go('inventory')} className="mt-auto pt-5 text-left text-xs font-bold text-[#8de2d0]">সব টাস্ক দেখুন <ArrowUpRight className="ml-1 inline" size={13} /></button></div>
      </Card>
    </div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(330px,.8fr)]">
      <Card className="overflow-hidden p-0"><div className="flex items-center justify-between border-b border-[#edf0f5] px-6 py-5"><div><div className="card-kicker">LATEST ACTIVITY</div><h2 className="card-title mt-1">সাম্প্রতিক অর্ডার</h2></div><button onClick={() => go('orders')} className="link-button">সব অর্ডার <ArrowUpRight size={14} /></button></div><div className="overflow-x-auto"><table className="premium-table min-w-[690px]"><thead><tr><th>অর্ডার</th><th>কাস্টমার</th><th>আইটেম</th><th>মোট</th><th>স্ট্যাটাস</th><th /></tr></thead><tbody>{orders.map(order => <tr key={order.id}><td><span className="font-bold text-[#40558a]">{order.id}</span><span className="mt-1 block text-[10px] text-[#9ba6b6]">{order.meta}</span></td><td><div className="flex items-center gap-2.5"><span className="avatar avatar-sm">{order.customer.slice(0, 1)}</span><span className="font-semibold text-[#2a3850]">{order.customer}</span></div></td><td className="text-[#738095]">{order.items}</td><td className="font-bold text-[#2d3a50]">{order.total}</td><td><StatusPill status={order.status} tone={order.tone} /></td><td><button className="icon-button"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div></Card>
      <Card><div className="flex items-center justify-between"><div><div className="card-kicker">BEST SELLERS</div><h2 className="card-title mt-1">জনপ্রিয় পণ্য</h2></div><button onClick={() => go('products')} className="icon-button"><ArrowUpRight size={16} /></button></div><div className="mt-5 space-y-4">{products.slice(0, 3).map((product, i) => <div className="flex items-center gap-3" key={product.name}><div className="product-thumb"><img src={product.image} alt="" /></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-[#2a3850]">{product.name}</p><p className="mt-1 text-[10px] text-[#9aa5b6]">{product.category} <span className="mx-1">·</span> {['৩৪টি বিক্রি', '২৮টি বিক্রি', '১৯টি বিক্রি'][i]}</p></div><span className="text-xs font-extrabold text-[#2a3850]">{product.price}</span></div>)}</div><button onClick={() => go('products')} className="soft-button mt-5 w-full justify-center">সব পণ্য দেখুন <ChevronRight size={14} /></button></Card>
    </div>
  </div>;
}

function Categories({ categories, openAdd }: { categories: Category[]; openAdd: () => void }) {
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [query, setQuery] = useState('');
  const visible = categories.filter(category => `${category.bnName} ${category.name}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="fade">
    <SectionHeading eyebrow="CATALOG / CATEGORIES" title="পণ্য ক্যাটাগরি" description="আপনার পণ্যের কালেকশন সহজে সাজান, পরিচালনা করুন এবং পারফরম্যান্স দেখুন।" action={<button onClick={openAdd} className="primary-button"><Plus size={17} /> নতুন ক্যাটাগরি</button>} />
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"><Card className="category-summary"><div className="summary-icon bg-[#f1edff] text-[#7463df]"><Tags size={18} /></div><div><span>মোট ক্যাটাগরি</span><strong>{categories.length.toLocaleString('bn-BD')}</strong></div></Card><Card className="category-summary"><div className="summary-icon bg-[#e8f8f5] text-[#15977d]"><Package size={18} /></div><div><span>মোট পণ্য</span><strong>৩৪৪</strong></div></Card><Card className="category-summary"><div className="summary-icon bg-[#fff2e5] text-[#d68132]"><TrendingUp size={18} /></div><div><span>সেরা ক্যাটাগরি</span><strong>ফ্যাশন</strong></div></Card><Card className="category-summary"><div className="summary-icon bg-[#eaf2ff] text-[#4e7bc6]"><Activity size={18} /></div><div><span>এই মাসে বিক্রি</span><strong>৳ ১২.১L</strong></div></Card></div>
    <Card className="overflow-hidden p-0"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf0f5] p-5 md:px-6"><div className="search-field w-full sm:w-[290px]"><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="ক্যাটাগরি খুঁজুন..." /></div><div className="flex items-center gap-2"><button className="filter-button"><Filter size={15} /> <span>ফিল্টার</span><span className="filter-count">২</span></button><div className="view-toggle"><button onClick={() => setView('table')} className={view === 'table' ? 'active' : ''}><ListFilter size={15} /></button><button onClick={() => setView('grid')} className={view === 'grid' ? 'active' : ''}><Grid2X2 size={15} /></button></div></div></div>{view === 'table' ? <div className="overflow-x-auto"><table className="premium-table category-table min-w-[850px]"><thead><tr><th className="w-[32%]">ক্যাটাগরি</th><th>সাব-ক্যাটাগরি</th><th>পণ্য</th><th>মোট বিক্রি</th><th>স্ট্যাটাস</th><th>আপডেট</th><th /></tr></thead><tbody>{visible.map(category => <tr key={category.id}><td><div className="flex items-center gap-3"><div className={cn('category-avatar bg-gradient-to-br', category.tone)}><category.icon size={19} /></div><div><p className="font-bold text-[#27364f]">{category.bnName}</p><p className="mt-0.5 text-[10px] text-[#a0aaba]">{category.name} <span className="mx-1">·</span> {category.description}</p></div></div></td><td className="text-[#66748b]">{category.subcategories}টি</td><td className="font-semibold text-[#42516a]">{category.products}</td><td className="font-bold text-[#35445c]">{category.revenue}</td><td><StatusPill status={category.status === 'Active' ? 'অ্যাক্টিভ' : 'ড্রাফট'} tone={category.status === 'Active' ? 'green' : 'slate'} /></td><td className="text-[#8e9aac]">{category.updated}</td><td><button className="icon-button"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table>{visible.length === 0 && <EmptyState />}</div> : <div className="category-grid">{visible.map(category => <CategoryGridCard category={category} key={category.id} />)}{visible.length === 0 && <EmptyState />}</div>}</Card>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-[11px] text-[#98a4b4]"><span>১–{visible.length} এর মধ্যে {categories.length}টি ক্যাটাগরি</span><div className="flex items-center gap-2"><button className="pagination-button" disabled>পূর্ববর্তী</button><button className="pagination-button active">১</button><button className="pagination-button">পরবর্তী <ChevronRight size={13} /></button></div></div>
  </div>;
}

function CategoryGridCard({ category }: { category: Category }) {
  return <div className="category-grid-card"><div className={cn('category-banner bg-gradient-to-br', category.tone)}><category.icon size={34} strokeWidth={1.5} /><button className="grid-card-more"><MoreHorizontal size={16} /></button></div><div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="font-bold text-[#27364f]">{category.bnName}</h3><p className="mt-1 text-[10px] text-[#98a4b4]">{category.name}</p></div><StatusPill status={category.status === 'Active' ? 'অ্যাক্টিভ' : 'ড্রাফট'} tone={category.status === 'Active' ? 'green' : 'slate'} /></div><div className="mt-4 flex items-center justify-between border-t border-[#edf0f5] pt-3 text-[11px] text-[#8794a8]"><span>{category.products} পণ্য</span><span>{category.revenue}</span></div></div></div>;
}

function EmptyState() {
  return <div className="p-12 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#f3f5fa] text-[#99a5b6]"><Tags size={20} /></div><p className="mt-3 text-sm font-bold text-[#47566d]">কোনো ক্যাটাগরি পাওয়া যায়নি</p><p className="mt-1 text-xs text-[#9aa5b6]">অন্য নামে আবার চেষ্টা করুন।</p></div>;
}

function AddCategoryModal({ close, save }: { close: () => void; save: (draft: DraftCategory) => void }) {
  const [draft, setDraft] = useState<DraftCategory>({ bnName: '', name: '', description: '', parent: 'মূল ক্যাটাগরি', status: 'Active' });
  const [error, setError] = useState('');
  const update = (field: keyof DraftCategory, value: string) => setDraft(current => ({ ...current, [field]: value }));
  const submit = () => { if (!draft.bnName.trim() || !draft.name.trim()) { setError('ক্যাটাগরির বাংলা নাম ও ইংরেজি নাম লিখুন।'); return; } save(draft); };
  return <div className="modal-backdrop" onMouseDown={close}><div className="modal-panel max-w-[590px]" onMouseDown={event => event.stopPropagation()}><div className="modal-header"><div><div className="eyebrow">CATALOG SETUP</div><h2 className="modal-title">নতুন ক্যাটাগরি যোগ করুন</h2><p className="modal-subtitle">আপনার পণ্যগুলো আরও সুন্দরভাবে সাজাতে নতুন ক্যাটাগরি তৈরি করুন।</p></div><button onClick={close} className="close-button"><X size={18} /></button></div><div className="modal-body"><div className="form-grid"><label className="form-label">বাংলা নাম <span>*</span><input className="form-input" value={draft.bnName} onChange={event => update('bnName', event.target.value)} placeholder="যেমন: ফ্যাশন" autoFocus /></label><label className="form-label">ইংরেজি নাম <span>*</span><input className="form-input" value={draft.name} onChange={event => update('name', event.target.value)} placeholder="e.g. Fashion" /></label></div><label className="form-label mt-5">ক্যাটাগরি সম্পর্কে <em>ঐচ্ছিক</em><textarea className="form-input min-h-[82px] resize-none" value={draft.description} onChange={event => update('description', event.target.value)} placeholder="এই ক্যাটাগরিতে কী ধরনের পণ্য থাকবে?" /></label><div className="form-grid mt-5"><label className="form-label">Parent category<select className="form-input" value={draft.parent} onChange={event => update('parent', event.target.value)}><option>মূল ক্যাটাগরি</option><option>ফ্যাশন</option><option>অ্যাক্সেসরিজ</option><option>বিউটি ও কেয়ার</option></select></label><div className="form-label">ক্যাটাগরি ছবি <em>ঐচ্ছিক</em><button type="button" className="upload-box"><UploadCloud size={18} /><span>ছবি আপলোড করুন</span><small>PNG, JPG · সর্বোচ্চ ২MB</small></button></div></div><div className="mt-5 flex items-center justify-between rounded-xl border border-[#edf0f5] bg-[#fafbfd] p-3.5"><div><p className="text-xs font-bold text-[#34435b]">ক্যাটাগরি প্রকাশ করুন</p><p className="mt-1 text-[10px] text-[#929eaf]">এখনই স্টোরে দেখাতে চাইলে অ্যাক্টিভ রাখুন।</p></div><button type="button" onClick={() => setDraft(current => ({ ...current, status: current.status === 'Active' ? 'Draft' : 'Active' }))} className={cn('toggle', draft.status === 'Active' && 'on')}><span /></button></div>{error && <p className="mt-3 text-xs font-semibold text-[#c35e67]">{error}</p>}</div><div className="modal-footer"><button onClick={close} className="secondary-button">বাতিল</button><button onClick={submit} className="primary-button"><Check size={16} /> ক্যাটাগরি সংরক্ষণ করুন</button></div></div></div>;
}

function Products({ go, openCategory }: { go: (section: Section) => void; openCategory: () => void }) {
  return <div className="fade"><SectionHeading eyebrow="CATALOG / PRODUCTS" title="পণ্য ব্যবস্থাপনা" description="পণ্য, ভ্যারিয়েন্ট, মূল্য এবং স্টক এক জায়গা থেকে পরিচালনা করুন।" action={<div className="flex gap-3"><button onClick={openCategory} className="secondary-button"><Tags size={15} /> ক্যাটাগরি</button><button className="primary-button"><Plus size={17} /> নতুন পণ্য</button></div>} /><div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"><Card className="category-summary"><div className="summary-icon bg-[#f1edff] text-[#7463df]"><Package size={18} /></div><div><span>মোট পণ্য</span><strong>৩৪৪</strong></div></Card><Card className="category-summary"><div className="summary-icon bg-[#fff2e5] text-[#d68132]"><AlertTriangle size={18} /></div><div><span>লো স্টক</span><strong>০৮</strong></div></Card><Card className="category-summary"><div className="summary-icon bg-[#e8f8f5] text-[#15977d]"><CircleCheck size={18} /></div><div><span>অ্যাক্টিভ</span><strong>৩২৮</strong></div></Card><Card className="category-summary"><div className="summary-icon bg-[#eaf2ff] text-[#4e7bc6]"><RotateCcw size={18} /></div><div><span>ড্রাফট</span><strong>১৬</strong></div></Card></div><Card className="overflow-hidden p-0"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf0f5] p-5 md:px-6"><div className="search-field w-full sm:w-[290px]"><Search size={16} /><input placeholder="পণ্য, SKU দিয়ে খুঁজুন..." /></div><div className="flex gap-2"><button className="filter-button"><Filter size={15} /> ফিল্টার</button><button className="filter-button"><Download size={15} /> এক্সপোর্ট</button></div></div><div className="overflow-x-auto"><table className="premium-table min-w-[800px]"><thead><tr><th>পণ্য</th><th>ক্যাটাগরি</th><th>মূল্য</th><th>স্টক</th><th>স্ট্যাটাস</th><th /></tr></thead><tbody>{products.map(product => <tr key={product.name}><td><div className="flex items-center gap-3"><div className="product-thumb large"><img src={product.image} alt="" /></div><div><p className="font-bold text-[#27364f]">{product.name}</p><p className="mt-1 text-[10px] text-[#9aa5b6]">SKU-10{products.indexOf(product) + 1} <span className="mx-1">·</span> ৪টি ভ্যারিয়েন্ট</p></div></div></td><td className="text-[#718097]">{product.category}</td><td className="font-bold text-[#35445c]">{product.price}</td><td className="font-semibold text-[#4d5b71]">{product.stock}টি</td><td><StatusPill status={product.status === 'In stock' ? 'স্টকে আছে' : 'লো স্টক'} tone={product.status === 'In stock' ? 'green' : 'amber'} /></td><td><button className="icon-button"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div></Card><div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#dfd9ff] bg-gradient-to-r from-[#f6f4ff] to-[#f9fbff] p-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e8e3ff] text-[#7060d5]"><Sparkles size={18} /></div><div><p className="text-sm font-bold text-[#34425d]">দ্রুত ইনভেন্টরি আপডেট দরকার?</p><p className="mt-1 text-[11px] text-[#8995a9]">স্টক লেভেল, রি-অর্ডার এবং ওয়্যারহাউস একসাথে ম্যানেজ করুন।</p></div></div><button onClick={() => go('inventory')} className="soft-button">ইনভেন্টরি দেখুন <ChevronRight size={14} /></button></div></div>;
}

function Orders({ openDrawer }: { openDrawer: () => void }) {
  const [tab, setTab] = useState('সব অর্ডার');
  return <div className="fade"><SectionHeading eyebrow="OPERATIONS / ORDERS" title="অর্ডার ম্যানেজমেন্ট" description="অর্ডার প্রসেসিং, পেমেন্ট এবং ডেলিভারি স্ট্যাটাস ট্র্যাক করুন।" action={<button className="primary-button"><Download size={16} /> অর্ডার এক্সপোর্ট</button>} /><div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"><StatCard icon={ShoppingCart} label="আজকের অর্ডার" value="১২৮" change="৮.৪%" trend="up" tone="cyan" /><StatCard icon={Clock3} label="প্রসেসিং" value="২৪" change="২.১%" trend="down" tone="orange" /><StatCard icon={Truck} label="শিপড" value="৭৬" change="১৪.২%" trend="up" tone="violet" /><StatCard icon={RefreshCcw} label="রিটার্ন" value="০৬" change="১.৪%" trend="down" tone="green" /></div><Card className="overflow-hidden p-0"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf0f5] p-5 md:px-6"><div className="search-field w-full sm:w-[290px]"><Search size={16} /><input placeholder="Order ID, নাম বা ফোন দিয়ে খুঁজুন" /></div><button className="filter-button"><CalendarDays size={15} /> ২৪ জুন ২০২৫ <ChevronDown size={14} /></button></div><div className="flex gap-1 overflow-x-auto border-b border-[#edf0f5] px-5 md:px-6">{['সব অর্ডার', 'নতুন ২৪', 'প্রসেসিং ১৮', 'ডেলিভারড', 'রিটার্ন'].map(item => <button onClick={() => setTab(item)} key={item} className={cn('tab-button', tab === item && 'active')}>{item}</button>)}</div><div className="overflow-x-auto"><table className="premium-table min-w-[850px]"><thead><tr><th>অর্ডার</th><th>কাস্টমার</th><th>আইটেম</th><th>মোট</th><th>পেমেন্ট</th><th>স্ট্যাটাস</th><th /></tr></thead><tbody>{orders.map(order => <tr key={order.id}><td><button onClick={openDrawer} className="font-bold text-[#40558a] hover:underline">{order.id}</button><span className="mt-1 block text-[10px] text-[#9ba6b6]">{order.meta}</span></td><td><div className="flex items-center gap-2.5"><span className="avatar avatar-sm">{order.customer.slice(0, 1)}</span><span className="font-semibold text-[#2a3850]">{order.customer}</span></div></td><td className="text-[#738095]">{order.items}</td><td className="font-bold">{order.total}</td><td><span className="payment-ok"><Check size={11} /> Paid</span></td><td><StatusPill status={order.status} tone={order.tone} /></td><td><button className="icon-button"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div></Card></div>;
}

function Inventory({ go }: { go: (section: Section) => void }) {
  return <div className="fade"><SectionHeading eyebrow="CATALOG / INVENTORY" title="ইনভেন্টরি" description="স্টক লেভেল, লো-স্টক অ্যালার্ট এবং ওয়্যারহাউস মুভমেন্ট দেখুন।" action={<div className="flex gap-3"><button className="secondary-button"><Download size={15} /> স্টক রিপোর্ট</button><button className="primary-button"><Plus size={17} /> স্টক যোগ করুন</button></div>} /><div className="inventory-alert"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0d8] text-[#c9812c]"><AlertTriangle size={19} /></div><div className="flex-1"><p className="text-sm font-bold text-[#5e4528]">৮টি পণ্যের স্টক কমে গেছে</p><p className="mt-1 text-[11px] text-[#9b815f]">বিক্রি থামার আগেই রি-স্টক করার কথা ভাবুন।</p></div><button className="soft-button orange">লো স্টক দেখুন <ChevronRight size={14} /></button></div><div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr]"><Card className="overflow-hidden p-0"><div className="flex items-center justify-between border-b border-[#edf0f5] px-6 py-5"><div><div className="card-kicker">STOCK HEALTH</div><h2 className="card-title mt-1">স্টক স্ট্যাটাস</h2></div><button className="icon-button"><MoreHorizontal size={17} /></button></div><div className="p-6"><div className="mb-6 flex items-end gap-4"><span className="text-4xl font-extrabold tracking-[-.05em] text-[#25334c]">৯৩.২%</span><span className="trend-label trend-up mb-1"><ArrowUpRight size={13} /> ৪.৮%</span></div><div className="h-3 overflow-hidden rounded-full bg-[#eef1f5]"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#7b6bec] to-[#a595ff]" /></div><div className="mt-5 grid grid-cols-3 gap-3 text-center"><div><b className="block text-lg text-[#2d3b53]">৩২৮</b><span className="text-[10px] text-[#98a4b4]">স্টকে আছে</span></div><div><b className="block text-lg text-[#d1822e]">০৮</b><span className="text-[10px] text-[#98a4b4]">লো স্টক</span></div><div><b className="block text-lg text-[#c55f69]">০৮</b><span className="text-[10px] text-[#98a4b4]">আউট অফ স্টক</span></div></div></div></Card><Card><div className="card-kicker">WAREHOUSE</div><h2 className="card-title mt-1">লোকেশন ও মুভমেন্ট</h2><div className="mt-5 space-y-4">{[['ঢাকা মেইন হাব', '২৮৬ পণ্য', '৭৬%', 'bg-[#7463df]'], ['চট্টগ্রাম হাব', '৫৮ পণ্য', '২৪%', 'bg-[#43b9a0]']].map(item => <div key={item[0]}><div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-[#536178]">{item[0]}</span><span className="text-[#95a0b1]">{item[1]}</span></div><div className="h-2 rounded-full bg-[#eef1f5]"><div className={cn('h-full rounded-full', item[3])} style={{ width: item[2] }} /></div></div>)}</div><button onClick={() => go('settings')} className="soft-button mt-6 w-full justify-center">লোকেশন সেটিংস <ChevronRight size={14} /></button></Card></div><Card className="mt-6 overflow-hidden p-0"><div className="flex items-center justify-between border-b border-[#edf0f5] px-6 py-5"><div><div className="card-kicker">NEEDS ATTENTION</div><h2 className="card-title mt-1">রি-অর্ডার সাজেশন</h2></div><button onClick={() => go('products')} className="link-button">সব পণ্য <ArrowUpRight size={14} /></button></div><div className="overflow-x-auto"><table className="premium-table min-w-[650px]"><thead><tr><th>পণ্য</th><th>বর্তমান স্টক</th><th>রি-অর্ডার লেভেল</th><th>সাজেশন</th><th /></tr></thead><tbody>{products.slice(1).map(product => <tr key={product.name}><td><div className="flex items-center gap-3"><div className="product-thumb"><img src={product.image} alt="" /></div><span className="font-bold text-[#2d3b53]">{product.name}</span></div></td><td><span className="font-bold text-[#c77b2b]">{product.stock}টি</span></td><td className="text-[#7e8a9c]">১৫টি</td><td><span className="text-xs font-semibold text-[#5570a1]">কমপক্ষে ২০টি অর্ডার করুন</span></td><td><button className="soft-button">রি-অর্ডার <ChevronRight size={13} /></button></td></tr>)}</tbody></table></div></Card></div>;
}

function Customers() {
  return <div className="fade"><SectionHeading eyebrow="OPERATIONS / CRM" title="কাস্টমার" description="কাস্টমারের প্রোফাইল, অর্ডার হিস্ট্রি এবং লাইফটাইম ভ্যালু বুঝুন।" action={<button className="primary-button"><Download size={16} /> কাস্টমার এক্সপোর্ট</button>} /><div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><Card><div className="flex items-center justify-between"><div><div className="card-kicker">CUSTOMER GROWTH</div><h2 className="card-title mt-1">কাস্টমার ওভারভিউ</h2></div><div className="date-select"><CalendarDays size={14} /> জুন ২০২৫ <ChevronDown size={14} /></div></div><div className="mt-8 grid grid-cols-3 gap-4 text-center"><div><b className="block text-2xl font-extrabold text-[#293852]">২,৮৪০</b><span className="text-[11px] text-[#929eae]">মোট কাস্টমার</span></div><div><b className="block text-2xl font-extrabold text-[#293852]">৮৬</b><span className="text-[11px] text-[#929eae]">নতুন কাস্টমার</span></div><div><b className="block text-2xl font-extrabold text-[#293852]">৩২%</b><span className="text-[11px] text-[#929eae]">রিপিট অর্ডার</span></div></div><div className="mt-7 h-24 rounded-2xl bg-gradient-to-r from-[#f6f4ff] via-[#fbfbff] to-[#effaf8] p-3"><svg viewBox="0 0 700 90" className="h-full w-full"><path d="M0 68 C65 60 78 65 135 50 S220 52 274 58 S360 27 430 38 S510 32 565 42 S630 18 700 22" fill="none" stroke="#43b9a0" strokeWidth="3" strokeLinecap="round" /></svg></div></Card><Card><div className="card-kicker">TOP SEGMENTS</div><h2 className="card-title mt-1">কাস্টমার সেগমেন্ট</h2><div className="mt-6 space-y-4">{[['লয়্যাল কাস্টমার', '৪৮৬ জন', '54%', 'bg-[#7463df]'], ['রিপিট বায়ার', '৯৬২ জন', '71%', 'bg-[#43b9a0]'], ['নতুন কাস্টমার', '৮৬ জন', '26%', 'bg-[#e39b4b]']].map(([label, count, width, color]) => <div key={label}><div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-[#55637a]">{label}</span><span className="text-[#929eae]">{count}</span></div><div className="h-2 rounded-full bg-[#eef1f5]"><div className={cn('h-full rounded-full', color)} style={{ width }} /></div></div>)}</div></Card></div><Card className="mt-6 overflow-hidden p-0"><div className="flex items-center justify-between border-b border-[#edf0f5] p-5 md:px-6"><div className="search-field w-[290px]"><Search size={16} /><input placeholder="নাম বা ফোন দিয়ে খুঁজুন" /></div><button className="filter-button"><Filter size={15} /> ফিল্টার</button></div><div className="overflow-x-auto"><table className="premium-table min-w-[700px]"><thead><tr><th>কাস্টমার</th><th>অর্ডার</th><th>মোট খরচ</th><th>শেষ অর্ডার</th><th>সেগমেন্ট</th><th /></tr></thead><tbody>{[['সাদিয়া রহমান', '১২টি', '৳ ৩৪,৫৬০', 'আজ', 'লয়্যাল'], ['তানভীর হাসান', '০৮টি', '৳ ২২,৮৫০', 'গতকাল', 'রিপিট'], ['মেহেদী ইসলাম', '০৫টি', '৳ ১২,২০০', '১২ জুন', 'রিপিট']].map(item => <tr key={item[0]}><td><div className="flex items-center gap-2.5"><span className="avatar">{item[0].slice(0, 1)}</span><span className="font-bold text-[#2d3b53]">{item[0]}</span></div></td><td className="text-[#708097]">{item[1]}</td><td className="font-bold text-[#38465d]">{item[2]}</td><td className="text-[#8894a5]">{item[3]}</td><td><StatusPill status={item[4]} tone="blue" /></td><td><button className="icon-button"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div></Card></div>;
}

function Generic({ section, go }: { section: Section; go: (section: Section) => void }) {
  const data: Record<string, { eyebrow: string; title: string; description: string; icon: LucideIcon; cards: [string, string, LucideIcon][] }> = {
    analytics: { eyebrow: 'OVERVIEW / INSIGHTS', title: 'অ্যানালিটিক্স', description: 'বিক্রি, কনভার্সন এবং কাস্টমার আচরণ থেকে দ্রুত সিদ্ধান্ত নিন।', icon: BarChart3, cards: [['সেলস রিপোর্ট', 'সময় অনুযায়ী মোট বিক্রি, AOV এবং রেভিনিউ দেখুন।', TrendingUp], ['কনভার্সন ফানেল', 'ভিজিটর থেকে অর্ডার পর্যন্ত প্রতিটি ধাপ বুঝুন।', Activity], ['টপ প্রোডাক্টস', 'সবচেয়ে বেশি বিক্রি হওয়া পণ্য এবং ক্যাটাগরি খুঁজুন।', Package]] },
    courier: { eyebrow: 'OPERATIONS / DELIVERY', title: 'কুরিয়ার ও শিপিং', description: 'একাধিক কুরিয়ার, শিপমেন্ট এবং কাস্টমার ডেলিভারি এক জায়গায়।', icon: Truck, cards: [['Steadfast', 'Connected · Demo Mode', Truck], ['Pathao Courier', 'Connected · Demo Mode', Truck], ['ডেলিভারি রুলস', 'এলাকা, চার্জ এবং COD সেটিংস পরিচালনা করুন।', Settings2]] },
    marketing: { eyebrow: 'GROWTH / MARKETING', title: 'মার্কেটিং ও পিক্সেল', description: 'ক্যাম্পেইনের পারফরম্যান্স এবং কনভার্সন ট্র্যাক করুন।', icon: Megaphone, cards: [['Meta Pixel', 'Connected · Last synced ১২ মিনিট আগে', Activity], ['ক্যাম্পেইন পারফরম্যান্স', 'ROAS, reach এবং conversion overview দেখুন।', TrendingUp], ['অটোমেশন', 'সঠিক কাস্টমারের কাছে সঠিক অফার পৌঁছান।', Zap]] },
    content: { eyebrow: 'CONTENT / WEBSITE', title: 'ওয়েবসাইট কনটেন্ট', description: 'স্টোরফ্রন্টের ব্যানার, পেজ এবং যোগাযোগের তথ্য নিয়ন্ত্রণ করুন।', icon: FileText, cards: [['ব্যানার ম্যানেজমেন্ট', 'হোমপেজের প্রিমিয়াম ব্যানার তৈরি ও সাজান।', ImageIcon], ['Landing Page Builder', 'ক্যাম্পেইনের জন্য দ্রুত কনভার্টিং পেজ বানান।', Globe2], ['মিডিয়া লাইব্রেরি', 'সব ছবি ও ডিজাইন এক জায়গায় গোছান।', Grid2X2]] },
    settings: { eyebrow: 'SYSTEM / SETTINGS', title: 'সেটিংস', description: 'ব্র্যান্ড, পেমেন্ট, নোটিফিকেশন এবং টিম অ্যাক্সেস কনফিগার করুন।', icon: Settings2, cards: [['Brand & Store', 'লোগো, নাম, ফন্ট এবং কালার আপডেট করুন।', Sparkles], ['Team & Permissions', 'প্রতিটি টিম মেম্বারের অ্যাক্সেস নিয়ন্ত্রণ করুন।', ShieldCheck], ['Notifications', 'ইমেইল, WhatsApp এবং অ্যাপ অ্যালার্ট সেট করুন।', Bell]] },
  };
  const current = data[section] || data.analytics;
  const Icon = current.icon;
  return <div className="fade"><SectionHeading eyebrow={current.eyebrow} title={current.title} description={current.description} action={<button className="primary-button"><Plus size={17} /> নতুন সেটআপ</button>} /><div className="grid gap-5 md:grid-cols-3">{current.cards.map(([title, description, ItemIcon]) => <Card key={title} className="generic-card"><div className="generic-icon"><ItemIcon size={20} /></div><h2 className="mt-5 text-[15px] font-bold text-[#2c3b55]">{title}</h2><p className="mt-2 text-xs leading-5 text-[#8794a7]">{description}</p><button onClick={() => go(section === 'content' ? 'media' : section)} className="soft-button mt-5">ম্যানেজ করুন <ChevronRight size={14} /></button></Card>)}</div><Card className="mt-6 grid-bg min-h-[285px] overflow-hidden"><div className="flex max-w-[490px] flex-col items-start justify-center py-8"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e9e5ff] text-[#7060d5]"><Icon size={22} /></div><h2 className="mt-5 text-xl font-extrabold tracking-[-.03em] text-[#283750]">আপনার ব্যবসার পরবর্তী ধাপ এখানেই</h2><p className="mt-2 text-sm leading-6 text-[#7f8ca0]">এই মডিউলটি আপনার স্টোরের বাস্তব ডেটা, অটোমেশন এবং রিপোর্টের সাথে সংযুক্ত করার জন্য প্রস্তুত।</p><button className="primary-button mt-6">সেটআপ শুরু করুন <ArrowUpRight size={15} /></button></div></Card></div>;
}

function OrderDrawer({ close }: { close: () => void }) {
  return <div className="drawer-backdrop" onMouseDown={close}><aside className="order-drawer" onMouseDown={event => event.stopPropagation()}><div className="flex items-start justify-between border-b border-[#edf0f5] p-6"><div><div className="eyebrow">ORDER DETAILS</div><h2 className="mt-1 text-xl font-extrabold tracking-[-.03em] text-[#263650]">#IMS-10482</h2><p className="mt-1 text-[11px] text-[#98a4b4]">আজ, ১০:৪২ AM · ৩টি পণ্য</p></div><button onClick={close} className="close-button"><X size={18} /></button></div><div className="space-y-4 p-6"><div className="rounded-2xl bg-[#f7f8fc] p-4"><div className="flex items-center justify-between"><h3 className="text-xs font-bold text-[#36455e]">কাস্টমার তথ্য</h3><button className="text-[#6d62d7]"><Pencil size={14} /></button></div><div className="mt-4 flex items-center gap-3"><span className="avatar avatar-lg">সা</span><div><p className="text-sm font-bold text-[#2d3b53]">সাদিয়া রহমান</p><p className="mt-1 text-[11px] text-[#8895a8]">017••• 4421 · ধানমন্ডি, ঢাকা</p></div></div></div><div className="rounded-2xl border border-[#edf0f5] p-4"><h3 className="text-xs font-bold text-[#36455e]">অর্ডার টাইমলাইন</h3><div className="timeline mt-5"><div className="timeline-item done"><span><Check size={11} /></span><div><b>অর্ডার কনফার্ম</b><small>আজ, ১০:৪৫ AM</small></div></div><div className="timeline-item done"><span><Check size={11} /></span><div><b>প্যাকেজ প্রস্তুত</b><small>আজ, ১১:২০ AM</small></div></div><div className="timeline-item current"><span /><div><b>কুরিয়ারে পাঠানোর অপেক্ষায়</b><small>পরবর্তী ধাপ</small></div></div></div></div><div className="rounded-2xl border border-[#edf0f5] p-4"><div className="flex items-center justify-between"><h3 className="text-xs font-bold text-[#36455e]">অর্ডারের সারাংশ</h3><StatusPill status="নতুন" tone="blue" /></div><div className="mt-4 space-y-3 text-xs"><div className="flex justify-between text-[#7d899b]"><span>মিনিমাল লেদার ব্যাগ × ১</span><b className="text-[#35445c]">৳ ১,৮৫০</b></div><div className="flex justify-between text-[#7d899b]"><span>প্রিমিয়াম ঘড়ি × ১</span><b className="text-[#35445c]">৳ ৬০০</b></div><div className="border-t border-dashed border-[#e4e8ef] pt-3"><div className="flex justify-between font-bold text-[#2c3b55]"><span>মোট</span><span>৳ ২,৪৫০</span></div></div></div></div><button className="primary-button w-full justify-center"><Truck size={16} /> কুরিয়ারে পাঠান</button></div></aside></div>;
}

function Header({ section, setMobile, toggleNotice }: { section: Section; setMobile: () => void; toggleNotice: () => void }) {
  const titles: Record<string, string> = { dashboard: 'ড্যাশবোর্ড', orders: 'অর্ডার', products: 'পণ্য', categories: 'ক্যাটাগরি', customers: 'কাস্টমার', inventory: 'ইনভেন্টরি', courier: 'কুরিয়ার ও শিপিং', tracking: 'অর্ডার ট্র্যাকিং', marketing: 'মার্কেটিং ও পিক্সেল', analytics: 'অ্যানালিটিক্স', settings: 'সেটিংস', content: 'ওয়েবসাইট কনটেন্ট' };
  return <header className="topbar"><div className="flex items-center gap-3"><button onClick={setMobile} className="mobile-menu"><Menu size={20} /></button><div className="breadcrumb"><span>Admin Panel</span><ChevronRight size={13} /><b>{titles[section] || 'মডিউল'}</b></div></div><div className="flex items-center gap-3"><button className="global-search"><Search size={16} /><span>সার্চ করুন...</span><kbd><Command size={11} /> K</kbd></button><button onClick={toggleNotice} className="notification-button"><Bell size={18} /><i /></button><div className="top-divider" /><div className="admin-profile"><span className="avatar">র</span><span className="hidden text-left md:block"><b>রাইহান কবির</b><small>Super Admin</small></span><ChevronDown className="hidden text-[#9aa6b5] md:block" size={14} /></div></div></header>;
}

function Sidebar({ section, navigate, mobile, closeMobile, openTutorial }: { section: Section; navigate: (section: Section) => void; mobile: boolean; closeMobile: () => void; openTutorial: () => void }) {
  return <><aside className={cn('sidebar', mobile && 'sidebar-open')}><div className="sidebar-brand"><BrandMark /><div><b>CodePixel</b><span>Commerce OS</span></div><button onClick={closeMobile} className="sidebar-close"><X size={17} /></button></div><div className="store-switcher"><span className="store-avatar">C</span><span className="min-w-0 flex-1"><b>CodePixel Store</b><small>ডেমো স্টোর</small></span><ChevronDown size={14} /></div><nav className="sidebar-nav">{navGroups.map(group => <div className="nav-group" key={group.label}><p>{group.label}</p>{group.items.map(item => { const Icon = item.icon; return <button key={item.id} onClick={() => navigate(item.id)} className={cn('nav-item', section === item.id && 'active')}><Icon size={17} strokeWidth={section === item.id ? 2.4 : 1.9} /><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}</button>; })}</div>)}</nav><div className="sidebar-bottom"><button onClick={openTutorial} className="help-card"><span className="help-icon"><Sparkles size={16} /></span><span><b>নতুন কী আছে?</b><small>প্যানেলের ফিচার দেখুন</small></span><ChevronRight size={14} /></button><div className="sidebar-user"><span className="avatar">র</span><span className="min-w-0 flex-1"><b>রাইহান কবির</b><small>সুপার অ্যাডমিন</small></span><button><LogOut size={15} /></button></div></div></aside>{mobile && <div className="mobile-scrim" onClick={closeMobile} />}</>;
}

function Tutorial({ close }: { close: () => void }) {
  return <div className="modal-backdrop" onMouseDown={close}><div className="modal-panel max-w-[510px]" onMouseDown={event => event.stopPropagation()}><div className="modal-header"><div><div className="eyebrow">QUICK TOUR</div><h2 className="modal-title">CodePixel Commerce OS</h2><p className="modal-subtitle">স্টোর ম্যানেজ করার জন্য আপনার প্রয়োজনীয় সবকিছু এক জায়গায়।</p></div><button onClick={close} className="close-button"><X size={18} /></button></div><div className="tour-hero"><BrandMark /><div><b>একটি প্রিমিয়াম অপারেশনস সেন্টার</b><span>পণ্য থেকে পেমেন্ট, কাস্টমার থেকে কনভার্সন—সবকিছু আপনার নিয়ন্ত্রণে।</span></div></div><div className="tour-list">{[['ক্যাটাগরি ও পণ্য', 'স্মার্ট ক্যাটালগ ম্যানেজমেন্ট', Tags], ['অর্ডার ও কুরিয়ার', 'ফাস্ট fulfillment workflow', Truck], ['রিপোর্ট ও গ্রোথ', 'ডেটা থেকে দ্রুত সিদ্ধান্ত', BarChart3]].map(([title, description, Icon]) => <div key={title as string}><span className="tour-icon"><Icon size={17} /></span><span><b>{title as string}</b><small>{description as string}</small></span><Check size={16} className="ml-auto text-[#42b99d]" /></div>)}</div><div className="modal-footer"><button onClick={close} className="primary-button ml-auto">বোঝা গেছে <ArrowUpRight size={15} /></button></div></div></div>;
}

export default function Home() {
  const [section, setSection] = useState<Section>('dashboard');
  const [mobile, setMobile] = useState(false);
  const [notice, setNotice] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const navigate = (next: Section) => { setSection(next); setMobile(false); };
  const saveCategory = (draft: DraftCategory) => { setCategories(current => [{ id: Date.now(), name: draft.name, bnName: draft.bnName, description: draft.description || 'নতুন পণ্য কালেকশন', products: '০', subcategories: '০', revenue: '৳ ০', updated: 'এইমাত্র', status: draft.status, tone: 'from-[#e4defc] to-[#f5f2ff]', icon: Tags }, ...current]); setAddCategory(false); setSection('categories'); };
  return <div className="app-shell"><Sidebar section={section} navigate={navigate} mobile={mobile} closeMobile={() => setMobile(false)} openTutorial={() => setTutorial(true)} /><main className="main-area"><Header section={section} setMobile={() => setMobile(true)} toggleNotice={() => setNotice(current => !current)} />{notice && <div className="notification-popover"><div className="flex items-center justify-between"><b>নোটিফিকেশন</b><span className="notification-count">৩টি নতুন</span></div><div className="mt-4 space-y-2"><div className="notice-item"><span className="notice-icon bg-[#edf4ff] text-[#4675c4]"><ShoppingCart size={15} /></span><span><b>নতুন অর্ডার এসেছে</b><small>৫ মিনিট আগে · #IMS-10482</small></span></div><div className="notice-item"><span className="notice-icon bg-[#fff4e4] text-[#c9812c]"><AlertTriangle size={15} /></span><span><b>৮টি পণ্য লো স্টকে</b><small>৩২ মিনিট আগে · ইনভেন্টরি</small></span></div><div className="notice-item"><span className="notice-icon bg-[#e8f8f5] text-[#279e84]"><MessageCircle size={15} /></span><span><b>নতুন রিভিউ এসেছে</b><small>১ ঘণ্টা আগে · ৪.৮ রেটিং</small></span></div></div><button className="notification-footer">সব নোটিফিকেশন দেখুন <ArrowUpRight size={14} /></button></div>}<div className="page-container">{section === 'dashboard' && <Dashboard go={navigate} openCategory={() => setAddCategory(true)} />}{section === 'categories' && <Categories categories={categories} openAdd={() => setAddCategory(true)} />}{section === 'products' && <Products go={navigate} openCategory={() => setAddCategory(true)} />}{section === 'orders' && <Orders openDrawer={() => setDrawer(true)} />}{section === 'inventory' && <Inventory go={navigate} />}{section === 'customers' && <Customers />}{!['dashboard', 'categories', 'products', 'orders', 'inventory', 'customers'].includes(section) && <Generic section={section} go={navigate} />}</div></main>{drawer && <OrderDrawer close={() => setDrawer(false)} />}{addCategory && <AddCategoryModal close={() => setAddCategory(false)} save={saveCategory} />}{tutorial && <Tutorial close={() => setTutorial(false)} />}{<button className="whatsapp-fab"><MessageCircle size={18} /><span>সাহায্য দরকার?</span></button>}</div>;
}
