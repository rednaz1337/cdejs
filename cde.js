let z_indices = new Map();
let min_z_index = 1;
let num_windows = 0;

document.querySelectorAll(".window").forEach(function (item, index) {
  let z = index + min_z_index;
  num_windows += 1;
  z_indices.set(item.id, z);
  item.style.zIndex = z.toString();
  dragElement(item);

    //Every button should propagate the event, so that the window moves to the top
  item.onclick = function() {
      moveToTop(item);
  }
});

function moveToTop(window) {
    let current_z = z_indices.get(window.id);

    z_indices.forEach(function (value, key) {
      if(value > current_z) { // higher than current window, move it down one
        document.getElementById(key).style.zIndex = (value - 1).toString();
        document.getElementById(key).classList.remove("active");
        z_indices.set(key, value - 1);
      }
    });

    window.style.zIndex = num_windows.toString();
    z_indices.set(window.id, num_windows);
    window.classList.add("active");
}

// from W3Schools with functionality added for Touchscreens

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector(`.window#${elmnt.id} .titlebar .title`)) {
    // if present, the header is where you move the DIV from:
    document.querySelector(`.window#${elmnt.id} .titlebar .title`).onmousedown = dragMouseDown;
    document.querySelector(`.window#${elmnt.id} .titlebar .title`).ontouchstart = touchStart;
  }

  function touchStart(e) {
    e.preventDefault();
    console.log("touch start");
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    e.target.ontouchmove = touchDrag;
    e.target.ontouchend = touchEnd;

    // the current window needs to be on top. 
    // The windows above get lowered by one
    moveToTop(elmnt);
    
  }

  function touchDrag(e) {
    e.preventDefault();
    //console.log("Touch dragged!");
    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function touchEnd(e) {
    e.target.ontouchmove = null;
    e.target.ontouchend = null;
    console.log("TOuch end!");
  }



  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    // the current window needs to be on top. 
    // The windows above get lowered by one
    moveToTop(elmnt);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}