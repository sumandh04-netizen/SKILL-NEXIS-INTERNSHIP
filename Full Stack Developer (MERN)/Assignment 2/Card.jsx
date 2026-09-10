import { useState } from "react";
import Button from "./Button";

function Card({ name, description, image }) {

    // STATE
    const [liked, setLiked] = useState(false);

    function handleLike() {
        setLiked(!liked);
    }

    return (
        <div className="card">

            <img src={image} alt={name} />

            <h2>{name}</h2>

            <p>{description}</p>

            <Button
                text={liked ? "Liked ❤️" : "Like 👍"}
                onClick={handleLike}
            />

        </div>
    );
}

export default Card;