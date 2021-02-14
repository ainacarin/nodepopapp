export const advertisementView = (advertisement) => {
    return `<div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${advertisement.name}</p>
            <p class="subtitle is-6">${advertisement.sale}</p>
            <p class="stitle is-4">${advertisement.price}</p>
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