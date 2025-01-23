import { useState } from 'react'
import Title from "./Title";
import RecordMessage from './RecordMessage';
import axios from "axios";

interface Message {
    sender: string;
    blobUrl: string;
}

function Controller() {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const createBlobUrl = (data: ArrayBuffer | Blob): string => {
        const blob = new Blob([data], { type: "audio/mpeg" });
        const url = window.URL.createObjectURL(blob);
        return url;
    };

    const handleStop = async (blobUrl: string) => {
        setIsLoading(true);

        // Append recorded message to messages
        const myMessage: Message = { sender: "me", blobUrl };
        const messagesArr = [...messages, myMessage];

        // Convert blob url to blob object
        fetch(blobUrl)
        .then((response) => response.blob())
        .then(async (blob) => {
            // Construct audio to send file
            const formData = new FormData();
            formData.append("file", blob, "myFile.wav");

            // Send form data to API endpoint
            await axios
            .post("https://voxa.up.railway.app/post-audio", formData, {
                responseType: "arraybuffer",  
            })
            .then((response: any) => {
                const blob = response.data;
                const audio = new Audio();
                audio.src = createBlobUrl(blob);

                // Append to audio
                const voxaMessage: Message = { sender: "voxa", blobUrl: audio.src };
                messagesArr.push(voxaMessage);
                setMessages(messagesArr);

                // Play Audio
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err.message);
                setIsLoading(false);
            });
        });
    };


    return (
        <div className="relative min-h-screen bg-gradient-to-br from-custom1 via-custom2 to-custom3 flex justify-center items-center">
            {/* Glassy bg overlay */}
            <div className="absolute inset-0 backdrop-blur-lg bg-black bg-opacity-20"></div>

            {/* Main container */}
            <div className="
                relative 
                w-full 
                h-screen 
                lg:w-2/4 
                lg:h-[90vh]
                lg:rounded-lg 
                lg:shadow-xl
                lg:border 
                bg-white 
                bg-opacity-90 
                overflow-hidden 
                flex 
                flex-col">

                {/* Title */}
                <Title setMessages={setMessages}/>
                <div className="flex flex-col justify-between h-full overflow-y-scroll">

                    {/* Conversation */}
                    <div className="mt-5 px-5">
                        {messages.map((audio, index) => {
                            return ( <div key={index + audio.sender} 
                                className={"flex flex-col " + 
                                (audio.sender == "voxa" && "flex items-end")
                                }
                            >
                                {/* Sender Name */}
                                <div className="mt-4">
                                    <p className={
                                        audio.sender == "voxa" 
                                        ? "text-right mr-2 italic text-custom3" 
                                        : "ml-2 italic text-custom1"}
                                    >
                                        {audio.sender}
                                    </p>

                                    {/* Audio Message */}
                                    <audio src={audio.blobUrl} className="appearance-none" controls />
                                </div>
                            </div>
                            );
                        })}

                        {messages.length == 0 && !isLoading && (
                            <div className="text-center font-light italic mt-10">
                                Send Voxa a voice message...
                            </div>
                        )}

                        {isLoading && (
                            <div className="text-center font-light italic mt-10 animate-pulse">
                                Voxa is thinking...
                            </div>
                        )}
                    </div>

                    {/* Recorder */}
                    <div className="absolute bottom-0 left-0 w-full lg:w-full lg:rounded-b-lg py-6 border-t text-center bg-gradient-to-r from-custom1 via-custom2 to-custom3">
                        <div className="flex justify-center items-center w-full">
                            <RecordMessage handleStop={handleStop} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Controller;
