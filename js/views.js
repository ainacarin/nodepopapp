export const advertisementView = (advertisement) => {
    return `<div class="card">
    <div class="card-header">
    <div class="card-header-title is-centered">
    ${advertisement.name}
    </div>
    </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="subtitle is-6">${advertisement.saleText}</p>
            <p class="title is-4">${advertisement.price}</p>
          </div>
        </div>
      </div>
      <div class="card-image">
          <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
          </figure>
      </div>
    </div>`;
  };
  // <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">


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
}