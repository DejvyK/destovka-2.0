class CartStructureGenerator {
    formatPrice(price) {
        const [value, currency] = price.split(' ');
        return `${parseInt(value).toLocaleString('cs-CZ')} Kč`;
    }

    calculateSumPrice(cartItem) {
        return cartItem.price * cartItem.quantity;
    }

    calculateSumPriceWithoutVat(cartItem) {
        return cartItem.price * cartItem.quantity / 1.21;
    }

    createCartItem(cartItem) {
        return `
            <div class="destovka-cart-card-container">
                <img src="${cartItem.imageUrl}" style="max-width: 200px; max-height: 150px" />

                <div class="destovka-cart-card-info-column">
                    <div class="destovka-cart-card-title">${cartItem.name}</div>
                    <div>cena za kus ${this.formatPrice(cartItem.price)} Kč vč DPH</div>
                    <div class="destovka-cart-card-pieces">
                        ${cartItem.quantity} ks
                    </div>
                </div>

                <div class="destovka-cart-card-price-column">
                    <div style="font-weight: 600">
                        celkem <span class="destovka-cart-card-price">${this.calculateSumPrice(cartItem)} Kč</span> vč DPH
                    </div>
                    <div>
                        celkem <span class="destovka-cart-card-price">${this.calculateSumPriceWithoutVat(cartItem)} Kč</span> bez DPH
                    </div>
                    
                    <button class="destovka-cart-card-remove-button">
                        Odstranit
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
        `
    }

    createCartTotalItem(cartItems) {
        return `
            
        `
    }
}