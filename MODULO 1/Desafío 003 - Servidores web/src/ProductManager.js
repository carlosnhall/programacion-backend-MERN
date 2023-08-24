import fs from 'fs';

export default class ProductManager {

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

export const productManager = new ProductManager('./products.json');

// Agregar producto 
/*
productManager.addProduct("producto prueba 1", "Este es un producto prueba 1", 100, "Sin imagen", "abc121", 21);
productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 200, "Sin imagen", "abc122", 22);
productManager.addProduct("producto prueba 3", "Este es un producto prueba 3", 300, "Sin imagen", "abc123", 23);
productManager.addProduct("producto prueba 4", "Este es un producto prueba 4", 400, "Sin imagen", "abc124", 24);
productManager.addProduct("producto prueba 5", "Este es un producto prueba 5", 500, "Sin imagen", "abc125", 25);
productManager.addProduct("producto prueba 6", "Este es un producto prueba 6", 600, "Sin imagen", "abc126", 26);
productManager.addProduct("producto prueba 7", "Este es un producto prueba 7", 700, "Sin imagen", "abc127", 27);
productManager.addProduct("producto prueba 8", "Este es un producto prueba 8", 800, "Sin imagen", "abc128", 28);
productManager.addProduct("producto prueba 9", "Este es un producto prueba 9", 900, "Sin imagen", "abc129", 29);
productManager.addProduct("producto prueba 10", "Este es un producto prueba 10", 1000, "Sin imagen", "abc130", 30);
*/