class ProductManager {
    static id = 0;
    constructor(title, description, price, thumbnail, stock) {
        this.products = []
        this.code = ProductManager.id++;
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
    }
    addProduct(product) {
        let codeUsed = this.products.some(item => item.code === product.code)

        // agregar un producto
        if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock && !codeUsed) {
            this.products.push({
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
            })
            console.log(`Producto ${product.title} agregado`)
            // console.log('Productos...', this.products)
        } else {
            console.error(`Error: Code repetido. El code ${product.code} ya esta en uso`)
        }
    }
    getProducts() {
        //retornar todos lo productos
        return this.products
    }
    getProductById(id) {
        // retornar el producto que cuente con este id
        let productFound = this.products.find(prod => prod.code === id)
        if (productFound) {
            return productFound
        } else {
            console.error(`no product found with id ${id}`)
        }
    }
}

const gestionProd = new ProductManager()

// Se creará una instancia de la clase “ProductManager”

const prueba = new ProductManager('producto_prueba', 'Este es un producto prueba', 200, 'Sin imagen', 25)
const prueba2 = new ProductManager('producto_prueba2', 'Este es un producto prueba2', 300, 'Sin imagen', 30)

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(gestionProd.getProducts())

// Se llamará al método “addProduct” con los campos:
//title: “producto prueba”
//description:”Este es un producto prueba”
//price:200,
//thumbnail:”Sin imagen”
//code:”abc123”,
//stock:25

gestionProd.addProduct(prueba)

// Repito el objeto para simular error de Code repetido

console.log(gestionProd.addProduct(prueba))

//creo otro objeto para demostrar que no repite id
//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

gestionProd.addProduct(prueba2)

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(gestionProd.getProductById(1))
console.log(gestionProd.getProductById(100))

// Hago uso de la funcion getProducts para ver cuantos productos tengo en el array products
console.table(gestionProd.getProducts())


