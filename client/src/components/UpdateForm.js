import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValue = {
  id: Date.now(),
  title: '',
  director: '',
  metascore: '',
  stars: []
};


const UpdateForm = props => {

  const { id } = useParams();
  const history = useHistory(); 
  useEffect(() => {
    if (id) {
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        setMovie(res.data)
    })
    .catch(err => 
        console.log( "error", err.res)
    )}

  }, [ id]);

  const [movie, setMovie] = useState(initialValue);

  const changeHandler = e => {
    if (e.target.name !== 'stars'){
        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
        })
    } else {        
        setMovie({
            ...movie,
            stars: [...e.target.value.split(",")]
        })
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res =>  console.log(res)
        // props.history.push(`/movies/${id}`);
      )
      .catch(err => console.log(err.res));
      history.push('/')
  };

  return (
    <div>
      <h2>Update Movie</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />
        <input
        placeholder="Movie Stars"
        name="stars"
        value={movie.stars}
        onChange={changeHandler}
      />

        <button onclick={handleSubmit}>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
