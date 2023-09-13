/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, CardFooter, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ totalPages, onPageChange }) => {
  const [active, setActive] = useState(1);
  let [startnumber, endnumber] = useState(0);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      onPageChange(index); // Call the provided onPageChange function
    },
  });

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
    onPageChange(active + 1); // Call the provided onPageChange function
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    onPageChange(active - 1); // Call the provided onPageChange function
  };

  const generatePageButtons = () => {
    const buttons = [];

    if (active > 2) {
      startnumber = active - 2;
    } else {
      startnumber = 1;
    }
    if (active < totalPages - 2) {
      endnumber = active + 2;
    } else {
      endnumber = totalPages;
    }

    for (let i = startnumber; i <= endnumber; i++) {
      buttons.push(
        <IconButton className="rounded-full" key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }
    return buttons;
  };

  return (
    <>
      <div className="mx-7 my-4 justify-center items-center">
        <span className="text-gray-500 mr-2">
          Page {active} of {totalPages}
        </span>
      </div>

      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">{generatePageButtons()}</div>

          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={next}
            disabled={active === totalPages}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default Pagination;
