import common = require('../test-common');
import rule = require('./max_line_length');
var createLine = common.createLine;

var expect = common.expect;
var reporter = common.reporter;
var context = common.context;

// ReSharper disable WrongExpressionStatement
describe('max_line_length rule', () => {

	beforeEach(() => {
		reporter.reset();
	});

	describe('check command', () => {

		it('validates max_line_length setting',() => {
			var fooLine = createLine('foo', { number: 1 });
			rule.check(context, { max_line_length: 3 }, fooLine);
			expect(reporter).not.to.have.been.called;
			rule.check(context, { max_line_length: 2 }, fooLine);
			expect(reporter).to.have.been.calledOnce;
			expect(reporter).to.have.been.calledWithExactly('line 1: line length: 3, exceeds: 2');
		});

	});

	describe('fix command', () => {

		it('returns the line as-is',() => {
			var line = createLine('foobar');
			var fixedLine = rule.fix({ max_line_length: 2 }, createLine('foobar'));
			expect(fixedLine).to.deep.equal(line);
		});

	});

	describe('infer command', () => {

		it('infers max line length', () => {
			var maxLineLength = rule.infer(createLine('foo'));
			expect(maxLineLength).to.eq(3);
		});

		it('ignores newline characters', () => {
			var maxLineLength = rule.infer(createLine('foo', { ending: '\n'}));
			expect(maxLineLength).to.eq(3);
		});

	});

});
