import styled from "@emotion/styled";
import StarInput from "./StarInput";

// 출처 : DDD120님의 블로그 (https://ddd120.tistory.com/40) 자료를 인용해서 만든것입니다.
const Base = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 35px;
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translateY(2px);
  padding-left: 0px;
  padding-top: 0px;
  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: orange;
  }
`;

const NewStarRating = ({starClick}) => {
  return (
    <Base>
      <RatingField>
        <StarInput
          onClickRating={starClick}
          value={5}
          isHalf={false}
        />
        <StarInput
          onClickRating={starClick}
          value={4.5}
          isHalf={true}
        />
        <StarInput
          onClickRating={starClick}
          value={4}
          isHalf={false}
        />
        <StarInput
          onClickRating={starClick}
          value={3.5}
          isHalf={true}
        />
        <StarInput
          onClickRating={starClick}
          value={3}
          isHalf={false}
        />
        <StarInput
          onClickRating={starClick}
          value={2.5}
          isHalf={true}
        />
        <StarInput
          onClickRating={starClick}
          value={2}
          isHalf={false}
        />
        <StarInput
          onClickRating={starClick}
          value={1.5}
          isHalf={true}
        />
        <StarInput
          onClickRating={starClick}
          value={1}
          isHalf={false}
        />
        <StarInput
          onClickRating={starClick}
          value={0.5}
          isHalf={true}
        />
      </RatingField>
    </Base>
  );
};

export default NewStarRating;