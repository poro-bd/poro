document.addEventListener('DOMContentLoaded', () => {
    const session = sessionStorage.getItem('session');
    if (!session) {
        window.location.href = '/login';
        return;
    }

    fetch(`${BASE_URL}/webhook/poro-profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'm',
            session: session
        })
    })
    .then(response => {
        if (response.status === 403) {
            window.location.href = '/login';
            return;
        }
        return response.json();
    })
    .then(data => {
        if (!data) return;
        const userProfile = document.querySelector('.user-profile');
        if (userProfile) {
            const userAvatar = userProfile.querySelector('.user-avatar');
            const userName = userProfile.querySelector('.user-name');
            const userMeta = userProfile.querySelector('.user-meta');

            if (data.photourl) {
                userAvatar.innerHTML = `<img src="${data.photourl}" alt="${data.name}" style="width: 100%; height: 100%; border-radius: 50%;">`;
            } else {
                userAvatar.textContent = data.name.charAt(0);
            }
            
            userName.textContent = data.name;

            const toRoman = (num) => {
                const roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
                let str = '';
                for (let i of Object.keys(roman)) {
                    let q = Math.floor(num / roman[i]);
                    num -= q * roman[i];
                    str += i.repeat(q);
                }
                return str;
            };

            userMeta.innerHTML = `${toRoman(data.class)} &bull; ${data.house} &bull; ${data.section}`;
        }
    })
    .catch(error => console.error('Error fetching user data:', error));
});