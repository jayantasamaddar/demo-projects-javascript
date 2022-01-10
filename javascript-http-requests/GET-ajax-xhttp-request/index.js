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


/* METHOD 1 - Using AJAX to send requests to a public API library */
/* OLD TECHNIQUE */
const getCountries = () => {
    let xhr = new XMLHttpRequest();
    
    /* Declare the Request Method */
    xhr.open('GET','https://restcountries.com/v3.1/all',true);

    /* Initialize the Request */
    xhr.onload = function() {
        if(xhr.status != 200) {
            console.log(`Request could not be fetched. Status: ${xhr.status} - ${xhr.statusText}`)
        } else {
            console.log("Status: 200 - Success");
            const countries = JSON.parse(this.response);
            
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
            //console.log(countriesArray);
            return countriesArray;
        }
    }
    /* Send the request */
    xhr.send();
}