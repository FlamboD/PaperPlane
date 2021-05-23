var animation;

function onMessageIconClick() {
    let side_icon_message = document.getElementById("side_icon_message");
    let message_box = document.getElementById("message_box_container");
    let rect = side_icon_message.getClientRects()[0];

    message_box.style.left = `${rect.x + rect.width + 5}px`;
    message_box.style.top = `${rect.y + (rect.height/2)}px`;

    if(message_box.style.visibility === "hidden")
        fadeIn(message_box);
    else
        fadeOut(message_box)
}

function onBodyClick(event)
{
    let message_box = document.getElementById("message_box_container");
    if(!(event.target.id==="side_icon_message" || hasParent(event.target, "message_box_container")))
    {
        fadeOut(message_box);
    }
}

function onInputChange()
{
    let input = document.getElementById("message_input");
    let characterCount = document.getElementById("character_count");

    characterCount.innerHTML = `${input.value.length}/${input.maxLength}`;
}

function fadeIn(elem)
{
    if(animation) {
        clearTimeout(animation);
        animation = null;
    }
    if(elem.style.visibility === "hidden")
    {
        elem.style.animation = null;
        elem.style.animation = "fadein 1s";
        elem.style.visibility = "visible";
    }
}

function fadeOut(elem)
{
    if(elem.style.visibility !== "hidden")
    {
        elem.style.animation = null;
        elem.style.animation = "fadeout 1s";
        animation = setTimeout(() => {
            elem.style.visibility = "hidden";
        }, 900);
    }
}

function hasParent(elem, pId)
{
    let isChild = false;

    do
    {
        if(elem.id === pId)
            isChild = true
        elem = elem.parentNode
    } while(elem.parentNode && !isChild)

    return isChild;
}

function getTimeString(_ts)
{
    if(_ts > 60*60*24*365) return "Over a year ago";
    else if(_ts > 60*60*24*30*6) return "At least half a year ago";
    else if(_ts > 60*60*24*30*2) return "A few months ago";
    else if(_ts > 60*60*24*30) return "A month ago";
    else if(_ts > 60*60*24) return `${Math.round(_ts/(60*60*24))} days ago`;
    else if(_ts > 60*60*24) return "A day ago";
    else if(_ts > 60*60*2) return "At least a couple of hours ago. Probably more.";
    else if(_ts > 60*60) return "An hour ago";
    else if(_ts > 60*30) return "Half an hour ago";
    else if(_ts > 60*2) return `${Math.round(_ts/60)} minutes ago`;
    else if(_ts > 60) return "A minute ago";
    else return "A few seconds ago";
}

function updateFeed(data)
{
    let feed = document.getElementById("feed")
    data.forEach(message => {
        let item = document.createElement("div");
        item.classList.add("feed_item");
        item.setAttribute("messageId", message.id);
        item.setAttribute("userId", message.userId);
        item.setAttribute("timestamp", message.timestamp);
        // item.innerHTML = message.content;
        {  // Author
            let _author = document.createElement("span");
            _author.classList.add("author");
            _author.innerHTML = "Skye says:";
            item.insertAdjacentElement("beforeend", _author)
        }
        item.insertAdjacentElement("beforeend", document.createElement("br"));
        {  // Message
            let _message = document.createElement("span");
            _message.innerHTML = message.content;
            item.insertAdjacentElement("beforeend", _message)
        }
        item.insertAdjacentElement("beforeend", document.createElement("br"));
        {  // Timestamp
            let _container = document.createElement("div");
            _container.classList.add("timestamp_container");
            let _timestamp = document.createElement("span");
            _timestamp.classList.add("timestamp")
            let _ts = parseFloat(message.timestamp);
            _timestamp.innerHTML = getTimeString(Math.round(Date.now()/1000 - _ts));
            _container.insertAdjacentElement("beforeend", _timestamp)
            item.insertAdjacentElement("beforeend", _container)
        }
        feed.insertAdjacentElement("afterbegin", item);
    });
    data.sort((a, b) => {return a.time > b.time});

    let feed_items = document.querySelectorAll(".feed_item");
    feed_items.forEach(elem => {
        let _ts = Date.now()/1000 - parseFloat(elem.getAttribute("timestamp"));
        elem.querySelector(".timestamp").innerHTML = getTimeString(_ts);
    });
}

function getMessages()
{
    let timestamp = 0;
    if(document.querySelector(".feed_item"))
        timestamp = parseFloat(document.querySelector(".feed_item").getAttribute("timestamp"));

    const request = new XMLHttpRequest();
    request.open("GET", `/loadMessages?timestamp=${timestamp}`);
    request.onload = function() {
        let data = JSON.parse(request.responseText);
        updateFeed(data);
    }
    request.send();
}

function sendMessage()
{
    let input = document.getElementById("message_input");
    if(input.value.trim().length > 0)
    {
        const request = new XMLHttpRequest();
        request.open("POST", "/sendMessage");
        request.send(JSON.stringify({message: input.value, userId: 2727}));
    }
    input.value = "";
    fadeOut(document.getElementById("message_box_container"));
}
