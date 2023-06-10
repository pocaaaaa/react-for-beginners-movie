import React, { useState } from "react";
import styles from "./ReviewModal.module.css";

const ReviewModal = ({ onClose, id, title, coverImg, year }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [review, setReview] = useState("");
  const [date, setDate] = useState("");

  const handleIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail(userId)) {
      alert(
        "This is not a valid ID format. Please make sure it's in email format."
      );
      return;
    }
    if (!isValidPassword(password)) {
      alert(
        "The password is not correct. Please include English, numbers, and special characters."
      );
      return;
    }
    if (review.length < 200) {
      alert("Review is at least 200 characters.");
      return;
    }
    // Perform registration logic here
    console.log("ID:", userId);
    console.log("Password:", password);
    console.log("Review:", review);
    console.log("Date:", date);
    onClose(); // Close the modal after registration
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Password validation rules
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <img 
          src={!coverImg ? `${window.location.origin}/react-for-beginners-movie/icon/movie.png` : coverImg} 
          alt={title} 
        />
        <h2>{title}{`${year ? ' ('+year+')' : ''}`}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.input__container}>
            <label htmlFor="id">ID (Email format):</label>
            <input
              type="email"
              id="userId"
              value={userId}
              onChange={handleIdChange}
              required
              style={{ width: "50%" }}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={{ width: "50%" }}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              required
              style={{ width: "50%" }}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              value={review}
              onChange={handleReviewChange}
              required
              rows={8}
            />
            {review.length >= 200 && (
              <div className={styles.character__count}>
                Characters entered: {review.length}
              </div>
            )}
          </div>
          <div className={styles.input__container}>
            <label htmlFor="horoscope">Horoscope Rating:</label>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;