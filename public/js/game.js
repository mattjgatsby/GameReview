const searchForm = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const search = document.querySelector("#form-input").value.trim();
  console.log("search" + search);
  if (search) {
    const response = await fetch(`/search?gametitle=${search}`, {
      method: "GET",
      // body: JSON.stringify({ search }),
      headers: { "Content-Type": "application/json" },
    })
      .then((results) => {
        // console.log(response);
        return results.json();
      })
      .then((resultsData) => {
        console.log("MEow", resultsData);
        displayGameInfo(resultsData);
        // localStorage.setItem('game', JSON.stringify(results))
        // document.location.replace("/gameInfo")
      });
    // .catch((err) => {
    //     console.log(err);
    // })
  }
};

function displayGameInfo(gameData) {
  let gameTitle = document.getElementById("game-title");
  let gameDescription = document.getElementById("game-description");
  let gameImage = document.getElementById("game-image");
  gameTitle.textContent = gameData.slug;
  gameDescription.textContent = gameData.game_description;
  gameImage.setAttribute("src", gameData.background_image);
}

document.querySelector(".searchForm").addEventListener("submit", searchForm);
