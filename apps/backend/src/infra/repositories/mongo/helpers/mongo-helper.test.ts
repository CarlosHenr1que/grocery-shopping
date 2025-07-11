jest.mock('mongodb', () => ({
  MongoClient: {
    connect: jest.fn().mockReturnValue({
      close: jest.fn(),
      db: jest.fn().mockReturnValue({
        collection: jest.fn(),
      }),
    }),
    disconnect: jest.fn(),
  },
}));

import { MongoHelper } from './mongo-helper';

const MONGO_URI = 'mongodb://localhost:27017/mongo-helper-test';

const makeSut = () => {
  const sut = MongoHelper;
  return { sut };
};

describe('MongoHelper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call mongo client connect', async () => {
    const { sut } = makeSut();
    await sut.connect(MONGO_URI);

    const { MongoClient } = require('mongodb');
    expect(MongoClient.connect).toHaveBeenCalledWith(MONGO_URI);
  });

  it('should call mongo client disconnect', async () => {
    const { sut } = makeSut();
    await sut.connect(MONGO_URI);
    await sut.disconnect();

    expect(MongoHelper.client.close).toHaveBeenCalled();
  });

  it('should call db collection', async () => {
    const { sut } = makeSut();
    await sut.connect(MONGO_URI);
    sut.getCollection('collection');

    expect(MongoHelper.client.db().collection).toHaveBeenCalledWith(
      'collection'
    );
  });
});
