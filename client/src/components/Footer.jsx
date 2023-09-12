import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-white p-5">
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="blue-gray" className="text-center font-normal">
          &copy; 2023 Point Of Sales
        </Typography>
      </footer>
    </>
  );
};

export default Footer;
