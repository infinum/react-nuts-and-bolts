import { useMemo, useRef, type FC, type ReactNode } from 'react';
import { ScrollSyncProvider } from './ScrollSyncContext';

export interface IScollSyncProps {
	children: ReactNode;
}

interface IPane {
	node: HTMLElement;
	listener: EventListener;
}

export const ScrollSync: FC<IScollSyncProps> = ({ children }) => {
	const panesRef = useRef<Record<string, IPane>>({});

	const contextValue = useMemo(
		() => ({
			registerPane: (id: string, node: HTMLElement) => {
				const listener = (e: Event) => {
					if (!e.target) {
						return;
					}

					requestAnimationFrame(() => {
						const { scrollTop } = e.target as HTMLElement;

						for (const paneId in panesRef.current) {
							if (id === paneId) {
								continue; // skip the current pane
							}

							const pane = panesRef.current[paneId];
							pane.node.scrollTop = scrollTop;
						}
					});
				};

				panesRef.current[id] = { node, listener };
				node.addEventListener('scroll', listener);
			},
			unregisterPane: (id: string) => {
				const paneToRemove = panesRef.current[id];

				if (!paneToRemove) {
					return;
				}

				paneToRemove.node.removeEventListener('scroll', paneToRemove.listener);
				delete panesRef.current[id];
			},
		}),
		[panesRef]
	);

	return <ScrollSyncProvider value={contextValue}>{children}</ScrollSyncProvider>;
};
