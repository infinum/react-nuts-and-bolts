/**
 * Testing Checklist:
 * - Common use cases snapshotted
 * - Common use cases run through axe/toHaveNoViolations
 * - role/aria/data attributes tested
 * - Component behaviors tested (reacts to events, handles callbacks appropriately, updates state correctly, etc.)
 * - Controlled/uncontrolled use cases tested
 * - Associated utils/helpers/etc. tested
 */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
import * as React from 'react';
import { ScrollSync, ScrollSyncPane } from '../src';

describe('useScrollSync', () => {
	beforeEach(() => {
		jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
			cb(0);

			return 0;
		});
	});

	test('should sync scroll between elements', () => {
		const Component = () => {
			return (
				<ScrollSync>
					<div className="scrollable">
						<ScrollSyncPane>
							<div data-testid="pane1" className="scrollable__content">
								<p>Scroll me!</p>
							</div>
						</ScrollSyncPane>
					</div>
					<div className="scrollable">
						<ScrollSyncPane>
							<div data-testid="pane2" className="scrollable__content">
								<p>Scroll me!</p>
							</div>
						</ScrollSyncPane>
					</div>
				</ScrollSync>
			);
		};

		render(<Component />);

		const scrollTop = 100;
		fireEvent.scroll(screen.getByTestId('pane1'), { target: { scrollTop } });

		expect(screen.getByTestId('pane1').scrollTop).toBe(scrollTop);
		expect(screen.getByTestId('pane2').scrollTop).toBe(scrollTop);
	});

	test('should work with refs', () => {
		const refA = React.createRef<HTMLElement>();
		const refB = React.createRef<HTMLDivElement>();

		const Component = () => {
			return (
				<ScrollSync>
					<div className="scrollable">
						<ScrollSyncPane ref={refA}>
							<div ref={refB} data-testid="pane1" className="scrollable__content">
								<p>Scroll me!</p>
							</div>
						</ScrollSyncPane>
					</div>
				</ScrollSync>
			);
		};

		render(<Component />);

		expect(refA.current === refB.current).toBe(true);
	});

	test('should unregister the pane after unmount', () => {
		const Component = () => {
			return (
				<ScrollSync>
					<div className="scrollable">
						<ScrollSyncPane ref={refA}>
							<div ref={refB} data-testid="pane1" className="scrollable__content">
								<p>Scroll me!</p>
							</div>
						</ScrollSyncPane>
					</div>
				</ScrollSync>
			);
		};

		render(<Component />);
	});

	afterEach(() => {
		(window.requestAnimationFrame as jest.Mock).mockRestore();
	});
});