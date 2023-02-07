import { render } from '@testing-library/react';
import * as React from 'react';
import { useMergeRefs } from '../src';

describe('useMergeRefs', () => {
	it('renders without crashing', () => {
		const App = () => {
			const ref1 = React.useRef<HTMLElement | null>();
			const ref2 = React.useRef<HTMLElement | null>();
			const ref3 = React.useRef<HTMLElement | null>();

			const mergedRefs = useMergeRefs([ref1, ref2, ref3]);

			return <div ref={mergedRefs}>app</div>;
		};

		render(<App />);
	});

	it('renders with multiple args', () => {
		const App = () => {
			const ref1 = React.useRef<HTMLElement | null>();
			const ref2 = React.useRef<HTMLElement | null>();
			const ref3 = React.useRef<HTMLElement | null>();

			const mergedRefs = useMergeRefs(ref1, ref2, ref3);

			return <div ref={mergedRefs}>app</div>;
		};

		render(<App />);
	});

	it('renders with other types', () => {
		const noop = jest.fn();

		const App = () => {
			const ref1 = React.useRef<HTMLElement | null>();

			const mergedRefs = useMergeRefs(ref1, noop, null, undefined, {});

			return <div ref={mergedRefs}>app</div>;
		};

		render(<App />);

		expect(noop).toBeCalled();
	});

	it('trows if ref is freezed', () => {
		const freezed = Object.freeze({ current: null });

		const App = () => {
			const ref1 = React.useRef<HTMLElement | null>();

			const mergedRefs = useMergeRefs(ref1, freezed);

			return <div ref={mergedRefs}>app</div>;
		};

		try {
			<App />;

			expect(false).toBe(true);
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
		}
	});
});
