import { Dialog, DialogBody, DialogHeader, DialogFooter, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Logout = ({ close }) => {
    const navigate = useNavigate()
    
    const onLogout = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
            <Dialog open={true} handler={onLogout}>
                <DialogHeader>Logout</DialogHeader>
                <DialogBody divider style={{ fontSize: 20 }}>
                    Are you sure?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={close}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={onLogout}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default Logout