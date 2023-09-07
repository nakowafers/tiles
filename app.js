var from;

function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    from = ev.target;
    ev.dataTransfer.setData("text/plain", ev.target.id);
}
function dragover_handler(ev) {
    ev.preventDefault();
}
function drop_handler(ev) {
    let to = ev.target;
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    let nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = Math.random().toString().substring(2, 9);
    nodeCopy.classList.add('cloned');
    nodeCopy.addEventListener('dblclick', function (e) {
        nodeCopy.remove();
    });

    if (to.id == "target") {
        ev.target.appendChild(nodeCopy);
    } else {
        // let CopyTo = to.cloneNode(true);
        let CopyFrom = from.cloneNode(true);
        CopyFrom.classList.add('cloned');
        CopyFrom.addEventListener('dblclick', function (e) {
            CopyFrom.remove();
        });
        to.parentNode.replaceChild(CopyFrom, to);
    }

    ev.dataTransfer.clearData();
}

window.addEventListener('DOMContentLoaded', () => {
    // Get the element by id
    const elements = document.querySelectorAll(".tiles");
    // Add the ondragstart event listener

    elements.forEach(function (tile) {
        tile.addEventListener("dragstart", dragstart_handler);
        tile.addEventListener("dragenter", function (event) {
            // highlight potential drop target when the draggable element enters it
            if (event.target.className == "dropzone") {
                event.target.style.background = "purple";
            }

        }, false);
    });
});

let btn_reset = document.querySelector("#reset-button");

btn_reset.addEventListener('click', function () {
    const elements = document.querySelectorAll(".cloned");

    elements.forEach(function (tile) {
        tile.remove();
    });

});

let levelSelector = document.querySelector(".grade");

levelSelector.addEventListener('change', (ev) => {
    let level = levelSelector.value;
    let tiles_1 = document.querySelectorAll(".level_1")

    if (level == 1) {
        tiles_1.forEach(function (tile) {
            tile.style.display = "flex";
        })
        document.querySelector("html").style.backgroundColor = "#D1907B"
    } else {
        tiles_1.forEach(function (tile) {
            tile.style.display = "none";
        })
        document.querySelector("html").style.backgroundColor = "#82bfe8"
    }



    console.log(level == 1);
})



