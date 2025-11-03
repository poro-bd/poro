(function() {
    
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded and parsed. Fetching college data in 500ms...');
        setTimeout(fetchCollegeData, 500);
    });

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const container = document.querySelector('.container');

        if (container) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down - should shrink
                container.classList.add('shrunken');
            } else {
                // Scrolling up - should be original size
                container.classList.remove('shrunken');
            }
        }

        lastScrollY = currentScrollY;
    });

    async function fetchCollegeData() {
        const cachedData = sessionStorage.getItem('collegeData');
        const cachedTimestamp = sessionStorage.getItem('collegeDataTimestamp');

        if (cachedData && cachedTimestamp) {
            const age = Date.now() - parseInt(cachedTimestamp, 10);
            if (age < CACHE_DURATION) {
                console.log('Using cached college data.');
                updateCollegeLogo(JSON.parse(cachedData));
                return;
            } else {
                console.log('Cached college data is stale. Fetching new data.');
            }
        }

        const session = sessionStorage.getItem('session');
        console.log('Retrieved session key:', session);

        if (!session) {
            console.error('No session found in session storage. Aborting fetch.');
            return;
        }

        console.log('Fetching college data from:', `${BASE_URL}/webhook/poro-college`);

        try {
            const response = await fetch(`${BASE_URL}/webhook/poro-college`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session: session }),
            });

            console.log('Received response from server:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Parsed JSON data:', data);

            // Cache the new data and timestamp
            sessionStorage.setItem('collegeData', JSON.stringify(data));
            sessionStorage.setItem('collegeDataTimestamp', Date.now().toString());
            console.log('College data cached in session storage.');

            updateCollegeLogo(data);

        } catch (error) {
            console.error('Error fetching or processing college data:', error);
        }
    }

    async function updateCollegeLogo(data) {
        console.log('Updating college logo with data:', data);
        const { collegeName, collegeEIIN, college_pfp } = data;

        const logo = document.querySelector('.logo');
        const card = document.querySelector('.card');
        const cardName = document.querySelector('.college-name');
        const cardEIIN = document.querySelector('.eiin-number');

        if (logo) {
            if (college_pfp) {
                console.log('Updating logo with profile picture:', college_pfp);
                logo.innerHTML = ''; // Clear existing content
                const img = document.createElement('img');
                img.alt = collegeName ? collegeName.charAt(0) : 'Logo';
                img.classList.add('college-logo-pfp');

                try {
                    const imageResponse = await fetch(`${BASE_URL}/webhook/poro-college-imageloader`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ college_pfp: college_pfp }),
                    });

                    if (!imageResponse.ok) {
                        throw new Error(`Failed to load image from imageloader: ${imageResponse.statusText}`);
                    }

                    const imageBlob = await imageResponse.blob();
                    img.src = URL.createObjectURL(imageBlob); // Create an object URL from the blob

                    img.onload = () => {
                        URL.revokeObjectURL(img.src); // Clean up the object URL after loading
                        const colorThief = new ColorThief();
                        const palette = colorThief.getPalette(img, 5);
                        const bg = card.querySelector('.bg');

                        if (bg && palette) {
                            const gradient = `linear-gradient(270deg, rgb(${palette[0]}), rgb(${palette[1]}), rgb(${palette[2]}), rgb(${palette[3]}))`;
                            bg.style.backgroundImage = gradient;
                        }
                    };

                    img.onerror = () => {
                        console.error('Error loading proxied image.');
                        URL.revokeObjectURL(img.src);
                        // Fallback if image fails to load
                        if (collegeName) {
                            logo.textContent = collegeName.charAt(0);
                        }
                    };

                } catch (error) {
                    console.error('Error fetching image via imageloader:', error);
                    // Fallback if fetch fails
                    if (collegeName) {
                        logo.textContent = collegeName.charAt(0);
                    }
                }

                logo.appendChild(img);
            } else if (collegeName) {
                console.log('Updating logo text content to:', collegeName.charAt(0));
                logo.textContent = collegeName.charAt(0);
            } else {
                console.warn('Could not find college_pfp or collegeName to update logo.');
            }
        } else {
            console.warn('Could not find .logo element.');
        }

        if (cardName) {
            console.log('Updating college name text content to:', collegeName);
            cardName.textContent = collegeName;
        } else {
            console.warn('Could not find .college-name element.');
        }

        if (cardEIIN) {
            console.log('Updating EIIN number text content to:', collegeEIIN);
            cardEIIN.textContent = collegeEIIN;
        } else {
            console.warn('Could not find .eiin-number element.');
        }
    }
})();
