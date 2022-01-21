import { List, Avatar, Button } from "antd";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
const GET_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      title
      content
    }
  }
`;
function PostDetail() {
  let params = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: params.id },
    pollInterval: 5000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <p>{data.post.content}</p>
    </>
  );
}

export default PostDetail;
