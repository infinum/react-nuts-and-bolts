import { ForwardedRef, MutableRefObject, useMemo } from 'react';

function setRef<T>(ref: ForwardedRef<T>, value: T) {
	if (typeof ref === 'function') {
		ref(value);
	} else if (ref !== null && ref !== undefined) {
		(ref as MutableRefObject<T>).current = value;
	}
}

export function useMergeRefs<T>(...refs: Array<ForwardedRef<T>>): ((refValue: T) => void) | null {
	return useMemo(() => {
		if (refs.every((ref) => ref === null)) {
			return null;
		}

		return (refValue: T) => {
			for (const ref of refs) {
				setRef<T>(ref, refValue);
			}
		};
	}, [refs]);
}
