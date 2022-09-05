import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, increase, clear, toggle} from "../../store/counter-slice"
import classes from "./Counter.module.css";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.toggler);
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(increment());
  };
  const increaseHandler = () => {
    dispatch(increase(5));
  };
  const decrementHandler = () => {
    dispatch(decrement());
  };
  const clearHandler = () => {
    dispatch(clear());
  };

  const toggleCounterHandler = () => {
    dispatch(toggle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={clearHandler}>Clear</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
