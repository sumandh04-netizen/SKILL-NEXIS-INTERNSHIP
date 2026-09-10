import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Form from "./components/Form";

import "./index.css";

function App() {

    // Dynamic data
    const projects = [

        {
    id: 1,
    name: "Wi-Fi Controlled Car",
    description:
        "Robotic vehicle automation using MicroPython, ESP32 and sensors.",
    image:
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=800&q=80"
},

        {
            id: 2,
            name: "Library Management System",
            description:
                "A GUI-based desktop application using Java Swing and OOP.",
            image:
                "https://images.unsplash.com/photo-1507842217343-583bb7270b66"
        },

        {
            id: 3,
            name: "Personal Portfolio",
            description:
                "A responsive portfolio website created using HTML and CSS.",
            image:
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
        }

    ];

    return (
        <>

            {/* HEADER COMPONENT */}
            <Header
                title="React Components Practice"
            />

            <main>

                <h2 className="main-title">
                    My Projects
                </h2>

                {/* DYNAMIC RENDERING */}
                <div className="card-container">

                    {projects.map((project) => (

                        <Card
                            key={project.id}
                            name={project.name}
                            description={project.description}
                            image={project.image}
                        />

                    ))}

                </div>

                {/* FORM COMPONENT */}
                <Form />

            </main>

            {/* FOOTER COMPONENT */}
            <Footer
                name="Suman D H"
            />

        </>
    );
}

export default App;