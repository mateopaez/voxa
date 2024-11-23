import { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";


type Props = {
    handleStop: any;
}


function RecordMessage({ handleStop }: Props) {
    const [isRecording, setIsRecording] = useState(false);

    const handleToggleRecording = (
        startRecording: () => void,
        stopRecording: () => void
    ) => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsRecording(!isRecording);
    };

  return (
    <ReactMediaRecorder 
      audio
      onStop={handleStop}
      render={({ 
        status, 
        startRecording, 
        stopRecording 
      }: { 
        status: string; 
        startRecording: () => void; 
        stopRecording: () => void; 
      }) => (
        <div className="mt-2">
          <button
            onClick={() => handleToggleRecording(startRecording, stopRecording)}
            className="bg-white p-4 rounded-full"
          >
            <RecordIcon classText={
                status == "recording" 
                ? "animate-pulse text-red-500" 
                : "text-custom3"
            }/>
          </button>
          <p className="mt-2 text-white font-light">{status}</p>
        </div>
      )}
    />
  );
}

export default RecordMessage;
