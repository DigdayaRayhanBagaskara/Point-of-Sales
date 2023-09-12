import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

const FormRegisterComponent = () => {
  const [formRegisterData, setFormRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const submitHandler = () => {
    console.log(formRegisterData);
  };

  return (
    <form className="flex flex-col gap-4 my-4">
      <Input
        label="Username"
        id="username"
        name="username"
        type="text"
        value={formRegisterData.username}
        onChange={(event) =>
          setFormRegisterData({
            ...formRegisterData,
            username: event.target.value,
          })
        }
      />
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        value={formRegisterData.email}
        onChange={(event) =>
          setFormRegisterData({
            ...formRegisterData,
            email: event.target.value,
          })
        }
      />
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formRegisterData.password}
        onChange={(event) =>
          setFormRegisterData({
            ...formRegisterData,
            password: event.target.value,
          })
        }
      />
      <Input
        label="Confirm Password"
        id="confirm_password"
        name="confirm_password"
        type="password"
        value={formRegisterData.confirm_password}
        onChange={(event) =>
          setFormRegisterData({
            ...formRegisterData,
            confirm_password: event.target.value,
          })
        }
      />
      <Button size="lg" onClick={submitHandler}>
        Register
      </Button>
    </form>
  );
};

export default FormRegisterComponent;
