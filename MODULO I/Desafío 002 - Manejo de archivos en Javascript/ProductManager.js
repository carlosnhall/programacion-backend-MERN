import fs from 'fs';

class ProductManager {

    #products 
    path

    constructor (path){
        this.#products = []
        this.path = path
        this.#loadProducts()
    };

    #loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.#products = JSON.parse(data);
        } catch (err) {
            console.error(`Error al leer el archivo: ${err}`);
            this.#products = [];
        }
    }

    #saveProducts() {
        try {
            const data = JSON.stringify(this.#products, null, 2); 
            fs.writeFileSync(this.path, data);
        } catch (err) {
            console.error(`Error al guardar el archivo: ${err}`);
        }
    }

    getProducts () {
        return this.#products
    };

    getProductById (id) {
        return this.#products.find((product) => product.id === id);
    };

    #areFieldComplete (title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Por favor completa todos los campos");
            return false; 
            
        } else { 
            return true; 
        };
    };

    #isNotDuplicate (code) {
        if(this.#products.find((product) => product.code === code) !== undefined){
            console.error("El codigo ya existe, posible producto duplicado.");
            return false;
        } else {
            return true;
        };
    };

    #idGenerator () {
        let id = 0;
        if(this.#products.length === 0){
            id = 1;
        } else {
            id = this.#products[this.#products.length-1].id + 1;
        };
        return id;
    };

    addProduct (title, description, price, thumbnail, code, stock) {
        
        if(this.#areFieldComplete(title, description, price, thumbnail, code, stock) && this.#isNotDuplicate(code)){
            const newProduct = {
                id: this.#idGenerator(),
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            this.#products.push(newProduct);
            this.#saveProducts();
        };
    };

    updateProduct (id, updatedProduct) {
        const index = this.#products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.#products[index] = {...this.#products[index], ...updatedProduct};
            this.#saveProducts();
        } else {
            console.error(`No se encontró el producto con id ${id}`);
        }
    };

    deleteProduct (id) {
        const index = this.#products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.#products.splice(index, 1);
            this.#saveProducts();
        } else {
            console.error(`No se encontró el producto con id ${id}`);
        }
    };
};

const productManager = new ProductManager('./products.json');

// Agregar producto 
productManager.addProduct("producto prueba 1", "Este es un producto prueba 1", 100, "Sin imagen", "abc121", 25);
console.table(productManager.getProducts());


/* Sacar comentarios para ver mas pruebas

// Eliminar producto
productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 200, "Sin imagen", "abc122", 26);
productManager.deleteProduct(2)
console.table(productManager.getProducts());

// Evitar repetidos
productManager.addProduct("producto prueba 3", "Este es un producto prueba 3", 300, "Sin imagen", "abc123", 27);
productManager.addProduct("producto prueba 3", "Este es un producto prueba 3", 300, "Sin imagen", "abc123", 27);
console.table(productManager.getProducts());

*/

// Actualizar campo de un producto en especifico
//productManager.updateProduct(1, { price: 111 });
//console.table(productManager.getProducts());

// Ver producto por ID
//productManager.getProductById(3);