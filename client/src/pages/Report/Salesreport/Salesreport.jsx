/* eslint-disable no-unused-vars */
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import { Outlet } from "react-router-dom";

import SidebarSR from "./component/SidebarSR";

const Salesreport = () => {
  return (
    <>
      <div className="ml-2 pt-5 mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Sales Report
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex h-full w-full gap-2">
              <SidebarSR />
              <div className="h-full w-full">
                <Outlet />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Salesreport;
