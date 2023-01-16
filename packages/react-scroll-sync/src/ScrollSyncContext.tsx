import { createContext, useContext } from 'react';

interface ISyncScrollContext {
	registerPane: (id: string, node: HTMLElement) => void;
	unregisterPane: (id: string) => void;
}

const noop = () => {
	// noop
};

export const ScrollSyncContext = createContext<ISyncScrollContext>({
	registerPane: noop,
	unregisterPane: noop,
});

export const ScrollSyncProvider = ScrollSyncContext.Provider;

export const useScrollSync = () => {
	const context = useContext(ScrollSyncContext);

	if (!context) {
		throw new Error('Seems like you forgot to wrap your <ScrollSyncPane /> component(s) in <ScrollSync />');
	}

	return context;
};
