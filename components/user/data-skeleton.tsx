import { Skeleton } from "../ui/skeleton";

export const DataSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-4 w-40" />
      </div>
    </>
  );
};
