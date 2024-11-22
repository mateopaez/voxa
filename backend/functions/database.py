import json
import random

# Get recent messages
def get_recent_messages():

    # Define the file name and learn instruction
    file_name = "stored_data.json"
    learn_instruction = {
        "role": "system",
        "content": "You are a helpful assistant."
    }

    # Initialize messages
    messages = []

    # Add a random element, not sure if I will end up using this but it's cool to know how it's done:
    # x = random.uniform(0, 1)
    # if x < 0.5:
    #     learn_instruction["content"] += " Your response will include some dry humor."
    # else:
    #     learn_instruction["content"] += "Your response will include a rather challenging question square roots."

    # Append instruction to message
    messages.append(learn_instruction)

    # Get last messages
    try:
        with open(file_name) as user_file:
            data = json.load(user_file)
            # Append last 5 items of data
            if data:
                if len(data) < 5:       # if there isn't 5 rows of data then append everything, else append the last 5 rows of data
                    for item in data:
                        messages.append(item)
                else:
                    for item in data[-5:]:
                        messages.append(item)
    except Exception as e:
        print(e)
        pass

    return messages


# Store Messages
def store_messages(request_message, response_message):
    file_name = "stored_data.json"
    # Get recent messages
    messages = get_recent_messages()[1:]  # we don't want the first message that is sent which is the first prompt we give
    # Add messages to data
    user_message = {"role": "user", "content": request_message}
    assistant_message = {"role": "assistant", "content": response_message}
    messages.append(user_message)
    messages.append(assistant_message)

    # Save the updated messages
    with open(file_name, "w") as f:
        json.dump(messages, f)


# Reset Messages
def reset_messages():
    # Overwrite current file with nothing
    open("stored_data.json", "w")