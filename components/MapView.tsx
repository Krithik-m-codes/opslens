"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// React Leaflet requires dynamic import with SSR disabled because it accesses the window object.
const MapViewDynamic = dynamic(() => import("./MapViewData"), { ssr: false });

export default function MapView(props: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full bg-slate-900 animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>;
  return <MapViewDynamic {...props} />;
}
