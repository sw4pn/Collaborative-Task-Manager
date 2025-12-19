export const TaskCardSkeleton = () => (
  <div className="border rounded-lg p-4 space-y-3 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3" />
    <div className="h-3 bg-gray-200 rounded w-full" />
    <div className="flex justify-between">
      <div className="h-3 bg-gray-200 rounded w-24" />
      <div className="h-3 bg-gray-200 rounded w-20" />
    </div>
  </div>
);
