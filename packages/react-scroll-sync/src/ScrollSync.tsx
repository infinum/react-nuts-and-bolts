import { type FC, type MutableRefObject, type ReactNode, useMemo, useRef } from 'react';
import { ScrollSyncProvider } from './ScrollSyncContext';

export interface IScollSyncProps {
	children: ReactNode;
}

interface IPanes {
	ref: MutableRefObject<HTMLElement | null>;
	listener: () => void;
}

export const ScrollSync: FC<IScollSyncProps> = ({ children }) => {
	const panesRef = useRef<Array<IPanes>>([]);

	const contextValue = useMemo(
		() => ({
			registerPane: (ref: MutableRefObject<HTMLElement | null>) => {
				if (!ref.current) {
					return;
				}

				const listener = () => {
					requestAnimationFrame(() => {
						panesRef.current.forEach((pane) => {
							if (ref.current && pane.ref.current && pane.ref !== ref) {
								pane.ref.current.scrollTop = ref.current.scrollTop;
							}
						});
					});
				};
				panesRef.current.push({ ref, listener });
				ref.current.addEventListener('scroll', listener);
			},
			unregisterPane: (ref: MutableRefObject<HTMLElement | null>) => {
				if (!ref.current) {
					return;
				}

				const paneToRemove = panesRef.current.find((r) => r.ref !== ref);

				if (!paneToRemove) {
					return;
				}

				ref.current.removeEventListener('scroll', paneToRemove.listener);
				panesRef.current = panesRef.current.filter((r) => r.ref !== ref);
			},
		}),
		[panesRef]
	);

	return <ScrollSyncProvider value={contextValue}>{children}</ScrollSyncProvider>;
};
