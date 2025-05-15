if (dataLayer[0].shoptet.pageType == "cart") { 
    (function() {
        // Kontrola URL parametrů - provede se pouze pokud jsou nějaké parametry v URL
        if (window.location.search.length > 0) {
          // Funkce pro získání parametrů z URL
          function getFailedProductCodes() {
            const params = new URLSearchParams(window.location.search);
            const failedProducts = params.getAll('failed');
            return failedProducts.map(code => decodeURIComponent(code));
          }
          
          // Funkce pro načtení XML feedu
          async function loadXMLFeed() {
            try {
              const response = await fetch('https://eshop.destovka.eu/google.xml');
              if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
              
              const xmlText = await response.text();
              const parser = new DOMParser();
              return parser.parseFromString(xmlText, 'text/xml');
            } catch (error) {
              console.error('Chyba při načítání XML feedu:', error);
              return null;
            }
          }
          
          // Funkce pro nalezení názvů produktů z XML feedu
          function findProductNames(xmlDoc, productCodes) {
            if (!xmlDoc) return [];
            
            const results = [];
            const entries = xmlDoc.getElementsByTagName('entry');
            
            for (const code of productCodes) {
              let found = false;
              
              for (const entry of entries) {
                const idElement = entry.getElementsByTagName('g:id')[0];
                if (idElement && idElement.textContent === code) {
                  const titleElement = entry.getElementsByTagName('title')[0];
                  if (titleElement) {
                    results.push({
                      code: code,
                      name: titleElement.textContent
                    });
                    found = true;
                    break;
                  }
                }
              }
              
              if (!found) {
                results.push({
                  code: code,
                  name: `Produkt (kód: ${code})`
                });
              }
            }
            
            return results;
          }
          
          // Funkce pro zobrazení informační hlášky
          function showNotification(products) {
            if (products.length === 0) return;
            
            // Vytvoření textu hlášky
            let productText = products.map(p => `"${p.name}"`).join(', ');
            
            // Vytvoření elementu hlášky
            const notification = document.createElement('div');
            notification.className = 'destovka-failed-notification';
            notification.innerHTML = `
              <div class="destovka-failed-notification-content">
                <div class="destovka-failed-notification-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  Nepřidané produkty
                </div>
                <div class="destovka-failed-notification-message">
                  Produkty ${productText} nebyly přidány kvůli nedostatečnému množství zásob. 
                  Pro více informací prosím kontaktujte <a href="mailto:info@destovka.eu">info@destovka.eu</a>.
                </div>
                <button class="destovka-failed-notification-close">×</button>
              </div>
            `;
            
            // Přidání CSS stylů
            const style = document.createElement('style');
            style.textContent = `
              .destovka-failed-notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                max-width: 800px;
                width: 90%;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                border-radius: 8px;
                overflow: hidden;
                animation: destovka-notification-slide-in 0.3s ease-out;
              }
              
              .destovka-failed-notification-content {
                display: flex;
                flex-direction: column;
                background: white;
                border: 1px solid #dc2626;
                border-radius: 8px;
                overflow: hidden;
              }
              
              .destovka-failed-notification-title {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 16px;
                background: #fee2e2;
                color: #dc2626;
                font-weight: 600;
                border-bottom: 1px solid #dc2626;
              }
              
              .destovka-failed-notification-title svg {
                color: #dc2626;
              }
              
              .destovka-failed-notification-message {
                padding: 16px;
                font-size: 15px;
                line-height: 1.5;
                color: #333;
              }
              
              .destovka-failed-notification-message a {
                color: #386df2;
                text-decoration: underline;
              }
              
              .destovka-failed-notification-close {
                position: absolute;
                top: 8px;
                right: 12px;
                background: none;
                border: none;
                font-size: 24px;
                color: #dc2626;
                cursor: pointer;
              }
              
              @keyframes destovka-notification-slide-in {
                from { 
                  transform: translate(-50%, -100px);
                  opacity: 0;
                }
                to { 
                  transform: translate(-50%, 0);
                  opacity: 1;
                }
              }
            `;
            
            // Přidat elementy do DOM
            document.head.appendChild(style);
            document.body.appendChild(notification);
            
            // Přidat event listener pro zavření
            const closeButton = notification.querySelector('.destovka-failed-notification-close');
            if (closeButton) {
              closeButton.addEventListener('click', function() {
                notification.remove();
              });
            }
          }
          
          // Hlavní funkce pro zpracování nepřidaných produktů
          async function processFailedProducts() {
            const failedCodes = getFailedProductCodes();
            
            if (failedCodes.length === 0) {
              return;
            }
            
            const xmlDoc = await loadXMLFeed();
            const products = findProductNames(xmlDoc, failedCodes);
            
            showNotification(products);
          }
          
          // Spuštění hlavní funkce
          processFailedProducts();
        }
      })();
    }