from flask import Flask, render_template

app = Flask(__name__)

CREATORS=[
  {
    "id":1,
    "name":"Shaun Rodrigues"
  },
  {
    "id":2,
    "name":"Chris Ruzario"
  },
  {
  "id":3,
  "name":"Colin Pereira"
  }
]

@app.route("/")
def hello_world():
  return render_template("home.html",creators=CREATORS)


if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=True)
