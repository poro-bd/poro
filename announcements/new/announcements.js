function handleAnnouncementInput(textarea) {
    const addBtn = document.getElementById('addAnnouncementBtn');
    if (!addBtn) {
        return;
    }

    const value = textarea.value.trim();
    addBtn.disabled = value === '';
}

function handleAnnouncementEnter(event, textarea) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        addAnnouncement();
    }
}

function addAnnouncement() {
    const announcementInput = document.getElementById('announcementInput');
    const announcementsList = document.getElementById('announcementsList');
    const addBtn = document.getElementById('addAnnouncementBtn');

    if (!announcementInput || !announcementsList || !addBtn) {
        return;
    }

    const value = announcementInput.value.trim();
    if (value === '') {
        return;
    }

    const announcementItem = createAnnouncementItem(value);
    announcementsList.appendChild(announcementItem);

    announcementInput.value = '';
    addBtn.disabled = true;

    updateSubmitButtonState();
}

function createAnnouncementItem(text) {
    const announcementItem = document.createElement('div');
    announcementItem.className = 'announcement-item';
    announcementItem.innerHTML = `
        <span class="announcement-bullet">•</span>
        <div class="announcement-text">${text}</div>
        <button class="delete-announcement" onclick="deleteAnnouncementItem(this)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </button>
    `;
    return announcementItem;
}

function deleteAnnouncementItem(button) {
    const announcementItem = button.closest('.announcement-item');
    if (!announcementItem) {
        return;
    }

    announcementItem.classList.add('deleting');
    setTimeout(() => {
        announcementItem.remove();
        updateSubmitButtonState();
    }, 300);
}

function getAnnouncementsArray() {
    const announcementItems = document.querySelectorAll('.announcement-text');
    return Array.from(announcementItems).map(item => item.textContent.trim()).filter(Boolean);
}

function updateSubmitButtonState() {
    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) {
        return;
    }

    const hasAnnouncements = getAnnouncementsArray().length > 0;
    submitBtn.disabled = !hasAnnouncements;
    submitBtn.classList.toggle('active', hasAnnouncements);
    const label = submitBtn.querySelector('.submit-label');
    if (label) {
        label.textContent = 'Submit';
    }
    const icon = submitBtn.querySelector('.submit-icon');
    if (icon) {
        icon.classList.remove('loading');
    }
}

document.addEventListener('DOMContentLoaded', updateSubmitButtonState);
