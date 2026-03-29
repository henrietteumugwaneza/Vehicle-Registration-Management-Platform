import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => api.get("/vehicle").then((res) => res.data),
  });

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1>Vehicles</h1>
        {isLoading ? <p>Loading...</p> : <Table data={data} />}
      </div>
    </>
  );
}