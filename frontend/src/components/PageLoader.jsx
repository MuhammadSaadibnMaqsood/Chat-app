import { LoaderIcon } from "lucide-react";
import React from "react";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderIcon className="size-10 animate-spin text-green-800" />
    </div>
  );
};

export default PageLoader;
