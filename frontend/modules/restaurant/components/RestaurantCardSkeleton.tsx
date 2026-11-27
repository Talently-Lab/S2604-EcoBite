export function RestaurantCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="w-65 min-h-82.5 border-[1.5px] border-line-soft bg-surface rounded-lg overflow-hidden animate-pulse"
    >
      {/* Image */}
      <div className="w-full h-44 bg-eco-100/60" />

      {/* Content */}
      <div className="px-4 pb-4 pt-3.5 grid gap-3">
        <div className="space-y-2">
          <div className="h-5 w-3/4 rounded bg-ink/10 animate-pulse" />
          <div className="h-4 w-1/2 rounded bg-ink/10 animate-pulse" />
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <div className="h-5 w-14 rounded-full bg-ink/10 animate-pulse" />
          <div className="h-5 w-10 rounded-full bg-ink/10 animate-pulse" />
          <div className="h-5 w-16 rounded-full bg-ink/10 animate-pulse" />
        </div>
      </div>
    </article>
  );
}
