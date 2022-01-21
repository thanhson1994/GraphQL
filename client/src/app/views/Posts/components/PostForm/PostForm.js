import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const PostForm = ({ visible, onCreate, onCancel, editPost, editMode }) => {
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  const [form] = Form.useForm();

  useEffect(() => {
    if(editPost && editMode) {
        form.setFieldsValue({
            title: editPost.post.title,
            content: editPost.post.content,
          });
    }
  }, [editPost, editMode, form])

  return (
    <Modal
      visible={visible}
      title= { editMode ? "Edit Post" : "Create a new Post"  }
      okText={ editMode ? "Edit" : "Create"  }
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: "Please input the content of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostForm;
