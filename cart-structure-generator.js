// cart-structure-generator.js
class CartStructureGenerator {
    formatPrice(price) {
        if (typeof price === 'number') {
            return price.toLocaleString('cs-CZ');
        }
        
        if (typeof price === 'string') {
            const value = parseInt(price.replace(/[^0-9]/g, '')) || 0;
            return value.toLocaleString('cs-CZ');
        }
        
        return '0';
    }

    createCartSection(title, items, totalAmount = 0) {
        return `
            <div class="destovka-cart-section">
                <div class="destovka-cart-section-title">
                    ${title} (${totalAmount} ${this.getPluralForm(totalAmount, 'položka', 'položky', 'položek')})
                </div>
                ${items}
            </div>
        `;
    }

    getPluralForm(count, singular, plural2to4, plural5plus) {
        if (count === 1) return singular;
        if (count >= 2 && count <= 4) return plural2to4;
        return plural5plus;
    }

    createCartItem(cartItem) {
        const basePrice = this.extractPrice(cartItem.price);
        const totalPriceWithVAT = this.calculateTotalPrice(basePrice, cartItem.quantity);
        const totalPriceWithoutVAT = this.calculatePriceWithoutVAT(totalPriceWithVAT);

        return `
            <div class="destovka-cart-card-container">
                <img src="${cartItem.imageUrl || 'https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/radoby_placeholder.png'}" 
                     alt="${cartItem.name}"
                     style="max-width: 200px; max-height: 150px" 
                     onerror="this.src='https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/radoby_placeholder.png'" />

                <div class="destovka-cart-card-info-column">
                    <div class="destovka-cart-card-title">${cartItem.name}</div>
                    <div>cena za kus ${this.formatPrice(basePrice)} Kč vč DPH</div>
                    <div class="destovka-cart-card-pieces">
                        ${cartItem.quantity} ${this.getPluralForm(cartItem.quantity, 'kus', 'kusy', 'kusů')}
                    </div>
                </div>

                <div class="destovka-cart-card-price-column">
                    <div style="font-weight: 600">
                        celkem <span class="destovka-cart-card-price">${this.formatPrice(totalPriceWithVAT)} Kč</span> vč DPH
                    </div>
                    <div>
                        celkem <span class="destovka-cart-card-price bez-dph">${this.formatPrice(totalPriceWithoutVAT)} Kč</span> bez DPH
                    </div>
                    
                    <button class="destovka-cart-card-remove-button" data-product-code="${cartItem.productCode}">
                        Odstranit
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    // v cart-structure-generator.js
// v cart-structure-generator.js
createCartTotalItem(totalItems, totalPriceWithVAT) {
    const totalPriceWithoutVAT = this.calculatePriceWithoutVAT(totalPriceWithVAT);
    
    // Zjišťujeme, jestli jsme v mezikroku 7.5
    const isIntermediate = window.destovkaStepManager?.currentStep === 7.5;
    
    return `
    <div class="destovka-cart-total-wrapper-wrapper">
        <div class="destovka-cart-total-buttons">
            ${isIntermediate ? `
            <button id="destovka-cart-continue-button" class="destovka-cart-action-button destovka-cart-continue-button" onclick="window.destovkaStepManager.handleNextStep()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="destovka-cart-button-icon">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Pokračovat výběrem dalšího příslušenství
            </button>
            ` : ''}
            <button id="destovka-cart-email-button" class="destovka-cart-action-button" onclick="(window.destovkaCartDisplayIntermediate || window.destovkaCartDisplay).showEmailPopup()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="destovka-cart-button-icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                Odeslat ${isIntermediate ? 'základní sadu do' : 'do'} e-mailu
            </button>
            <button id="destovka-cart-checkout-button" class="destovka-cart-action-button destovka-cart-primary-button" onclick="(window.destovkaCartDisplayIntermediate || window.destovkaCartDisplay).handleAddToCart()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="destovka-cart-button-icon">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Přidat ${isIntermediate ? 'základní sadu do' : 'do'} košíku 
            </button>
        </div>
        <div class="destovka-cart-total-wrapper">
            <div>celkem ${totalItems} ${this.getPluralForm(totalItems, 'kus', 'kusy', 'kusů')}</div>
            <div>celkem <span class="destovka-cart-total-price-without-vat">${this.formatPrice(totalPriceWithoutVAT)} Kč</span> bez DPH</div>
            <div style="font-size: 20px">celkem <span class="destovka-cart-total-price">${this.formatPrice(totalPriceWithVAT)} Kč</span> vč DPH</div>            
        </div>
    </div>
    `;
}


    // Helper metody pro výpočty
    extractPrice(price) {
        if (typeof price === 'number') return price;
        if (typeof price === 'string') {
            return parseInt(price.replace(/[^0-9]/g, '')) || 0;
        }
        return 0;
    }

    calculateTotalPrice(price, quantity) {
        return price * quantity;
    }

    calculatePriceWithoutVAT(priceWithVAT) {
        return Math.round(priceWithVAT / 1.21);
    }
}