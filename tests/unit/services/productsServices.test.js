const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const DB_MOCK = require('../mock');

describe('CAMADA SERVICES', () => {
  describe('Testa a função "getAll"', () => {
    describe('Caso esteja tudo certo', () => {
      before(async () => {
        sinon.stub(productsModel, 'getAll').resolves(DB_MOCK);
      });

      after(async () => {
        productsModel.getAll.restore();
      });

      it('Retorna todos os produtos do banco de dados', async () => {
        const response = await productsService.getAll();

        expect(response)
          .to.be.an('array')
          .to.have.lengthOf(3)
          .to.be.equals(DB_MOCK);
      });
    });

    describe('Caso ocorra um erro', () => {
      const error = { message: 'Algo deu errado' };

      before(async () => {
        sinon.stub(productsModel, 'getAll').returns(error);
      });

      after(async () => {
        productsModel.getAll.restore();
      });

      it('Retorna um objeto com a mensagem do erro', async () => {
        const rejects = await productsService.getAll();

        expect(rejects)
          .to.be.an('object')
          .to.have.property('message');
      });
    });
  });

  describe('Testa a função "getById"', () => {
    describe('Caso esteja tudo certo', () => {
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(DB_MOCK[0]);
      });

      after(async () => {
        productsModel.getById.restore();
      });

      it('Retorna apenas um objeto com os valores esperados', async () => {
        const product = await productsService.getById(1);

        expect(product)
          .to.be.an('object')
          .to.equals(DB_MOCK[0]);
      });
    });

    describe('Caso algo dê errado', () => {
      before(() => {
        sinon.stub(productsModel, 'getById').returns(undefined);
      });

      after(async () => {
        productsModel.getById.restore();
      });

      it('Retorna um objeto com a mensagem "Product not found"', async () => {
        const product = await productsService.getById(1);

        expect(product)
          .to.be.an('object')
          .and.to.have.property('message').to.be.equals('Product not found');
      });
    });
  });
});
