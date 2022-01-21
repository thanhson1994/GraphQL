import "./App.css";
import {
  Route,
  Routes,
} from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import NavBar from "./app/shared/components/NavBar/NavBar";
import Home from "./app/views/Home/Home";
import Posts from "./app/views/Posts/Posts";
import PostDetail from "./app/views/Posts/components/PostDetail/PostDetail";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          {" "}
          <NavBar />
        </Header>
        <Content>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
