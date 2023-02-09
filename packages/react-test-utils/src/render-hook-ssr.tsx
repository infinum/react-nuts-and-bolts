import { act, Queries, queries, RenderHookOptions } from '@testing-library/react';
import { createRef, MutableRefObject } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOMServer from 'react-dom/server';

export function renderHookSSR<
	Result,
	TProps,
	Q extends Queries = typeof queries,
	Container extends Element | DocumentFragment = HTMLElement,
	BaseElement extends Element | DocumentFragment = Container
>(
	renderCallback: (initialProps: TProps) => Result,
	options: RenderHookOptions<TProps, Q, Container, BaseElement> = {}
) {
	const { initialProps } = options;

	const result = createRef<Result>() as MutableRefObject<Result>;

	function TestComponent({ renderCallbackProps }: { renderCallbackProps?: TProps } = {}) {
		result.current = renderCallback(renderCallbackProps as TProps);
		return null;
	}
	const serverOutput = ReactDOMServer.renderToString(<TestComponent renderCallbackProps={initialProps} />);

	let container: HTMLDivElement | undefined = undefined;

	return {
		result,
		hydrate() {
			if (container) {
				throw new Error('The component can only be hydrated once');
			}

			container = document.createElement('div');
			container.innerHTML = serverOutput;
			act(() => {
				ReactDOMClient.hydrateRoot(container as HTMLElement, <TestComponent renderCallbackProps={initialProps} />);
			});
		},
	};
}
