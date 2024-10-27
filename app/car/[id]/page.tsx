import axios from "axios";
import Link from "next/link";

interface CarDetails {
  mispar_rechev: string;
  tozeret_nm: string;
  kinuy_mishari: string;
  shnat_yitzur: string;
  tzeva_rechev: string;
  tokef_dt: string;
}

interface DisabledParkingPermit {
  mispar_rechev: string;
  taarich_hafakat_tag: string;
}

async function getCarDetails(id: string): Promise<CarDetails> {
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={"mispar_rechev":"${id}"}`
    );
    if (response.data.result.records.length === 0) {
      throw new Error("Car not found");
    }
    return response.data.result.records[0];
  } catch (error) {
    console.error("Error fetching car details:", error);
    throw error;
  }
}

async function getDisabledParkingPermit(
  id: string
): Promise<DisabledParkingPermit | null> {
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&filters={"mispar_rechev":"${id}"}`
    );
    return response.data.records[0] || null;
  } catch (error) {
    console.error("Error fetching disabled parking permit:", error);
    return null;
  }
}

export default async function CarDetails({
  params,
}: {
  params: { id: string };
}) {
  const carDetails = await getCarDetails(params.id);
  const disabledParkingPermit = await getDisabledParkingPermit(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Car Details</h1>
      <div className="bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p>
          <strong>Car Number:</strong> {carDetails.mispar_rechev}
        </p>
        <p>
          <strong>Manufacturer:</strong> {carDetails.tozeret_nm}
        </p>
        <p>
          <strong>Model:</strong> {carDetails.kinuy_mishari}
        </p>
        <p>
          <strong>Year:</strong> {carDetails.shnat_yitzur}
        </p>
        <p>
          <strong>Color:</strong> {carDetails.tzeva_rechev}
        </p>
        <p>
          <strong>License Valid Until:</strong> {carDetails.tokef_dt}
        </p>
        {disabledParkingPermit && (
          <p>
            <strong>Disabled Parking Permit Issued:</strong>{" "}
            {disabledParkingPermit.taarich_hafakat_tag}
          </p>
        )}
      </div>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Vehicle List
      </Link>
    </div>
  );
}
