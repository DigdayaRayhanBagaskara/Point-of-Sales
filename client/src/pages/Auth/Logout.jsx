import { Dialog, DialogBody, DialogHeader, DialogFooter } from "@material-tailwind/react";
import { Button, Card, CardHeader, Typography, CardFooter, CardBody, Input, Select, Option } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

const Logout = ({ close }) => {
    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
            <Dialog className="bg-transparent shadow-none" size="xs" open={true}>
                {/* <DialogHeader>Logout</DialogHeader>
                <DialogBody divider style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Are you sure?
                </DialogBody>
                <DialogFooter>
                    <div className="flex justify-end gap-2">
                        <Button className="bg-gray-800 hover:bg-red-400" size="md" onClick={close}>
                            Cancel
                        </Button>
                        <Button className="bg-black hover:bg-blue-600" size="md" type="button" onClick={onLogout}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter> */}

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