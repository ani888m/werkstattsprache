from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
import os

app = Flask(__name__)
CORS(app)

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
EMAIL_RECEIVER = os.getenv("EMAIL_RECEIVER")

# Startseite ausliefern
@app.route("/")
def home():
    return send_from_directory(".", "index.html")  # <- hier angepasst

@app.route("/bedarfsfeststellung")
def bedarfsfeststllung():
    return send_from_directory(".", "bedarfsfeststellung.html")  # <- hier angepasst

# Alle anderen Dateien ausliefern
@app.route("/<path:filename>")
def serve_files(filename):
    try:
        return send_from_directory(".", filename)
    except:
        return "404 Datei nicht gefunden", 404

# Formular per E-Mail senden
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
    app.run(host="0.0.0.0", port=10000)
