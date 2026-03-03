import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <div className="container-xl py-12">
      <div className="flex flex-col gap-8">
        <div className="h-20 w-1/3 bg-[var(--cream-dark)] animate-pulse" />
        <div className="h-10 w-full bg-[var(--cream-dark)] animate-pulse" />
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}
