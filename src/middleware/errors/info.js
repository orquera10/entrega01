export const generateProductErrorInfo = (product) => {
    return `One or more properties were imcomplete or not valid.
    List of required properties:
    * title: needs to be a string, received ${product.title}
    * description: needs to be a string, received ${product.description}
    * code: needs to be a string, received ${product.code}
    * price: needs to be a Number, received ${product.price}
    * category: needs to be a string, received ${product.category}
    * stock: needs to be a Number, received ${product.stock}
    `
}