let cars = [
    { brand: 'Toyota', model: 'Corolla', year: 2020 },
    { brand: 'Honda', model: 'Civic', year: 2019 },
    { brand: 'Ford', model: 'Mustang', year: 2021 },
];

let cart = [];

function displayCars(filteredCars) {
    const carList = document.getElementById('car-list');
    carList.innerHTML = ''; 

    filteredCars.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.className = 'car';
        carDiv.innerHTML = `<strong>${car.brand}</strong> - ${car.model} (${car.year}) 
                            <button onclick="addToCart('${car.brand}', '${car.model}', ${car.year})">Añadir al Carrito</button>`;
        carList.appendChild(carDiv);
    });
}

function loadCars() {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
        cars = JSON.parse(storedCars);
    }
    displayCars(cars);
}

function saveCars() {
    localStorage.setItem('cars', JSON.stringify(cars));
    alert('Autos guardados en el almacenamiento local.');
}

function addToCart(brand, model, year) {
    const car = { brand, model, year };
    cart.push(car);
    displayCart();
}

function displayCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; 

    cart.forEach((car, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `<strong>${car.brand}</strong> - ${car.model} (${car.year}) 
                                 <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartList.appendChild(cartItemDiv);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function clearCart() {
    cart = [];
    displayCart();
}

function applyFilters() {
    const brandFilter = document.getElementById('brand-filter').value.toLowerCase();
    const modelFilter = document.getElementById('model-filter').value.toLowerCase();

    const filteredCars = cars.filter(car => {
        const matchesBrand = car.brand.toLowerCase().includes(brandFilter);
        const matchesModel = car.model.toLowerCase().includes(modelFilter);
        return matchesBrand && matchesModel;
    });

    displayCars(filteredCars);
}

document.getElementById('load-cars').addEventListener('click', loadCars);
document.getElementById('save-cars').addEventListener('click', saveCars);
document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('apply-filters').addEventListener('click', applyFilters);

loadCars();