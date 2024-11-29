import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchTackProps {
    onSearch: (text: string) => void;
}

const SearchBar = ({ onSearch }: SearchTackProps) => {
    const [searchText, setSearchText] = useState<string>("");

    const clickSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchText);
    }
    return (
        <div className="flex items-center gap-2 my-5">
            <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Search tasks..."
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button
                onClick={e => clickSearch(e)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition"
            >
                <FaSearch />
                Search
            </button>
        </div>
    );
};

export default SearchBar;
