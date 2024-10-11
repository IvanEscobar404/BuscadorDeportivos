fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const searchInput = document.getElementById('search');
        const resultsContainer = document.getElementById('results');
        const itemsPerPage = 10;
        let currentPage = 1;
        
        function displayResults(results, page) {
            resultsContainer.innerHTML = ''; // Limpiar resultados previos
            let startIndex = (page - 1) * itemsPerPage;
            let endIndex = startIndex + itemsPerPage;
            let paginatedResults = results.slice(startIndex, endIndex);
            
            let row;
            paginatedResults.forEach((car, index) => {
                if (index % 2 === 0) {
                    row = document.createElement('div');
                    row.className = 'row mb-4';
                    resultsContainer.appendChild(row);
                }
                
                const col = document.createElement('div');
                col.className = 'col-md-6 mb-4 h-100';
                col.innerHTML = `
                    <div class="card h-100">
                        <img src="${car.img}" alt="${car.marca} ${car.modelo}" class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">${car.marca} ${car.modelo}</h5>
                            <p class="card-text">Año: ${car.año}</p>
                            <a href="detalles.html?id=${car.id}" class="btn btn-primary">Ver más</a>
                        </div>
                    </div>
                `;
                row.appendChild(col);
            });

            displayPagination(results.length);
        }

        function displayPagination(totalItems) {
            const paginationContainer = document.getElementById('pagination');
            paginationContainer.innerHTML = ''; 
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.className = 'btn btn-secondary mx-1';
                button.innerText = i;
                button.addEventListener('click', () => {
                    currentPage = i;
                    displayResults(data, currentPage);
                });
                paginationContainer.appendChild(button);
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredResults = data.filter(car => 
                car.marca.toLowerCase().includes(searchTerm) ||
                car.modelo.toLowerCase().includes(searchTerm) ||
                car.descripcion.toLowerCase().includes(searchTerm) ||
                car.año.toString().includes(searchTerm)
            );
            currentPage = 1;
            displayResults(filteredResults, currentPage);
        });

        displayResults(data, currentPage);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
