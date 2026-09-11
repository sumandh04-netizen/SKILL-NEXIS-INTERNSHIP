import { useNavigate } from "react-router-dom";

function BlogCard({ post }) {
  const navigate = useNavigate();

  const openCourse = () => {
    navigate(`/course/${post.id}`);
  };

  return (
    <div
      className="blog-card"
      onClick={openCourse}
    >
      <span className="category">
        {post.category}
      </span>

      <h2>{post.title}</h2>

      <p>{post.description}</p>

      <p className="author">
        Instructor: {post.author}
      </p>

      <p className="click-text">
        Click to view course →
      </p>
    </div>
  );
}

export default BlogCard;