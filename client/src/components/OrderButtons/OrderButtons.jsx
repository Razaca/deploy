import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderByName, orderByRating, reverseOrder } from "../../store/actions";
import Button from "../Button/Button";
import s from "./OrderButtons.module.css";

const OrderButtons = () => {
  const dispatch = useDispatch();
  const [ascendente, setAsendente] = useState(true);

  return (
    <div className={s.OrderButtons}>
      <span>orden:</span>
      <Button
        fn={() => {
          setAsendente(!ascendente);
          dispatch(reverseOrder())
        }}
      >
        {ascendente ? "↓" : "↑"}
      </Button>
      <Button fn={() => dispatch(orderByName())}>name</Button>
      <Button fn={() => dispatch(orderByRating())}>rating</Button>
    </div>
  );
};

export default OrderButtons;
