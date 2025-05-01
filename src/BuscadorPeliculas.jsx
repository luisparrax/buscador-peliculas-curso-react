import { useState } from "react"

export const BuscadorPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODI5YjkxYjM3NzcwNTYxMjVkOGFjMDMxODI2MjkyYiIsIm5iZiI6MS43NDYwNTgyNzY5MzI5OTk4ZSs5LCJzdWIiOiI2ODEyYmMyNGRlMDI4NDcyNjdhMGVmYWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pLDlIgxHVhDR86SvZVCyefCiscNW4M4bS92EaCNDtA4'

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBusqueda(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    const fetchPeliculas = async () => {
        try {
            const response = await fetch(
                `${urlBase}?query=${encodeURIComponent(busqueda)}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });

            const data = await response.json();
            setPeliculas(data.results);
        } catch (err) {
            console.error('Error fetching movies:', err);
        }
    };


    return (
        <div className="container">
            <h1 className="title">Buscador de Peliculas</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Buscador</button>
            </form>
            <div className="movie-list">
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
 
                    </div>
                ))}
            </div>
        </div>
    )
}

