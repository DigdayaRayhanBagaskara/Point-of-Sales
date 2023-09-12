import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../redux/features/counter/counterSlice";

import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

const CounterComponent = () => {
  const dispatch = useDispatch();
  const counterState = useSelector((state) => state.counter);

  useEffect(() => {
    dispatch(counterSlice.actions.setValue(5));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center border-2 border-blue-500 rounded">
      <h1 className="text-2xl">{counterState.value}</h1>
      <div className="flex flex-row gap-4">
        <Button onClick={() => dispatch(counterSlice.actions.increment())}>
          +1
        </Button>
        <Button onClick={() => dispatch(counterSlice.actions.decrement())}>
          -1
        </Button>
      </div>
    </div>
  );
};

export default CounterComponent;
