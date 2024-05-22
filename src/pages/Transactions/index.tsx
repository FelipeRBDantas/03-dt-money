import { useContext } from "react";

import { TransactionsContext } from "../../contexts/TransactionsContext";

import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions () {
  const { transactions } = useContext(TransactionsContext)

  return (
    <div>
      <Header />

      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            { transactions &&transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.title}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>{ transaction.price }</PriceHighLight>
                </td>
                <td>{ transaction.category }</td>
                <td>{ transaction.createdAt }</td>
              </tr>
            )) }
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
