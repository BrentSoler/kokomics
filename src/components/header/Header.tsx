import SearchBar from "../search-bar/SearchBar";

export default function Header() {
    return (
        <div className="flex justify-between shadow-lg items-center p-2">
            <div className="m-2">
                <h1 className="font-bold text-2xl">Kokomics.</h1>
            </div>

            <div>
                <SearchBar />
            </div>
        </div>
    );
}
