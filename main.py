import json
from datetime import datetime
import random
import sqlite3
import logging

from flask import Flask, request, render_template

app = Flask(__name__)
log = logging.getLogger("werkzeug")
# log.setLevel(logging.ERROR)
sql_path = "messages.sqlite"


@app.route('/', methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/loadMessages", methods=["GET"])
def load_messages():
    ts = request.args["timestamp"]
    data = [
        {
            "id": _[0],
            "content": _[1],
            "userId": _[2],
            "timestamp": _[3]
        } for _ in get_messages_after(ts if ts != "null" else 0)]
    return json.dumps(data)


@app.route("/sendMessage", methods=["POST"])
def send_message():
    message_data = json.loads(request.data)
    add_message(message_data["message"].replace("\n", "<br>"), message_data["userId"])
    return "Success"


def add_message(message, user_id):
    sql = "" \
          "INSERT INTO\n" \
          " messages(id, content, user_id, [timestamp])\n" \
          "VALUES(?, ?, ?, ?)"
    with sqlite3.connect(sql_path) as con:
        con.execute(sql, (random.randint(100000, 999999), message, user_id, datetime.now().timestamp()))
        con.commit()


def get_messages_after(timestamp=0):
    sql = "" \
          "SELECT id, content, user_id, [timestamp] FROM messages " \
          "WHERE [timestamp] > ? " \
          "ORDER BY [timestamp] ASC"

    with sqlite3.connect(sql_path) as con:
        cursor = con.execute(sql, (timestamp,))
        messages = cursor.fetchall()

    return messages


if __name__ == "__main__":
    app.run()
