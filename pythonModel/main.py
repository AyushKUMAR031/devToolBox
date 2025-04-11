import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from huggingface_hub import InferenceClient

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

app = Flask(__name__)
client = InferenceClient(model="bigcode/santacoder", token=HF_TOKEN)

@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    prompt = data['prompt']
    response = client.text_generation(
        prompt,
        max_new_tokens=50,
        temperature=0.2,
        stop_sequences=["'''", "\n\n"],
        do_sample=False
    )
    return jsonify({'output': response})

if __name__ == '__main__':
    app.run(port=5001)
