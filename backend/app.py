from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
import openai
import os
# DOTENV
load_dotenv(find_dotenv())
openai.api_key = os.getenv("OPEN_AI_KEY")

# FLASK
app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=message,
        max_tokens=1024,
        temperature=0.9,
    )
    print(response.choices[0].text)
    return jsonify({'message': response.choices[0].text})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)
