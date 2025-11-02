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

    document.getElementById('noitem').style.display = visibleCount === 0 ? "block" : "none";

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
        const imgSrc = parent.dataset.img;
        const description = parent.dataset.description;
        const size = parent.dataset.size || "lg";

        // Update modal content
        document.getElementById('galleryModalLabel').textContent = title;
        document.getElementById('modalImage').src = imgSrc;
        document.getElementById('modalImage').alt = title;
        document.getElementById('modalDescription').innerHTML = description;

        // Update modal size class
        const modal_dialog = document.getElementById('galleryModalDialog');
        modal_dialog.classList.remove('modal-lg', 'modal-xl');
        modal_dialog.classList.add(`modal-${size}`);
        const modal_img = document.getElementById('modalImage');
        modal_img.classList.remove('popup-img-lg', 'popup-img-xl');
        modal_img.classList.add(`popup-img-${size}`);
    });
});
