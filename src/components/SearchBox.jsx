import { IoSearch } from "react-icons/io5";

export default function SearchBox({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex relative items-center justify-center h-10"
    >
      <input
        type="text"
        id="city-name"
        value={value}
        onChange={onChange}
        placeholder="Enter City name"
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full "
        required
      />

      <button
        type="submit"
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full"
      >
        <IoSearch />
      </button>
    </form>
  );
}
