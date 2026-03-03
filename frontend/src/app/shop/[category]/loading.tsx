import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="container-xl py-12">
      <div className="flex flex-col gap-8">
        <div className="h-32 w-full bg-[var(--cream-dark)] animate-pulse" />
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
