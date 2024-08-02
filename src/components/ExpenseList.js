import React from "react";
import "./ExpenseList.css";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ handleDelete, expense, handleEdit, clearItems }) => {
  console.log(expense);
  return (
    <>
      <ul className="list">
        {/*ExpenseItem  */}
        {expense.map((expense) => {
          return (
            <ExpenseItem
              expense={expense}
              key={expense.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expense.length > 0 && (
        <button className="btn" onClick={clearItems}>
          지우기
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
