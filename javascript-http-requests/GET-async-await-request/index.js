const countriesTable = document.getElementById("countries");

/* Add Event Listeners */
ajaxBtn = document.getElementById("ajax-btn");
ajaxBtn.addEventListener("click", () => {
    deleteRows();
    //countriesTable.style.display = "flex";
    getCountries();
    console.log("AJAX Button Clicked");
});

/* Callback Function to Delete all rows except the table head (Run at every button click to delete old data) */
deleteRows = () => {
    let count = countriesTable.rows.length;
    for(let i = count - 1; i > 0; i--) {
        countriesTable.deleteRow(i);
    }
}

/* METHOD 3 - Using the async function with await */
const countriesData = async () => {
    let countries = await fetch('https://restcountries.com/v3.1/all/x')
    
    /* The response needs to be converted to JSON. */
    console.log(`Status: ${countries.status} - ${countries.statusText}`);
    if(countries.ok) {
        countries = await countries.json();
        console.log(countries);
        return countries;
    }
}
/* Alternative - Single line return without storing in a variable and thus no status log. */
// const countriesData = async () => {
//     return (await fetch('https://restcountries.com/v3.1/all/')).json();
// }

/* Uses the Above async function as a callback function. First allows it to return the countries before executing. */
const getCountries = async () => {
    /* Error handling in async functions can be done with a try-catch block. */
    try {
        countries = await countriesData();
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
            //console.log(countriesArray);
        });
    }
    catch (error) {
        console.log("Error trying to parse JSON!");
    }
}