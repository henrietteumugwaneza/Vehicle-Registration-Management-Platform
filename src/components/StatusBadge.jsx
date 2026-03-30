import {
  CheckCircle2, XCircle, Clock, PauseCircle,
  ShieldCheck, ShieldOff, ShieldAlert,
  Car, Zap, Truck, Bike, Bus, Package,
} from "lucide-react";

const STATUS_CONFIG = {
  // Registration / Insurance / General
  ACTIVE:    { icon: CheckCircle2, label: "Active",    cls: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" },
  EXPIRED:   { icon: XCircle,      label: "Expired",   cls: "bg-red-500/15 text-red-400 border border-red-500/30" },
  SUSPENDED: { icon: PauseCircle,  label: "Suspended", cls: "bg-amber-500/15 text-amber-400 border border-amber-500/30" },
  PENDING:   { icon: Clock,        label: "Pending",   cls: "bg-blue-500/15 text-blue-400 border border-blue-500/30" },

  // Vehicle condition
  NEW:     { icon: ShieldCheck, label: "New",     cls: "bg-sky-500/15 text-sky-400 border border-sky-500/30" },
  USED:    { icon: ShieldAlert,  label: "Used",    cls: "bg-orange-500/15 text-orange-400 border border-orange-500/30" },
  REBUILT: { icon: ShieldOff,   label: "Rebuilt", cls: "bg-purple-500/15 text-purple-400 border border-purple-500/30" },

  // Vehicle types
  SUV:        { icon: Car,     label: "SUV",        cls: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30" },
  TRUCK:      { icon: Truck,   label: "Truck",      cls: "bg-slate-500/15 text-slate-300 border border-slate-500/30" },
  MOTORCYCLE: { icon: Bike,    label: "Motorcycle", cls: "bg-pink-500/15 text-pink-400 border border-pink-500/30" },
  BUS:        { icon: Bus,     label: "Bus",        cls: "bg-teal-500/15 text-teal-400 border border-teal-500/30" },
  VAN:        { icon: Package, label: "Van",        cls: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" },
  PICKUP:     { icon: Truck,   label: "Pickup",     cls: "bg-lime-500/15 text-lime-400 border border-lime-500/30" },
  ELECTRIC:   { icon: Zap,     label: "Electric",   cls: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30" },
  OTHER:      { icon: Car,     label: "Other",      cls: "bg-slate-600/30 text-slate-400 border border-slate-600/40" },
};

const FALLBACK = { icon: Clock, label: null, cls: "bg-slate-700/40 text-slate-400 border border-slate-700" };

export default function StatusBadge({ value, showIcon = true }) {
  if (!value) return <span className="text-slate-600 text-xs">—</span>;

  const config = STATUS_CONFIG[value] ?? FALLBACK;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.cls}`}>
      {showIcon && <Icon size={11} strokeWidth={2.5} />}
      {config.label ?? value}
    </span>
  );
}
