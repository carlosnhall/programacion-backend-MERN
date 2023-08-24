const socket = io();

// Crear Productos
const form = document.getElementById('form');
const titleInput = document.getElementById('titleInput');
const priceInput = document.getElementById('priceInput');
const stockInput = document.getElementById('stockInput');
const descripInput = document.getElementById('descripInput');
const thumbnailInput = document.getElementById('thumbnailInput');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        title: titleInput.value,
        price: priceInput.value,
        stock: stockInput.value,
        description: descripInput.value,
        thumbnail: thumbnailInput.value
    };

    socket.emit('newProduct', newProduct);

    form.reset();
});

// Cargar productos
socket.on('products', (products) => {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
  
    products.forEach((product) => {
        const productCard = `
        <div class="card mb-3">
            <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${product.thumbnail}" class="img-fluid rounded-start" alt="${product.description}">
                    </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">$${product.price}</p>
                        <p class="card-text">ID: ${product.id}</p>
                        <p class="card-text">Stock: ${product.stock}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        productsContainer.innerHTML += productCard;
    });
});

// Eliminar productos:
const deleteForm = document.getElementById('deleteForm');
const idInput = document.getElementById('idInput');
const deleteInput = document.getElementById('deleteInput');

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('deleteProduct', idInput.value);

    deleteForm.reset();
});


