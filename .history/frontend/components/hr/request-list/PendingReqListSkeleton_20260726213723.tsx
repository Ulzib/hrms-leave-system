import { Skeleton } from "@/components/ui/skeleton";

const PendingReqListSkeleton = () => {
  const skeleton = [];

  for (let i = 0; i < 6; i++) {
    skeleton.push(
      <div key={i} className="flex items-center gap-3 p-4">
        <Skeleton className="size-12 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>,
    );
  }
  return <div></div>;
};
export default PendingReqListSkeleton;
