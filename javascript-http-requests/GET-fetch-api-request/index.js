const countriesTable = document.getElementById("countries");

/* Add Event Listeners */
ajaxBtn = document.getElementById("ajax-btn");
ajaxBtn.addEventListener("click", () => {
    deleteRows();
    //countriesTable.style.display = "flex";
    getCountries();
    console.log("AJAX Button Clicked");
});

/* Function to Delete all rows except the table head (Run at every button click to delete old data) */
deleteRows = () => {
    let count = countriesTable.rows.length;
    for(let i = count - 1; i > 0; i--) {
        countriesTable.deleteRow(i);
    }
}

/* METHOD 2 - Using the JavaScript Fetch API that returns a Promise */
/* Using Promises and chaining .then and catching errors with .catch */
const getCountries = () => {
    fetch('https://restcountries.com/v3.1/all/')
    
    /* The response needs to be converted to JSON. */
    .then(countries => {
        while(countries.ok) {
            console.log("Status: 200 - Success");
            return countries.json();
            console.log(countries);
        }
    })
    /* That in turn, returns another promise. */
    .then(countries => {
        let i = 0;
        countries.forEach(country => {
            countriesArray = [];
            const newRow = countriesTable.insertRow();
            const countryIndex = document.createTextNode(`${i + 1}`);
            
            const flagImage = document.createElement('img');
            
            flagImage.src = `${country.flags.png}`;
            const countryName = document.createTextNode(`${country.name.common}`);
            const countryOfficialName = document.createTextNode(`${country.name.official}`);
            
            countriesArray.push(countryIndex);
            countriesArray.push(flagImage);
            countriesArray.push(countryName);
            countriesArray.push(countryOfficialName);
            
            countriesArray.forEach(cellValue => {
                const newCell = newRow.insertCell();
                newCell.appendChild(cellValue);
            });
            i++;
        });

        console.log(countriesArray);
    })
    .catch(error => {
        console.log("Error while fulfilling Promise")
    }); 
}