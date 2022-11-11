$("#searchBtn").on("click", (event) => {
  var storageItem = $("#inputText").val();
  if(storageItem.length > 0) {
    if (!historyArray.includes(storageItem)) {
      historyArray.push(storageItem);
    }
    localStorage.setItem("historyList", JSON.stringify(historyArray));
  }
});

var gameSearch = document.getElementById("inputText");
gameSearch.addEventListener("keypress",function(event) {
  if (event.key === "Enter") {
  event.preventDefault();
  document.getElementById("searchBtn").click();
}
});

var historyArray = JSON.parse(localStorage.getItem("historyList"));




