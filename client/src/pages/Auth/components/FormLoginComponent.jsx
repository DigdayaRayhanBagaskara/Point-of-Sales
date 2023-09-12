import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

const FormLoginComponent = () => {
  const [formLoginData, setFormLoginData] = useState({
    username: "",
    password: "",
  });

  const submitHandler = () => {
    console.log(formLoginData);
  };

  return (
    <form className="flex flex-col gap-4 my-4">
      <Input
        label="Username or Email"
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
