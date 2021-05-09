import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Testing fetch helper', () => {
  let token = '';

  test('should work fecthWithoutToken', async () => {
    const resp = await fetchWithoutToken(
      'auth',
      {
        email: 'andres@gmail.com',
        password: '123456',
      },
      'POST'
    );

    expect(resp instanceof Response).toBeTruthy();

    const body = await resp.json();

    token = body.token;

    expect(body.success).toBeTruthy();
  });

  test('should work fecthWithToken', async () => {
    localStorage.setItem('token', token);

    const resp = await fetchWithToken('events');
    const body = await resp.json();

    expect(resp instanceof Response).toBeTruthy();
    expect(body.success).toBeTruthy();
    expect(body.events.length >= 0).toBeTruthy();
  });
});
