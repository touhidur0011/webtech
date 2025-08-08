document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const resetButton = document.querySelector('input[type="reset"]');
    const submitButton = document.querySelector('input[type="submit"]');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            alert('Form is valid! Ready to submit.');
        }
    });
    
    resetButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
            resetForm();
        }
    });
    
    function validateForm() {
        clearAllErrors();
        let isValid = true;
        
        const requiredFields = [
            { id: 'first-name', name: 'First Name' },
            { id: 'last-name', name: 'Last Name' },
            { id: 'address1', name: 'Address 1' },
            { id: 'city', name: 'City' },
            { id: 'state', name: 'State' },
            { id: 'zip-code', name: 'Zip Code' },
            { id: 'country', name: 'Country' },
            { id: 'email', name: 'Email' }
        ];
        
        requiredFields.forEach(field => {
            const element = document.getElementById(field.id);
            if (!element.value.trim() || (element.tagName === 'SELECT' && element.selectedIndex === 0)) {
                showError(field.id, `${field.name} is required`);
                isValid = false;
            }
        });
        
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() && !emailPattern.test(email.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        const zipCode = document.getElementById('zip-code');
        const zipPattern = /^\d{5}(-\d{4})?$/;
        if (zipCode.value.trim() && !zipPattern.test(zipCode.value)) {
            showError('zip-code', 'Please enter a valid zip code (12345 or 12345-6789)');
            isValid = false;
        }
        
        const phone = document.getElementById('phone');
        if (phone.value.trim()) {
            const cleanPhone = phone.value.replace(/\D/g, '');
            if (cleanPhone.length < 10) {
                showError('phone', 'Please enter a valid phone number (at least 10 digits)');
                isValid = false;
            }
        }
        
        const donationRadios = document.querySelectorAll('input[name="donation_amount"]');
        const isAnyRadioSelected = Array.from(donationRadios).some(radio => radio.checked);
        
        if (!isAnyRadioSelected) {
            showError('donation-amount', 'Please select a donation amount');
            isValid = false;
        } else {
            const otherRadio = document.getElementById('other');
            const otherAmountInput = document.querySelector('input[name="other_amount"]');
            
            if (otherRadio.checked) {
                const otherAmount = parseFloat(otherAmountInput.value);
                if (!otherAmountInput.value.trim() || isNaN(otherAmount) || otherAmount <= 0) {
                    showError('other-amount', 'Please enter a valid donation amount');
                    isValid = false;
                }
            }
        }
        
        const recurringCheckbox = document.getElementById('recurring');
        if (recurringCheckbox.checked) {
            const ccAmountInput = document.querySelector('input[name="cc_amount"]');
            const ccMonthsInput = document.querySelector('input[name="cc_months"]');
            
            const ccAmount = parseFloat(ccAmountInput.value);
            const ccMonths = parseInt(ccMonthsInput.value);
            
            if (!ccAmountInput.value.trim() || isNaN(ccAmount) || ccAmount <= 0) {
                showError('cc-amount', 'Please enter a valid monthly amount for recurring donation');
                isValid = false;
            }
            
            if (!ccMonthsInput.value.trim() || isNaN(ccMonths) || ccMonths <= 0 || ccMonths > 60) {
                showError('cc-months', 'Please enter a valid number of months (1-60)');
                isValid = false;
            }
        }
        
        if (!isValid) {
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        return isValid;
    }
    
    function resetForm() {
        form.reset();
        clearAllErrors();
        
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });
        
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.backgroundColor = '';
        });
        
        showSuccessMessage('Form has been reset successfully!');
        console.log('Form reset completed');
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        
        if (!field) {
            if (fieldId === 'donation-amount') {
                const radioGroup = document.querySelector('.radio-group');
                if (radioGroup) {
                    addErrorMessage(radioGroup, message);
                }
            } else if (fieldId === 'other-amount') {
                const otherInput = document.querySelector('input[name="other_amount"]');
                if (otherInput) {
                    addErrorMessage(otherInput.parentElement, message);
                    otherInput.style.borderColor = 'red';
                }
            } else if (fieldId === 'cc-amount') {
                const ccInput = document.querySelector('input[name="cc_amount"]');
                if (ccInput) {
                    addErrorMessage(ccInput.parentElement, message);
                    ccInput.style.borderColor = 'red';
                }
            } else if (fieldId === 'cc-months') {
                const monthsInput = document.querySelector('input[name="cc_months"]');
                if (monthsInput) {
                    addErrorMessage(monthsInput.parentElement, message);
                    monthsInput.style.borderColor = 'red';
                }
            }
            return;
        }
        
        field.style.borderColor = 'red';
        field.style.backgroundColor = '#ffe6e6';
        addErrorMessage(field.parentElement, message);
    }
    
    function addErrorMessage(container, message) {
        const existingError = container.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '2px';
        errorDiv.style.fontWeight = 'bold';
        errorDiv.textContent = message;
        container.appendChild(errorDiv);
    }
    
    function clearAllErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.style.backgroundColor = '';
        });
        
        const successMessages = document.querySelectorAll('.success-message');
        successMessages.forEach(success => success.remove());
    }
    
    function showSuccessMessage(message) {
        const existingSuccess = document.querySelectorAll('.success-message');
        existingSuccess.forEach(success => success.remove());
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.color = 'green';
        successDiv.style.fontSize = '14px';
        successDiv.style.fontWeight = 'bold';
        successDiv.style.textAlign = 'center';
        successDiv.style.padding = '10px';
        successDiv.style.backgroundColor = '#e6ffe6';
        successDiv.style.border = '1px solid green';
        successDiv.style.borderRadius = '5px';
        successDiv.style.margin = '10px 0';
        successDiv.textContent = message;
        
        form.insertBefore(successDiv, form.firstChild);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            animation: shake 0.5s ease-in-out;
        }
        
        .success-message {
            animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        input:focus, select:focus, textarea:focus {
            outline: 2px solid #4CAF50;
            border-color: #4CAF50 !important;
            background-color: #f0fff0 !important;
        }
        
        input[style*="border-color: red"], select[style*="border-color: red"] {
            box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
            50% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.8); }
            100% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
        }
        
        .button-group input {
            margin: 5px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        
        input[type="reset"] {
            background-color: #f44336;
            color: white;
        }
        
        input[type="reset"]:hover {
            background-color: #d32f2f;
        }
        
        input[type="submit"] {
            background-color: #4CAF50;
            color: white;
        }
        
        input[type="submit"]:hover {
            background-color: #45a049;
        }
    `;
    document.head.appendChild(style);
});