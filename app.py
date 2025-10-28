from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
import os

app = Flask(__name__)
CORS(app)

# Env-Variablen (müssen auf Render gesetzt werden)
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
EMAIL_RECEIVER = os.getenv("EMAIL_RECEIVER")

# Startseite ausliefern
@app.route("/")
def home():
    return render_template("index.html")

# Unterseite Bedarfsfeststellung
@app.route("/bedarfsfeststellung")
def form_page():
    return render_template("bedarfsfeststellung.html")

# Formular per E-Mail senden
@app.route("/submit", methods=["POST"])
def submit_form():
    data = request.json
    if not data:
        return jsonify({"message": "Keine Daten empfangen"}), 400

    # Text zusammenbauen
    text = "Neue Anfrage eingegangen:\n\n" + "\n".join(f"{k}: {v}" for k, v in data.items())

    msg = MIMEText(text)
    msg["Subject"] = "Neue Bedarfsfeststellung"
    msg["From"] = EMAIL_USER
    msg["To"] = EMAIL_RECEIVER

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.set_debuglevel(1)  # Debugging aktivieren
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, EMAIL_RECEIVER, msg.as_string())
            print("E-Mail erfolgreich gesendet!")
    except smtplib.SMTPAuthenticationError as e:
        print("SMTP Auth Error:", e)
        return jsonify({"message": "SMTP Auth Error", "error": str(e)}), 500
    except Exception as e:
        print("Fehler beim Senden:", e)
        return jsonify({"message": "Fehler beim Senden", "error": str(e)}), 500

    return jsonify({"message": "E-Mail wurde erfolgreich gesendet!"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
