
 function setActiveNavLink() {        //Para que cambie de color los nombres de la nav al cambiar  de página, teniendo en cuenta la url
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.pathname === window.location.pathname) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', setActiveNavLink);
  window.addEventListener('popstate', setActiveNavLink);
  

  function titilarTitulo() {         //Para darle movimiento al title de todas las páginas
    var titulo = document.title;
    var tituloAlternativo = "Welcome to " + titulo;
    var estado = false;
    setInterval(function() {
      document.title = estado ? titulo : tituloAlternativo;
      estado = !estado;
    }, 1000);
  }
  titilarTitulo();
  
