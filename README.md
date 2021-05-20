# Paper Plane
#### _This application was created by Haroun Mohamed-Fakier for the coding exercise given by AppFactory_

### Exercise specifications
- Create a Twitter like application where a user may enter messages (where each message is a maximum of 140 characters long) and the messages are displayed on screen.
- New messages should be displayed on the screening using Ajax, not a refresh of the entire page.
- The application must be implemented using the Python Flask web framework and a SQLite database.
- You do not need to implement user authentication.

### What we’re looking for:
- A solution that works and demonstrates the ability to enter a status and persist it in the database. A basic user interface is expected, however if time permits, you can enhance the aesthetics and make it visually appealing.
- Good coding practices.
- Remember this is a test of your abilities and therefore must be your work only.
- A well formatted README file in the GitHub repository with a description of how the application works, how the components fit together and instructions of how to run the application.

### How the application works

Paper Plane allows you to enter a message into the message box. 
Once you send the message it shows up on the timeline without needing to refresh the page.

![Message icon](https://imgur.com/hQBgLVe.png)

Click on the message icon.



![Enter and send message](https://imgur.com/c7wSJrj.png)

Enter a message and click send.



![Timeline](https://imgur.com/xW60q9w.png)

The message will show up on the timeline.



### How the components fit together
1. I used HTML and CSS to create the page.
2. I used JavaScript to hide/show the message box and to send/retrieve messages from the server.
3. Any messages created after the latest shown message will appear on the timeline.
4. When the server receives a message, it gives it a unique id and inserts it into the sqlite database with the current time.

### How to run the application
Clone this repository to your machine ([guide](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository))

If you haven't already, [install python](https://www.python.org/downloads/) ([guide](https://phoenixnap.com/kb/how-to-install-python-3-windows))

Open your terminal and navigate to the root folder of this project.

Enter the command `python -m pip install -r requirements.txt`

Then enter the command ``python main.py``

Go to [localhost:2727](http://localhost:2727/) in your browser to use the application.
