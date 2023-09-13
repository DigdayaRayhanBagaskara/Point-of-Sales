/* eslint-disable react/prop-types */

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import FormLoginComponent from "./components/FormLoginComponent";

const Login = () => {
  const [type, setType] = useState("card");

  return (
    <div className="flex justify-center items-center place-content-center h-[100vh]">
      <Card className="w-full max-w-[24rem]">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center">
          <Typography variant="h4" color="white">
            Point Of Sales
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabPanel value="card" className="p-0">
              <FormLoginComponent />
            </TabPanel>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
