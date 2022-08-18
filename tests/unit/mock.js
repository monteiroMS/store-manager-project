const DB_MOCK = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const DB_INSERT_MOCK = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 16,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

const NEW_SALE_REQ_BODY_MOCK = [
  {
    productId: 1,
    quantity: 3,
  },
  {
    productId: 3,
    quantity: 6,
  },
];

module.exports = {
  DB_MOCK,
  DB_INSERT_MOCK,
  NEW_SALE_REQ_BODY_MOCK,
};
