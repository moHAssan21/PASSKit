
document.querySelector('.menu-icon').addEventListener('click', function () {
    document.querySelector('.dropdown-menu').classList.toggle('show');
    });
    

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password-input');
    const togglePassword = document.querySelector('.toggle-password');

    togglePassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.classList.remove('show');
            togglePassword.classList.add('hide');
        } else {
            passwordInput.type = 'password';
            togglePassword.classList.remove('hide');
            togglePassword.classList.add('show');
        }
    });

    document.querySelector('.delete-icon').addEventListener('click', function() {
        passwordInput.value = '';
    });

    document.querySelector('.copy-icon').addEventListener('click', function() {
        navigator.clipboard.writeText(passwordInput.value)
            .then(() => alert('Password copied to clipboard!'))
            .catch(err => console.error('Failed to copy text: ', err));
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const passwordContainer = document.querySelector('.password-container');
    const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];

    savedPasswords.forEach((password, index) => {
        const passwordElement = document.createElement('div');
        passwordElement.className = 'password-item';

        passwordElement.innerHTML = `
            <input type="password" value="${password}" readonly class="password-field">
            <button class="btn eye-btn" id="toggle-${index}"><i class="fas fa-eye-slash"></i></button>
            <button class="btn copy-btn" id="copy-${index}"><i class="fas fa-copy"></i></button>
            <button class="btn delete-btn" id="delete-${index}"><i class="fas fa-trash"></i></button>
        `;

        // Append the password element to the container
        passwordContainer.appendChild(passwordElement);

        // Toggle password visibility
        const toggleBtn = document.getElementById(`toggle-${index}`);
        const passwordField = passwordElement.querySelector('.password-field');

        toggleBtn.addEventListener('click', function () {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
            } else {
                passwordField.type = 'password';
                toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
            }
        });

        // Copy password to clipboard
        const copyBtn = document.getElementById(`copy-${index}`);
        copyBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(passwordField.value).then(() => {
                alert('Password copied to clipboard!');
            });
        });

        // Delete the password
        const deleteBtn = document.getElementById(`delete-${index}`);
        deleteBtn.addEventListener('click', function () {
            savedPasswords.splice(index, 1); 
            localStorage.setItem('passwords', JSON.stringify(savedPasswords)); 
            passwordElement.remove(); 
        });
    });
});
function analyzePasswords() {
    const passwords = document.querySelectorAll('.password-container input[type="text"]');
    const analysisContainer = document.getElementById('analysisContainer');
    const noPasswordsMessage = document.getElementById('noPasswordsMessage');

    analysisContainer.innerHTML = ''; 

    if (passwords.length === 0) {
        noPasswordsMessage.style.display = 'block';
    } else {
        noPasswordsMessage.style.display = 'none';
        passwords.forEach(passwordField => {
            const password = passwordField.value;
            let strength = 'Weak';
            let tips = 'Consider adding numbers and special characters for stronger passwords.';

            if (password.length > 8) {
                strength = 'Medium';
            }
            if (password.length > 12 && /[\d]/.test(password) && /[!@#$%^&*]/.test(password)) {
                strength = 'Strong';
                tips = 'Your password is strong and secure.';
            }

            const resultDiv = document.createElement('div');
            resultDiv.className = 'analysis-result';

            resultDiv.innerHTML = `
                <p>Password: ${password}</p>
                <p>Password Strength: <span class="passwordStrength">${strength}</span></p>
                <p class="securityTips">${tips}</p>
            `;

            analysisContainer.appendChild(resultDiv);
        });
    }
}

// Call the function to analyze passwords when the page loads
window.onload = analyzePasswords;
