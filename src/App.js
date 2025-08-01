import React, { useState } from "react";
import "./styles.css";

function App() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [daysLived, setDaysLived] = useState(null);
  const [nextBirthday, setNextBirthday] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total days lived
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    setDaysLived(totalDays);

    // Next birthday countdown
    let nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = nextBday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setNextBirthday(diffDays);

    setAge({ years, months, days });
  };

  return (
    <div className="container fade-in">
      <h1 className="title bounce">🎂 Age Calculator</h1>

      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
        className="date-input"
      />

      <button onClick={calculateAge} className="btn">
        Calculate Age
      </button>

      {age && (
        <div className="result fade-in">
          <p>🎉 You are <strong>{age.years}</strong> years, <strong>{age.months}</strong> months, and <strong>{age.days}</strong> days old.</p>
          <p>📊 You have lived for <strong>{daysLived}</strong> days.</p>
          <p>⏳ Next birthday in <strong>{nextBirthday}</strong> days.</p>
        </div>
      )}
    </div>
  );
}

export default App;
