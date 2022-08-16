const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const { DB_INSERT_MOCK, DB_MOCK } = require('../mock');

describe('CAMADA MODEL', () => {
  describe('Testa a função "getAll"', () => {
    describe('Caso esteja tudo certo', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([DB_MOCK, []]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Lista todos os produtos do banco de dados', async () => {
        const response = await productsModel.getAll();

        expect(response)
          .to.be.an('array')
          .to.have.lengthOf(3)
          .to.be.equals(DB_MOCK);
      });
    });

    describe('Caso ocorra um erro', () => {
      const error = { message: 'Algo deu errado' };

      before(async () => {
        sinon.stub(connection, 'execute').throws(error);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna um objeto com a mensagem do erro', async () => {
        const rejects = await productsModel.getAll();

        expect(rejects)
          .to.be.an('object')
          .to.have.property('message');
      });
    });
  });

  describe('Testa a função "getById"', () => {
    describe('Caso esteja tudo certo', () => {
      before(() => {
        const execute = [DB_MOCK[0]];

        sinon.stub(connection, 'execute').resolves([execute, []]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna apenas um objeto com os valores esperados', async () => {
        const product = await productsModel.getById(1);

        expect(product)
          .to.be.an('object')
          .to.have.property('id');
      });
    });

    describe('Caso algo dê errado', () => {
      before(() => {
        const error = { message: 'Algo deu errado' };

        sinon.stub(connection, 'execute').throws(error);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna um objeto com a mensagem "Algo deu errado"', async () => {
        const product = await productsModel.getById(1);

        expect(product)
          .to.be.an('object')
          .to.have.property('message');
      });
    });
  });

  describe('Testa a função "createProduct"', () => {
    describe('Caso esteja tudo certo', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(DB_INSERT_MOCK);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar o id do produto inserido', async () => {
        const id = await productsModel.createProduct('teste');

        const EXPECTED_ID = 16;

        expect(id).to.be.equal(EXPECTED_ID);
      });
    });

    describe('Caso ocorra um erro', () => {
      const error = { code: 'string', sqlMessage: 'string' };

      before(() => {
        sinon.stub(connection, 'execute').throws(error);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar um objeto com as chaves "code" e "sqlMessage"', async () => {
        const response = await productsModel.createProduct(null);

        expect(response).to.be.deep.equal({ code: error.code, message: error.sqlMessage });
      });
    });
  });


});
