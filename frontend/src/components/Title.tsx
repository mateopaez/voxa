import { useState } from 'react';
import axios from "axios";

type Props = {
    setMessages: any;
};

function Title({ setMessages }: Props) {
    const [isResetting, setIsResetting] = useState(false);

    // Reset the conversation
    const resetConversation = async () => {
        setIsResetting(true);

        await axios.get("http://localhost:8000/reset").then((response) => {
            if (response.status == 200) {
                setMessages([]);
            } else {
                console.error("There was an error with the API request to the backend");
            }
        })
        .catch((err) => {
            console.error(err.message);
        });

        setIsResetting(false);
    };

    return (
        <div>
            <button onClick={resetConversation} className="bg-indigo-500 p-3">RESET</button>
        </div>
    )
}

export default Title;
