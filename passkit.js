// Toggle menu visibility on small screens
document.querySelector('.menu-icon').addEventListener('click', function () {
    document.querySelector('.dropdown-menu').classList.toggle('show');
    });
    
    // Example script for copying password to clipboard
    document.querySelector('.copy-btn').addEventListener('click', function() {
    var password = document.getElementById('password');
    password.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
    });
    
   // Function to generate a random password
document.getElementById('generateBtn').addEventListener('click', generatePassword);
document.getElementById('saveBtn').addEventListener('click', savePassword);

function generatePassword() {
    const length = document.getElementById('length-range').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let characterSet = '';
    if (includeUppercase) characterSet += uppercaseChars;
    if (includeLowercase) characterSet += lowercaseChars;
    if (includeNumbers) characterSet += numberChars;
    if (includeSymbols) characterSet += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    }

    document.getElementById('password').value = password;

    updateStrengthBar(password);
}

new ClipboardJS('#copyBtn').on('success', function(e) {
    showAlert('Password copied to clipboard!');
    e.clearSelection();
}).on('error', function(e) {
    console.error('Failed to copy text: ', e);
});

function savePassword() {
    showAlert('Password saved successfully!');
}

function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.backgroundColor = 'rgba(144, 238, 144, 0.7)';
    alertBox.style.padding = '15px';
    alertBox.style.borderRadius = '10px';
    alertBox.style.textAlign = 'center';
    alertBox.style.width = '230px';
    alertBox.style.height = '230px';
    alertBox.style.display = 'flex';
    alertBox.style.justifyContent = 'center';
    alertBox.style.alignItems = 'center';
    alertBox.style.color = '#006400';
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        document.body.removeChild(alertBox);
    }, 2000);
}

function updateStrengthBar(password) {
    const strengthBar = document.getElementById('strength-bar');
    let strength = 0;

    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[\W]/.test(password)) strength += 25;

    strengthBar.value = strength;
}
   
   function updateStrengthBar(password) {
       const strengthBar = document.getElementById('strength-bar');
       let strength = 0;
   
       if (/[A-Z]/.test(password)) strength += 25;
       if (/[a-z]/.test(password)) strength += 25;
       if (/[0-9]/.test(password)) strength += 25;
       if (/[\W]/.test(password)) strength += 25;
   
       strengthBar.value = strength;
   }
   new ClipboardJS('#copyBtn').on('success', function(e) {
    showAlert('Password copied to clipboard!');
    e.clearSelection();
}).on('error', function(e) {
    console.error('Failed to copy text: ', e);
});

// Initial Data
const breachData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Breaches Due to Weak Passwords',
        data: [30, 20, 15, 25, 35, 40],
        borderColor: '#f44336',
        fill: true,
        backgroundColor: 'rgba(244, 67, 54, 0.3)',
    }]
};

const secureData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Secure Accounts (No Breaches)',
        data: [70, 80, 85, 75, 65, 60],
        borderColor: '#4caf50',
        fill: true,
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
    }]
};


const ctx = document.getElementById('securityChart').getContext('2d');
let currentChart = new Chart(ctx, {
    type: 'line',
    data: breachData,
    options: {
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        },
        elements: {
            line: {
                tension: 0.4
            }
        }
    }
});


setInterval(() => {
    if (currentChart.data.datasets[0].label === 'Breaches Due to Weak Passwords') {
        currentChart.data = secureData;
    } else {
        currentChart.data = breachData;
    }
    currentChart.update();
}, 5000);
document.querySelectorAll('.faq-box').forEach(box => {
    box.addEventListener('click', () => {
        box.classList.toggle('open');
    });
});
document.getElementById('saveBtn').addEventListener('click', function () {
    const password = document.getElementById('password').value;
    if (password) {
        // Save the password to localStorage
        let savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        savedPasswords.push(password);
        localStorage.setItem('passwords', JSON.stringify(savedPasswords));
        
        alert('Password saved successfully!');
    } else {
        alert('Please generate a password first.');
    }
});
