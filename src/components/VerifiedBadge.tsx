interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span
      aria-label="Verified account"
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-300/15 text-[10px] font-bold text-cyan-100 ring-1 ring-cyan-200/25"
    >
      ✓
    </span>
  );
}
