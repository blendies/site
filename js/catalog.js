/** Gallery Filters **/
let selectedMaterial = "all";
let selectedType = "all";
let selectedStatus = "not";

function filterGallery() {
    let visibleCount = 0;
    filterTypeButtonFilters();
    document.querySelectorAll('.gallery-item').forEach(item => {
        const materials = item.getAttribute('data-material').split(' ');
        const types = item.getAttribute('data-type').split(' ');
        const statuses = item.getAttribute('data-status').split(' ');

        const matchMaterial = (selectedMaterial === "all" || materials.includes(selectedMaterial));
        const matchType = (selectedType === "all" || types.includes(selectedType));
        const matchStatus = (selectedStatus === "not" || statuses.includes(selectedStatus));

        const isVisible = matchMaterial && matchType && matchStatus;
        item.style.display = isVisible ? "block" : "none";

        if (isVisible) visibleCount++;
    });

    gallerytext = document.getElementById('gallerytext')
    if (visibleCount === 0) {
        gallerytext.textContent = 'no items here...';
        gallerytext.classList.remove('py-3');
        gallerytext.classList.add('py-5');
    }
    else {
        gallerytext.textContent = 'select picture for more information...';
        gallerytext.classList.remove('py-5');
        gallerytext.classList.add('py-3');
    }
    
    updateActiveButtons('.material-filter', selectedMaterial);
    updateActiveButtons('.type-filter', selectedType);
    updateActiveButtons('.status-filter', selectedStatus);    
}

function filterTypeButtonFilters() {
    if (selectedMaterial === "all") {
        document.querySelectorAll('[data-type]').forEach(el => {
            el.style.display = 'inline-block';
        });
        // document.querySelector('[data-type="all"]').style.display = "inline-block";
        // document.querySelector('[data-type="charm"]').style.display = "inline-block";
        // document.querySelector('[data-type="board"]').style.display = "inline-block";
        // document.querySelector('[data-type="coaster"]').style.display = "inline-block";
        // document.querySelector('[data-type="dice"]').style.display = "inline-block";
        // document.querySelector('[data-type="earring"]').style.display = "inline-block";
        // document.querySelector('[data-type="keychain"]').style.display = "inline-block";
        // document.querySelector('[data-type="magnet"]').style.display = "inline-block";
        // document.querySelector('[data-type="pen"]').style.display = "inline-block";
        // document.querySelector('[data-type="phone"]').style.display = "inline-block";
        // document.querySelector('[data-type="rest"]').style.display = "inline-block";
        // document.querySelector('[data-type="trinket"]').style.display = "inline-block";
        // document.querySelector('[data-type="tray"]').style.display = "inline-block";
    }
    else if (selectedMaterial === "clay") {
        document.querySelectorAll('[data-type]').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelector('[data-type="all"]').style.display = "inline-block";
        document.querySelector('[data-type="coaster"]').style.display = "inline-block";
        document.querySelector('[data-type="magnet"]').style.display = "inline-block";
        document.querySelector('[data-type="phone"]').style.display = "inline-block";
        document.querySelector('[data-type="rest"]').style.display = "inline-block";
        document.querySelector('[data-type="trinket"]').style.display = "inline-block";
        document.querySelector('[data-type="tray"]').style.display = "inline-block";
    }
    else if (selectedMaterial === "plastic") {
        document.querySelectorAll('[data-type]').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelector('[data-type="all"]').style.display = "inline-block";
        document.querySelector('[data-type="charm"]').style.display = "inline-block";
        document.querySelector('[data-type="earring"]').style.display = "inline-block";
        document.querySelector('[data-type="keychain"]').style.display = "inline-block";
    }
    else if (selectedMaterial === "wood") {
        document.querySelectorAll('[data-type]').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelector('[data-type="all"]').style.display = "inline-block";
        document.querySelector('[data-type="board"]').style.display = "inline-block";
        document.querySelector('[data-type="coaster"]').style.display = "inline-block";
        document.querySelector('[data-type="dice"]').style.display = "inline-block";
        document.querySelector('[data-type="keychain"]').style.display = "inline-block";
        document.querySelector('[data-type="pen"]').style.display = "inline-block";
    }
    else if (selectedMaterial === "crochet") {
        document.querySelectorAll('[data-type]').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelector('[data-type="all"]').style.display = "inline-block";
        document.querySelector('[data-type="charm"]').style.display = "inline-block";
        document.querySelector('[data-type="coaster"]').style.display = "inline-block";
        document.querySelector('[data-type="keychain"]').style.display = "inline-block";
    }   
}

function updateActiveButtons(selector, selectedValue) {
    document.querySelectorAll(selector).forEach(btn => {
        const value = btn.getAttribute('data-material') || btn.getAttribute('data-type') || btn.getAttribute('data-status');
        btn.classList.toggle('active', value === selectedValue);
    });
}

document.querySelectorAll('.material-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedMaterial = btn.getAttribute('data-material');
        filterGallery();
    });
});

document.querySelectorAll('.type-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedType = btn.getAttribute('data-type');
        filterGallery();
    });
});

document.querySelectorAll('.status-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedStatus = btn.getAttribute('data-status');
        filterGallery();
    });
});


/** Dynamic Modal Content **/
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    const parent = img.closest('.gallery-item');
    const title = parent.dataset.title;
    const description = parent.dataset.description;
    const size = parent.dataset.size || "lg";

    // Parse image sources (comma-separated or JSON array)
    let imgSrc = parent.dataset.img;
    let images = imgSrc.includes(',') ? imgSrc.split(',') : [imgSrc];

    // Update modal title and description
    document.getElementById('galleryModalLabel').textContent = title;
    document.getElementById('modalDescription').innerHTML = description;

    // Update modal size
    const modal_dialog = document.getElementById('galleryModalDialog');
    modal_dialog.classList.remove('modal-lg', 'modal-xl');
    modal_dialog.classList.add(`modal-${size}`);

    // Build image or carousel
    const container = document.getElementById('modalImageContainer');
    if (images.length === 1) {
      container.innerHTML = `<img src="${images[0].trim()}" alt="${title}" class="img-fluid border rounded popup-img-${size}" />`;
    } 
    else {
      const indicators = images.map((_, i) =>
        `<button type="button" data-bs-target="#modalCarousel" data-bs-slide-to="${i}" ${i === 0 ? 'class="active"' : ''} aria-label="Slide ${i + 1}"></button>`
      ).join('');

      const slides = images.map((src, i) =>
        `<div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img src="${images[i].trim()}" class="d-block w-100 border rounded popup-img-${size}" alt="${title} ${i + 1}" />
        </div>`
      ).join('');

      container.innerHTML = `
        <div id="modalCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">${indicators}</div>
          <div class="carousel-inner">${slides}</div>
          <button class="carousel-control-prev" type="button" data-bs-target="#modalCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#modalCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      `;
    }
  });
});