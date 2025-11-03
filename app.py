from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)
CORS(app)

# Environment Variables auf Render setzen:
# EMAIL_USER, EMAIL_RECEIVER, SENDGRID_API_KEY
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_RECEIVER = os.getenv("EMAIL_RECEIVER")
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")

# Startseite ausliefern
@app.route("/")
def home():
    return render_template("index.html")

# Unterseite Bedarfsfeststellung
@app.route("/bedarfsfeststellung")
def form_page():
    return render_template("bedarfsfeststellung.html")

@app.route("/Sprachlernspiele")
def sprachlernspiele_page():
    return render_template("Sprachlernspiele.html")

@app.route("/haengemann")
def haengemann():
    return render_template("haengemann.html")

@app.route("/Artikelzuordnungsspiel")
def Artikelzuordnungsspiel():
    return render_template("Artikelzuordnungsspiel.html")
    
@app.route("/memory/index1")
def memory():
    return render_template("memory/index1.html")


# Formular per E-Mail senden
@app.route("/submit", methods=["POST"])
def submit_form():
    data = request.json
    if not data:
        return jsonify({"message": "Keine Daten empfangen"}), 400

    # Text zusammenbauen
    text = "Neue Anfrage eingegangen:\n\n" + "\n".join(f"{k}: {v}" for k, v in data.items())

    # SendGrid-Mail erzeugen
    message = Mail(
        from_email=EMAIL_USER,
        to_emails=EMAIL_RECEIVER,
        subject="Neue Bedarfsfeststellung",
        plain_text_content=text
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"E-Mail gesendet, Status: {response.status_code}")
    except Exception as e:
        print("Fehler beim Senden:", e)
        return jsonify({"message": "Fehler beim Senden", "error": str(e)}), 500

    return jsonify({"message": "E-Mail wurde erfolgreich gesendet!"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)


@app.route("/cron")
def cron():
    print("Cronjob wurde ausgelöst")
    return "OK"

