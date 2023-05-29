import PropTypes from "prop-types";

// css 파일로 작성했지만 create-react-app은 이 CSS 코드를 javascript Object 로 변환.
// javascript Object 는 btn 을 안에서 가지고 있음.
// [Element] class="Button_btn__F4YlC"
// create-react-app은 무작위적인 램덤 class를 가짐.
//  => style을 Module 처럼 사용 가능.
//  => 동일한 class 이름(btn)을 다른 파일 내에서도 사용할 수 있음.
import styles from "./Button.module.css";

function Button({text}) {
  return (
    <button className={styles.btn}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string
}

export default Button;