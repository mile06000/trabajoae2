$(document).ready(function () {
  const $imagenes = $('.galeria img');
  const $modal = $('#modal');
  const $modalImg = $('#imagen-grande');
  const $cerrar = $('.cerrar');
  const $siguiente = $('.siguiente');
  const $anterior = $('.anterior');
  let indiceActual = 0;

  function mostrarModal(index) {
    indiceActual = index;
    const src = $imagenes.eq(index).attr('src');
    $modalImg.attr('src', src);
    $modal.fadeIn();
  }

  $imagenes.on('click', function () {
    const index = parseInt($(this).data('index'));
    mostrarModal(index);
  });

  $cerrar.on('click', function () {
    $modal.fadeOut();
  });

  $modal.on('click', function (e) {
    if (e.target === this) {
      $modal.fadeOut();
    }
  });

  $siguiente.on('click', function () {
    indiceActual = (indiceActual + 1) % $imagenes.length;
    mostrarModal(indiceActual);
  });

  $anterior.on('click', function () {
    indiceActual = (indiceActual - 1 + $imagenes.length) % $imagenes.length;
    mostrarModal(indiceActual);
  });
});
