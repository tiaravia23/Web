document.addEventListener('DOMContentLoaded', () => {
    const adminCredentials = {
        username: 'tiara',
        password: 'siskom23' // Ganti dengan password yang lebih aman
    };

    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === adminCredentials.username && password === adminCredentials.password) {
                sessionStorage.setItem('isAdminLoggedIn', true);
                alert('Login berhasil!');
                window.location.href = 'admin.html'; // Arahkan ke halaman admin
            } else {
                document.getElementById('error-message').textContent = 'Username atau password salah!';
            }
        });
    }
});
