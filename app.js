document.getElementById('calculateLoan').addEventListener('submit', calculateResults);

function calculateResults(e){
    const amount = document.getElementById('userLoanAmount');
    const interest = document.getElementById('userInterestAmount');
    const years = document.getElementById('userYearsRepaymentAmount');
    const monthlyPayment = document.getElementById('resultMonthlyPaymentAmount');
    const totalPayment = document.getElementById('resultTotalPaymentAmount');
    const totalInterest = document.getElementById('resultTotalInterestAmount');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal ).toFixed(2);
    }else{
        showErrorMessage('Check Your Numbers Bro');
    }

    // bc form submission, prevent default behavior
    e.preventDefault();
}

    function showErrorMessage(error){
        const createErrorAlert = document.createElement('div');

        createErrorAlert.className = 'w3-margin-top w3-red w3-round w3-padding createdErrorBox';
        createErrorAlert.appendChild(document.createTextNode(error));

        const errorBox = document.querySelector('.errorMessageBox');
        const errorText = document.querySelector('#errorMessageText');

        errorBox.insertBefore(createErrorAlert, errorText);

        setTimeout(clearErrorMsg, 3000);
    }

    function clearErrorMsg(){
        document.querySelector('.createdErrorBox').remove();
    }
