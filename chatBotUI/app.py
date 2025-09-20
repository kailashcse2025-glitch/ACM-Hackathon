
#part 1 - importing modules

from flask import Flask, request, jsonify
from flask_cors import CORS
import os  
from openai import OpenAI 

os.environ["OPEN_API_KEY"] = "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"

#step 2 creating app and link between front and backend

app = Flask(__name__)
CORS(app)


client = OpenAI(api_key= "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"
)

#python get message from javascrupt
conversation = []
@app.route("/chat", methods=["POST"])
def chat():
   global conversation
   data = request.get_json()
   user_msg = data.get("message", "")
   conversation.append({"role":"user", "content": user_msg})

   response = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages = conversation
   )
   bot_reply = response.choices[0].message.content

   conversation.append({"role":"assistant", "content":bot_reply})

   return jsonify({"reply":bot_reply})

if __name__ == "__main__":
   app.run(debug=True)
    

    






   
