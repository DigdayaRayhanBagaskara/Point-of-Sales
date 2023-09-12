/* eslint-disable no-unused-vars */
import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";

import Table from "../../../components/Table";

import { NavLink } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";

const Employee = () => {
  return (
    <>
      <div className="ml-2 pt-5s mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Data Employee
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button className="flex items-center gap-3" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                  <NavLink to="/employee-add" className="flex items-center">
                    Add Data
                  </NavLink>
                </Button>
              </div>
            </div>
          </CardHeader>
          {/* <Table /> */}
        </Card>
      </div>
    </>
  );
};

export default Employee;
