import { useParams } from "react-router-dom";

export default function CatchAllPage() {
  const { all } = useParams();

  return <div>CatchAllPage {JSON.stringify(all)}</div>;
}
