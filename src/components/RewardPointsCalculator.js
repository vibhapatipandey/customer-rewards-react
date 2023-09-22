import React, { useState } from 'react';
import './RewardPointsCalculator.css';


function RewardPointsCalculator() {
  const [transactions, setTransactions] = useState([{ date: '09/2023', amount: 140 },{ date: '06/2023', amount: 90 }]);
  const [rewardPoints, setRewardPoints] = useState({ totalPoints: 0, monthlyPoints: {} });

  const handleTransactionChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTransactions = [...transactions];
    updatedTransactions[index][name] = parseFloat(value);
    setTransactions(updatedTransactions);
  };

  const calculatePoints = () => {
    const monthlyPoints = {};
    let totalPoints = 0;

    transactions.forEach((transaction) => {
      let points = 0;
      if (transaction.amount > 100) {
        points += 2 * (transaction.amount - 100);
      }
      if (transaction.amount > 50) {
        points += 1 * (transaction.amount - 50);
      }

      totalPoints += points;

      // Assuming transaction date format is MM/YYYY
      const [month, year] = transaction.date.split('/');
      const key = `${month}/${year}`;
      if (!monthlyPoints[key]) {
        monthlyPoints[key] = 0;
      }
      monthlyPoints[key] += points;
    });

    setRewardPoints({ totalPoints, monthlyPoints });
  };

  return (
    <div>
      <h1>Reward Points Calculator</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount ($)</th>
          </tr>
          
        </thead>
        
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>
              <input
                type="text"
                name="date"
                placeholder="MM/YYYY"
                value={transaction.date}
                onChange={(e) => handleTransactionChange(e, index)}
              />
              </td>
              <td>
                <input
                type="number"
                name="Amount ($)"
                value={transaction.amount}
                onChange={(e) => handleTransactionChange(e, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={calculatePoints}>Calculate Points</button>
      <h2>Total Reward Points: {rewardPoints.totalPoints}</h2>
      <h2>Monthly Reward Points:</h2>
      <ul>
        {Object.keys(rewardPoints.monthlyPoints).map((key) => (
          <li key={key}>
            {key}: {rewardPoints.monthlyPoints[key]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RewardPointsCalculator;
