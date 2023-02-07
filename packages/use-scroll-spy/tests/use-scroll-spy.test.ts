import { useScrollSpy } from '../src/use-scroll-spy';
import { act, renderHook } from '@testing-library/react';

describe('useScrollSpy', () => {
	beforeAll(() => {
		(async () => {
			if (!('IntersectionObserver' in window)) await import('intersection-observer');
		})();
	});

	it('should create new IntersectionObserver instance', () => {
		const disconnect = jest.fn();
		window.IntersectionObserver = jest.fn(
			() => ({ observe: jest.fn(), disconnect } as unknown as IntersectionObserver)
		);
		renderHook(() => useScrollSpy([]));

		expect(window.IntersectionObserver).toBeCalled();
	});

	it('should observe elements that match provided selectors', () => {
		const observe = jest.fn();
		window.IntersectionObserver = jest.fn(
			() => ({ observe, disconnect: jest.fn() } as unknown as IntersectionObserver)
		);
		document.querySelector = jest.fn((selector) => selector);

		const ids = ['id-1', 'id-2'];
		renderHook(() => useScrollSpy(ids));

		expect(observe).toBeCalledWith(ids[0]);
		expect(observe).toBeCalledWith(ids[1]);
	});

	it('should set active state', () => {
		window.IntersectionObserver = jest.fn(
			() => ({ observe: jest.fn(), disconnect: jest.fn() } as unknown as IntersectionObserver)
		);

		const mockedEntry = {
			isIntersecting: false,
			boundingClientRect: { x: 10, y: 20, width: 30, height: 40 },
			target: {
				getAttribute() {
					return 'id-1';
				},
			},
		};
		jest.spyOn(document, 'querySelector').mockReturnValue(mockedEntry as unknown as Element);

		const { result } = renderHook(() => useScrollSpy([mockedEntry.target.getAttribute()]));

		const [callback] = (window.IntersectionObserver as jest.Mock).mock.calls[0];
		expect(callback).toBeInstanceOf(Function);

		act(() => {
			callback([{ ...mockedEntry, isIntersecting: true }]);
		});

		expect(result.current).toBe(mockedEntry.target.getAttribute());
	});

	it('should disconnect observer when component is unmounted', () => {
		const disconnect = jest.fn();
		window.IntersectionObserver = jest.fn(
			() => ({ observe: jest.fn(), disconnect } as unknown as IntersectionObserver)
		);

		const { unmount } = renderHook(() => useScrollSpy([]));

		unmount();

		expect(disconnect).toBeCalled();
	});
});
