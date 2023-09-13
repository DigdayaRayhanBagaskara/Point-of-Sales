import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAuthAdminMutation } from "../../../redux/services/authApi";

const FormLoginComponent = () => {
  const navigate = useNavigate()

  const [formLoginData, setFormLoginData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formLoginData
  const [loginUser, responseLogin] = useAuthAdminMutation();

  useEffect(() => {
    if (responseLogin.isSuccess) {
      localStorage.setItem('token', JSON.stringify(responseLogin.data?.token))
      navigate('/dashboard', { replace: true })
    } else if (responseLogin.isError) {
      toast.dismiss()
      toast.error(responseLogin.error.data.message);
    }
  }, [responseLogin])

  const submitHandler = async (e) => {
    try {
      if (!username || !password) {
        toast.dismiss()
        toast.error("Mohon Periksa Username dan Password");
      } else {
        await loginUser({
          "username": username,
          "password": password,
        });
      }
    } catch (err) {
      console.error("Error while login:", err);
    }
  };

  return (
    <form className="flex flex-col gap-4 my-4">
      <Input
        label="Username or Email or Phone"
        id="username"
        name="username"
        type="text"
        value={formLoginData.username}
        onChange={(event) =>
          setFormLoginData({ ...formLoginData, username: event.target.value })
        }
      />
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formLoginData.password}
        onChange={(event) =>
          setFormLoginData({ ...formLoginData, password: event.target.value })
        }
      />
      <Button size="lg" type="button" onClick={submitHandler}>
        Login
      </Button>
    </form>
  );
};

export default FormLoginComponent;
