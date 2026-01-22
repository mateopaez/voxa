import requests
from decouple import config

ELEVEN_LABS_API_KEY = config("ELEVEN_LABS_API_KEY", default=None)

# Eleven Labs
# Convert Text to Speech
def convert_text_to_speech(message):
    # Check if API key is configured
    if not ELEVEN_LABS_API_KEY:
        print("ERROR: ELEVEN_LABS_API_KEY is not set in environment variables")
        return None
    
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
        print(f"ERROR: Exception occurred while calling ElevenLabs API: {e}")
        return None
    
    # Handle response
    if response.status_code == 200:
        return response.content
    else:
        # Log the error details for debugging
        print(f"ERROR: ElevenLabs API returned status code {response.status_code}")
        print(f"ERROR: Response headers: {response.headers}")
        try:
            error_body = response.json()
            print(f"ERROR: Response body: {error_body}")
        except:
            print(f"ERROR: Response text: {response.text}")
        return None