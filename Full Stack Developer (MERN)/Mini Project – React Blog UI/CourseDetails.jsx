import { useNavigate, useParams } from "react-router-dom";
import posts from "../data/posts.json";

function CourseDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const course = posts.find(
        (post) => post.id === Number(id)
    );

    if (!course) {
        return (
            <div className="course-page">
                <div className="course-details-card">
                    <h1>Course Not Found</h1>

                    <button
                        className="close-button"
                        onClick={() => navigate("/")}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="course-page">

            <div className="course-details-card">

                {/* Course Title */}

                <h1 className="course-title">
                    {course.title}
                </h1>


                {/* 1. Category */}

                <div className="course-section">
                    <h3>1. Category</h3>

                    <p className="course-category">
                        {course.category}
                    </p>
                </div>


                {/* 2. Description */}

                <div className="course-section">
                    <h3>2. Description</h3>

                    <p>
                        {course.description}
                    </p>
                </div>


                {/* 3. Instructor */}

                <div className="course-section">
                    <h3>3. Instructor</h3>

                    <p>
                        {course.author}
                    </p>
                </div>


                {/* 4. Course Information */}

                <div className="course-section">
                    <h3>4. Course Information</h3>

                    <p>
                        {course.courseInformation}
                    </p>
                </div>


                {/* 5. Chapter Name and Chapter-wise Notes */}

                <div className="course-section">

                    <h3>5. Chapters and Chapter-wise Notes</h3>

                    {course.chapters.map(
                        (chapter, index) => (
                            <div
                                className="chapter-card"
                                key={index}
                            >
                                <h4>
                                    {chapter.chapterName}
                                </h4>

                                <p>
                                    {chapter.note}
                                </p>
                            </div>
                        )
                    )}

                </div>


                {/* 6. Course Outcome */}

                <div className="course-section">

                    <h3>6. Course Outcome</h3>

                    <ul className="outcome-list">

                        {course.courseOutcome.map(
                            (outcome, index) => (
                                <li key={index}>
                                    {outcome}
                                </li>
                            )
                        )}

                    </ul>

                </div>


                {/* 7. Close Button */}

                <button
                    className="close-button"
                    onClick={() => navigate("/")}
                >
                    Close Course
                </button>

            </div>

        </div>
    );
}

export default CourseDetails;