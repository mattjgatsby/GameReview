const searchFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const search = document.querySelector('#form-input').value.trim();

    if(search) {
        const response = await fetch('/games/:id', {
            method: "GET",
            body: JSON.stringify({search}),
            headers: {"Content-Type": "application/json"}
        })

        if(response.ok) {
            document.location.replace('/')
        }
    }
};