import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import StoryBar from "../components/StoryBar";
import PostComposer from "../components/PostComposer";
import PostCard from "../components/PostCard";
import RightSidebar from "../components/RightSidebar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = useCallback(async (nextPage = 1) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/posts", {
        params: {
          page: nextPage,
          limit: 10,
        },
      });

      const result = response.data?.data;
      const incomingPosts = result?.posts || [];

      setPosts((current) =>
        nextPage === 1 ? incomingPosts : [...current, ...incomingPosts],
      );
      setPage(nextPage);
      setHasMore(Boolean(result?.hasMore));
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to load the feed. Make sure the SocialHub backend and MongoDB are running.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  const addPost = (post) => {
    setPosts((current) => [post, ...current]);
  };

  const removePost = (postId) => {
    setPosts((current) => current.filter((post) => post._id !== postId));
  };

  return (
    <div className="home-grid">
      <div className="feed">
        <StoryBar />
        <PostComposer onCreated={addPost} />

        <div className="feed-tabs">
          <button className="active">For You</button>
          <button type="button">Following</button>
          <button type="button">Trending</button>
          <button type="button">Latest</button>
        </div>

        {error ? <div className="card error-box">{error}</div> : null}

        {loading && posts.length === 0 ? (
          <div className="card skeleton-card">Loading your feed…</div>
        ) : null}

        {!loading && !error && posts.length === 0 ? (
          <div className="card empty-state">
            <h3>No posts yet</h3>
            <p>Create your first SocialHub post.</p>
          </div>
        ) : null}

        {posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={removePost} />
        ))}

        {hasMore ? (
          <button
            className="outline-btn load-more"
            type="button"
            onClick={() => loadPosts(page + 1)}
            disabled={loading}
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        ) : null}
      </div>

      <RightSidebar />
    </div>
  );
}
