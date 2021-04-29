import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
	const [searchInput, setSearchInput] = useState("");

	return (
		<SearchContext.Provider value={{ searchInput, setSearchInput }}>
			{children}
		</SearchContext.Provider>
	);
};

const useSearch = () => {
	return useContext(SearchContext);
};

export { SearchProvider, useSearch };
