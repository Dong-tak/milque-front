import * as React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="flex animate-pulse space-x-4">
      <div className="h-60 w-full rounded bg-gray-300"></div>
    </div>
  );
};

export default Skeleton;
