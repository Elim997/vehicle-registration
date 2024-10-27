"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Vehicle {
  mispar_rechev: string;
  tozeret_nm: string;
  kinuy_mishari: string;
  shnat_yitzur: string;
  tzeva_rechev: string;
  tokef_dt: string;
}

export default function VehicleTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVehicles();
  }, [currentPage]);

  const fetchVehicles = async () => {
    try {
      const response = await axios
        .get(
          `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=10&offset=${
            (currentPage - 1) * 10
          }`
        )
        .then((res) => res.data);
      setVehicles(response.result.records);
      setTotalPages(Math.ceil(response.result.total / 10));
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="text-black px-4 py-2 border-b">Car Number</th>
            <th className="text-black px-4 py-2 border-b">Manufacturer</th>
            <th className="text-black px-4 py-2 border-b">Model</th>
            <th className="text-black px-4 py-2 border-b">Year</th>
            <th className="text-black px-4 py-2 border-b">Color</th>
            <th className="text-black px-4 py-2 border-b">
              License Valid Until:
            </th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.mispar_rechev}>
              <td className="px-4 py-2 border-b">
                <Link
                  href={`/car/${vehicle.mispar_rechev}`}
                  className="text-blue-500 hover:underline"
                >
                  {vehicle.mispar_rechev}
                </Link>
              </td>
              <td className="text-black px-4 py-2 border-b">
                {vehicle.tozeret_nm}
              </td>
              <td className="text-black px-4 py-2 border-b">
                {vehicle.kinuy_mishari}
              </td>
              <td className="text-black px-4 py-2 border-b">
                {vehicle.shnat_yitzur}
              </td>
              <td className="text-black px-4 py-2 border-b">
                {vehicle.tzeva_rechev}
              </td>
              <td className="text-black px-4 py-2 border-b">
                {vehicle.tokef_dt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
