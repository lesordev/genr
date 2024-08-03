import { useParams } from "react-router-dom";

export default function UserDetailTagPage() {
  const { userId } = useParams();

  return <div>UserDetailTagPage {userId}</div>;
}
