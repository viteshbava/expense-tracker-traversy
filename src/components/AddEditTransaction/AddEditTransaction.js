import React from "react";
import Button, { COLOR } from "../UI/Button/Button";

export default function AddEditTransaction(props) {
  return (
    <>
      <div>AddEditTransaction</div>
      <Button color={COLOR.PRIMARY}>Add Transaction</Button>
      <Button onClick={() => props.onCancel()} color={COLOR.SECONDARY}>
        Cancel
      </Button>
    </>
  );
}
