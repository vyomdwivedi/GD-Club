document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const interests = document.getElementById('interests').value;
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            if (users.some(user => user.username === username)) {
                alert('Username already exists. Please choose another one.');
            } else {
                users.push({ username, email, password, interests });
                localStorage.setItem('users', JSON.stringify(users));
                alert('User Registration Successful.');
                window.location.href = 'src/login.html';
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

    document.getElementById('createEvent').addEventListener('click', () => {
        const index = document.getElementById('createEvent').getAttribute('data-index');
        const title = document.getElementById('event-title').value;
        const date = document.getElementById('event-date').value;
        const description = document.getElementById('event-description').value;

        let events = JSON.parse(localStorage.getItem('events')) || [];

        if (index === null) {
            // Create new event
            const event = {
                title: title,
                date: date,
                description: description
            };
            events.push(event);
        } else {
            // Update existing event
            events[index] = {
                title: title,
                date: date,
                description: description
            };
        }

        localStorage.setItem('events', JSON.stringify(events));
        displayEvents();

        // Reset form
        document.getElementById('createEvent').textContent = 'Create Event';
        document.getElementById('createEvent').removeAttribute('data-index');
        document.getElementById('event-title').value = '';
        document.getElementById('event-date').value = '';
        document.getElementById('event-description').value = '';
    });

    function displayEvents() {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        let eventsHTML = '';

        events.forEach(function(event, index) {
            eventsHTML += `
                <div class="card">
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Description:</strong> ${event.description}</p>
                    <button class="btn edit-event" data-index="${index}">Edit</button>
                    <button class="btn delete-event" data-index="${index}">Delete</button>
                </div>
            `;
        });

        document.getElementById('events').innerHTML = eventsHTML;

        document.querySelectorAll('.edit-event').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const event = events[index];
                document.getElementById('event-title').value = event.title;
                document.getElementById('event-date').value = event.date;
                document.getElementById('event-description').value = event.description;
                document.getElementById('createEvent').textContent = 'Update Event';
                document.getElementById('createEvent').setAttribute('data-index', index);
            });
        });

        document.querySelectorAll('.delete-event').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                events.splice(index, 1);
                localStorage.setItem('events', JSON.stringify(events));
                displayEvents();
            });
        });
    }

    displayEvents();

    function displayMembers() {
        const members = JSON.parse(localStorage.getItem('users')) || [];
        let membersHTML = '';

        members.forEach(member => {
            membersHTML += `
                <div class="member">
                    <h3>${member.username}</h3>
                    <p><strong>Email:</strong> ${member.email}</p>
                    <p><strong>Interests:</strong> ${member.interests}</p>
                </div>
            `;
        });

        document.getElementById('member-list').innerHTML = membersHTML;
    }

    displayMembers();
});
