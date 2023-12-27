from flask import Flask, render_template, jsonify
from dataclasses import dataclass

app = Flask(__name__)

CREATORS = [{
    "id": 1,
    "name": "Shaun Rodrigues"
}, {
    "id": 2,
    "name": "Chris Ruzario"
}, {
    "id": 3,
    "name": "Colin Pereira"
}]


@dataclass
class Entries1:
  id: int
  username: str
  text: str
  strikes: int


class EntryDatabase:

  def __init__(self):
    self.entries = []

  def add_entry(self, username, text, max_strikes):
    user_entries = [
        entry for entry in self.entries if entry.username == username
    ]
    if len(user_entries) > 0:
      user_entry = user_entries[0]
      if user_entry.strikes < max_strikes:
        user_entry.strikes += 1
        if user_entry.strikes >= max_strikes:
          # Deny access to inputting more text for this username
          pass
    else:
      new_entry = Entry(username, text, 1)
      self.entries.append(new_entry)


class Entries:

  def __init__(self, id, username, text, strikes):
    self.id = id
    self.username = username
    self.text = text
    self.strikes = strikes

  def update_strike(self, new_strike):
    self.strikes += new_strike
    if self.strikes >= 3:
      # Deny access to the text field
      pass


@app.route("/home")
@app.route("/")
def hello_world():
  return render_template("home.html", creators=CREATORS)

@app.route("/api/creators")
def list_creators():
  return jsonify(CREATORS)

@app.route("/mod")
def show_info():
  return render_template("mod.html")

if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=True)
