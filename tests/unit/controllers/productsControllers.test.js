const { expect } = require('chai');
const sinon = require('sinon');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');
const { DB_MOCK, DB_INSERT_MOCK } = require('../mock');

describe('CAMADA CONTROLLERS', () => {
  describe('Testa a função "getAll"', () => {
    const req = {};
    const res = {};

    describe('Caso esteja tudo certo', () => {
      before(async () => {
        sinon.stub(productsService, 'getAll').resolves(DB_MOCK);

        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        productsService.getAll.restore();
      });

      it('Envia todos os produtos com um código 200', async () => {
        await productsController.getAll(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(DB_MOCK)).to.be.equal(true);
      });
    });

    describe('Caso ocorra um erro', () => {
      const error = { message: 'Erro interno no servidor' };

      before(async () => {
        sinon.stub(productsService, 'getAll').resolves(error);

        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        productsService.getAll.restore();
      });

      it('Retorna um objeto com a mensagem de erro e com código 500', async () => {
        await productsController.getAll(req, res);

        expect(res.status.calledWith(500)).to.be.equal(true);
        expect(res.json.calledWith(error)).to.be.equal(true);
      });
    });
  });

  describe('Testa a função "getById"', () => {
    const req = {};
    const res = {};

    describe('Caso esteja tudo certo', () => {
      before(async () => {
        sinon.stub(productsService, 'getById').resolves(DB_MOCK[0]);

        req.body = {};
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        productsService.getById.restore();
      });

      it('Envia o produto com o id correto e com um código 200', async () => {
        await productsController.getById(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(DB_MOCK[0])).to.be.equal(true);
      });
    });

    describe('Caso o produto não exista', () => {
      const error = { code: 404, message: 'Product not found' };

      before(async () => {
        sinon.stub(productsService, 'getById').resolves(error);

        req.body = {};
        req.params = { id: 4 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        productsService.getById.restore();
      });

      it('Envia um objeto com a mensagem "Product not found" com um código 404', async () => {
        await productsController.getById(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
        expect(res.json.calledWith({ message: error.message })).to.be.equal(true);
      });
    });
  });

  describe('Testa a função "createProduct"', () => {
    const req = {};
    const res = {};

    describe('Caso esteja tudo certo', () => {
      const [INSERT_RETURN_MOCK] = DB_INSERT_MOCK;
      const servicesReturn = { id: INSERT_RETURN_MOCK.insertId, name: 'teste' };

      before(async () => {

        sinon.stub(productsService, 'createProduct').resolves(servicesReturn);

        req.body = { name: 'teste' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        productsService.createProduct.restore();
      });

      it('Deve enviar um objeto contendo as chaves "id" e "name", retornando o código 201', async () => {
        const EXPECTED_JSON = {
          id: INSERT_RETURN_MOCK.insertId,
          name: servicesReturn.name,
        };

        await productsController.createProduct(req, res);

        expect(res.status.calledWith(201)).to.be.equal(true);
        expect(res.json.calledWith(EXPECTED_JSON)).to.be.equal(true);
      });
    });

    describe('Caso ocorra um erro', () => {
      const servicesReturn = { code: 500, message: 'test', errorCode: 'testCode' };

      before(async () => {
        sinon.stub(productsService, 'createProduct').resolves(servicesReturn);

        req.body = { name: null };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        productsService.createProduct.restore();
      });

      it('Deve enviar um objeto contendo a chave "message", retornando o código esperado', async () => {
        const EXPECTED_JSON = {
          message: servicesReturn.message,
        };

        await productsController.createProduct(req, res);

        expect(res.status.calledWith(servicesReturn.code)).to.be.equal(true);
        expect(res.json.calledWith(EXPECTED_JSON)).to.be.equal(true);
      });
    });
  });
});
