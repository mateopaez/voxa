# uvicorn main:app
# uvicorn main:app --reload

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai
from functions.database import store_messages, reset_messages
from functions.openai_requests import convert_audio_to_text, get_chat_response
from functions.text_to_speech import convert_text_to_speech

# Initiate App
app = FastAPI()

# CORS - Origins
origins = [
    "https://localhost:5173",
    "https://localhost:5174",
    "https://localhost:4173",
    "https://localhost:4174",
    "https://localhost:3000",
]

# CORS - Middlware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Check Health
@app.get("/health")
async def check_health():
    return {"message": "healthy"}

# Reset Messages
@app.get("/reset")
async def reset_conversation():
    reset_messages()
    return {"message": "conversation reset"}

# Get audio
@app.get("/post-audio/")
async def post_audio(file: UploadFile = File(...)):

    # Get saved audio
    #audio_input = open("voice.m4a", "rb")
    
    #Save file from Frontend
    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())
    audio_input = open(file.filename, "rb")

    # Decode Audio
    message_decoded = convert_audio_to_text(audio_input)

    # Guard: Ensure message decoded
    if not message_decoded:
        return HTTPException(status_code=400, detail="Failed to decode audio")

    # Get ChatGPT response
    chat_response = get_chat_response(message_decoded)

    # Guard: Ensure chat responded
    if not chat_response:
        return HTTPException(status_code=400, detail="Failed to get chat response")
    
    # Store messages
    store_messages(message_decoded, chat_response)

    # Convert chat response to audio
    audio_output = convert_text_to_speech(chat_response)

    # Guard: Ensure textconverted
    if not audio_output:
        return HTTPException(status_code=400, detail="Failed to get Eleven Labs audio response")
    
    # Create a generator that yields chunks of data
    def iterfile():
        yield audio_output

    # Return audio file
    return StreamingResponse(iterfile(), media_type="audio/octet-stream")
