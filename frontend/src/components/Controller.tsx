import { useState } from 'react'
import Title from "./Title";
import RecordMessage from './RecordMessage';

function Controller() {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    // Placeholder for later
    const createBlobUrl = (data: any) => {};

    // Placeholder for later
    const handleStop = async () => {
        alert("hello")
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
                <Title setMessages={setMessages}/>
                <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
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
