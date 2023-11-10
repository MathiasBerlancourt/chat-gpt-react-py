
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI
# DOTENV
load_dotenv(find_dotenv())
client = OpenAI(api_key=os.getenv("OPEN_AI_KEY"))


# FLASK
app = Flask(__name__)
cors = CORS(app)


@app.route('/api', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    response = client.completions.create(model="text-davinci-003",
                                         prompt=message,
                                         max_tokens=1024,
                                         temperature=0.9)
    print(response.choices[0].text)
    result = jsonify({'message': response.choices[0].text})
    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)
