import { describe, expect, test } from '@jest/globals';
import { htmlValidator } from './../../src/lib/next-runtime-utils/htmlValidator';

describe('htmlValidator', () => {
	test('Filter generic attrs', async () => {
		const attrs = {
			'data-type': 'dataTypeAttrVal',
			align: 'alignAttrVal',
			dir: 'dirAttrVal',
			invalid: 'invalidAttrVal',
		};

		const res = htmlValidator.filterAttributesFor('*', attrs);

		expect(res['data-type']).toEqual(attrs['data-type']);
		expect(res.align).toEqual(attrs.align);
		expect(res.dir).toEqual(attrs.dir);

		expect(res.invalid).toBeFalsy();
	});

	describe('Table attributes', () => {
		test('filter <table> attrs', async () => {
			const attrs = {
				border: 'borderAttrVal',
				cellpadding: 'cellpaddingAttrVal',
				cellspacing: 'cellspacingAttrVal',
			};

			const res = htmlValidator.filterAttributesFor('table', attrs);

			expect(res.border).toEqual(attrs.border);
			expect(res.cellpadding).toEqual(attrs.cellpadding);
			expect(res.cellspacing).toEqual(attrs.cellspacing);
		});

		test('filter <th> attrs', async () => {
			const attrs = {
				rowspan: 'borderAttrVal',
				colspan: 'cellpaddingAttrVal',
			};

			const thAttrs = htmlValidator.filterAttributesFor('th', attrs);

			expect(thAttrs.rowspan).toEqual(attrs.rowspan);
			expect(thAttrs.colspan).toEqual(attrs.colspan);
		});

		test('filter <td> attrs', async () => {
			const attrs = {
				rowspan: 'borderAttrVal',
				colspan: 'cellpaddingAttrVal',
			};

			const tdAttrs = htmlValidator.filterAttributesFor('td', attrs);

			expect(tdAttrs.rowspan).toEqual(attrs.rowspan);
			expect(tdAttrs.colspan).toEqual(attrs.colspan);
		});
	});
});
