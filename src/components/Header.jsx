import { Link } from "react-router-dom";

import { MdSunnySnowing } from "react-icons/md";

export default function Header() {
  return (
    <div className="justify-between bg-gray-100  py-3 sticky top-0 shadow-md">
      <div className="max-w-3xl mx-auto flex gap-2 items-center justify-between px-2">
        <p className="flex items-center justify-center gap-2">
          <Link className="font-bold text-lg " to="/">
            Weather App
          </Link>
          <MdSunnySnowing className="text-3xl text-yellow-300" />
        </p>

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
