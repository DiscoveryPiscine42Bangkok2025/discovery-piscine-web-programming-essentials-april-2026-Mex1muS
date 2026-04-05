function saveToCookie() {
    const listItems = [];
    const lis = document.querySelectorAll("#myUL li");
  
    lis.forEach(li => {
      listItems.push({
        text: li.childNodes[0].nodeValue,
        checked: li.classList.contains("checked")
      });
    });
  
    const expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
  
    document.cookie =
      "todoList=" + encodeURIComponent(JSON.stringify(listItems)) +
      ";expires=" + expires.toUTCString() +
      ";path=/";
  }
  
  function getFromCookie() {
    const name = "todoList=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
  
    for (let c of cookies) {
      c = c.trim();
      if (c.indexOf(name) === 0) {
        return JSON.parse(c.substring(name.length));
      }
    }
    return [];
  }

  function loadList() {
    const items = getFromCookie();
    const ul = document.getElementById("myUL");
  
    ul.innerHTML = ""; 
  
    items.forEach(item => {
      const li = document.createElement("li"); Add
      li.textContent = item.text;
  
      if (item.checked) {
        li.classList.add("checked");
      }
  
      addCloseButton(li);
      ul.appendChild(li);
    });
  }

  function addCloseButton(li) {
    const span = document.createElement("span");
    span.textContent = "\u00D7";
    span.className = "close";
  
    span.onclick = function () {
      li.remove();
      saveToCookie();
    };
  
    li.appendChild(span);
  }
  
  document.querySelector("#myUL").addEventListener("click", function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      saveToCookie();
    }
  });
  
  function newElement() {
    const input = document.getElementById("myInput");
    const value = input.value.trim();
  
    if (value === "") {
      alert("You must write something!");
      return;
    }
  
    const li = document.createElement("li");
    li.textContent = value;
  
    addCloseButton(li);
  
    document.getElementById("myUL").appendChild(li);
    input.value = "";
  
    saveToCookie();
  }
  
  loadList();