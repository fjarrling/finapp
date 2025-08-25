import {Input} from "@/components/ui/input.tsx";

type SearchBarProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

const SearchBar = ({searchValue, setSearchValue}: SearchBarProps) => {

  return (
    <div className="w-full mb-6">
      <Input
        type="text"
        placeholder="Search transactions..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;