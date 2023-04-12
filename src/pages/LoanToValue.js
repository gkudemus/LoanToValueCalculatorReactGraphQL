import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_RESULT = gql`
  query getCalcResult($depositValue: Int!, $purchasePrice: Int!) {
    loanToValueCalc(
      depositValue: $depositValue
      purchasePrice: $purchasePrice
    ) {
      result
    }
  }
`;

const LoanToValue = () => {
  const [depositValue, setDepositValue] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [getResult, { loading, error, data, called }] = useLazyQuery(
    GET_RESULT,
    {
      variables: {
        depositValue,
        purchasePrice,
      },
    }
  );

  //check if graphql query works
  console.log({
    loading,
    error,
    called,
    data,
  });

  return (
    <div className="login-inputs">
      <h2>LOAN TO VALUE CALCULATOR</h2>
      <input
        className="input-deposit-value"
        type="text"
        value={depositValue}
        onChange={(e) => setDepositValue(e.target.value)}
        placeholder="Deposit Value"
      />
      <input
        className="input-purchase-price"
        type="text"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        placeholder="Purchase Price"
      />
      <button className="button-login" onClick={() => getResult()}>
        Calculate
      </button>
      {loading && <h3>calculating...</h3>}
      {error && <h3>something went wrong...</h3>}
      {data && <h3>Result: {data.loanToValueCalc.result}</h3>}
    </div>
  );
};

export default LoanToValue;
