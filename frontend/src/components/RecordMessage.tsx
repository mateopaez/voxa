import { useState, useRef } from "react";
import RecordIcon from "./RecordIcon";
import RecordRTC from "recordrtc";

type Props = {
  handleStop: any;
};

function RecordMessage({ handleStop }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    // Get user media
    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Create the recorder instance using RecordRTC
    const newRecorder = new RecordRTC(streamRef.current, {
      type: "audio",
      mimeType: "audio/wav", // Choose the format that works across browsers
      recorderType: RecordRTC.StereoAudioRecorder,
    });

    newRecorder.startRecording();
    setRecorder(newRecorder);
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        const url = URL.createObjectURL(audioBlob);
        handleStop(url);
      });
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
          classText={isRecording ? "animate-pulse text-red-500" : "text-custom3"}
        />
      </button>
      <p className="mt-2 text-white font-light">
        {isRecording ? "Recording..." : "Tap to record"}
      </p>
    </div>
  );
}

export default RecordMessage;
