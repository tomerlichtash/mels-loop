import { PopoverContext } from './PopoverContext';

const PopoverProvider = ({ value, children }) => (
	<PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
);

export default PopoverProvider;
