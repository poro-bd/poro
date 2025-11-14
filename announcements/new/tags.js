function handleTagEnter(event, input) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTag();
    }
}

function addTag() {
    const tagInput = document.getElementById('tagInput');
    const tagsList = document.getElementById('tagsList');

    if (!tagInput || !tagsList) {
        return;
    }

    const value = tagInput.value.trim();
    if (value === '') {
        return;
    }

    const existingTags = Array.from(tagsList.querySelectorAll('.tag-text'));
    const tagExists = existingTags.some(tag => tag.textContent.trim().toLowerCase() === value.toLowerCase());

    if (tagExists) {
        tagInput.value = '';
        return;
    }

    const tagItem = createTagItem(value);
    tagsList.appendChild(tagItem);

    tagInput.value = '';
}

function createTagItem(text) {
    const tagItem = document.createElement('div');
    tagItem.className = 'tag-item';
    tagItem.innerHTML = `
        <span class="tag-text">${text}</span>
        <button class="delete-tag" onclick="deleteTagItem(this)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </button>
    `;
    return tagItem;
}

function deleteTagItem(button) {
    const tagItem = button.closest('.tag-item');
    if (tagItem) {
        tagItem.remove();
    }
}

function getTagsArray() {
    const tagItems = document.querySelectorAll('.tag-text');
    return Array.from(tagItems).map(item => item.textContent.trim()).filter(Boolean);
}


