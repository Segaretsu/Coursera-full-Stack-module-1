$(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
  $('.carousel').carousel({
    interval: 2000
  });
  $('#contacto').on('show.bs.modal', function (e){
    console.log('El modal contacto se esta mostrando');
    console.log(e)
    $('.contactoBtn').removeClass('btn-outline-success');
    $('.contactoBtn').addClass('btn-primary');
    $('.contactoBtn').prop('disabled', true);
  });
  $('#contacto').on('shown.bs.modal', function (e){
    console.log('El modal contacto se mostró');
  });
  $('#contacto').on('hide.bs.modal', function (e){
    console.log('El modal contacto se oculta');
  });
  $('#contacto').on('hidden.bs.modal', function (e){
    console.log('El modal contacto se ocultó');
    $('.contactoBtn').prop('disabled', false);
  });
});
