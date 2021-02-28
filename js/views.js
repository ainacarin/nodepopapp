export const advertisementView = (advertisement) => {
  let buttonDetailHTML =  '<button class="button is-primary">Ver detalle</button>';
  let imgHTML = '';
    if (advertisement.image) {
      imgHTML = `<div class="card-image">
        <figure class="image is-4by3">
          <img src="${advertisement.image}" alt="Placeholder image">
        </figure>
        </div>`;
    }
    return `<div class="card is-one-third card-item">
    <div class="card-header">
    <div class="card-header-title is-centered">
    ${advertisement.name}
    </div>
    </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
          <p class="title is-4 is-pulled-right">${advertisement.price}</p>
            <p class="subtitle is-6">${advertisement.saleText}</p>
            <p class="subtitle is-7">${advertisement.user.username}</p>
            <p class="field is-pulled-right">${buttonDetailHTML}</p>
          </div>
        </div>
      </div>
      ${imgHTML}
    </div>`;
  };



export const errorView = (error) => {
  return `<article class="message is-danger">
  <div class="message-header">
    <p>Error</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body">
    ${error}
  </div>
</article>`
};

export const advertisementDetailView = (advertisement) => {
  let buttonDeleteHTML =   '';
  if(advertisement.isFromCurrentUser){
    buttonDeleteHTML =  '<button class="button is-primary">Borrar</button>';
  }
  let imgHTML = '';
    if (advertisement.image) {
      imgHTML = `<div class="card-image">
        <figure class="image is-4by3">
          <img src="${advertisement.image}" alt="Placeholder image">
        </figure>
        </div>`;
    }
    return `<div class="card detail-card">
    <div class="card-header">
        <div class="card-header-title is-centered">
        ${advertisement.name}
        </div>
    </div>
    <div class="card-header">
        <div class="card-header-title is-centered subtitle is-6">${advertisement.saleText}</div>
        <div class="card-header-title is-centered subtitle is-5">${advertisement.price}</div>
        <div class="card-header-title is-centered subtitle is-7">${advertisement.user.username}</div>
    </div>
    <div class="card-content">
      ${imgHTML}
    </div>
</div>
<div class="field button-delete is-pulled-right">
  ${buttonDeleteHTML}
</div>`
  };

  export const emptyAdvertisementsList =  `<div class="card card-empty-item">
    <div class="card-header">
    <div class="card-header-title is-centered">
    No hay anuncios para mostrar
    </div>
    </div>
    </div>`;
