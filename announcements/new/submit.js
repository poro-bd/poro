async function submitAnnouncement() {
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    const statusText = document.getElementById('statusText');

    if (!submitBtn || !statusMessage || !statusText) {
        return;
    }

    const session = sessionStorage.getItem('session');
    if (!session) {
        window.location.href = '/login';
        return;
    }

    const announcements = typeof getAnnouncementsArray === 'function' ? getAnnouncementsArray() : [];
    if (!announcements || announcements.length === 0) {
        displayStatus('Please add at least one announcement.', 'error');
        return;
    }

    setSubmittingState(true);

    try {
        const payload = {
            session: session,
            date: typeof getFormattedDateForAPI === 'function' ? getFormattedDateForAPI() : '',
            announcements: announcements,
            priority: document.getElementById('prioritySelect')?.value || 'normal',
            tags: typeof getTagsArray === 'function' ? getTagsArray() : []
        };

        const response = await fetch(`${BASE_URL}/webhook/poro-announcements-add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.status === 403) {
            window.location.href = '/login';
            return;
        }

        if (response.status === 200) {
            displayStatus('Announcement submitted successfully!', 'success');
            setTimeout(() => {
                window.location.href = '/announcements';
            }, 2000);
        } else {
            const errorData = await response.json().catch(() => ({}));
            displayStatus(errorData.message || 'Error submitting announcement. Please try again.', 'error', 5000);
        }
    } catch (error) {
        console.error('Error submitting announcement:', error);
        displayStatus('Error submitting announcement. Please try again.', 'error', 5000);
    } finally {
        setSubmittingState(false);
    }
}

function displayStatus(message, type, duration = 3000) {
    const statusMessage = document.getElementById('statusMessage');
    const statusText = document.getElementById('statusText');
    const statusIcon = statusMessage ? statusMessage.querySelector('.status-icon') : null;

    if (!statusMessage || !statusText) {
        return;
    }

    statusMessage.className = `status-message ${type} show`;
    statusText.textContent = message;

    if (statusIcon) {
        if (type === 'success') {
            statusIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12 3.41 13.41 9 19 21 7 19.59 5.59z"/>
                </svg>
            `;
            statusIcon.classList.remove('shake');
        } else if (type === 'error') {
            statusIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18.3 5.71L13.41 10.6 18.3 15.49 16.89 16.9 12 12.01 7.11 16.9 5.7 15.49 10.59 10.6 5.7 5.71 7.11 4.3 12 9.19 16.89 4.3z"/>
                </svg>
            `;
            statusIcon.classList.add('shake');
            setTimeout(() => statusIcon.classList.remove('shake'), 1000);
        }
    }

    if (duration) {
        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, duration);
    }
}

function setSubmittingState(isSubmitting) {
    const submitBtn = document.getElementById('submitBtn');

    if (!submitBtn) {
        return;
    }

    const label = submitBtn.querySelector('.submit-label');
    const icon = submitBtn.querySelector('.submit-icon');

    if (isSubmitting) {
        submitBtn.disabled = true;
        submitBtn.classList.remove('active');
        if (label) {
            label.textContent = 'Submitting...';
        }
        if (icon) {
            icon.classList.add('loading');
        }
    } else {
        if (icon) {
            icon.classList.remove('loading');
        }

        if (typeof updateSubmitButtonState === 'function') {
            updateSubmitButtonState();
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.add('active');
            if (label) {
                label.textContent = 'Submit';
            }
        }
    }
}
