window.onload = () =>{ // make sure the page is loaded before executing js to prevent errors with getelementbyIDs
    document.getElementById("fontSizeInc1").addEventListener("click", () =>{ // changes the font sizes if buttons are clicked
        document.body.style.fontSize = "16px";
        document.querySelectorAll('label').forEach(label => label.style.fontSize = '20px'); // changes the font size of labels which changes the buttons mainly
        if(window.location.href.includes("success.html")){ // if on the success page then 
            document.getElementById("additionalText").style.fontSize = "10px";
        }
        if(window.location.href.includes("pay.html")){ // if on the pay page then
            document.getElementById("submit").style.padding = "1px";
            document.getElementById("submit").style.fontSize = "16px";
        }
    })
    document.getElementById("fontSizeInc2").addEventListener("click", () =>{
        document.body.style.fontSize = "20px";
        document.querySelectorAll('label').forEach(label => label.style.fontSize = '22.5px');
        if(window.location.href.includes("success.html")){
            document.getElementById("additionalText").style.fontSize = "16px";
        }
        if(window.location.href.includes("pay.html")){
            document.getElementById("submit").style.padding = "2.5px";
            document.getElementById("submit").style.fontSize = "20px";
        }
    })
    document.getElementById("fontSizeInc3").addEventListener("click", () =>{
        document.body.style.fontSize = "25px";
        document.querySelectorAll('label').forEach(label => label.style.fontSize = '25px');
        if(window.location.href.includes("success.html")){
            document.getElementById("additionalText").style.fontSize = "16px";
        }
        if(window.location.href.includes("pay.html")){
            document.getElementById("submit").style.padding = "5px";
            document.getElementById("submit").style.fontSize = "25px";
        }
    })

    document.getElementById("backgroundColour1").addEventListener("click", () =>{ // changes the background colours if buttons are clicked
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        if(window.location.href.includes("pay.html")){
            document.getElementById("paymentFormInputContainer").style.backgroundColor = "lightgrey";
        }
    })
    document.getElementById("backgroundColour2").addEventListener("click", () =>{
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        if(window.location.href.includes("pay.html")){
            document.getElementById("paymentFormInputContainer").style.backgroundColor = "hsl(0,0%,16%)";
        }
    })
    document.getElementById("backgroundColour3").addEventListener("click", () =>{
        document.body.style.backgroundColor = "lightyellow";
        document.body.style.color = "darkblue";
        if(window.location.href.includes("pay.html")){
            document.getElementById("paymentFormInputContainer").style.backgroundColor = "lightyellow";
        }
    })
    document.getElementById("backgroundColour4").addEventListener("click", () =>{
        document.body.style.backgroundColor = "blue";
        document.body.style.color = "orange";
        if(window.location.href.includes("pay.html")){
            document.getElementById("paymentFormInputContainer").style.backgroundColor = "blue";
        }
    })
    const ValidateCardNumber = (cardNumber) =>{ // for validating if card number is correct
        let isValid = true; // the main boolean value for my validation
        if(cardNumber === null || cardNumber === "" || typeof cardNumber != "string"){ // used throughout to check if value to validate is null,empty or not a string
            isValid = false;
        }
        let re = /^(5[1-5][0-9]{14})$/; // regular expresion for card Number to see if it starts with number 5, then has either number 1-5 after that and then any 14 numbers after that totaling 16 digits.
        if(re.test(cardNumber) === false){ // tests the RE against cardNumber
            isValid = false;
        }
        return isValid; // returns the validation function
    }
    const ValidateDate = (Month,Year) =>{
        let isValid = true;
        const date = new Date(); // get the current Date and put in const date
        const currentMonth = date.getMonth() + 1; // use date to give const currentMonth its date value and adds 1 ass getMonth starts at 0
        const currentYear = date.getFullYear().toString().slice(-2); // uses date again to get the currentYear and makes it a string and only gets the last 2 digits to match with the format of the Year variable
        if(Month === null || Month === "" || typeof Month != "string" || Year === null || Year === "" || typeof Year != "string"){ 
            isValid = false;
        }
        if(Year < currentYear){ // check if year is before current year 
            isValid = false;
        } 
        if(Year === currentYear && Month < currentMonth){ // check if the year is current and month is less than current, if not then year must be more than current so true
            isValid = false;
        }
        return isValid;
    }
    const ValidateCVV = (code) =>{
        let isValid = true;
        if(code === null || code === "" || typeof code != "string"){
            isValid = false;
        }
        let re = /^[0-9]{3,4}$/; // this RE checks the security code to see if its any number between 0 and 9 and can be either 3 or 4 digits
        if(re.test(code) === false){
            isValid = false;
        }
        return isValid;
    }
    const paymentForm = document.getElementById("PaymentForm"); // gets the form by id and puts in a const var
    if (paymentForm) { //checks if the form is not null,undefined or false
        document.getElementById("PaymentForm").addEventListener("submit", (e) =>{ // checks if the form has been submited with the button click using an event listener
            e.preventDefault(); // prevents the default submission of the form so that I can validate 
            let cardNumber = document.getElementById("cardNumberInput").value;
            let month = document.getElementById("month").value;
            let year = document.getElementById("year").value;                // creates variables from the form inputs
            let CVV = document.getElementById("CVVInput").value;
            let lastFourDigits = cardNumber.substr(-4); // gets last four digits of the card number to use in the success page

            sessionStorage.setItem('lastFourDigits', lastFourDigits); // saves the last four digits in session storage for success page later

            console.log(ValidateCardNumber(cardNumber));
            console.log(ValidateDate(month,year));          // testing elements to output to console
            console.log(ValidateCVV(CVV));

            if(!ValidateCardNumber(cardNumber) || !ValidateDate(month,year) || !ValidateCVV(CVV)){ // checks if any of the validation checks came through false
                let errorMsg = "Invalid Input Check: " // creates an errorMsg and below is for the building of that message
                if(!ValidateCVV(CVV)){
                    errorMsg += "Security Code, ";
                }
                if(!ValidateCardNumber(cardNumber)){
                    errorMsg += "Card Number, ";
                }
                if(!ValidateDate(month,year)){
                    errorMsg += "Expiry Date, ";
                }
                errorMsg = errorMsg.substr(0, errorMsg.length - 2); // subtracts the last 2 parts of the message which would have been a space and comma 
                errorMsg += "!"; 
                errorMsg += "\nRe-fill in the form"; // new line message on the alert
                alert(errorMsg); // outputs the errorMsg
                return paymentForm.reset(); // resets the form after error message output
            } else{ // if no errors then continues to POST requests
                let data ={ // creates a json of the data 
                    "master_card": cardNumber,
                    "exp_year": year,
                    "exp_month": month,
                    "cvv_code": CVV
                }
                let jsonData = JSON.stringify(data); // puts data into a string
                let url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard"; // url of the destination to send the data
                
                fetch(url, {
                method: 'POST', // creates the POST request 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData // uses the now stringified data as the body of the POST request
                })
                .then(response => { // responses back from the server 
                    const statusCode = response.status; // gets the response code,  checks each response and gives an appropriate alert to the user 
                    if (statusCode >= 100 && statusCode < 200) { //Informational response (1xx)
                        alert('Server Msg: ' + statusCode);
                    } else if (statusCode >= 200 && statusCode < 300) { // Success response (2xx)
                        window.location.href = "success.html"; // redirects to the success page
                    } else if (statusCode >= 300 && statusCode < 400) { // Redirection response (3xx)
                        alert('Server Msg: ' + statusCode);                       
                        return paymentForm.reset();
                    } else if (statusCode >= 400 && statusCode < 500) { // Client error response (4xx)
                        alert('Server Msg: ' + statusCode);                        
                        return paymentForm.reset();
                    } else if (statusCode >= 500 && statusCode < 600) { // Server error response (5xx)
                        alert('Server Msg: ' + statusCode);
                        return paymentForm.reset();
                    } else { //Unknown response category
                        alert('Server Msg: ' + statusCode);
                        return paymentForm.reset();
                    }
                    return response.json();
                })
                .then(data => {
                    if(data.message == 'Thank you for your payment'){ // also checks response if successful
                        window.location.href = "success.html"; // redirects to the success page
                    } else{
                        let errorMsg = "Error server side, please Re-fill in the form"
                        return paymentForm.reset();
                    }
                console.log('Success:', data);
                })
                .catch((error) => { // catches any errors not already caught
                console.error('Error:', error);
                });
            }
        })
    }
    if (window.location.href.includes("success.html")) { // once the success redirect is trigered this code runs -----------
        const lastFourDigits = sessionStorage.getItem('lastFourDigits'); // retrieves the last four digits that were saved to the session storage
        if (lastFourDigits) { // if those digits are not null,empty or false or 0
            document.getElementById("additionalText").innerHTML = "Your credit/debit card number ends in **** **** **** " + lastFourDigits; // alters the string on the success html for the card message
            sessionStorage.removeItem('lastFourDigits'); // removes the stored value from sessionStorage 
        }
    }
}