/** Gallery Filters **/
let selectedMaterial = "all";
let selectedType = "all";

function filterGallery() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        const materials = item.getAttribute('data-material').split(' ');
        const types = item.getAttribute('data-type').split(' ');

        const matchMaterial = (selectedMaterial === "all" || materials.includes(selectedMaterial));
        const matchType = (selectedType === "all" || types.includes(selectedType));

        item.style.display = (matchMaterial && matchType) ? "block" : "none";
    });

    updateActiveButtons('.material-filter', selectedMaterial);
    updateActiveButtons('.type-filter', selectedType);
    updateSelectedText();
}

function updateActiveButtons(selector, selectedValue) {
    document.querySelectorAll(selector).forEach(btn => {
        const value = btn.getAttribute('data-material') || btn.getAttribute('data-type');
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
