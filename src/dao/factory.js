import config from "../config/config.js";

let Users;
let Products;
let Carts;
let Tickets;
const persistence = config.persistence;

switch(persistence) {
    case 'MONGO':
        console.log('Trabajando con BDD');
        const mongoose = await import("mongoose");
        await mongoose.connect(config.mongoUrl);
        const { default: UsersMongo } = await import('./dbManager/user.manager.js');
        const { default: ProductsMongo } = await import('./dbManager/products.manager.js');
        const { default: CartsMongo } = await import('./dbManager/carts.manager.js');
        const { default: TicketsMongo } = await import('./dbManager/tickets.manager.js');
        Users = new UsersMongo();
        Products = new ProductsMongo();
        Carts = new CartsMongo();
        Tickets = new TicketsMongo();
        break;
    case 'FILE':
        console.log('Trabajando con FILE SYSTEM');
        const { default: UsersFile } = await import('./fileSystemManagers/user.manager.js');
        const { default: ProductsFile } = await import('./fileSystemManagers/products.manager.js');
        const { default: CartsFile } = await import('./fileSystemManagers/carts.manager.js');
        const { default: TicketsFile } = await import('./fileSystemManagers/tickets.manager.js');
        Users = new UsersFile();
        Products = new ProductsFile();
        Carts = new CartsFile();
        Tickets = new TicketsFile();
        break;
}

export {
    Users,
    Products,
    Carts,
    Tickets
}