class ProductStructureGenerator {
    formatPrice(price) {
        const [value, currency] = price.split(' ');
        return `${parseInt(value).toLocaleString('cs-CZ')} Kč`;
    }
    
    createProductItem(data, feedData) {
        const availability = this.formatAvailability(feedData?.availability || 'out of stock');
        
        return `
            <div class="destovka-product-card" data-product-code="${data['Kód']}">
                <div>
                    <img class="destovka-product-image"    
                         src="${feedData.imageLink}" 
                         alt="${data['Produkt']}"
                         onerror="this.src='img/delete.png'" />
                </div>
                <div style="display: flex; align-items:center; flex-direction: column;">
                    <div class="destovka-product-title">
                        ${data['Produkt']}
                    </div>
                    <div class="destovka-product-code">kód ${data['Kód']}</div>
                    <div class="destovka-tank-availability ${availability.className}">
                        ${availability.text}
                    </div>
                </div>
                ${this.createProductSpecs(data)}
                <div class="destovka-product-card-footer">
                    <div class="destovka-product-price">
                        ${this.formatPrice(feedData?.price)}
                    </div>
                    <button class="destovka-product-select-button" ${!availability.isAvailable ? 'disabled' : ''}>
                        ${availability.isAvailable ? 'Vybrat' : 'Nedostupné'}
                    </button>
                </div>
            </div>
        `;
    }

    formatAvailability(availability) {
        switch (availability) {
            case 'in stock':
                return {
                    text: 'Skladem',
                    className: 'destovka-availability-instock',
                    isAvailable: true
                };
            case 'out of stock':
                return {
                    text: 'Není skladem',
                    className: 'destovka-availability-outstock',
                    isAvailable: false
                };
            default:
                return {
                    text: 'Na dotaz',
                    className: 'destovka-availability-request',
                    isAvailable: false
                };
        }
    }

