import { Suspense } from "react";
import VehicleTable from "@/components/VehicleTable";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Registration</h1>
      <SearchForm />
      <Suspense fallback={<div>Loading...</div>}>
        <VehicleTable />
      </Suspense>
    </main>
  );
}
