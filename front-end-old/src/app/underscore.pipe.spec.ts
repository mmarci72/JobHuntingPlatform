import { UnderscorePipe } from './util/underscore.pipe';

describe('UnderscorePipe', () => {
	it('create an instance', () => {
		const pipe = new UnderscorePipe();
		expect(pipe).toBeTruthy();
	});
});
