import HttpStatus from 'http-status-codes';
import Qs from 'qs';
import {
  assert,
} from 'chai';

const setup = require('../../../../test/helpers/setup');
const mockUsers = require('../../../../test/helpers/mock-users');
const mockSessions = require('../../../../test/helpers/mock-sessions');

const prefix = conf.get('prefix');

describe(`session findOne GET ${prefix}session`, () => {
  before(async function before() {
    await setup();
    await mockUsers.bind(this).apply();
    await mockSessions.bind(this).apply();
  });

  it('works', async function it() {
    const {
      admin1,
    } = this.users;
    const {
      session3,
    } = this.sessions;

    const thisTestUrl = `${prefix}session?${Qs.stringify({
      include: {
        model: 'user',
        where: {
          username: {
            $or: {
              $in: [
                admin1.username,
              ],
            },
          },
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
        scope: ['session:findOne'],
      },
    });

    assert.equal(statusCode, HttpStatus.OK);
    assert.equal(result.id, session3.id);
    assert.equal(result.userId, admin1.id);
    assert.equal(result.user.username, admin1.username);
  });
});
