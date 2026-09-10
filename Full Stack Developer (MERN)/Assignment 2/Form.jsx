import { useState } from "react";
import Button from "./Button";

function Form() {

    // STATE
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [result, setResult] = useState("");

    function handleSubmit(event) {

        event.preventDefault();

        // Name validation
        if (name.trim().length < 3) {

            setResult(
                "Name must contain at least 3 characters."
            );

            return;
        }

        // Email validation
        if (!email.includes("@")) {

            setResult(
                "Please enter a valid email address."
            );

            return;
        }

        setResult(
            `Thank you ${name}! Your message was submitted successfully.`
        );

        // Clear the form
        setName("");
        setEmail("");
        setMessage("");
    }

    return (
        <form className="form" onSubmit={handleSubmit}>

            <h2>Contact Form</h2>

            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) =>
                    setName(event.target.value)
                }
            />

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
            />

            <textarea
                placeholder="Enter your message"
                value={message}
                onChange={(event) =>
                    setMessage(event.target.value)
                }
            />

            <Button
                text="Submit"
                onClick={() => {}}
            />

            <p className="result">
                {result}
            </p>

        </form>
    );
}

export default Form;