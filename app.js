document.getElementById('calculateLoan').addEventListener('submit', function(e){
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('loadingGif').style.display = 'block';

    setTimeout(calculateResults, 1000);
    // bc form submission, prevent default behavior
    e.preventDefault();
});

function calculateResults(){
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
        document.getElementById('loadingGif').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'block';
    }else{
        document.getElementById('loadingGif').style.display = 'none';
        showErrorMessage('Check Your Numbers Bro');
    }
}

function showErrorMessage(error){
    const createErrorAlert = document.createElement('div');

    createErrorAlert.className = 'w3-margin-top w3-red w3-round w3-padding w3-xlarge createdErrorBox';
    createErrorAlert.appendChild(document.createTextNode(error));

    const errorBox = document.querySelector('.errorMessageBox');
    const errorText = document.querySelector('#errorMessageText');

    errorBox.insertBefore(createErrorAlert, errorText);

    setTimeout(clearErrorMsg, 2000);
}

function clearErrorMsg(){
    document.querySelector('.createdErrorBox').remove();
}
