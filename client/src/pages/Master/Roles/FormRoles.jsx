import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useAddrolesMutation } from "../../../redux/services/rolesApi";

const Formroles = ({ cancel }) => {

  const [nama_role, setNamaRole] = useState();

  const [createRole, responseCreateRole] = useAddrolesMutation();

  useEffect(() => {
    console.log(responseCreateRole)
    if (responseCreateRole.isSuccess) {
      toast.dismiss()
      toast.success("Data Berhasil Disimpan");
      cancel()
    } else if (responseCreateRole.isError) {
      toast.dismiss()
      toast.error(responseCreateRole.error?.data?.message);
    }
  }, [responseCreateRole])

  const onSubmit = async () => {
    try {
      if (!nama_role) {
        toast.dismiss()
        toast.error("Data Harus Diisi Terlebih Dahulu");
      } else {
        await createRole({
          "nama_role": nama_role
        })
      }
    } catch (err) {
      console.error("Error while saving user:", err);
    }
  }

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
              <Input label="Nama Role" type="text" value={nama_role} onChange={(event) =>
                setNamaRole(() => event.target.value)
              } />
              <Button size="lg" type="button" onClick={onSubmit}>
                Save
              </Button>
            </form>
            <div className="flex flex-col gap-4 my-4">
              <Button size="lg" onClick={cancel}>
                Cancel
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
