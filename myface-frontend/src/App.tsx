import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './style/App.scss'
import PostList from './PostList';
import UserDetail from './UserDetail';
import UserList from './UserList';
import CreateUser from './CreateUser';
import CreatePost from './CreatePost';

export default function App() {

  return (
    <Router>
      <h1></h1>
      <Routes>
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/users/" element={<UserList />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path='*' element={
          <div>
            <div> Page doesn't exits, try these:</div>
            <Link to="/posts"> Posts </Link>
            <Link to="/users">Users List</Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}
