
/*import { use, useEffect,useState } from "react";
///API integration using FETCH API.
function App() {
  const [posts ,setposts] =useState([]);
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response)=>response.json())
    .then((data)=>{
      setposts(data.slice(0,10));//this shows only 10 posts
    });
  },[])
  return (
      <div>
      <h1>Fetch API example</h1>
      {posts.map((post)=>(
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <hr/>
        </div>
      ))}
      </div>
  );
}

export default App;
*/

import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./components/PostCard";
import SearchBar from "./components/SearchBar";
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data.slice(0, 10)); // this shows only 10 posts
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <h2>Loading.....</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <h1>Axios API example</h1>
      <SearchBar search={search} setSearch={setSearch} />
      {filteredPosts.map((post) => (
        <PostCard key={post.id} title={post.title} body={post.body} />
      ))}
    </div>
  );
}

export default App;

/*
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data.slice(0, 10)); // this shows only 10 posts
      setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  if (loading){
    return <h2>Loading.....</h2>
  }
  if(error){
    return <h2>{error.message}</h2>
  }
  return (
    <div>
      <h1>Axios API example</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
*/
