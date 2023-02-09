import React, { useCallback } from 'react';

export type ReactRef<T> = React.RefCallback<T> | React.MutableRefObject<T>;

export function assignRef<T = any>(ref: ReactRef<T> | null | undefined, value: T) {
	if (ref === undefined) return;
	if (ref === null) return;

	if (typeof ref === 'function') {
		ref(value);
		return;
	}

	try {
		ref.current = value;
	} catch (error) {
		throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
	}
}

export function mergeRefs<T>(refs: Array<ReactRef<T> | null | undefined>, node: T) {
	refs.forEach((ref) => {
		assignRef(ref, node);
	});
}

export function useMergeRefs<T>(...refs: Array<Array<ReactRef<T>> | ReactRef<T> | null | undefined>) {
	const refArray =
		refs.length === 1 && Array.isArray(refs[0])
			? (refs[0] as Array<ReactRef<T> | null | undefined>)
			: (refs as Array<ReactRef<T> | null | undefined>);

	return useCallback((element: T) => mergeRefs(refArray, element), [refArray]);
}
