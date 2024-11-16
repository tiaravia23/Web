document.addEventListener('DOMContentLoaded', () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (document.getElementById('admin-product-list')) {
        if (!sessionStorage.getItem('isAdminLoggedIn')) {
            alert('Anda harus login untuk mengakses halaman ini.');
            window.location.href = 'admin-login.html';
        }
    }

    function displayAdminProducts() {
        const productList = document.getElementById('admin-product-list');
        if (productList) {
            productList.innerHTML = '';
            products.forEach((product, index) => {
                productList.innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Rp ${product.price.toLocaleString()}</p>
                        <button class="delete-btn" data-index="${index}">Hapus Produk</button>
                    </div>
                `;
            });

            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    deleteProduct(index);
                });
            });
        }
    }

    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('product-name').value;
            const price = document.getElementById('product-price').value;
            const imageInput = document.getElementById('product-image');
            const reader = new FileReader();

            if (imageInput.files.length > 0) {
                const imageFile = imageInput.files[0];
                reader.readAsDataURL(imageFile);
                reader.onload = () => {
                    const newProduct = { 
                        name, 
                        price: parseInt(price), 
                        image: reader.result 
                    };
                    products.push(newProduct);
                    localStorage.setItem('products', JSON.stringify(products));

                    alert('Produk berhasil ditambahkan!');
                    productForm.reset();
                    displayAdminProducts();
                };
            } else {
                alert('Silakan pilih gambar.');
            }
        });
    }

    function deleteProduct(index) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Produk berhasil dihapus!');
        displayAdminProducts();
    }

    function displayProducts() {
        const productList = document.getElementById('product-list');
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        if (productList) {
            productList.innerHTML = '';
            products.forEach((product) => {
                productList.innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Rp ${product.price.toLocaleString()}</p>
                    </div>
                `;
            });
        }
    }

    if (document.getElementById('product-list')) {
        displayProducts();
    }

    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const adminCredentials = {
                username: 'admin',
                password: 'hanafi1606'
            };

            if (username === adminCredentials.username && password === adminCredentials.password) {
                sessionStorage.setItem('isAdminLoggedIn', true);
                alert('Login berhasil!');
                window.location.href = 'admin.html';
            } else {
                document.getElementById('error-message').textContent = 'Username atau password salah!';
            }
        });
    }
});
