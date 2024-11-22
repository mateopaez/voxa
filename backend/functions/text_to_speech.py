import requests
from decouple import config

ELEVEN_LABS_API_KEY = config("ELEVEN_LABS_API_KEY")

# Eleven Labs
# Convert Text to Speech
def convert_text_to_speech(message):
    # Define Data (body)
    body = {
        "text": message,
        "voice_settings": {
            "stability": 0,
            "similarity_boost": 0,
        }
    }
    # Define voice
    voice_zeus_epic = "jB108zg64sTcu1kCbN9L"

    headers = {"xi-api-key": ELEVEN_LABS_API_KEY, "Content-Type": "application/json"}
    endpoint = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_zeus_epic}"

    # Send request
    try:
        response = requests.request("POST", endpoint, json=body, headers=headers)
    except Exception as e:
        print(e)
        return
    
    # Handle response
    if response.status_code == 200:
        return response.content
    else:
        return