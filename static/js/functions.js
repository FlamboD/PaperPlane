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

function onBodyClick(event)
{
    let message_box = document.getElementById("message_box_container");
    console.log(!(event.target.id==="side_icon_message" || hasParent(event.target, "message_box_container")))
    if(!(event.target.id==="side_icon_message" || hasParent(event.target, "message_box_container")))
    {
        fadeOut(message_box);
        console.log("Ouch");
    }
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
        }, 999)
    }
}
