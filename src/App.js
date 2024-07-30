import { Component } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: [
        { id: 1, charge: "렌트비", amount: 1600 },
        { id: 2, charge: "교통비", amount: 400 },
        { id: 3, charge: "식비", amount: 1200 },
      ],
    };
  }

  handleDelete = (id) => {
    const newExpense = this.state.expense.filter(
      (expense) => expense.id !== id
    );
    console.log(newExpense);
    this.setState({ expense: newExpense });
  };

  render() {
    return (
      <main className="main-container">
        <h1>예산계산기</h1>
        <div
          style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}
        >
          {/* ExpenseForm */}
          <ExpenseForm />
        </div>
        <div
          style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}
        >
          {/* ExpenseList */}
          <ExpenseList
            initialExpenses={this.state.expense}
            handleDelete={this.handleDelete}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "end", margingTop: "1rem" }}
        >
          <p>
            총지출:
            <span>원</span>
          </p>
        </div>
      </main>
    );
  }
}
export default App;
