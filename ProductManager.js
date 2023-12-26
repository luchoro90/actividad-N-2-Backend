import { promises as fs } from "fs"

class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.products = [];
    };

    static id = 0

    addProduct = async (title, description, price, image, code, stock) => {

        ProductManager.id++;

        let newProduct = {

            title,
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id,
        }

        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {

        let respuesta = await fs.readFile(this.patch, "utf-8");
        return JSON.parse(respuesta)
    };

    getProducts = async () => {

        let respuesta2 = await this.readProducts();
        return console.log(respuesta2);
    };

    getProductsById = async (id) => {

        let respuesta3 = await this.readProducts();

        if (!respuesta3.find((product) => product.id == id)) {

            console.log("PRODUCTO NO ENCONTRADO")
        } else {
            console.log(respuesta3.find((product) => product.id == id));
        }

    };

    updateProducts = async ({ id, ...producto }) => {

        await this.deleteProductsById(id);
        let productOLD = await this.readProducts();
        let productsMODIF = [{ ...producto, id }, ...productOLD];
        await fs.writeFile(this.patch, JSON.stringify(productsMODIF));
    };

    deleteProductsById = async (id) => {

        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter((products) => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("PRODUCTO ELIMINADO");
    };

}

const productos = new ProductManager()


//TESTING

//AÑADIR PRODUCTOS
  productos.addProduct("reel Beast", "4 rulemanes manija izq o der", 1200, "imagenREEL", "cod 1", 15);
  productos.addProduct("caña de pescar", "2 tramos total de 1,80m", 800, "imagenCAÑA", "cod 2", 25);
  productos.addProduct("Titulo3", "Description3", "9999", "thumbnail3", "cod 3", "stock3");


//OBTENER PRODUCTOS
productos.getProducts()


//OBTENER PRODUCTOS POR ID
productos.getProductsById(4)


//ELIMINAR PRODUCTO POR ID
productos.deleteProductsById(3)

//ACTUALIZAR PRODUCTO POR ID
productos.updateProducts({
title:'Titulo3',
description:'Descripton3',
price:'3240',
image:'Image3',
code:'cod 3',
stock:'15',
id:'3',
})

//ELIMINAR PRODUCTO POR ID
productos.deleteProductsById(3)

