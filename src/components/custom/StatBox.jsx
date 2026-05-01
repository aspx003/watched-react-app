export default function StatBox({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-border/50 bg-secondary/50 p-3">
      <div className="mb-1">{icon}</div>
      <span className="text-[10px] font-bold tracking-tight text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  )
}
