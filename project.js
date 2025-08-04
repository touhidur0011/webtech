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
        if (confirm('Are you sure you want to reset the form?')) {
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
        