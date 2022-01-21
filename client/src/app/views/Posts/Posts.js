import { useState } from "react";

import { List, Avatar, Button } from "antd";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import PostForm from "./components/PostForm/PostForm";
import "./Posts.css";
const GET_POSTS = gql`
  query posts {
    posts {
      posts {
        title
        _id
        content
        updatedAt
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

const CREATE_POST = gql`
  mutation createPost($postInput: PostInputData) {
    createPost(postInput: $postInput) {
      title
      content
    }
  }
`;

const GET_POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      _id
      title
      content
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $postInput: PostInputData) {
    updatePost(id: $id, postInput: $postInput) {
      title
      content
    }
  }
`;

function Posts() {

  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const [deletePost] = useMutation(DELETE_POST, {});
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [
      GET_POSTS, // DocumentNode object parsed with gql
    ],
  });
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [GET_POSTS],
  });
  const [getPost, { loading: loadingEdit, error: errorEdit, data: editData }] =
    useLazyQuery(GET_POST);

  let navigate = useNavigate();
  const gotoDetailPost = (id) => navigate(`/post/${id}`);
  const handleDeletePost = (id) => {
    deletePost({ variables: { id: id } });
    refetch();
  };

  const onCreate = (values) => {
    if (editMode && editData) {
      updatePost({
        variables: {
          id: editData.post._id,
          postInput: {
            title: values.title,
            content: values.content,
          },
        },
      });
    } else {
      createPost({
        variables: {
          postInput: {
            title: values.title,
            content: values.content,
          },
        },
      });
    }
    setVisible(false);
    setEditMode(false);
  };

  const handleEditPost = (id) => {
    getPost({ variables: { id: id } });
    setEditMode(true);
    setVisible(true);
  };

  const handleCancelModel = () => {
    setVisible(false);
    setEditMode(false);
  };
  if (loading || loadingEdit) return <p>Loading...</p>;
  if (error || errorEdit) return <p>Error :(</p>;
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setEditMode(false);
          setVisible(true);
        }}
      >
        Create Posts
      </Button>
      <PostForm
        visible={visible}
        onCreate={onCreate}
        onCancel={handleCancelModel}
        editPost={editData}
        editMode={editMode}
      />
      <List
        className="posts-list"
        itemLayout="horizontal"
        dataSource={data.posts.posts.slice().sort((a,b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        })}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                key="list-view"
                onClick={() => gotoDetailPost(item._id)}
              >
                View
              </Button>,
              <Button
                type="primary"
                key="list-edit"
                onClick={() => handleEditPost(item._id)}
              >
                Edit
              </Button>,
              <Button
                danger
                key="list-delete"
                onClick={() => handleDeletePost(item._id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={<>{item.content}</>}
            />
          </List.Item>
        )}
      />
      ,
    </>
  );
}

export default Posts;
