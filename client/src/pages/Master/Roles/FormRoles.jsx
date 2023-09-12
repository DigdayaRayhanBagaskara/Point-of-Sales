import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

import { NavLink } from "react-router-dom";

const Formroles = () => {
  return (
    <>
      <div className="flex justify-center items-center place-content-center h-[79vh]">
        <Card className="w-full max-w-[24rem]">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
          >
            <Typography variant="h4" color="white">
              Add Data
            </Typography>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-4 my-4">
              <Input label="Kategori" type="text" />
              <Input label="Keterangan" type="text" />
              <Input label="Model" type="text" />
              <Button size="lg" type="button">
                Save
              </Button>
            </form>
            <div className="flex flex-col gap-4 my-4">
              <Button size="lg">
                <NavLink to="/roles">Back</NavLink>
              </Button>
            </div>

            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
            >
              &copy; copyright 2023
            </Typography>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Formroles;
