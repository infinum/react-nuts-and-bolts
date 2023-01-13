import {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	type ReactElement,
	type RefAttributes,
	useEffect,
	useRef,
} from 'react';
import { useScrollSync } from './ScrollSyncContext';
import { useMergeRefs } from './useMergeRefs';

export interface IScrollSyncPaneProps {
	children: ReactElement<RefAttributes<unknown>>;
}

export const ScrollSyncPane = forwardRef<unknown, IScrollSyncPaneProps>(function ScrollSyncPaneRef({ children }, ref) {
	const childRef = useRef<HTMLElement | null>(null);
	const { registerPane, unregisterPane } = useScrollSync();

	useEffect(() => {
		registerPane(childRef);

		return () => {
			unregisterPane(childRef);
		};
	}, [registerPane, unregisterPane]);

	const mergedRefs = useMergeRefs(childRef, ref);

	if (!isValidElement(children)) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('ScrollSyncPane: You need to pass a single child element to ScrollSyncPane');
		}

		return null;
	}

	return cloneElement(Children.only(children), { ref: mergedRefs });
});
