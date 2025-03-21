import React, { Suspense, lazy, useState, useEffect } from "react";
import Navbar from "../../components/user/navbar";
import { Skeleton } from "../../components/ui/skeleton";

const Pricing_details = lazy(() => import("../../components/user/pricing_details"));

const Pricing = () => {
  const [isMinLoadTimeComplete, setIsMinLoadTimeComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinLoadTimeComplete(true);
    }, 1200); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar currentPage="pricing" />

      <Suspense fallback={!isMinLoadTimeComplete ? <PricingSkeleton /> : null}>
        {isMinLoadTimeComplete ? <Pricing_details /> : <PricingSkeleton />}
      </Suspense>
    </>
  );
};

const PricingSkeleton = () => (
  <div>
    <div className="flex justify-center pt-48">   
      <Skeleton className="h-[30px] w-[350px]" />
    </div>
    <div className="flex justify-center pt-4">   
      <Skeleton className="h-3 w-[250px]" />
    </div>
    <div className="flex justify-center gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="flex flex-col pt-5 space-y-3">
    <Skeleton className="h-[325px] w-[320px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
    </div>
  </div>
);

export default Pricing;
