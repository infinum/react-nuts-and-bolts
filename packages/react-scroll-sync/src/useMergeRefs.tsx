import { ForwardedRef, FunctionComponentElement, useMemo } from 'react';

export type RefType = FunctionComponentElement<{ ref: ForwardedRef<unknown> }>['ref'];

function setRef(ref: Exclude<RefType, null | undefined>, value: unknown) {
	if (typeof ref === 'function') {
		ref(value);
	} else {
		ref.current = value;
	}
}

export function useMergeRefs(...refs: Array<RefType>): ((refValue: unknown) => void) | null {
	return useMemo(() => {
		if (refs.every((ref) => ref === null)) {
			return null;
		}

		return (refValue) => {
			for (const ref of refs) {
				if (ref !== null && ref !== undefined) {
					setRef(ref, refValue);
				}
			}
		};
	}, [refs]);
}
