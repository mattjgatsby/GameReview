const searchForm = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const search = document.querySelector('#form-input').value.trim();
    console.log("search" + search)
    if (search) {
        const response = await fetch('/search', {
            method: "POST",
            body: JSON.stringify({ search }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector(".searchForm").addEventListener("submit", searchForm);