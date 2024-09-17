import React, { useState } from "react";

export default function TaiXiuGame() {
  const [selectedBet, setSelectedBet] = useState(''); // Quản lý lựa chọn của người dùng
  const [betAmount, setBetAmount] = useState(''); // Quản lý số tiền cược
  const [resultText, setResultText] = useState(''); // Kết quả
  const [countdown, setCountdown] = useState(3); // Thời gian đếm ngược

  // Hàm để thiết lập lựa chọn của người dùng
  const handleBetSelection = (choice) => {
    setSelectedBet(choice);
  };

  // Hàm để "quay" trò chơi
  const rollGame = () => {
    // Kiểm tra nếu người dùng chưa chọn Tài hoặc Xỉu
    if (selectedBet === '') {
      setResultText('Vui lòng chọn Tài hoặc Xỉu.');
      return;
    }

    // Kiểm tra số tiền đặt cược hợp lệ
    const bet = parseFloat(betAmount);
    if (isNaN(bet) || bet <= 0) {
      setResultText('Vui lòng nhập số tiền hợp lệ.');
      return;
    }

    setResultText('Đang xử lý...');
    setCountdown(3); // Bắt đầu đếm ngược

    let timeLeft = 3;
    const countdownInterval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);

        // Tạo một kết quả ngẫu nhiên cho trò chơi
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const dice3 = Math.floor(Math.random() * 6) + 1;

        const total = dice1 + dice2 + dice3;
        const outcome = total > 9 ? 'tai' : 'xiu';

        // Hiển thị kết quả
        if (selectedBet === outcome) {
          setResultText(
            `Bạn đã chọn ${selectedBet} và kết quả là ${total} (${outcome}). Chúc mừng bạn đã thắng! Số tiền bạn đặt cược là ${bet} đồng.`
          );
        } else {
          setResultText(
            `Bạn đã chọn ${selectedBet} và kết quả là ${total} (${outcome}). Rất tiếc, bạn đã thua. Số tiền bạn đặt cược là ${bet} đồng.`
          );
        }
      }
    }, 1000); // Cập nhật mỗi giây
  };

  return (
    <div id="game">
      <div>
        <button
          className={`option-button ${selectedBet === 'tai' ? 'selected' : ''}`}
          onClick={() => handleBetSelection('tai')}
        >
          Tài
        </button>
        <button
          className={`option-button ${selectedBet === 'xiu' ? 'selected' : ''}`}
          onClick={() => handleBetSelection('xiu')}
        >
          Xỉu
        </button>
      </div>
      <label htmlFor="amount">Số tiền đặt cược:</label>
      <input
        type="number"
        id="amount"
        min="1"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        placeholder="Nhập số tiền"
      />
      <button id="rollButton" onClick={rollGame}>
        Quay
      </button>
      <p id="result">{resultText}</p>
      <p id="countdown">Thời gian còn lại: {countdown} giây</p>
    </div>
  );
}
