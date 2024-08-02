import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
import "./App.css";
const App = () => {
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);

  const [expense, setExpense] = useState([
    { id: 1, charge: "렌트비", amount: 1600 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 1200 },
  ]);

  const handleDelete = (id) => {
    const newExpense = expense.filter((expense) => expense.id !== id);
    console.log(newExpense);
    setExpense(newExpense);
    handleAlert({
      type: "danger",
      text: "아이템이 삭제되었습니다.",
    });
  };

  const handleCharge = (e) => {
    //console.log(e.target.value);
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    //console.log(e);
    setAmount(e.target.valueAsNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const newExpense = expense.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpense(newExpense);
        setEdit(false);
        handleAlert({ type: "success", text: "아이템이 수정되었습니다." });
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };

        //불변성을  지켜주기 위해서 새로운 expense 생성
        const newExpenses = [...expense, newExpense];
        setExpense(newExpenses);
        handleAlert({
          type: "success",
          text: "아이템이 생성되었습니다.",
        });
      }
      setCharge("");
      setAmount(0);
    } else {
      console.log("error");
      handleAlert({
        type: "denger",
        text: "charge는 빈 값일 수 없으며 amount는 0 보다 커야합니다.",
      });
    }
  };

  //alert 창 만들기
  const [alert, setAlert] = useState({ show: false });
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  //지출 항목 수정기능 구현
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const handleEdit = (id) => {
    const updateExpense = expense.find((item) => item.id === id);
    const { charge, amount } = updateExpense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  };

  //목록 전체 삭제
  const clearItems = () => {
    setExpense([]);
  };

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}

      <h1>예산계산기</h1>
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        {/* ExpenseForm */}
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        {/* ExpenseList */}
        <ExpenseList
          expense={expense}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
      >
        <p style={{ fontSize: "2rem" }}>
          총지출:
          <span>
            {" "}
            {expense.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
};
export default App;
