import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Filter from "./components/Filter.jsx";
import BlogCard from "./components/BlogCard.jsx";
import Footer from "./components/Footer.jsx";
import CourseDetails from "./components/CourseDetails.jsx";

import posts from "./data/posts.json";


function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "All" ||
      post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />

      <main className="main">

        <h2 className="main-title">
          Latest Courses
        </h2>

        <div className="controls">

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <Filter
            category={category}
            setCategory={setCategory}
          />

        </div>

        <div className="blog-grid">

          {filteredPosts.length > 0 ? (

            filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            ))

          ) : (

            <p className="no-results">
              No courses found.
            </p>

          )}

        </div>

      </main>

      <Footer />
    </>
  );
}


function App() {
  return (
    <Routes>

      {/* Home Page */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Course Details Page */}
      <Route
        path="/course/:id"
        element={<CourseDetails />}
      />

    </Routes>
  );
}


export default App;