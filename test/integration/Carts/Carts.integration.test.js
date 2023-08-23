import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8081');

describe('Testing de carts', () => {
    let cookie;
    before(async () => {
        const credentialsMock = {
            email: 'orquera10@gmail.com',
            password: '1234'
        };

        const loginResult = await requester.post('/api/users/login').send(credentialsMock);
        const cookieResult = loginResult.headers['set-cookie'][0];

        expect(cookieResult).to.be.ok;

        const cookieResultSplit = cookieResult.split('=');

        cookie = {
            name: cookieResultSplit[0],
            value: cookieResultSplit[1]
        };
    });

    it('POST de /api/carts debe crear un cart correctamentte y comprobar que tenga un array de products vacio', async () => {

        const { statusCode, _body } = await requester.post('/api/carts').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
        expect(_body.data).to.have.property('_id');
        expect(Array.isArray(_body.data.products)).to.be.eql(true);
        expect(_body.data.products).to.be.eql([]);
    });

    it('GET de /api/carts se debe corroborrar que se obtenga correctamente la información de un carrito', async () => {

        const { _body } = await requester.post('/api/carts').set('Cookie', [`${cookie.name}=${cookie.value}`]);

        const id = _body.data._id;

        const putResult = await requester.get(`/api/carts/${id}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(putResult.statusCode).to.be.eql(200);
    });

    it('POST de /api/carts/:cid/products/:pid se debe corroborrar que un producto se agregue correctamente a un carrito', async () => {
        
        const _bodyCart = await requester.post('/api/carts').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const cid = _bodyCart._body.data._id;

        const productMock = {
            title: "producto prueba dario",
            description: "Este es un producto de prueba",
            price: 200,
            code: "abc133847586885",
            category: "food",
            stock: 25
        };
        const _bodyProduct = await requester.post('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]).send(productMock);
        const pid = _bodyProduct._body.data._id;

        const putResult = await requester.post(`/api/carts/${cid}/product/${pid}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(putResult.statusCode).to.be.eql(200);
    });
});