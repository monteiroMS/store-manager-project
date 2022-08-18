const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const { DB_INSERT_MOCK, NEW_SALE_REQ_BODY_MOCK } = require('../mock');
const salesModel = require('../../../models/salesModel');
const sales_productsModel = require('../../../models/sales_productsModel');

describe('SALES - CAMADA MODEL', () => {
  describe('Testa a função "createSale"', () => {
    describe('Caso esteja tudo OK', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(DB_INSERT_MOCK);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Deve retornar o id da nova venda cadastrada', async () => {
        const [{ insertId }] = DB_INSERT_MOCK;

        const received = await salesModel.createSale();

        expect(received).to.be.equal(insertId);
      });
    });

    describe('Caso ocorra um erro', () => {
      const err = new Error('Something went wrong');

      before(() => {
        sinon.stub(connection, 'execute').throws(err);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Deve retornar uma mensagem de erro', async () => {
        const received = await salesModel.createSale();

        expect(received).to.be.deep.equal({ message: err.message });
      });
    });
  });

  describe('Testa a função "createSaleProducts"', () => {
    describe('Caso esteja tudo OK', () => {
      const [{ insertId }] = DB_INSERT_MOCK;
      const [firstProduct] = NEW_SALE_REQ_BODY_MOCK;
      
      before(() => {
        sinon.stub(connection, 'execute').resolves(DB_INSERT_MOCK);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Deve retornar o um array de produtos cadastrados', async () => {
        const received = await sales_productsModel
          .createSaleProducts(insertId, firstProduct);
      
        expect(received).to.be.deep.equal(firstProduct);
      });
    });

    describe('Caso ocorra um erro', () => {
      const err = new Error('Something went wrong');

      before(() => {
        sinon.stub(connection, 'execute').throws(err);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Deve retornar uma mensagem de erro', async () => {
        const [invalidId, invalidProducts] = ['string', 'string'];
        
        const received = await sales_productsModel
          .createSaleProducts(invalidId, invalidProducts);

        expect(received).to.be.deep.equal({ message: err.message });
      });
    });
  });
});
