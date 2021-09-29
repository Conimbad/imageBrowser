import "./App.css";
import React, { Component } from "react";
import Buscador from "./Components/Buscador";
import Resultado from "./Components/Resultado";

class App extends Component {
  state = {
    imagenes: [],
    pagina: "",
    termino: "",
    total: "",
  };
  scroll = () => {
    const elemento = document.querySelector(".jumbotron");
    elemento.scrollIntoView("smooth", "end");
  };

  paginaAnterior = () => {
    // Leer el state de la página actual:
    let pagina = this.state.pagina;
    // Si pagina es igual a 1 no ir hacia atrás
    if (pagina === 1) return;
    // Sumar uno a la página actual:
    pagina -= 1;
    // Sumar el cambio al state:
    this.setState(
      {
        pagina: pagina,
      },
      () => {
        this.consultarApi();
        this.scroll();
      }
    );
    /* console.log(pagina); */
  };
  paginaSiguiente = () => {
    // Leer el state de la página actual:
    let pagina = this.state.pagina;
    // Sumar uno a la página actual:
    pagina += 1;
    // Sumar el cambio al state:
    this.setState(
      {
        pagina: pagina,
      },
      () => {
        this.consultarApi();
        this.scroll();
      }
    );
    /* console.log(pagina); */
  };

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=23595593-78596aa6693ce8546da9310bc&q=${termino}&per_page=30&page=${pagina}`;
    // console.log(url);
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((resultado) =>
        this.setState({ imagenes: resultado.hits, total: resultado.totalHits })
      );
  };

  datosBusqueda = (termino) => {
    this.setState(
      {
        termino: termino,
        pagina: 1,
      },
      () => {
        this.consultarApi();
      }
    );
  };

  render() {
    return (
      <div className="app container pt-5">
        <div className="jumbotron ">
          <p className="lead text-center text-light display-6">
            Buscador de imágenes
          </p>
          <br />
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>

        <div className="row">
          <Resultado
            imagenes={this.state.imagenes}
            total={this.state.total}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
