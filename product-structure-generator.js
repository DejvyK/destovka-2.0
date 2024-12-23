class ProductStructureGenerator {
    formatPrice(price) {
        const [value, currency] = price.split(' ');
        return `${parseInt(value).toLocaleString('cs-CZ')} Kč`;
    }
    
    createProductItem(data, feedData) {
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
                    ${this.createProductSpecs(data)}
                </div>
            </div>
        `;
    }

    createPotrubiProductItem(data) {
        const createRow = (item, feedData) => `
            <div class="destovka-product-potrubi-card-input-row-container">
                <div class="destovka-product-potrubi-card-input-row-title">
                    ${item.Název}
                </div>
                <div class="destovka-product-potrubi-card-input-row">
                    <div>${this.formatPrice(feedData?.price)}</div>
                    <div class="destovka-product-potrubi-card-input-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-dash-circle destovka-decrease-quantity" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                        </svg>
                        <input type="number" 
                               class="destovka-product-potrubi-card-input" 
                               data-code="${item.Kód}"
                               placeholder="0" 
                               min="0" 
                               value="0" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-plus-circle destovka-increase-quantity" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        ks
                    </div>
                </div>
            </div>
        `;
    
        const representativeImage = data.feedData.get(data.items[0]?.Kód)?.imageLink || '';
    
        return `
            <div class="destovka-product-potrubi-card-container">
                <div class="destovka-product-potrubi-card-title">${data.title}</div>
                <img src="${representativeImage}" alt="${data.title}" style="max-width: 200px;"/>
                
                <div class="destovka-product-potrubi-card-input-column">
                    ${data.items.map(item => createRow(item, data.feedData.get(item.Kód))).join('')}
                </div>
            </div>
        `;
    }

    formatPotrubiPrice(price) {
        if (!price) return '0 Kč vč. DPH';
        const value = parseInt(price.split(' ')[0]);
        return `${value.toLocaleString('cs-CZ')} Kč vč. DPH`;
    }


    createGeigeryProductItem(data) {
        const createColorInput = (variant) => `
            <div class="destovka-product-geigery-card-input-row">
                <div class="destovka-product-geigery-card-color" style="background-color: ${this.getColorCode(variant.color)}"></div>
                <div class="destovka-product-geigery-card-input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-dash-circle destovka-decrease-quantity" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                    <input type="number" 
                           class="destovka-product-geigery-card-input" 
                           data-code="${variant.code}"
                           placeholder="0"
                           min="0"
                           value="0" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus-circle destovka-increase-quantity" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    ks
                </div>
            </div>
        `;
    
        const container = document.createElement('div');
        container.className = 'destovka-product-geigery-card-container';
        container.dataset.type = data.type;
        
        container.innerHTML = `
            <div class="destovka-product-geigery-card-title">${data.title}</div>
            <div class="destovka-product-geigery-card-info-row">
                <img src="${data.imageUrl}" alt="${data.title}" style="max-width: 200px" />
                <div class="destovka-product-geigery-card-input-column">
                    ${data.variants.map(variant => createColorInput(variant)).join('')}
                </div>
            </div>
            <div class="destovka-product-geigery-card-footer">
                <div class="destovka-product-geigery-card-unit-price">
                    cena za kus ${this.formatPrice(data.variants[0].feedData.price)}
                </div>
                <div>
                    celkem
                    <span class="destovka-product-geigery-card-total-price">0 Kč</span>
                    vč. DPH
                </div>
            </div>
        `;
    
        // Přidání event listenerů
        const inputs = container.querySelectorAll('.destovka-product-geigery-card-input');
        inputs.forEach(input => {
            const decreaseBtn = input.parentElement.querySelector('.destovka-decrease-quantity');
            const increaseBtn = input.parentElement.querySelector('.destovka-increase-quantity');
    
            decreaseBtn.addEventListener('click', () => {
                if (input.value > 0) {
                    input.value = parseInt(input.value) - 1;
                    this.updateGeigerTotal(container);
                }
            });
    
            increaseBtn.addEventListener('click', () => {
                input.value = parseInt(input.value) + 1;
                this.updateGeigerTotal(container);
            });
    
            input.addEventListener('change', () => {
                if (input.value < 0) input.value = 0;
                this.updateGeigerTotal(container);
            });
        });
    
        return container;
    }
    
    // Přidávám pomocné metody do ProductStructureGenerator
    getColorCode(color) {
        const colorMap = {
            'černá': '#000000',
            'hnědá': '#A49E9E', 
            'šedá': '#999999'
        };
        return colorMap[color] || '#000000';
    }
    
    updateGeigerTotal(container) {
        const inputs = container.querySelectorAll('.destovka-product-geigery-card-input');
        const basePrice = 189; // Základní cena za kus
        let total = 0;
    
        inputs.forEach(input => {
            total += parseInt(input.value || 0) * basePrice;
        });
    
        const totalElement = container.querySelector('.destovka-product-geigery-card-total-price');
        totalElement.textContent = `${total.toLocaleString('cs-CZ')} Kč`;
    }

    createProductSpecs(data) {
        // Kontrolujeme, zda jde o plovací čerpadlo
        if (!data.Kategorie || data.Kategorie !== 'Ponorné s plovákovým spínačem') {
            return '';
        }
    
        const specFields = [
            'Záruka (let)',
            'Max. průtok (l/hod)',
            'Max. výtlak (m)',
            'Max. ponor (m)',
            'Výkon (W)'
        ];
    
        const validSpecs = specFields.filter(field => data[field] && data[field] !== '');
        
        if (validSpecs.length === 0) return '';
    
        return `
            <div class="destovka-product-specs">
                ${validSpecs.map(field => `
                    <div class="destovka-product-spec">${field}: ${data[field]}</div>
                `).join('')}
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

    createCategoryItem(category, imageUrl = '/api/placeholder/200/200') {
        return `
            <div class="destovka-product-card" data-category="${category}" style="width: 280px;">
                <div>
                    <img src="${imageUrl}" 
                         alt="${category}"
                         onerror="this.src='/api/placeholder/200/200'"
                         style="width: 200px; height: 200px; object-fit: contain;"/>
                </div>
                <div style="display: flex; align-items:center; flex-direction: column; min-height: 90px; justify-content: center;">
                    <div class="destovka-product-title">
                        ${category}
                    </div>
                </div>
                <div class="destovka-product-card-footer">
                    <button class="destovka-product-select-button">
                        Vybrat
                    </button>
                </div>
            </div>
        `;
    }

    
 
    initializeCategorySelection(container, callback) {
        if (!container) return;
        
        // Odstranit existující event listeners
        container.querySelectorAll('.destovka-product-select-button').forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
        
        // Přidat nové event listeners
        container.querySelectorAll('.destovka-product-select-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.destovka-product-card');
                this.selectCategory(card, container);
                if (callback) {
                    callback(card.dataset.category);
                }
            });
        });
    }

    initializeSelection(container) {
        if (!container) return;
        
        // Odstranit existující event listenery
        container.querySelectorAll('.destovka-product-select-button').forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
        
        // Přidat nové event listenery
        container.querySelectorAll('.destovka-product-select-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.destovka-product-card');
                this.selectProduct(card, container);
            });
        });
    }
    
    selectCategory(selectedCard, container) {
        container.querySelectorAll('.destovka-product-card').forEach(card => {
            card.classList.remove('destovka-product-selected');
            const button = card.querySelector('.destovka-product-select-button');
            button.textContent = 'Vybrat';
            button.classList.remove('destovka-selected');
        });
    
        selectedCard.classList.add('destovka-product-selected');
        const button = selectedCard.querySelector('.destovka-product-select-button');
        button.textContent = 'Vybráno';
        button.classList.add('destovka-selected');
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