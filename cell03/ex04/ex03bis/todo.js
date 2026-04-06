$(document).ready(function() {
  
  function saveData() {
    const listItems = [];
    
    $("#myUL li").each(function() {
      const text = $(this).contents().not($(this).children()).text().trim();
      listItems.push({
        text: text,
        checked: $(this).hasClass("checked")
      });
    });

    localStorage.setItem("todoList", JSON.stringify(listItems));
  }

  function loadList() {
    const saved = localStorage.getItem("todoList");
    const $ul = $("#myUL");

    if (saved) {
      $ul.empty(); 
      const items = JSON.parse(saved);

      items.forEach(item => {
        const $li = $("<li>").text(item.text);
        if (item.checked) $li.addClass("checked");
        addCloseButton($li);
        $ul.append($li);
      });
    } else {
      $("#myUL li").each(function() {
        addCloseButton($(this));
      });
      saveData();
    }
  }

  function addCloseButton($li) {
    const $span = $("<span>").text("\u00D7").addClass("close");
    
    $span.on("click", function(e) {
      e.stopPropagation();
      $li.remove();
      saveData();
    });

    $li.append($span);
  }

  // 4. Toggle checked status
  $("#myUL").on("click", "li", function() {
    $(this).toggleClass("checked");
    saveData();
  });

  window.newElement = function() {
    const $input = $("#myInput");
    const value = $input.val().trim();

    if (value === "") {
      alert("You must write something!");
      return;
    }

    const $li = $("<li>").text(value);
    addCloseButton($li);
    $("#myUL").append($li);
    
    $input.val("");
    saveData();
  };

  loadList();
});