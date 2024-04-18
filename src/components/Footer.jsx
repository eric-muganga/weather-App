import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="w-full bg-white p-8 border-t border-blue-gray-50">
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2024
        <a
          href="https://github.com/eric-muganga"
          target="_blank"
          className="hover:underline"
        >
          {" "}
          Eric Muganga{" "}
        </a>
        | All rights reserved
      </Typography>
    </footer>
  );
}
