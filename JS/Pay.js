window.onload = () =>{
    const ValidateCardNumber = (cardNumber) =>{
        let isValid = true;
        if(cardNumber === null || cardNumber === "" || typeof cardNumber != "string"){
            isValid = false;
        }
        /*let re = /^[a-zA-Z0-9_\-]+@[a-zA-Z_\-]+\.[a-zA-Z]{0,64}$/;
        if(re.test(Email) === false){
            isValid = false;
        }*/
        return isValid;
    }
    const ValidateMonth = (Month) =>{
        let isValid = true;
        if(Month === null || Month === "" || typeof Month != "string"){
            isValid = false;
        }
        return isValid;
    }
    const ValidateYear = (Year) =>{
        let isValid = true;
        if(Year === null || Year === "" || typeof Year != "string"){
            isValid = false;
        }
        return isValid;
    }
    const ValidateCVV = (code) =>{
        let isValid = true;
        if(code === null || code === "" || typeof code != "string" || (code.length != 3 && code.length != 4)){
            isValid = false;
        }/*
        let re = /^[a-zA-Z0-9_\-]+@[a-zA-Z_\-]+\.[a-zA-Z]{0,64}$/;
        if(re.test(Email) === false){
            isValid = false;
        }*/
        return isValid;
    }
    const paymentForm = document.getElementById("PaymentForm");
    if (paymentForm) {
        document.getElementById("PaymentForm").addEventListener("submit", (e) =>{
            e.preventDefault();
            let cardNumber = document.getElementById("cardNumberInput").value;
            let month = document.getElementById("month").value;
            let year = document.getElementById("year").value;
            let CVV = document.getElementById("CVVInput").value;
            let lastFourDigits = cardNumber.substr(-4);

            sessionStorage.setItem('lastFourDigits', lastFourDigits);

            console.log(ValidateCardNumber(cardNumber));
            console.log(ValidateMonth(month));
            console.log(ValidateYear(year));
            console.log(ValidateCVV(CVV));

            if(!ValidateCardNumber(cardNumber) || !ValidateMonth(month) || !ValidateYear(year) || !ValidateCVV(CVV)){
                let errorMsg = "Invalid Input Check: "
                if(!ValidateCVV(CVV)){
                    errorMsg += "Security Code, ";
                }
                if(!ValidateCardNumber(cardNumber)){
                    errorMsg += "Card Number, ";
                }
                if(!ValidateYear(year)){
                    errorMsg += "Expiry Year, ";
                }
                if(!ValidateYear(month)){
                    errorMsg += "Expiry Month, ";
                }
                errorMsg = errorMsg.substr(0, errorMsg.length - 2);
                errorMsg += "!";
                alert(errorMsg);
            }
            //window.location.href = "success.html";
        })
    }

    const lastFourDigits = sessionStorage.getItem('lastFourDigits');
    if (lastFourDigits) {
        document.getElementById("additionalText").innerHTML = "Your credit/debit card number ends in **** **** **** " + lastFourDigits;
        sessionStorage.removeItem('lastFourDigits'); // Clear the stored value from sessionStorage
    }
}