/* eslint-disable no-unused-vars */
import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";

import Table from "../../../components/Table";

import { NavLink } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";

const Transactionreport = () => {
  return (
    <>
      <div className="ml-2 pt-5s mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Transaction Report
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
            </div>
          </CardHeader>
          {/* <Table /> */}
        </Card>
      </div>
    </>
  );
};

export default Transactionreport;
