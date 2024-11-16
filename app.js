document.addEventListener('DOMContentLoaded', () => {
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
});
