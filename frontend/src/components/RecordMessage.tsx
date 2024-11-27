import { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";

type Props = {
    handleStop: any;
};

function RecordMessage({ handleStop }: Props) {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    // Function to detect Safari
    const isSafari = () => {
        return (
            /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        );
    };

    // Choose the correct mimeType based on the browser
    const getMimeType = () => {
        if (isSafari()) {
            return "audio/mp4;codecs=mp4a.40.2"; // Safari mime type
        }
        return "audio/webm;codecs=opus"; // Default for others
    };

    // Start recording function for non-ReactMediaRecorder approach
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const options = { mimeType: getMimeType() };
        const recorder = new MediaRecorder(stream, options);

        recorder.ondataavailable = (event) => {
            const blob = event.data;
            const url = URL.createObjectURL(blob);
            handleStop(url);
        };

        recorder.start();
        setMediaRecorder(recorder);
    };

    // Stop recording function
    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
        }
    };

    const handleToggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsRecording(!isRecording);
    };

    return (
        <div className="mt-2">
            <button
                onClick={handleToggleRecording}
                className="bg-white p-4 rounded-full"
            >
                <RecordIcon
                    classText={
                        isRecording
                            ? "animate-pulse text-red-500"
                            : "text-custom3"
                    }
                />
            </button>
            <p className="mt-2 text-white font-light">
                {isRecording ? "Recording..." : "Tap to record"}
            </p>
        </div>
    );
}

export default RecordMessage;
