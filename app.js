function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
}
function dragover_handler(ev) {
    ev.preventDefault();
}
function drop_handler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    let nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = Math.random().toString().substring(2, 9);
    nodeCopy.classList.add('cloned');
    nodeCopy.addEventListener('dblclick', function (e) {
        nodeCopy.remove();
    });

    if (ev.target.id == "target") {
        ev.target.appendChild(nodeCopy);
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
            console.log("hey");
            tile.style.display = "flex";
        })
    } else {
        tiles_1.forEach(function (tile) {
            console.log("hey");
            tile.style.display = "none";
        })
    }



    console.log(level == 1);
})



