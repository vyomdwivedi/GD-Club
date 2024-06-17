document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const interests = document.getElementById('interests').value;
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            if (users.some(user => user.username === username)) {
                alert('Username already exists. Please choose another one.');
            } else {
                users.push({ email, username, password, interests });
                localStorage.setItem('users', JSON.stringify(users));
                alert('User Registration Successful.');
                displayMembers(); // Update member directory after registration
                window.location.href = 'src\\login.html';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('Login successful.');
                window.location.href = 'home.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }

    // Function to display members from local storage
    function displayMembers() {
        // Get the members array from local storage
        let members = JSON.parse(localStorage.getItem('users')) || [];
        let membersHTML = '';

        // Loop through each member and create HTML for display
        members.forEach(function(member, index) {
            membersHTML += `
                <div class="member">
                    <h3>${member.username}</h3>
                    <p>Email: ${member.email}</p>
                    <p>Interests: ${member.interests}</p>
                </div>
            `;
        });

        // Display the HTML for members
        document.getElementById('members').innerHTML = membersHTML;
    }

    // Call displayMembers() function on page load to show existing members
    displayMembers();
});
