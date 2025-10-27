from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
import os

app = Flask(__name__)
CORS(app)

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
EMAIL_RECEIVER = os.getenv("EMAIL_RECEIVER")

@app.route("/submit", methods=["POST"])
def submit_form():
    data = request.json

    text = "Neue Anfrage eingegangen:\n\n"
    for key, value in data.items():
        text += f"{key}: {value}\n"

    msg = MIMEText(text)
    msg["Subject"] = "Neue Bedarfsfeststellung"
    msg["From"] = EMAIL_USER
    msg["To"] = EMAIL_RECEIVER

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, EMAIL_RECEIVER, msg.as_string())
    except Exception as e:
        print("Fehler beim Senden:", e)
        return jsonify({"message": "Fehler beim Senden"}), 500

    return jsonify({"message": "E-Mail wurde erfolgreich gesendet!"}), 200


if __name__ == "__main__":
    app.run(port=5000)




app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def index():
    return render_template("bedarfsfeststellung.html")


