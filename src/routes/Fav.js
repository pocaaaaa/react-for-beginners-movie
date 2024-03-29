import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Fav.module.css";
import Nav from "../components/Nav";

const Fav = () => {
  /* state */
  const [loading, setLoading] = useState(true);
  const [favList, setFavList] = useState([]);
  const [search, setSearch] = useState("");
  
  /* function */
  const getFav = async() => {
    let favList = localStorage.getItem('favList');
    favList = favList ? JSON.parse(favList) : [];
    favList = search ? favList.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : favList;
    setFavList(favList);
    setLoading(false);
  };
  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  /* useEffect */
  useEffect(() => {
    getFav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // key는 React.js에서만 map안에서 component들을 render할 때 사용.
  return (
    <div className={styles.container}>
      {loading ? (
          <div className={styles.loader}>
            <img src={`${window.location.origin}/react-for-beginners-movie/icon/camera.gif`} alt="loading" className={styles.loading}/>
          </div>
        ) : (
          <div className={styles.moives__wrap}>
            <Nav 
              search={search}
              onChangeSearch={onChangeSearch}
            />
            {favList.length === 0 ? (
                <div className={styles.movies__nodata}>
                  { search ? '❌ No matching search results found.' : '🙏 Please make a favorite.' }
                </div>
              ) : (
                <div>
                  <div className={styles.movies}>
                    {favList.map((movie, index) => (
                      <Movie
                        key={index}
                        id={movie.id}
                        coverImg={movie.coverImg}
                        year={movie.year}
                        title={movie.title}
                        summary={movie.summary}
                        genres={movie.genres}
                        isFavPage={true}
                        setFavList={setFavList}
                      />
                    ))}
                  </div>
                </div>
              )
            }
          </div>
        )}
    </div>
  );
}

export default Fav;