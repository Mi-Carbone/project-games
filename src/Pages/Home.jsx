import React, { useEffect, useState } from "react";
function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const rawData = await fetch("https://jsonplaceholder.typicode.com/posts/");
    //trasformare i dati in un json
    const data = await rawData.json();

    const posts = data.slice(0, 10);
    setPosts(posts);
  };

  return (
    <>
      <div className="homepage">
        <h2>HOME</h2>
        <div>
          {posts.map((post) => (
            <h3 key={post.id}>{post.title}</h3>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
