const { expect } = require('chai');
const sinon = require('sinon');
const { DB_INSERT_MOCK, NEW_SALE_REQ_BODY_MOCK } = require('../mock');
const salesModel = require('../../../models/salesModel');
const sales_productsModel = require('../../../models/sales_productsModel');
const salesService = require('../../../services/salesService');

describe('SALES - CAMADA SERVICES', () => {
  describe('Testa a função "createSale"', () => {
    const [{ insertId }] = DB_INSERT_MOCK;
    const [firstProduct, secondProduct] = NEW_SALE_REQ_BODY_MOCK;
    
    describe('Caso a requisição passe pelos middlewares', () => {
      before(() => {
        sinon.stub(salesModel, 'createSale').resolves(insertId);
        sinon.stub(sales_productsModel, 'createSaleProducts')
          .onFirstCall().resolves(firstProduct)
          .onSecondCall().resolves(secondProduct);
      });
 
      after(() => {
        salesModel.createSale.restore();
      });

      it('Deve retornar um objeto com as chaves "id" e "itemsSold"', async () => {
        const received = await salesService.createSale(NEW_SALE_REQ_BODY_MOCK);

        const expected = {
          id: insertId,
          itemsSold: NEW_SALE_REQ_BODY_MOCK,
        };

        expect(received).to.be.deep.equal(expected);
      });
    });
  });
});
