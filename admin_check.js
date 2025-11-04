document.addEventListener('DOMContentLoaded', () => {
    const session = sessionStorage.getItem('session');
    if (session) {
        fetch(`${BASE_URL}/webhook/poro-adminChecker`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: session })
        })
        .then(response => {
            if (response.status === 200) {
                const fab = document.createElement('button');
                fab.classList.add('fab');
                fab.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>`;
                fab.onclick = () => {
                    if (typeof openModal === 'function') {
                        openModal();
                    } else {
                        console.log('openModal function not found');
                    }
                };
                document.body.appendChild(fab);

                const fabStyle = document.createElement('style');
                fabStyle.innerHTML = `
                    .fab {
                        position: fixed;
                        bottom: 30px;
                        right: 30px;
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, #ff6b6b 0%, #f093fb 100%);
                        border: none;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                        z-index: 1000;
                        transition: all 0.3s ease;
                    }
                    .fab:hover {
                        transform: scale(1.1);
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
                    }
                    .fab svg {
                        width: 30px;
                        height: 30px;
                        fill: white;
                    }
                `;
                document.head.appendChild(fabStyle);
            }
        })
        .catch(error => console.error('Error checking admin status:', error));
    }
});