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
    inputCode = data.get('inputCode')
    sourceLang = data.get('sourceLang')
    targetLang = data.get('targetLang')

    if not inputCode or not sourceLang or not targetLang:
        return jsonify({'error': 'Missing inputCode, sourceLang, or targetLang'}), 400

    # 💡 Prompt format like in Colab
    prompt = f"""# Translate this {sourceLang} code to {targetLang}:

{inputCode}

# {targetLang} equivalent:
"""

    try:
        print("\n📥 Prompt sent to model:\n", prompt)

        response = client.text_generation(
            prompt,
            max_new_tokens=100,
            temperature=0.2,
            stop_sequences=["# End", "\n\n"],
            do_sample=False
        )

        print("\n📤 Model response:\n", response)
        return jsonify({'output': response.strip()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
