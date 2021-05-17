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
        setTimeout(() => {
            elem.style.visibility = "hidden";
        }, 900)
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

function updateFeed(data)
{
    let feed = document.getElementById("feed")
    data.forEach(message => {
        let item = document.createElement("div");
        item.classList.add("feed_item");
        item.setAttribute("messageId", message.id);
        item.setAttribute("userId", message.userId);
        item.setAttribute("timestamp", message.timestamp);
        item.innerHTML = message.content;
        feed.insertAdjacentElement("afterbegin", item);
    });
    data.sort((a, b) => {return a.time > b.time});
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
