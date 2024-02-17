import React, { useState } from 'react';
import './App.css'
import Header from './header';
const DepositCalculator = () => {
  const [duration, setDuration] = useState(24); // Əvvəldən təyin olunmuş 24 ay
  const [amount, setAmount] = useState(50); // Əvvəldən təyin olunmuş məbləğ
  const [interestRate, setInterestRate] = useState(10); // Əvvəldən təyin olunmuş faiz dərəcəsi
  const [maturityAmount, setMaturityAmount] = useState(null);

  const calculateInterestRate = (duration) => {
    switch (duration) {
      case 6:
        return 5;
      case 12:
        return 9.5;
      case 18:
        return 9.75;
      case 24:
        return 10;
      default:
        return 0;
    }
  };

  const calculateMaturityAmount = () => {
    const principal = parseFloat(amount);
    const rate = calculateInterestRate(duration) / 100;
    const time = parseInt(duration, 10);

    const maturityAmount = principal * Math.pow(1 + rate / 12, 12 * (time / 12));

    setMaturityAmount(maturityAmount.toFixed(2));
  };

  const handleDurationChange = (event) => {
    const newDuration = parseInt(event.target.value, 10);
    setDuration(newDuration);
    const newInterestRate = calculateInterestRate(newDuration);
    setInterestRate(newInterestRate);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <Header />
      <div className='container'>
        <label>
          Müddət (Ay):
          <input className='range-input' type="range" min={6} max={24} step={6} value={duration} onChange={handleDurationChange} />
          {duration} ay
        </label>
        <br />
        <label>
          Məbləğ (AZN):
          <input className='range-input' type="range" min={50} max={100000} step={50} value={amount} onChange={handleAmountChange} />
          {amount} AZN
        </label>
        <br />
        <p>İllik faiz dərəcəsi: {interestRate}%</p>
        <button onClick={calculateMaturityAmount}>Hesabla</button>
        <br />
        {maturityAmount !== null && (
          <div>
            <h2>Ödəmə məbləği::</h2>
            <p>{maturityAmount} AZN</p>
          </div>
        )}
      </div>
    </>

  );
};
export default DepositCalculator;
