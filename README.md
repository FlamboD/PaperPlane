# Paper Plane
#### _This application was created by Haroun Mohamed-Fakier for the coding exercise given by AppFactory_

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