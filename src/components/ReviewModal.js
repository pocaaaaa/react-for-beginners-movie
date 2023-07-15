import React, { useRef, useState } from "react";
import styles from "./ReviewModal.module.css";
import StarRating from "./StarRating";

const ReviewModal = ({ onClose, id, title, coverImg, year }) => {
  /* state */
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [review, setReview] = useState("");
  const [date, setDate] = useState("");

  /* ref */
  const userIdRef = useRef();
  const passwordRef = useRef();
  const reviewRef = useRef();
  const dateRef = useRef();

  /* function */
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

  const onSubmit = (event) => {
    event.preventDefault();
    if(!isValid()) return false;

  };

  const isValid = () => {
    if(!userId) {
      alert("Please enter your ID (email format).");
      userIdRef.current.focus();
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(userId)) {
      alert("This is not a valid ID format. Please make sure it's in email format.");
      userIdRef.current.focus();
      return false;
    }

    if(!password) {
      alert("Please enter your password.");
      passwordRef.current.focus();
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if(!passwordRegex.test(password)) {
      alert("Please enter 8 to 16 characters, including English, numbers, and special characters.");
      passwordRef.current.focus();
      return false;
    }

    if(!date) {
      alert("Please enter a date.");
      dateRef.current.focus();
      return false;
    }

    if(review.length < 200) {
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

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <div className={styles.review__header}>
          <div className={styles.review__image}>
            <img 
              src={!coverImg ? `${window.location.origin}/react-for-beginners-movie/icon/movie.png` : coverImg} alt={title} />
          </div>
          <div>
            <h2>{title}{`${year ? ' ('+year+')' : ''}`}</h2>
            <div className={styles.input__container}>
              <label htmlFor="id">ID (Email format)</label>
              <input
                type="email"
                id="userId"
                value={userId}
                onChange={handleIdChange}
                required
                style={{ width: "70%" }}
                ref={userIdRef}
              />
            </div>
            <div className={styles.input__container}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                style={{ width: "70%" }}
                ref={passwordRef}
              />
            </div>
            <div className={styles.input__container}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                required
                style={{ width: "70%" }}
                ref={dateRef}
              />
            </div>
          </div>
        </div>
        <div className={styles.input__container}>
          <label htmlFor="review">Review (Characters: {review.length})</label>
          <textarea
            id="review"
            value={review}
            onChange={handleReviewChange}
            required
            rows={8}
            ref={reviewRef}
          />
        </div>
        <div className={styles.input__container}>
          <label htmlFor="horoscope">Star Rating</label>
          <StarRating/>
        </div>
        <button type="submit" onClick={onSubmit} className={styles.btn__register}>
          Register
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;