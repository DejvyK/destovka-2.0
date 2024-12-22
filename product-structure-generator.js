class ProductStructureGenerator {
    formatPrice(price) {
        const [value, currency] = price.split(' ');
        return `${parseInt(value).toLocaleString('cs-CZ')} Kč`;
    }
    
    createProductItem(data, feedData) {
        // Přidáme kontrolu imageLink a fallback na placeholder
        const imageUrl = (feedData && feedData.imageLink) ? feedData.imageLink : '/api/placeholder/200/200';
        
        return `
            <div class="destovka-product-card" data-product-code="${data['Kód']}">
                <div>
                    <img src="${imageUrl}" 
                         alt="${data['Produkt']}"
                         onerror="this.src='img/delete.png'"
                         style="max-width: 200px"/>
                </div>
                <div style="display: flex; align-items:center; flex-direction: column;">
                    <div class="destovka-product-title">
                        ${data['Produkt']}
                        <span style="font-size: 14px; font-weight: 500">
                            ${data['Varianta'] || ''}
                        </span>
                    </div>
                    <div class="destovka-product-code">kód ${data['Kód']}</div> 
                </div>
                <div class="destovka-product-card-footer">
                    <div class="destovka-product-price">
                        ${this.formatPrice(feedData?.price || 'Cena na dotaz')}
                    </div>
                    <button class="destovka-product-select-button">
                        Vybrat
                    </button>
                </div>
            </div>
        `;
    }
 
    createEmptyProductItem() {
        return `
            <div class="destovka-product-card">
                <div>
                    <img src="img/delete.png" style="max-width: 200px"/>
                </div>
                <div class="destovka-product-title">
                    żádná
                </div>
                <div class="destovka-product-card-footer">
                    <button class="destovka-product-select-button">
                        Vybráno
                    </button>
                </div>
            </div>
        `
    }

    createGeigeryProductItem(data, feedData) {
        return `
            <div class="destovka-product-geigery-card-container">
                <div class="destovka-product-geigery-card-title">title</div>
                <div class="destovka-product-geigery-card-info-row">
                    <img src="obrazek.png" style="max-width: 200px" />

                    <div class="destovka-product-geigery-card-input-column">
                        <div class="destovka-product-geigery-card-input-row">
                            <div class="destovka-product-geigery-card-color"></div>
                            <div class="destovka-product-geigery-card-input-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-dash-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                </svg>
                                <input type="number" class="destovka-product-geigery-card-input" placeholder="0" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                                ks
                            </div>
                        </div>
                        <div class="destovka-product-geigery-card-input-row">
                            <div class="destovka-product-geigery-card-color"></div>
                            <div class="destovka-product-geigery-card-input-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-dash-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                </svg>
                                <input type="number" class="destovka-product-geigery-card-input" placeholder="0" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                                ks
                            </div>
                        </div>
                        <div class="destovka-product-geigery-card-input-row">
                            <div class="destovka-product-geigery-card-color"></div>
                            <div class="destovka-product-geigery-card-input-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-dash-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                </svg>
                                <input type="number" class="destovka-product-geigery-card-input" placeholder="0" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                                ks
                            </div>
                        </div>
                    </div>
                </div>
                <div class="destovka-product-geigery-card-footer">
                    <div class="destovka-product-geigery-card-unit-price">cena za kus 22 Kc</div>
                    <div>
                        celkem
                        <span class="destovka-product-geigery-card-total-price">1752 Kc</span>
                        vc DPH
                    </div>
                </div>
            </div>
        `
    }

    createPotrubiProductItem(data, feedData) {

        const createRow = (row) => `
            <div class="destovka-product-potrubi-card-input-row-container">
                <div class="destovka-product-potrubi-card-input-row-title">
                    delka 500 mm
                </div>
                <div class="destovka-product-potrubi-card-input-row">
                    <div>189 Kc vs DPH</div>
                    <div class="destovka-product-potrubi-card-input-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-dash-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                        </svg>
                        <input type="number" class="destovka-product-potrubi-card-input" placeholder="0" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        ks
                    </div>
                </div>
            </div>
        `

        return `
            <div class="destovka-product-potrubi-card-container">
                <div class="destovka-product-potrubi-card-title">title</div>
                <img src="obrazek.png" style="max-width: 300px;"/>
                
                <div class="destovka-product-potrubi-card-input-column">
                    //map(() => createRow(...))
                </div>
            </div>
        `
    }
 
    initializeSelection(container) {
        if (!container) return;
        
        // Remove any existing event listeners
        container.querySelectorAll('.destovka-product-select-button').forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
        
        // Add new event listeners
        container.querySelectorAll('.destovka-product-select-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.destovka-product-card');
                this.selectProduct(card, container);
            });
        });
    }
 
    selectProduct(selectedCard, container) {
        // Zrušit předchozí výběr
        container.querySelectorAll('.destovka-product-card').forEach(card => {
            card.classList.remove('destovka-product-selected');
            const button = card.querySelector('.destovka-product-select-button');
            button.textContent = 'Vybrat';
            button.classList.remove('destovka-selected');
        });
    
        // Nastavit nový výběr
        selectedCard.classList.add('destovka-product-selected');
        const button = selectedCard.querySelector('.destovka-product-select-button');
        button.textContent = 'Vybráno';
        button.classList.add('destovka-selected');
    }
 
    getSelectedProduct(container) {
        const selectedCard = container.querySelector('.destovka-product-selected');
        return selectedCard ? selectedCard.dataset.productCode : null;
    }
 }
 
 window.productStructureGenerator = new ProductStructureGenerator()