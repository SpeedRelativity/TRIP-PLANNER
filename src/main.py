# defining our input format
user_input = {
    "city": "Tokyo",
    "country": "Japan",
    "start-date" : "2022-01-01",
    "end-date": "2022-12-31",
    "budget" : "1000",
    "interests" : "sightseeing, food, culture"
}

# structuring our prompt
def UserInputToPrompt(user_input):
    prompt = (f"Generate a travel itinerary for {user_input['city']}, {user_input['country']} for a budget of {user_input['budget']} USD. The trip should be from {user_input['start-date']} to {user_input['end-date']}. The user is interested in {user_input['interests']}.")
    return prompt

print(UserInputToPrompt(user_input))

# api stuff

import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.ChatCompletion.create(
    model = "gpt-turbo-3.5",
    messages = [{'role': 'user', 'content': UserInputToPrompt(user_input)}]

)
