// import { describe, expect, test } from '@jest/globals';
// import { mlApiUtils } from '../../src/apiUtils';

// describe('ApiUtils', () => {
//   test('saveToCache', async () => {
//     await mlApiUtils.saveToCache('someKey', JSON.stringify({ key: 'val' }));
//     const payload1 = await mlApiUtils.getFromCache('someKey');
//     expect(JSON.parse(payload1)).toEqual({ key: 'val' });

//     await mlApiUtils.saveToCache('someKey', JSON.stringify({ key: 'val2' }));
//     const payload2 = await mlApiUtils.getFromCache('someKey');
//     expect(JSON.parse(payload2)).toEqual({ key: 'val2' });

//     await mlApiUtils.saveToCache('someKey3', JSON.stringify({ key: 'newVal' }));
//     const payload3 = await mlApiUtils.getFromCache('someKey3');
//     expect(JSON.parse(payload3)).toEqual({ key: 'newVal' });
//   });
// });
