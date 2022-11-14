const searchForm = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const search = document.querySelector('#form-input').value.trim();
    console.log("search" + search)
    if (search) {
        const response = await fetch(`/search?gametitle=${search}`, {
            method: "GET",
            // body: JSON.stringify({ search }),
            headers: { "Content-Type": "application/json" }

        })
            .then((results) => {
                // console.log(response);
                return results.json();
            })
            .then((resultsData) => {
                console.log("MEow", resultsData);
                displayGameInfo();
                // localStorage.setItem('game', JSON.stringify(results))
                // document.location.replace("/gameInfo")

            })
        // .catch((err) => {
        //     console.log(err);
        // })


    }
};

function displayGameInfo() {

}

document.querySelector(".searchForm").addEventListener("submit", searchForm);