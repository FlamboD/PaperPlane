document.getElementById("body").onclick = onBodyClick;
document.getElementById("message_box_container").style.visibility = "hidden";
setInterval(getMessages, 500);
// setTimeout(getMessages, 5000);