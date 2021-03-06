import HttpStatus from 'http-status-codes';
import Qs from 'qs';
import {
  assert,
} from 'chai';

const setup = require('../../../../test/helpers/setup');
const mockUsers = require('../../../../test/helpers/mock-users');

const prefix = conf.get('prefix');

describe(`role findOne GET ${prefix}role`, () => {
  before(async function before() {
    await setup();
    await mockUsers.bind(this).apply();
  });

  it('works', async function it() {
    const {
      adminRole,
    } = this.roles;
    const thisTestUrl = `${prefix}role?${Qs.stringify({
      where: {
        name: {
          $eq: adminRole.name,
        },
      },
    }).toString()}`;

    const {
      result,
      statusCode,
    } = await server.inject({
      url: thisTestUrl,
      method: 'GET',
      credentials: {
        scope: ['role:findOne'],
      },
    });

    assert.equal(statusCode, HttpStatus.OK);
    assert.equal(result.name, adminRole.name);
  });
});
