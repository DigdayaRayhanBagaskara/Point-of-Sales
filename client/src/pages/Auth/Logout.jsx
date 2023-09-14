import { Dialog, DialogBody, DialogHeader, DialogFooter } from "@material-tailwind/react";
import { Button, Card, CardHeader, Typography, CardFooter, CardBody, Input, Select, Option } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { useLogoutAdminMutation } from "../../redux/services/authApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Logout = ({ close }) => {
    const navigate = useNavigate()

    const [logout, responseLogout] = useLogoutAdminMutation();

    useEffect(() => {
        if (responseLogout.isSuccess) {
            localStorage.clear()
            navigate('/login')
        } else if (responseLogout.isError) {
            toast.dismiss()
            toast.error('Something wrong, please contact the admin');
        }
    }, [responseLogout])

    const onLogout = async () => {
        await logout()
    }
    return (
        <>
            <Dialog className="bg-transparent shadow-none" size="xs" open={true}>
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        color="gray"
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    >
                        <Typography variant="h4" color="white">
                            Logout
                        </Typography>
                    </CardHeader>

                    <CardBody>
                        <Typography color="blue-gray" className="text-center font-normal text-xl">
                            Are you sure?
                        </Typography>
                    </CardBody>

                    <CardFooter divider>
                        <div className="flex justify-center gap-2">
                            <Button className="bg-gray-800 hover:bg-red-400" size="md" onClick={close}>
                                Cancel
                            </Button>
                            <Button className="bg-black hover:bg-blue-600" size="md" type="button" onClick={onLogout}>
                                Logout
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    )
}

export default Logout