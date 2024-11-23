import { useState } from 'react'
import Title from "./Title";

function Controller() {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    // Placeholder for later
    const createBlobUrl = (data: any) => {};

    // Placeholder for later
    const handleStop = async () => {};


    return (
        <div className="h-screen overflow-y-hidden">
            <Title setMessages={setMessages}/>
            <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
                {/* Recorder */}
                <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-custom1 via-custom2 to-custom3">
                    <div className="flex justify-center items-center w-full">
                        <div>Recorder</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Controller;
