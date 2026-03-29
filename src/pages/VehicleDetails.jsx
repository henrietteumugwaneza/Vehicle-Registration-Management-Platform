import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import Tabs from "../components/Tabs";

export default function VehicleDetails() {
  const { id } = useParams();

  const { data: info } = useQuery({
    queryKey: ["info", id],
    queryFn: () => api.get(`/vehicle/${id}/info`).then(r => r.data),
  });

  const tabs = [
    { label: "Info", content: JSON.stringify(info) },
  ];

  return <Tabs tabs={tabs} />;
}