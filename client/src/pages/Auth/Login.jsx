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
import FormRegisterComponent from "./components/FormRegisterComponent";

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
            Auth Page
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab value="card" onClick={() => setType("card")}>
                Login
              </Tab>
              <Tab value="paypal" onClick={() => setType("paypal")}>
                Register
              </Tab>
            </TabsHeader>
            <TabsBody
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}>
              <TabPanel value="card" className="p-0">
                <FormLoginComponent />
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <FormRegisterComponent />
              </TabPanel>
            </TabsBody>
          </Tabs>

          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60">
            &copy; copyright 2023
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
