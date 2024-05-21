import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transactions {
  description: string;
  value: string;
  type: string;
  date: string;
}

const transactions: Transactions[] = [
  {
    description: "Desenvolvimento de site",
    value: "R$ 12.000,00",
    type: "Venda",
    date: "13/04/2022"
  },
  {
    description: "Hamburger",
    value: "- R$ 59,00",
    type: "Alimentação",
    date: "10/04/2022"
  }
]


export function Transactions () {
  return (
    <div>
      <Header />

      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            { transactions.map((item) => (
              <tr key={item.description}>
                <td width="50%">{item.description}</td>
                <td>
                  <PriceHighLight variant={item.type === "Venda" ? "income" : "outcome"}>{ item.value }</PriceHighLight>
                </td>
                <td>{ item.type }</td>
                <td>{ item.date }</td>
              </tr>
            )) }
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
