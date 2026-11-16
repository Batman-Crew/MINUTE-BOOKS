import type { LucideIcon } from "lucide-react";
import { UtensilsCrossed, Store, ShoppingBasket, Pill, Scissors, Truck, Factory, Shirt, Cpu, CarFront, School, GraduationCap } from "lucide-react";

export type Industry = {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  headline: string;
  challenges: string[];
  outcomes: { title: string; body: string }[];
  modules: string[];
  /** two-stop gradient behind the photograph, and the fallback art if there is none */
  tint: [string, string];
  /** a tiny product-flavoured detail shown on the card */
  chip: string;
};

export const industries: Industry[] = [
  {
    slug: "restaurants", name: "Restaurants & Cafés", icon: UtensilsCrossed,
    description: "QR table ordering, a live kitchen screen and GST billing — from the first scan to the last receipt.",
    headline: "From first scan to final bill, without the chaos.",
    challenges: ["Guests waiting to order and to pay", "Orders lost between floor and kitchen", "Manual totals, taxes and split bills at peak hours"],
    outcomes: [
      { title: "Guests order themselves", body: "One QR per table opens the menu — no app, no sign-up." },
      { title: "Kitchen sees it instantly", body: "Every order lands on the kitchen screen with a sound alert." },
      { title: "Bills that do the maths", body: "GST, service charge, round-off and shared bills handled automatically." },
    ],
    modules: ["restoconnect", "smart-pos", "inventory", "accounting"],
    tint: ["#f97316", "#7c3aed"], chip: "Table 4 · Order sent to kitchen",
  },
  {
    slug: "retail", name: "Retail Stores", icon: Store,
    description: "Barcode billing, live stock and daily sales in one place for single stores and chains.",
    headline: "Faster counters. Fuller shelves.",
    challenges: ["Slow billing during rush hours", "Stock counts that never match the system", "Sales data scattered across registers and notebooks"],
    outcomes: [
      { title: "Quick, accurate billing", body: "Scan, bill and collect across cash, UPI and card." },
      { title: "Stock you can trust", body: "Every sale deducts stock instantly, with low-stock alerts." },
      { title: "One view of the day", body: "Sales, margins and top items as they happen." },
    ],
    modules: ["smart-pos", "inventory", "gst", "analytics"],
    tint: ["#7c3aed", "#ec4899"], chip: "Bill #2041 · Paid by UPI",
  },
  {
    slug: "supermarkets", name: "Supermarkets", icon: ShoppingBasket,
    description: "Multi-counter POS, thousands of SKUs, batch tracking and supplier reordering.",
    headline: "Thousands of products. One clear picture.",
    challenges: ["Large catalogues with frequent price changes", "Multiple counters sharing one stock pool", "Perishables that expire on the shelf"],
    outcomes: [
      { title: "Every counter in sync", body: "Bills from every counter update the same stock and books." },
      { title: "Smart reordering", body: "Reorder levels turn into purchase orders in a click." },
      { title: "Batch & expiry tracking", body: "Know what expires when, before it becomes a loss." },
    ],
    modules: ["smart-pos", "inventory", "purchase", "analytics"],
    tint: ["#16a34a", "#7c3aed"], chip: "Reorder level reached · 12 items",
  },
  {
    slug: "medical", name: "Medical Shops", icon: Pill,
    description: "Batch and expiry tracking, fast billing and GST-ready records for pharmacies.",
    headline: "Every batch, every expiry, under control.",
    challenges: ["Tracking batches and expiry dates by hand", "Fast billing with accurate tax rates", "Reordering hundreds of SKUs from many distributors"],
    outcomes: [
      { title: "Batch-wise billing", body: "Sell from the right batch and keep expiry visible." },
      { title: "Accurate GST", body: "Item-wise tax rates applied on every bill." },
      { title: "Distributor purchasing", body: "POs, purchase bills and dues per distributor." },
    ],
    modules: ["smart-pos", "inventory", "purchase", "gst"],
    tint: ["#0d9488", "#6527d0"], chip: "Batch B-118 · Expires in 45 days",
  },
  {
    slug: "salons", name: "Salons & Spas", icon: Scissors,
    description: "Service billing, product retail, staff payroll and customer history.",
    headline: "Beautiful service, organised business.",
    challenges: ["Mixing service bills with product sales", "Keeping track of regular customers", "Paying staff accurately every month"],
    outcomes: [
      { title: "Services and products together", body: "Bill a haircut and a shampoo on one invoice." },
      { title: "Know your regulars", body: "Customer history shows visits and spend." },
      { title: "Simple payroll", body: "Salary structures and payslips for every stylist." },
    ],
    modules: ["smart-pos", "crm", "payroll", "accounting"],
    tint: ["#db2777", "#7c3aed"], chip: "Returning customer · 6th visit",
  },
  {
    slug: "wholesale", name: "Wholesale & Distribution", icon: Truck,
    description: "Bulk orders, credit customers, multi-warehouse stock and e-way bill workflows.",
    headline: "Move more. Chase less.",
    challenges: ["Credit sales with unclear outstanding", "Stock spread across godowns", "Paperwork for every consignment"],
    outcomes: [
      { title: "Orders to invoices", body: "Quotations, sales orders and invoices in one flow." },
      { title: "Outstanding in view", body: "Customer-wise receivables and ageing at a glance." },
      { title: "Godown-wise stock", body: "Transfers and valuation across every warehouse." },
    ],
    modules: ["crm", "inventory", "gst", "accounting"],
    tint: ["#2563eb", "#6527d0"], chip: "Sales order SO-0384 · Ready to dispatch",
  },
  {
    slug: "manufacturing", name: "Manufacturing", icon: Factory,
    description: "Raw material purchasing, stock, costing and payroll for growing manufacturers.",
    headline: "From raw material to finished margin.",
    challenges: ["Raw material stock that runs out unexpectedly", "Unclear product costs and margins", "Large teams on varied salary structures"],
    outcomes: [
      { title: "Material visibility", body: "Raw material and finished goods tracked separately." },
      { title: "Purchase on time", body: "Reorder levels and POs for every input." },
      { title: "Payroll at scale", body: "Structured salaries posted directly to accounts." },
    ],
    modules: ["inventory", "purchase", "payroll", "accounting"],
    tint: ["#475569", "#7c3aed"], chip: "Raw material RM-22 · Stock low",
  },
  {
    slug: "garments", name: "Garments & Apparel", icon: Shirt,
    description: "Size and colour variants, barcode labels, seasonal stock and fast billing.",
    headline: "Every size. Every colour. Every sale.",
    challenges: ["Hundreds of size and colour combinations", "Labelling new stock quickly", "Knowing what sells before the season ends"],
    outcomes: [
      { title: "Variants made simple", body: "One style, many sizes and colours, each with its own stock." },
      { title: "Barcode labels", body: "Generate and print labels as stock arrives." },
      { title: "Season insight", body: "See fast and slow movers by style and size." },
    ],
    modules: ["smart-pos", "inventory", "analytics", "purchase"],
    tint: ["#e11d48", "#6527d0"], chip: "Style K-204 · Size M · 8 left",
  },
  {
    slug: "electronics", name: "Electronics", icon: Cpu,
    description: "Serial numbers, warranties, high-value stock and customer records.",
    headline: "High-value stock, handled precisely.",
    challenges: ["Tracking serial numbers for every unit", "High-value stock that must reconcile exactly", "After-sales customer history"],
    outcomes: [
      { title: "Serial-level tracking", body: "Know which unit went to which customer." },
      { title: "Exact valuation", body: "Stock value tied directly to your books." },
      { title: "Customer records", body: "Purchase history for service and warranty." },
    ],
    modules: ["smart-pos", "inventory", "crm", "gst"],
    tint: ["#0891b2", "#4c1d9a"], chip: "Serial SN-88213 · Sold",
  },
  {
    slug: "automobile", name: "Automobile Businesses", icon: CarFront,
    description: "Spare parts inventory, service billing, customer history and supplier purchasing.",
    headline: "Parts, service and customers — in sync.",
    challenges: ["Thousands of spare part numbers", "Combining parts and labour on one bill", "Tracking vehicle and customer history"],
    outcomes: [
      { title: "Parts inventory", body: "Part numbers, locations and reorder levels." },
      { title: "Parts + labour billing", body: "One GST invoice for parts and service charges." },
      { title: "Customer history", body: "Every visit and invoice for every customer." },
    ],
    modules: ["inventory", "smart-pos", "crm", "purchase"],
    tint: ["#ea580c", "#4c1d9a"], chip: "Job card #318 · Parts billed",
  },
  {
    slug: "schools", name: "Schools", icon: School,
    description: "Admissions, attendance, fees, exams and school accounts in one connected system.",
    headline: "Less paperwork in the office. More time for students.",
    challenges: ["Student details spread across registers and files", "Chasing fee payments term after term", "Attendance and marks kept separately from the office"],
    outcomes: [
      { title: "One record per student", body: "Admission, class and academic details stay together." },
      { title: "Clear fee tracking", body: "See what has been paid and what is still due." },
      { title: "Connected accounts", body: "Fee collections reach your books without re-entry." },
    ],
    modules: ["school-management", "accounting", "payroll", "analytics"],
    tint: ["#0d9488", "#5b21b6"], chip: "Class 7-B · Attendance marked",
  },
  {
    slug: "colleges", name: "Colleges", icon: GraduationCap,
    description: "Departments, courses, semester fees, attendance and results in one system.",
    headline: "One campus. One clear system.",
    challenges: ["Each department keeping its own records", "Semester fees that are hard to track", "Compiling marks and attendance by hand"],
    outcomes: [
      { title: "Departments connected", body: "Courses, batches and semesters in one structure." },
      { title: "Semester fee clarity", body: "Collections and dues across every course." },
      { title: "Results made simpler", body: "Marks and attendance kept together for each student." },
    ],
    modules: ["college-management", "accounting", "payroll", "analytics"],
    tint: ["#2563eb", "#4c1d9a"], chip: "BCA Sem 3 · Fees 92% collected",
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
