import { useParams } from "react-router-dom";

export default function AdminUserDetailPage() {
  const { userId } = useParams();

  return <div>AdminUserDetailPage {userId}</div>;
}
