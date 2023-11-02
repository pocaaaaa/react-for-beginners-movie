import styled from "@emotion/styled";

const MovieReview = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #CBEDF1;
`;

const MovieImage = styled.img`
  width: 100px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const MovieDetail = styled.div`
  flex: 1;
`;

const MovieTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const MovieDate = styled.div`
  font-size: 14px;
  color: #888;
`;

const MovieReviewText = styled.div`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.5;
`;

const StarContainer = styled.div`
  display: inline-block;
  margin-top: 10px;
`;

const Star = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url('https://i.imgur.com/57Q7fLd.png');
  background-size: contain;
  margin-right: 2px;
`;

const ReviewDetail = () => {
  return (
    <MovieReview>
      <MovieImage src="movie1.jpg" alt="Movie 1" />
      <MovieDetail>
        <MovieTitle>Movie Title 1</MovieTitle>
        <MovieDate>Watched on: 2023-06-15</MovieDate>
        <MovieReviewText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae velit quis enim mollis elementum vel nec velit.
        </MovieReviewText>
        <StarContainer>
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <Star></Star>
        </StarContainer>
      </MovieDetail>
    </MovieReview>
  )
}

export default ReviewDetail;