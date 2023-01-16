import {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	useId,
	type ReactElement,
	type RefAttributes,
} from 'react';
import { useScrollSync } from './ScrollSyncContext';
import { RefType, useMergeRefs } from './useMergeRefs';

export interface IScrollSyncPaneProps {
	children: ReactElement<RefAttributes<HTMLElement>>;
}

export const ScrollSyncPane = forwardRef<HTMLElement, IScrollSyncPaneProps>(function ScrollSyncPaneRef(
	{ children },
	ref
) {
	const id = useId();
	const { registerPane, unregisterPane } = useScrollSync();

	const mergedRefs = useMergeRefs(
		ref,
		(node) => {
			if (node) {
				registerPane(id, node);
			} else {
				unregisterPane(id);
			}
		},
		'ref' in children ? (children.ref as RefType) : null
	);

	if (!isValidElement(children)) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('ScrollSyncPane: You need to pass a single child element to ScrollSyncPane');
		}

		return null;
	}

	return cloneElement(Children.only(children), { ref: mergedRefs });
});
