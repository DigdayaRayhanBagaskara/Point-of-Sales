/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Typography, CardBody } from "@material-tailwind/react";

const Table = ({ head, rows }) => {
  return (
    <>
      <CardBody className="h-full w-full ">
        <table className=" mt-4 w-full min-w-max table-auto text-left">
          {/* HEADER TABLE */}

          <thead className="border-blue-gray-500">
            <tr className="text-center">
              {head.map((col, index_col) => (
                <th
                  key={index_col}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 "
                  >
                    {col.name}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {/* BODY TABLE */}
          <tbody>
            {rows?.map((row, index) => {
              const isLast = index === rows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index} className="text-center">
                  {head.map((col, index_col) => (
                    <td
                      className={`${classes} bg-blue-gray-50/50 w-16`}
                      key={index_col}
                    >
                      {col.name === "GAMBAR PRODUK" ? (
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={col.cell(row)}
                            alt="Image"
                            className="w-16 h-16 rounded-full mx-auto"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {col.cell(row) || "-"}
                          </Typography>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </>
  );
};

export default Table;
