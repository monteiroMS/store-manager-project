const { expect } = require('chai');
const sinon = require('sinon');
const { NEW_SALE_REQ_BODY_MOCK, DB_INSERT_MOCK } = require('../mock');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('SALES - CAMADA CONTROLLER', () => {
  describe('Testa a função "createSale"', () => {
    const [{ insertId }] = DB_INSERT_MOCK;

    const req = {};
    const res = {};
   
    const SERVICE_RESPONSE = {
      id: insertId,
      itemsSold: NEW_SALE_REQ_BODY_MOCK,
    };

    describe('Caso a requisição passe pelos middlewares', () => {
      before(() => {
        sinon.stub(salesService, 'createSale').resolves(SERVICE_RESPONSE);

        req.body = NEW_SALE_REQ_BODY_MOCK;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(() => {
        salesService.createSale.restore();
      });

      it('Deve enviar o json esperado com o status 201', async () => {
        await salesController.createSale(req, res);

        expect(res.status.calledWith(201)).to.be.equal(true);
        expect(res.json.calledWith(SERVICE_RESPONSE)).to.be.equal(true);
      });
    });
  });
});