    createPotrubiProductItem(data) {
        const createRow = (item, feedData) => {
            const availability = feedData?.availability || 'out of stock';
            const isOutOfStock = availability === 'out of stock';
            return `
                <div class="destovka-product-potrubi-card-input-row-container ${isOutOfStock ? 'destovka-product-potrubi-card-container-outofstock' : ''}">
                    <div class="destovka-product-potrubi-card-input-row-title">
                        ${item.Název}
                    </div>
                    <div class="destovka-product-potrubi-card-input-row">
                        <div>${this.formatPrice(feedData?.price)}</div>
                        <div class="destovka-product-potrubi-card-input-container">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-dash-circle destovka-decrease-quantity" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                            </svg>
                            <input type="number" 
                                   class="destovka-product-potrubi-card-input" 
                                   data-code="${item.Kód}"
                                   placeholder="0" 
                                   min="0" 
                                   value="0"
                                   ${isOutOfStock ? 'disabled' : ''} />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-plus-circle destovka-increase-quantity" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                            ks
                        </div>
                    </div>
                </div>
            `;
        };
    
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

    createVsakProductItem(data, feedData) {
        const availability = this.formatAvailability(feedData.availability);
        
        return `
            <div class="destovka-product-card">
                <div>
                    <img class="destovka-product-image"
                         src="${feedData.imageLink}" 
                         alt="${data.Produkt}"
                         onerror="this.src='img/radoby_placeholder.png'" />
                </div>
                <div style="display: flex; align-items:center; flex-direction: column;">
                    <div class="destovka-product-title">
                        ${data.Produkt}
                    </div>
                    <div class="destovka-product-code">kód ${data.Kód}</div>
                    <div class="destovka-tank-availability ${availability.className}">
                        ${availability.text}
                    </div>
                </div>
                <div class="destovka-product-card-footer">
                    <div class="destovka-product-price">${this.formatPrice(feedData.price)}</div>
                    <div class="destovka-product-potrubi-card-input-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-dash-circle destovka-decrease-quantity" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                        </svg>
                        <input type="number" 
                               class="destovka-product-potrubi-card-input" 
                               data-code="${data.Kód}"
                               placeholder="0" 
                               min="0" 
                               value="0"
                               ${!availability.isAvailable ? 'disabled' : ''} />
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
    }

    createVsakBoxProductItem(data, feedData) {
        return `
            <div class="destovka-vsakbox-product-container">
                <div class="destovka-vsakbox-product-wrapper">
                    <div class="destovka-vsakbox-product-image">
                        <img src="${feedData.imageLink}" 
                             alt="${data.Produkt}"
                             onerror="this.src='img/radoby_placeholder.png'"/>
                    </div>
                    <div class="destovka-vsakbox-product-info">
                        <div class="destovka-vsakbox-product-title">${data.Produkt}</div>
                        <div class="destovka-vsakbox-product-price">cena za kus ${this.formatPrice(feedData.price)}</div>
                    </div>
                    <div class="destovka-vsakbox-product-counter">
                        <input type="number" 
                               class="destovka-vsakbox-product-input" 
                               data-code="${data.Kód}"
                               value="0"
                               min="0" />
                        <span class="destovka-vsakbox-product-unit">ks</span>
                    </div>
                </div>
            </div>
        `;
    }
/*
    createVsakBoxGrid() {
        return `
            <div class="destovka-vsakbox-grid-container">
                <h3 class="destovka-vsakbox-grid-title">Vsakovací box</h3>
                <div class="destovka-vsakbox-grid-wrapper">
                    <div class="destovka-vsakbox-grid">
                        ${Array(10).fill().map(() => `
                            <div class="destovka-vsakbox-grid-row">
                                ${Array(10).fill().map(() => `
                                    <div class="destovka-vsakbox-grid-cell"></div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                    <div class="destovka-vsakbox-height-grid">
                        ${Array(3).fill().map(() => `
                            <div class="destovka-vsakbox-grid-cell"></div>
                        `).join('')}
                    </div>
                </div>
                <div class="destovka-vsakbox-grid-controls">
                    <div class="destovka-vsakbox-dimension">
                        <label>délka</label>
                        <div class="destovka-vsakbox-counter">
                            <button class="destovka-vsakbox-minus" type="button">-</button>
                            <input type="number" value="7" min="1" max="10" class="destovka-vsakbox-input" data-dimension="length">
                            <button class="destovka-vsakbox-plus" type="button">+</button>
                        </div>
                        <span class="destovka-vsakbox-measure">4,2 m</span>
                    </div>
                    <div class="destovka-vsakbox-dimension">
                        <label>šířka</label>
                        <div class="destovka-vsakbox-counter">
                            <button class="destovka-vsakbox-minus" type="button">-</button>
                            <input type="number" value="5" min="1" max="10" class="destovka-vsakbox-input" data-dimension="width">
                            <button class="destovka-vsakbox-plus" type="button">+</button>
                        </div>
                        <span class="destovka-vsakbox-measure">3,0 m</span>
                    </div>
                    <div class="destovka-vsakbox-dimension">
                        <label>výška</label>
                        <div class="destovka-vsakbox-counter">
                            <button class="destovka-vsakbox-minus" type="button">-</button>
                            <input type="number" value="2" min="1" max="3" class="destovka-vsakbox-input" data-dimension="height">
                            <button class="destovka-vsakbox-plus" type="button">+</button>
                        </div>
                        <span class="destovka-vsakbox-measure">0,8 m</span>
                    </div>
                </div>
            </div>
        `;
    }
        */

    createVsakBoxGrid(initialLayout = null) {
        return `
            <div class="destovka-vsakbox-grid-container">
                <h3 class="destovka-vsakbox-grid-title">Vsakovací box</h3>
                <div class="destovka-vsakbox-grid-wrapper">
                    <div class="destovka-vsakbox-grid">
                        ${Array(10).fill().map(() => `
                            <div class="destovka-vsakbox-grid-row">
                                ${Array(10).fill().map(() => `
                                    <div class="destovka-vsakbox-grid-cell"></div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                    <div class="destovka-vsakbox-height-grid">
                        ${Array(3).fill().map(() => `
                            <div class="destovka-vsakbox-grid-cell"></div>
                        `).join('')}
                    </div>
                </div>
                <div class="destovka-vsakbox-grid-controls">
                    <div class="destovka-vsakbox-dimension">
                        <label>délka</label>
                        <div class="destovka-vsakbox-counter">
                            <button class="destovka-vsakbox-minus" type="button">-</button>
                            <input type="number" value="${initialLayout ? initialLayout.length : 7}" 
                                   min="1" max="10" 
                                   class="destovka-vsakbox-input" 
                                   data-dimension="length">
                            <button class="destovka-vsakbox-plus" type="button">+</button>
                        </div>
                        <span class="destovka-vsakbox-measure">4,2 m</span>
                    </div>
                    <div class="destovka-vsakbox-dimension">
                        <label>šířka</label>
                        <div class="destovka-vsakbox-counter">
                            <button class="destovka-vsakbox-minus" type="button">-</button>
                            <input type="number" value="${initialLayout ? initialLayout.width : 5}" 
                                   min="1" max="10" 
                                   class="destovka-vsakbox-input" 
                                   data-dimension="width">
                            <button class="destovka-vsakbox-plus" type="button">+</button>
                        </div>
                        <span class="destovka-vsakbox-measure">3,0 m</span>
                    </div>
                    <div class="destovka-vsakbox-dimension">
                        <label>výška</label>
                        <div class="destovka-vsakbox-counter">
                            <button class="destovka-vsakbox-minus" type="button">-</button>
                            <input type="number" value="${initialLayout ? initialLayout.height : 2}" 
                                   min="1" max="3" 
                                   class="destovka-vsakbox-input" 
                                   data-dimension="height">
                            <button class="destovka-vsakbox-plus" type="button">+</button>
                        </div>
                        <span class="destovka-vsakbox-measure">0,8 m</span>
                    </div>
                </div>
            </div>
        `;
    }

    createVsakInfoBox(minArea, minVolume, actualArea = 0, actualVolume = 0) {
        return `
            <div class="destovka-vsak-info">
                <div class="destovka-vsak-info-row">
                    <span>Doporučená minimální vsakovací plocha:</span>
                    <strong>${minArea.toFixed(2)} m²</strong>
                </div>
                <div class="destovka-vsak-info-row">
                    <span>Doporučený minimální vsakovací objem:</span>
                    <strong>${minVolume.toFixed(2)} m³</strong>
                </div>
                ${actualArea > 0 ? `
                    <div class="destovka-vsak-info-row">
                        <span>Navržená vsakovací plocha:</span>
                        <strong>${actualArea.toFixed(2)} m²</strong>
                    </div>
                    <div class="destovka-vsak-info-row">
                        <span>Navržený vsakovací objem:</span>
                        <strong>${actualVolume.toFixed(2)} m³</strong>
                    </div>
                ` : ''}
            </div>
        `;
    }

   

formatAvailability(availability) {
    switch (availability) {
        case 'in stock':
            return {
                text: 'Skladem',
                className: 'destovka-availability-instock',
                isAvailable: true
            };
        case 'out of stock':
            return {
                text: 'Není skladem',
                className: 'destovka-availability-outstock',
                isAvailable: false
            };
        default:
            return {
                text: 'Na dotaz',
                className: 'destovka-availability-request',
                isAvailable: false
            };
    }
}


createGeigeryProductItem(data) {
    const createColorInput = (variant) => {
        const availability = variant.feedData.availability || 'out of stock';
        const isOutOfStock = availability === 'out of stock';
        return `
            <div class="destovka-product-geigery-card-input-row ${isOutOfStock ? 'destovka-product-geigery-card-container-outofstock' : ''}">
                <div class="destovka-product-geigery-card-color" style="background-color: ${this.getColorCode(variant.color)}"></div>
                <div class="destovka-product-geigery-card-input-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-dash-circle destovka-decrease-quantity" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                    <input type="number" 
                           class="destovka-product-geigery-card-input" 
                           data-code="${variant.code}"
                           placeholder="0"
                           min="0"
                           value="0"
                           ${isOutOfStock ? 'disabled' : ''} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-plus-circle destovka-increase-quantity" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    ks
                </div>
            </div>
        `;
    };

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
                celkem <span class="destovka-product-geigery-card-total-price">0 Kč</span>
            </div>
        </div>
    `;

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
        let total = 0;
        const inputs = container.querySelectorAll('.destovka-product-geigery-card-input');
        
        const geigerType = container.querySelector('.destovka-product-geigery-card-title')?.textContent;
        const basePrice = geigerType?.includes('Spodní výtok') ? 219 : 239;
    
        inputs.forEach(input => {
            total += parseInt(input.value || 0) * basePrice;
        });
    
        const totalElement = container.querySelector('.destovka-product-geigery-card-total-price');
        totalElement.textContent = `${total.toLocaleString('cs-CZ')} Kč`;
    
        // Aktualizovat celkovou cenu všech geigerů
        const allGeigersTotal = container.closest('.destovka-products-container')
            ?.querySelector('.destovka-product-potrubi-total-price');
        if (allGeigersTotal) {
            const allCards = container.closest('.destovka-products-container')
                .querySelectorAll('.destovka-product-geigery-card-container');
            let grandTotal = 0;
            
            allCards.forEach(card => {
                const priceElement = card.querySelector('.destovka-product-geigery-card-total-price');
                if (priceElement) {
                    grandTotal += parseInt(priceElement.textContent.replace(/[^\d]/g, '')) || 0;
                }
            });
            
            const withoutVAT = Math.round(grandTotal / 1.21);
            allGeigersTotal.innerHTML = `
                <span class="destovka-product-potrubi-total-price-without-vat">${withoutVAT.toLocaleString('cs-CZ')} Kč</span> bez DPH<br>
                <span class="destovka-product-potrubi-total-price">${grandTotal.toLocaleString('cs-CZ')} Kč</span> vč DPH
            `;
        }
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
                    <div class="destovka-product-spec">${field}: <span class="destovka-product-spec-value">${data[field]}</span></div>
                `).join('')}
            </div>
        `;
    }
 
    createEmptyProductItem() {
        return `
            <div class="destovka-product-card">
                <div>
                    <img class="destovka-product-image" src="img/delete.png" />
                </div>
                <div class="destovka-product-title">
                    Žádná
                </div>
                <div class="destovka-product-card-footer">
                    <button class="destovka-product-select-button">
                        Vybrat
                    </button>
                </div>
            </div>
        `
    }

    createCategoryItem(category, imageUrl = 'img/radoby_placeholder.png') {
        return `
            <div class="destovka-product-card" data-category="${category}">
                <div>
                    <img class="destovka-product-image"
                         src="${imageUrl}" 
                         alt="${category}"
                         onerror="this.src='img/radoby_placeholder.png'" />
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
                // Změněno z destovka-product-selected na destovka-category-selected
                container.querySelectorAll('.destovka-product-card').forEach(c => {
                    c.classList.remove('destovka-category-selected');
                    const btn = c.querySelector('.destovka-product-select-button');
                    btn.classList.remove('destovka-selected');
                    btn.textContent = 'Vybrat';
                });
                
                card.classList.add('destovka-category-selected');
                button.classList.add('destovka-selected');
                button.textContent = 'Vybráno';
                
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