//zde bude obecný kód

class DestovkaStepManager {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 12;

        if (window.destovkaCart) {
            window.destovkaCart.destClear();
        }

        this.initializeButtons();
        this.updateButtonsState();
        this.initializeValidation();
        this.initializeNatokToggle();
        this.formData = new Map();
    }

    initializeButtons() {
        // Přidat event listenery ke všem tlačítkům
        document.querySelectorAll('.destovka-button-next').forEach(button => {
            button.addEventListener('click', () => this.handleNextStep());
        });
        
        document.querySelectorAll('.destovka-button-back').forEach(button => {
            button.addEventListener('click', () => this.handlePreviousStep());
        });
    }

    initializeNatokToggle() {
        const toggleButton = document.querySelector('.destovka-toggle-natok');
        const directDepthGroup = document.getElementById('destovka-direct-depth');
        const distanceGroup = document.getElementById('destovka-distance-group');
        const distanceInput = document.getElementById('distance');
        const inflowDepthInput = document.getElementById('inflowDepth');
    
        const calculateDepth = (distance) => {
            const distanceInMm = distance * 1000;
            return Math.round(distanceInMm * 0.03);
        };
    
        const updateDepthFromDistance = () => {
            const distance = parseFloat(distanceInput.value) || 0;
            const depth = calculateDepth(distance);
            inflowDepthInput.value = depth;
        };
    
        const setDefaultValues = (isDistanceMode) => {
            if (isDistanceMode) {
                inflowDepthInput.value = '';
            } else {
                distanceInput.value = '0.001';
                updateDepthFromDistance();
            }
        };
    
        toggleButton.addEventListener('click', () => {
            // Opravená logika - použijeme display style distanceGroup pro kontrolu
            const isDistanceMode = distanceGroup.style.display !== 'none';
            
            if (isDistanceMode) {
                // Přepnutí zpět na hloubku nátoku
                directDepthGroup.style.display = 'flex';
                distanceGroup.style.display = 'none';
                toggleButton.textContent = 'Neznám hloubku nátoku';
                setDefaultValues(false);
            } else {
                // Přepnutí na vzdálenost
                directDepthGroup.style.display = 'none';
                distanceGroup.style.display = 'flex';
                toggleButton.textContent = 'Znám hloubku nátoku';
                setDefaultValues(true);
            }
        });
    
        distanceInput.addEventListener('input', () => {
            if (distanceGroup.style.display !== 'none') {
                updateDepthFromDistance();
            }
        });
    
        // Nastavíme výchozí hodnoty při inicializaci
        setDefaultValues(false);
    }

    initializeValidation() {
        this.validationRules = {
            volumeRange: { required: true },
            concrete: { required: true },
            soil: { required: true },
            hsvDepth: { required: true, min: 0, max: 1000 },
            load: { required: true },
            inflowDiameter: { required: true },
            outflowDiameter: { required: true },
            inflowDepth: { required: true, min: 0, max: 1000 },
            distance: { required: true, min: 0 },
            rainfallStation: { required: true }
        };
    }

    validateStep(step) {
        if (step === 1) {
            const errors = [];
            const distanceGroup = document.getElementById('destovka-distance-group');
            const isDistanceMode = distanceGroup.style.display !== 'none';
            
            const requiredFields = [
                'volumeRange', 
                'concrete', 
                'soil', 
                'hsvDepth', 
                'load', 
                'inflowDiameter', 
                'outflowDiameter',
                'rainfallStation'
            ];
    
            requiredFields.forEach(fieldId => {
                const element = document.getElementById(fieldId);
                if (!element) return;
    
                const value = element.value.trim();
                
                if (value === '' || (fieldId === 'rainfallStation' && value === 'Vyberte stanici')) {
                    errors.push(fieldId);
                    return;
                }
    
                if (fieldId === 'hsvDepth') {
                    const unitButton = element.closest('.destovka-input-row')?.querySelector('.destovka-unit-button');
                    const unit = unitButton?.getAttribute('data-current-unit') || 'mm';
                    const numValue = parseFloat(value);
                    
                    if (isNaN(numValue) || numValue < 0) {
                        errors.push(fieldId);
                    }
                }
            });
    
            if (isDistanceMode) {
                const distanceInput = document.getElementById('distance');
                if (distanceInput) {
                    const value = distanceInput.value.trim();
                    if (value === '' || parseFloat(value) <= 0) {
                        errors.push('distance');
                    }
                }
            } else {
                const inflowDepthInput = document.getElementById('inflowDepth');
                if (inflowDepthInput) {
                    const value = inflowDepthInput.value.trim();
                    if (value === '') {
                        errors.push('inflowDepth');
                    } else {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue) || numValue <= 0) {
                            errors.push('inflowDepth');
                        }
                    }
                }
            }
    
            if (errors.length > 0) {
                this.showErrors(errors);
                return false;
            }
            
            this.clearErrors();
            return true;
        }
        return true;
    }

    showErrors(errorFields) {
        this.clearErrors();
    
        if (!Array.isArray(errorFields) || errorFields.length === 0) return;
    
        const errorBanner = document.createElement('div');
        errorBanner.className = 'destovka-error-banner';
        errorBanner.textContent = 'Prosím vyplňte všechna povinná pole';
        
        document.body.appendChild(errorBanner);
    
        errorFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (!element) return;
    
            // Přidání error třídy na input
            element.classList.add('destovka-input-error');
    
            // Přidání error třídy na label
            const wrapper = element.closest('.destovka-input-wrapper');
            if (wrapper) {
                const label = wrapper.querySelector('.destovka-label');
                if (label) {
                    label.classList.add('destovka-label-error');
                }
            }
        });
    
        setTimeout(() => {
            errorBanner.classList.add('destovka-fade-out');
            setTimeout(() => {
                errorBanner.remove();
            }, 300);
        }, 3000);
    }

    clearErrors() {
        document.querySelectorAll('.destovka-input-error, .destovka-label-error')
            .forEach(el => el.classList.remove('destovka-input-error', 'destovka-label-error'));
        
        const errorBanner = document.querySelector('.destovka-error-banner');
        if (errorBanner) {
            errorBanner.remove();
        }
    }

    saveFormData() {
        if (this.currentStep === 1) {
            this.formData.set('volume', document.getElementById('volumeRange')?.value);
            this.formData.set('concrete', document.getElementById('concrete')?.value);
            this.formData.set('soil', document.getElementById('soil')?.value);
            
            // Konverze HSV
            const hsvInput = document.getElementById('hsvDepth');
            const hsvUnit = hsvInput?.closest('.destovka-input-row')?.querySelector('.destovka-unit-button')?.getAttribute('data-current-unit');
            const hsvValue = this.convertToMM(parseFloat(hsvInput?.value || '0'), hsvUnit || 'mm');
            this.formData.set('hsvDepth', hsvValue.toString());
    
            this.formData.set('load', document.getElementById('load')?.value);
            this.formData.set('inflowDiameter', document.getElementById('inflowDiameter')?.value);
            this.formData.set('outflowDiameter', document.getElementById('outflowDiameter')?.value);
            this.formData.set('rainfallStation', document.getElementById('rainfallStation')?.value);
     
            const distanceGroup = document.getElementById('destovka-distance-group');
            const distanceInput = document.getElementById('distance');
            const inflowDepthInput = document.getElementById('inflowDepth');
            const distanceUnitButton = distanceGroup.querySelector('.destovka-unit-button');
            const inflowDepthUnitButton = document.querySelector('#destovka-direct-depth .destovka-unit-button');
         
            const isDistanceMode = distanceGroup.style.display !== 'none';
         
            if (isDistanceMode && distanceInput.value) {
                const distanceValue = parseFloat(distanceInput.value) || 0;
                const distanceUnit = distanceUnitButton.getAttribute('data-current-unit');
                
                // Převod vzdálenosti na metry
                let distanceInMeters;
                switch (distanceUnit) {
                    case 'mm':
                        distanceInMeters = distanceValue / 1000;
                        break;
                    case 'cm':
                        distanceInMeters = distanceValue / 100;
                        break;
                    case 'm':
                    default:
                        distanceInMeters = distanceValue;
                        break;
                }
         
                const depthInMm = Math.round(distanceInMeters * 1000 * 0.03); // 3% výpočet
                
                this.formData.set('distance', distanceValue.toString());
                this.formData.set('distanceUnit', distanceUnit);
                this.formData.set('inflowDepth', depthInMm.toString());
            } else {
                // Konverze hloubky nátoku
                const inflowUnit = inflowDepthUnitButton.getAttribute('data-current-unit');
                const inflowValue = this.convertToMM(parseFloat(inflowDepthInput?.value || '0'), inflowUnit || 'mm');
                this.formData.set('inflowDepth', inflowValue.toString());
            }
        }
    }

    convertToMM(value, unit) {
        switch(unit) {
            case 'cm':
                return value * 10;
            case 'm':
                return value * 1000;
            case 'mm':
            default:
                return value;
        }
    }

    convertFromMM(value, targetUnit) {
        switch(targetUnit) {
            case 'cm':
                return value / 10;
            case 'm':
                return value / 1000;
            case 'mm':
            default:
                return value;
        }
    }

    restoreFormData() {
        if (this.currentStep === 1 && this.formData.size > 0) {
            document.getElementById('volumeRange').value = this.formData.get('volume') || '';
            document.getElementById('concrete').value = this.formData.get('concrete') || '';
            document.getElementById('soil').value = this.formData.get('soil') || '';
            document.getElementById('load').value = this.formData.get('load') || '';
            document.getElementById('inflowDiameter').value = this.formData.get('inflowDiameter') || '';
            document.getElementById('outflowDiameter').value = this.formData.get('outflowDiameter') || '';
            document.getElementById('rainfallStation').value = this.formData.get('rainfallStation') || '';
     
            // HSV hloubka
            const hsvInput = document.getElementById('hsvDepth');
            const hsvUnitButton = hsvInput?.closest('.destovka-input-row')?.querySelector('.destovka-unit-button');
            if (hsvInput && hsvUnitButton) {
                const currentUnit = hsvUnitButton.getAttribute('data-current-unit') || 'mm';
                const valueInMM = parseInt(this.formData.get('hsvDepth'));
                hsvInput.value = this.convertFromMM(valueInMM, currentUnit);
            }
     
            // Hloubka nátoku a vzdálenost
            const distanceGroup = document.getElementById('destovka-distance-group');
            const directDepthGroup = document.getElementById('destovka-direct-depth');
            const inflowDepthInput = document.getElementById('inflowDepth');
            const distanceInput = document.getElementById('distance');
            const inflowUnitButton = directDepthGroup?.querySelector('.destovka-unit-button');
            const distanceUnitButton = distanceGroup?.querySelector('.destovka-unit-button');
     
            // Obnova režimu zobrazení (hloubka vs. vzdálenost)
            const distance = this.formData.get('distance');
            const toggleButton = document.querySelector('.destovka-toggle-natok');
     
            if (distance) {
                directDepthGroup.style.display = 'none';
                distanceGroup.style.display = 'flex';
                toggleButton.textContent = 'Znám hloubku nátoku';
                
                distanceInput.value = distance;
                if (distanceUnitButton) {
                    const unit = this.formData.get('distanceUnit') || 'm';
                    distanceUnitButton.textContent = unit;
                    distanceUnitButton.setAttribute('data-current-unit', unit);
                }
            } else {
                directDepthGroup.style.display = 'flex';
                distanceGroup.style.display = 'none';
                toggleButton.textContent = 'Neznám hloubku nátoku';
                
                if (inflowDepthInput && inflowUnitButton) {
                    const currentUnit = inflowUnitButton.getAttribute('data-current-unit') || 'mm';
                    const valueInMM = parseInt(this.formData.get('inflowDepth'));
                    inflowDepthInput.value = this.convertFromMM(valueInMM, currentUnit);
                }
            }
     
            if (window.volumeRange) {
                window.volumeRange.updateValue(this.formData.get('volume'));
            }
        }
     }

    handlePreviousStep() {
        if (this.currentStep > 1) {
            let newStep = this.currentStep - 1;


            if (newStep === 1) {
                window.location.reload();
                return;
            }

            if (this.currentStep === 7.5) {
                this.changeStep(7);
                return;
            }
    
            if (this.currentStep === 8) {
                this.changeStep(7.5);
                return;
            }
    
            // Speciální varování pouze při návratu z kroku 2 na 1
            if (this.currentStep === 2) {
                const confirmed = confirm("Pozor, návratem na předchozí krok začnete znovu, opravdu chcete pokračovat?");
                if (!confirmed) return;
            }

            if (this.currentStep === 6) {
                const productContainer = document.querySelector('#destovka-step5 .destovka-products-container');
                if (productContainer && !productContainer.querySelector('.destovka-product-card')) {
                    newStep = 4; // Jít na filtrace místo sifonů
                }
            }

            if (this.currentStep === 5) {
                const step4Items = window.destovkaCart.destGetItemsByStep(4);
                step4Items.forEach(item => {
                    window.destovkaCart.destRemoveItem(item.productCode);
                });
            }
    
            // Vyčištění košíku pro aktuální krok
            const stepItems = window.destovkaCart.destGetItemsByStep(this.currentStep);
            stepItems.forEach(item => {
                window.destovkaCart.destRemoveItem(item.productCode);
            });

            const itemsToRemove = window.destovkaCart.destGetAllItems().filter(item => {
                if (item.step === this.currentStep) return true;
                if (this.currentStep === 3 && item.type === 'cover') return true;
                return false;
            });
            
            itemsToRemove.forEach(item => {
                window.destovkaCart.destRemoveItem(item.productCode);
            });

            if (this.currentStep === 12) {
                // Vrátíme se na krok 11 bez vyčištění košíku
                this.changeStep(newStep);
                return;
            }
    
            this.changeStep(newStep);
        }
    }

     async handleNextStep() {
        if (this.currentStep === 2) {
            const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
            if (!selectedTank) {
                alert('Prosím vyberte nádrž před pokračováním.');
                return;
            }
         
            const tankData = window.destovkaTankManager?.tanksData.find(
                tank => tank['Kód'] === selectedTank.productCode
            );
         
            if (tankData) {
                try {
                    if (!window.destovkaAccessoryFilter) {
                        window.destovkaAccessoryFilter = new DestovkaAccessoryFilter();
                        await window.destovkaAccessoryFilter.loadData();
                    }
                    if (!window.destovkaAccessoryManager) {
                        window.destovkaAccessoryManager = new DestovkaAccessoryManager(window.destovkaAccessoryFilter);
                    }
                    
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            window.destovkaAccessoryManager.showAccessoryPopup(tankData, resolve);
                        }, 100);
                    });
                    
                    return;
                } catch (error) {
                    console.error('Chyba při zobrazení accessory popup:', error);
                    this.changeStep(this.currentStep + 1);
                }
            }
        } 
        else if (this.currentStep === 9) {  // Geigery
            const selectedGeigers = window.destovkaGeigeryManager?.getSelectedGeigers() || [];
            if (selectedGeigers.length > 0) {
                selectedGeigers.forEach(geiger => {
                    window.destovkaCart.destAddItem(9, geiger.code, geiger.quantity, {
                        type: geiger.type
                    });
                });
            }
        }
        else if (this.currentStep === 11) { // Vsakovací objekt
            console.log('Step 11 - handling next step');
            const selectedProducts = window.destovkaVsakovaciManager?.getSelectedProducts() || [];
            console.log('Selected products:', selectedProducts);
            if (selectedProducts.length > 0) {
                selectedProducts.forEach(product => {
                    console.log('Adding to cart:', product);
                    window.destovkaCart.destAddItem(11, product.code, product.quantity, {
                        type: 'vsakovací objekt'
                    });
                });
            }
        }
        else if (this.currentStep === 10) { // Potrubí
            const selectedProducts = window.destovkaPotrubíManager?.getSelectedProducts() || [];
            if (selectedProducts.length > 0) {
                selectedProducts.forEach(product => {
                    window.destovkaCart.destAddItem(10, product.code, product.quantity, {
                        type: 'potrubí'
                    });
                });
            }
        }
        else if (this.currentStep === 3) { 
            const selectedProducts = window.destovkaPotrubíManager?.getSelectedProducts() || [];
            if (selectedProducts.length > 0) {
                selectedProducts.forEach(product => {
                    window.destovkaCart.destAddItem(10, product.code, product.quantity, {
                        type: 'nastavec'
                    });
                });
            }
        }
        else if (/*this.currentStep === 3 || */this.currentStep === 4 || this.currentStep === 5 || this.currentStep === 8) {
            const container = document.getElementById(`destovka-step${this.currentStep}`);
            const productsContainer = container.querySelector('.destovka-products-container');
            
            if (!productsContainer) {
                console.error('Products container not found');
                return;
            }
        
            const selectedCard = productsContainer.querySelector('.destovka-product-selected');
            if (!selectedCard && this.currentStep !== 5) {  // Přidáno !==5
                alert('Prosím vyberte produkt před pokračováním.');
                return;
            }
        
            const productCode = selectedCard?.dataset.productCode;
            if (productCode) {
                window.destovkaCart.destAddItem(this.currentStep, productCode, 1);
            }
        }

        
        if (this.currentStep === 6) {
            const container = document.getElementById('destovka-step6');
            
            const categoriesContainer = container.querySelector('.destovka-categories-container');
            if (categoriesContainer && categoriesContainer.style.display !== 'none') {
                alert('Prosím vyberte kategorii čerpadla před pokračováním.');
                return;
            }
        
            const emptyProduct = container.querySelector('.destovka-empty-product');
            if (emptyProduct && emptyProduct.classList.contains('destovka-product-selected')) {
                this.changeStep(this.currentStep + 1);
                return;
            }
        
            const selectedPump = container.querySelector('.destovka-product-selected');
            if (!selectedPump) {
                alert('Prosím vyberte čerpadlo před pokračováním.');
                return;
            }
            
            // Přidáme vybrané čerpadlo do košíku s accessories
            const productCode = selectedPump.dataset.productCode;
            const pumpData = window.destovkaPumpManager?.pumpsData.find(p => p.Kód === productCode);
            
            if (pumpData) {
                window.destovkaCart.destAddItem(6, productCode, 1, {
                    name: pumpData.Název,
                    type: 'pump',
                    accessories: [
                        pumpData.PříslušenstvíID1,
                        pumpData.PříslušenstvíID2, 
                        pumpData.PříslušenstvíID3
                    ].filter(Boolean)
                });
            }
        }

        if (this.currentStep === 5) {  // Jsme na kroku sifonů
            setTimeout(() => {
                const productContainer = document.querySelector('#destovka-step5 .destovka-products-container');
                if (productContainer && !productContainer.querySelector('.destovka-product-card')) {
                    this.changeStep(6);
                }
            }, 100);
            
            // Zkontrolujeme hned, jestli tam jsou produkty
            const productContainer = document.querySelector('#destovka-step5 .destovka-products-container');
            if (productContainer && !productContainer.querySelector('.destovka-product-card')) {
                return; // Return pouze pokud nejsou produkty
            }
        }

        if (this.currentStep === 7) {
            if (!window.destovkaCartDisplayIntermediate) {
                window.destovkaCartDisplayIntermediate = new DestovkaCartDisplayManager('intermediate');
            }
            this.changeStep(7.5);
            return; // Přidán return pro jistotu
        }

        if (this.currentStep === 7.5) {
            this.changeStep(8);
            return;
        }

        
     
        if (this.currentStep < this.maxSteps && this.validateStep(this.currentStep)) {
            this.saveFormData();
            this.changeStep(this.currentStep + 1);
        }
    }

    changeStep(newStep) {
        // Hide current step - upravená část
    const currentStepId = this.currentStep.toString().replace('.', '-');  // Převede aktuální krok na formát s pomlčkou
    const currentContent = document.getElementById(`destovka-step${currentStepId}`);
    if (currentContent) {
        currentContent.classList.remove('destovka-active');
        console.log('Removing active from:', currentStepId); // Debug log
    }

    // Show new step
    const newStepId = newStep.toString().replace('.', '-');
    const newContent = document.getElementById(`destovka-step${newStepId}`);
    if (newContent) {
        newContent.classList.add('destovka-active');
        console.log('Adding active to:', newStepId); // Debug log
    }

        if (newStep === 12 && !window.destovkaCartDisplay) {
            window.destovkaCartDisplay = new DestovkaCartDisplayManager();
        }

        if (newStep === 11 && !window.destovkaVsakovaciManager) {
            window.destovkaVsakovaciManager = new DestovkaVsakovaciManager();
        }
    
        if (newStep === 10 && !window.destovkaPotrubíManager) {
            window.destovkaPotrubíManager = new DestovkaPotrubíManager();
        }

        if (newStep === 9 && !window.destovkaGeigeryManager) {
            window.destovkaGeigeryManager = new DestovkaGeigeryManager();
        }

        this.currentStep = newStep;
        if (newStep === 8 && !window.destovkaHladinomeryManager) {
            window.destovkaHladinomeryManager = new DestovkaHladinomeryManager();
        }


/*
        if (newStep === 7 && !window.destovkaPumpAccessoryManager) {
            window.destovkaPumpAccessoryManager = new DestovkaPumpAccessoryManager();
        }
*/

        if (newStep === 7) {
            window.destovkaPumpAccessoryManager = new DestovkaPumpAccessoryManager();
        }


        if (newStep === 5 && !window.destovkaSiphonManager) {
            window.destovkaSiphonManager = new DestovkaSiphonManager();
        }
    
        if (newStep === 4 && !window.destovkaFiltrationManager) {
            window.destovkaFiltrationManager = new DestovkaFiltrationManager();
        }
    
        if (newStep === 6 && !window.destovkaPumpManager) {
            window.destovkaPumpManager = new DestovkaPumpManager();
        }
    
        if (newStep === 3 /*&& !window.destovkaAccessoriesManager*/) {
            window.destovkaAccessoriesManager = new DestovkaAccessoriesManager();
            console.log("ahoj")
        }
        
        if (newStep === 2 && window.destovkaTankManager) {
            window.destovkaTankManager.updateTankDisplay(this.formData);
        }
        
        if (window.destovkaSidebar) {
            window.destovkaSidebar.setStep(this.currentStep);
        }
        
        if (newStep === 1) {
            this.restoreFormData();
        }
        
        this.updateButtonsState();
    }

    updateButtonsState() {
        document.querySelectorAll('.destovka-button-back').forEach(button => {
            button.classList.toggle('destovka-button-disabled', this.currentStep === 1);
        });
        
        document.querySelectorAll('.destovka-button-next').forEach(button => {
            button.classList.toggle('destovka-button-disabled', this.currentStep === this.maxSteps);
        });
    }
}

class UnitConverter {
    constructor() {
        this.units = ['mm', 'cm', 'm'];
        this.conversionFactors = {
            'mm': { 'cm': 0.1, 'm': 0.001 },
            'cm': { 'mm': 10, 'm': 0.01 },
            'm': { 'mm': 1000, 'cm': 100 }
        };
        this.initializeUnitButtons();
    }

    initializeUnitButtons() {
        const unitButtons = document.querySelectorAll('.destovka-unit-button');
        
        unitButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleUnitChange(e));
        });
    }

    handleUnitChange(event) {
        const button = event.target;
        const currentUnit = button.getAttribute('data-current-unit');
        const input = button.parentElement.querySelector('input');
        const currentValue = parseFloat(input.value) || 0;

        // Najít další jednotku v cyklu
        const currentIndex = this.units.indexOf(currentUnit);
        const nextIndex = (currentIndex + 1) % this.units.length;
        const nextUnit = this.units[nextIndex];

        // Převést hodnotu
        const convertedValue = this.convertValue(currentValue, currentUnit, nextUnit);
        input.value = convertedValue;

        // Aktualizovat tlačítko
        button.textContent = nextUnit;
        button.setAttribute('data-current-unit', nextUnit);
    }

    convertValue(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;

        const factor = this.conversionFactors[fromUnit][toUnit];
        return (value * factor).toFixed(2);
    }
}

class VolumeRangeHandler {
    constructor() {
        this.range = document.getElementById('volumeRange');
        this.valueDisplay = document.getElementById('volumeValue');
        
        if (this.range && this.valueDisplay) {
            this.initializeRange();
        }
    }

    initializeRange() {
        this.updateValue(this.range.value);
        
        this.range.addEventListener('input', (e) => {
            this.updateValue(e.target.value);
        });
    }

    updateValue(value) {
        // Formátování čísla s mezerami po tisících
        this.valueDisplay.textContent = Number(value).toLocaleString('cs-CZ');
    }
}

class TooltipHandler {
    constructor() {
        this.tooltips = document.querySelectorAll('.destovka-tooltip');
        this.initializeTooltips();
    }

    initializeTooltips() {
        this.tooltips.forEach(tooltip => {
            const content = tooltip.querySelector('.destovka-tooltip-content');
            
            tooltip.addEventListener('mouseenter', (e) => {
                this.positionTooltip(e, content);
            });

            // Update position on scroll
            window.addEventListener('scroll', () => {
                if (content.style.display === 'flex') {
                    this.positionTooltip(tooltip, content);
                }
            });
        });
    }

    positionTooltip(event, content) {
        const tooltip = event.target.closest('.destovka-tooltip');
        const rect = tooltip.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        
        // Calculate available space
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Default position (below tooltip)
        let top = rect.bottom + 8;
        let left = rect.left - (contentRect.width / 2) + (rect.width / 2);
        
        // Check if tooltip would go off bottom of screen
        if (top + contentRect.height > viewportHeight) {
            top = rect.top - contentRect.height - 8;
        }
        
        // Check if tooltip would go off right of screen
        if (left + contentRect.width > viewportWidth) {
            left = viewportWidth - contentRect.width - 8;
        }
        
        // Check if tooltip would go off left of screen
        if (left < 8) {
            left = 8;
        }
        
        content.style.top = `${top}px`;
        content.style.left = `${left}px`;
    }
}

class DestovkaCart {
    constructor() {
        this.destItems = new Map(); // Přejmenováno na destItems
        this.destStepLimits = {
            2: { maxItems: 2, type: 'tank' },
            3: { maxItems: null, type: 'nastavec' },
            4: { maxItems: null, type: 'filtrace' },
            5: { maxItems: null, type: 'sifon' },
            6: { maxItems: null, type: 'pump' },  // opraveno na pump
            7: { maxItems: null, type: 'pump-accessory' },  // příslušenství k čerpadlům
            8: { maxItems: null, type: 'hladinomer' },
            9: { maxItems: null, type: 'geiger' },
            10: { maxItems: null, type: 'potrubi' },
            11: { maxItems: null, type: 'vsakovaci' }
        };
        
        this.destLoadFromStorage();
    }

    destAddItem(step, productCode, quantity = 1, metadata = {}) {
        if (!this.destValidateStepLimit(step, productCode)) {
            console.error(`Překročen limit pro krok ${step}`);
            return false;
        }

        const newItem = {
            step,
            quantity,
            ...metadata,
            addedAt: new Date().toISOString()
        };

        this.destItems.set(productCode, newItem);
        this.destSaveToStorage();
        return true;
    }

    destAddBatch(step, products) {
        let allSuccess = true;
        
        products.forEach(product => {
            const success = this.destAddItem(
                step, 
                product.productCode, 
                product.quantity, 
                product.metadata
            );
            if (!success) allSuccess = false;
        });

        return allSuccess;
    }

    destValidateStepLimit(step, newProductCode) {
        const limit = this.destStepLimits[step];
        if (!limit) return true;

        if (limit.maxItems === 1) {
            const existingItems = Array.from(this.destItems.entries())
                .filter(([_, item]) => item.step === step);
            
            if (existingItems.length > 0 && !existingItems.find(([code]) => code === newProductCode)) {
                return false;
            }
        }

        return true;
    }

    destRemoveItem(productCode) {
        const removed = this.destItems.delete(productCode);
        if (removed) this.destSaveToStorage();
        return removed;
    }

    destUpdateQuantity(productCode, quantity) {
        const item = this.destItems.get(productCode);
        if (item) {
            item.quantity = quantity;
            this.destItems.set(productCode, item);
            this.destSaveToStorage();
            return true;
        }
        return false;
    }

    destGetItemsByStep(step) {
        return Array.from(this.destItems.entries())
            .filter(([_, item]) => item.step === step)
            .map(([code, item]) => ({ productCode: code, ...item }));
    }

    destGetAllItems() {
        return Array.from(this.destItems.entries())
            .map(([code, item]) => ({ productCode: code, ...item }));
    }

    destGetTotalPrice() {
        return Array.from(this.destItems.values())
            .reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
    }

    destSaveToStorage() {
        try {
            const serialized = JSON.stringify(Array.from(this.destItems.entries()));
            localStorage.setItem('destovka_cart', serialized);
        } catch (error) {
            console.error('Chyba při ukládání košíku:', error);
        }
    }

    destLoadFromStorage() {
        try {
            const serialized = localStorage.getItem('destovka_cart');
            if (serialized) {
                this.destItems = new Map(JSON.parse(serialized));
            }
        } catch (error) {
            console.error('Chyba při načítání košíku:', error);
        }
    }

    destClear() {
        this.destItems.clear();
        this.destSaveToStorage();
    }

    destExportForURL() {
        return Array.from(this.destItems.entries())
            .map(([code, item]) => ({
                c: code,             // productCode
                q: item.quantity,    // quantity
                s: item.step         // step
            }));
    }

    destImportFromURL(data) {
        this.destClear();
        data.forEach(item => {
            this.destAddItem(item.s, item.c, item.q);
        });
    }
}

class DestovkaAccessoryManager {
    constructor(filter) {
        if (!filter) {
            throw new Error('AccessoryFilter není inicializován');
        }
        this.filter = filter;
        this.selectedTankSystem = null;
        this.coverIncluded = false;
        this.coverType = null;
        this.getFeedData = () => window.destovkaTankManager?.feedData || new Map();
    }

    getFeedDataForProduct(code) {
        const feedData = this.getFeedData();
        return feedData.get(code) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: 'img/radoby_placeholder.png',
            link: '#'
        };
    }


    getCompatibleCovers(tankData) {
        const compatibleCovers = this.filter.getCompatibleCovers(
            tankData['Systém'], 
            tankData['Poklop v ceně (žádný/nepochozí/pochozí/do 1,5 t/do 3,5 t/do 12,5 t/do 40 t'],
            tankData['Hloubka nátoku bez nástavce (mm)']
        );
    
        return compatibleCovers.map(cover => {
            const feedData = this.getFeedDataForProduct(cover.Kód);
            return {
                ...cover,
                price: feedData.price,
                availability: feedData.availability,
                height: cover['Minimální výška (mm)']
            };
        });
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

    formatPrice(price) {
        if (!price) return 'Cena na dotaz';
        const [value, currency] = price.split(' ');
        return `${parseInt(value).toLocaleString('cs-CZ')} Kč`;
    }

    createAccessoryItem(item) {
        const availability = this.formatAvailability(item.availability);
        const feedData = this.getFeedDataForProduct(item.Kód);
        
        return `
            <div class="destovka-accessory-item">
                <div class="destovka-accessory-item-main">
                    <div class="destovka-accessory-item-visuals">
                        <div class="destovka-accessory-item-image">
                            <img src="${feedData.imageLink}" 
                                 alt="${item.Název}"
                                 onerror="this.src='img/radoby_placeholder.png'" />
                        </div>
                    </div>
                    <div class="destovka-accessory-item-info">
                        <div class="destovka-accessory-item-name">${item.Název}</div>
                        <div class="destovka-accessory-item-code">kód ${item.Kód}</div>
                        <div class="destovka-accessory-item-load">Zatížení: ${item.Zatížení}</div>
                        <div class="destovka-accessory-item-height">Výška: ${item.height}mm</div>
                        <div class="destovka-tank-availability ${availability.className}">
                            ${availability.text}
                        </div>
                    </div>
                    <div class="destovka-accessory-item-actions">
                        <div class="destovka-tank-total-price">${this.formatPrice(item.price)}</div>
                        <button class="destovka-accessory-select" data-code="${item.Kód}" data-height="${item.height}"
                            ${!availability.isAvailable ? 'disabled' : ''}>
                            ${availability.isAvailable ? 'Vybrat' : 'Nedostupné'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showAccessoryPopup(tankData, callback) {
        if (!tankData) {
            console.error('Nejsou k dispozici data nádrže');
            return;
        }
    
        const defaultInflowDepth = parseInt(tankData['Hloubka nátoku bez nástavce (mm)']);
        const requiredDepth = parseInt(window.destovkaStepManager?.formData.get('inflowDepth'));
        
        // Přepočet skutečné výšky s offsetem
        const actualInflowDepth = defaultInflowDepth; //zde byl předtím offset, ale už nebyl třeba
        const missingHeight = Math.max(0, requiredDepth - actualInflowDepth);
        
        this.callback = callback;
        this.selectedTankSystem = tankData['Systém'];
        const compatibleCovers = this.getCompatibleCovers(tankData, missingHeight);
    
        let popup = document.querySelector('.destovka-accessory-popup');
        if (!popup) {
            popup = document.createElement('div');
            popup.className = 'destovka-accessory-popup';
        
            // Získám informaci o poklopu z dat nádrže
            const includedCover = tankData['Poklop v ceně (žádný/nepochozí/pochozí/do 1,5 t/do 3,5 t/do 12,5 t/do 40 t'];
            const hasCover = includedCover && includedCover !== 'žádný';
            
            // Získám požadovanou zátěž z formuláře
            const requiredLoad = window.destovkaStepManager?.formData.get('load');
        
            // Porovnání zátěže
            const loadHierarchy = {
                'nepochozí': 0,
                'pochozí': 1,
                'pojezdná do 3,5 t': 2,
                'pojezdná do 12 t': 3
            };
        
            const isInsufficient = hasCover && 
                loadHierarchy[includedCover] < loadHierarchy[requiredLoad];
        
            const coverInfo = hasCover ? `
                <div class="destovka-accessory-included-info ${isInsufficient ? 'destovka-accessory-insufficient' : ''}">
                    Vaše nádrž má v ceně ${isInsufficient ? 'pouze ' : ''}${includedCover} poklop
                </div>` : '';
        
            let content = '';
            if (compatibleCovers.length === 0) {
                content = `
                    <div class="destovka-accessory-popup-content">
                        <div class="destovka-accessory-popup-header">
                            <h2>Upozornění</h2>
                            <button class="destovka-accessory-popup-close">&times;</button>
                        </div>
                        <div class="destovka-accessory-popup-body">
                            ${coverInfo}
                            <div class="destovka-accessory-warning">
                                Pro požadovanou hloubku ${requiredDepth}mm nejsou teleskopické poklopy.
                                Tuto požadovanou hloubku však můžete překlenout nástavci v dalším kroce.
                            </div>
                        </div>
                        <div class="destovka-accessory-popup-footer">
                            <button class="destovka-accessory-popup-confirm">Pokračovat</button>
                        </div>
                    </div>`;
            } else {
                content = `
                    <div class="destovka-accessory-popup-content">
                        <div class="destovka-accessory-popup-header">
                            <h2>Výběr poklopu (chybějící výška: ${missingHeight}mm)</h2>
                            <button class="destovka-accessory-popup-close">&times;</button>
                        </div>
                        <div class="destovka-accessory-popup-body">
                            ${coverInfo}
                            <div class="destovka-accessory-section">
                                <h3>Dostupné poklopy</h3>
                                <div class="destovka-accessory-items">
                                    ${compatibleCovers.map(cover => 
                                        this.createAccessoryItem(cover)
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                        <div class="destovka-accessory-popup-footer">
                            <button class="destovka-accessory-popup-confirm">Pokračovat</button>
                        </div>
                    </div>`;
            }
            popup.innerHTML = content;
            document.body.appendChild(popup);
        }
    
        popup.classList.add('destovka-accessory-popup-show');
        this.initializeEventListeners(popup);
    }

    initializeEventListeners(popup) {
        if (!popup) return;
    
        const closeButton = popup.querySelector('.destovka-accessory-popup-close');
        const confirmButton = popup.querySelector('.destovka-accessory-popup-confirm');
        const backButton = popup.querySelector('.destovka-accessory-popup-back');
        
        popup.querySelectorAll('.destovka-accessory-select').forEach(button => {
            button.addEventListener('click', () => {
                // Odstranit předchozí výběr
                popup.querySelectorAll('.destovka-accessory-select').forEach(btn => {
                    btn.classList.remove('destovka-selected');
                    btn.textContent = 'Vybrat';
                });
                
                // Nastavit nový výběr
                button.classList.add('destovka-selected');
                button.textContent = 'Vybráno';
                
                // Označit celý item jako vybraný
                const selectedItem = button.closest('.destovka-accessory-item');
                popup.querySelectorAll('.destovka-accessory-item').forEach(item => {
                    item.classList.remove('destovka-accessory-selected');
                });
                selectedItem.classList.add('destovka-accessory-selected');
            });
        });
        
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.closePopup(popup);
            });
        }
    
        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                this.handleConfirm(popup);
                /*
                if (popup.querySelector('.destovka-selected')) {
                    this.handleConfirm(popup);
                } else {
                    alert('Prosím vyberte poklop před pokračováním');
                }
                    */
            });
        }
    
        if (backButton) {
            backButton.addEventListener('click', () => {
                this.closePopup(popup);
                window.destovkaStepManager.handlePreviousStep();
            });
        }
    }

    handleCoverSelection(button, code) {
        document.querySelectorAll('.destovka-accessory-select').forEach(btn => {
            btn.classList.remove('destovka-accessory-select-selected');
            btn.textContent = 'Vybrat';
        });

        button.classList.add('destovka-accessory-select-selected');
        button.textContent = 'Vybráno';
    }

    handleConfirm(popup) {
    const selectedButton = popup?.querySelector('.destovka-selected');
    if (selectedButton) {
        const coverCode = selectedButton.dataset.code;
        const coverItem = selectedButton.closest('.destovka-accessory-item');
        const coverName = coverItem?.querySelector('.destovka-accessory-item-name')?.textContent || '';
        const coverHeight = parseInt(selectedButton.dataset.height) || 0;
        const feedData = this.getFeedDataForProduct(coverCode);

        window.destovkaCart.destAddItem(2, coverCode, 1, {  
            name: coverName,
            price: this.extractPrice(feedData.price),
            imageUrl: feedData.imageLink || 'img/radoby_placeholder.png',
            type: 'cover',
            height: coverHeight
        });
    }

    this.closePopup(popup);
    window.destovkaStepManager.changeStep(3);
    if (this.callback) this.callback();
}

    extractPrice(price) {
        if (typeof price === 'number') return price;
        if (typeof price === 'string') {
            return parseInt(price.replace(/[^0-9]/g, '')) || 0;
        }
        return 0;
    }
     
     handleSkip(popup) {
        this.closePopup(popup);
        window.destovkaStepManager.changeStep(3);
        if (this.callback) this.callback();
     }

     closePopup(popup) {
        if (!popup) return;
        
        popup.classList.remove('destovka-accessory-popup-show');
        setTimeout(() => {
            popup.remove();
            if (this.callback) {
                this.callback();
            }
        }, 300);
    }
}

class DestovkaAccessoryFilter {
    constructor() {
        this.coverData = [];
        this.loadData();
    }

    getCompatibleExtensions(tankSystem, missingHeight, maxAllowedHeight) {
        console.group('🔍 Hledání kompatibilních nástavců');
        console.log('Systém:', tankSystem);
        console.log('Chybějící výška:', missingHeight, 'mm');
        console.log('Max povolená výška:', maxAllowedHeight, 'mm');
    
        if (!this.extensionData || this.extensionData.length === 0) {
            console.warn('❌ Žádná data o nástavcích');
            console.groupEnd();
            return { extensions: [], recommendation: null };
        }
    
        // Filtrujeme nástavce pro daný systém
        const systemExtensions = this.extensionData.filter(ext => ext.Systém === tankSystem);
        
        // Seřadíme podle výšky vzestupně
        const sortedExtensions = systemExtensions.sort((a, b) => 
            parseInt(a['Výška (mm)']) - parseInt(b['Výška (mm)'])
        );
    
        // Najdeme nástavce, které můžeme použít (i s ořezáním)
        const usableExtensions = sortedExtensions.filter(ext => {
            const height = parseInt(ext['Výška (mm)']);
            return height >= missingHeight && height <= maxAllowedHeight;
        });
    
        console.log('📏 Dostupné nástavce:', usableExtensions);
    
        // Pokud nemáme žádné vhodné nástavce, spočítáme doporučení
        if (usableExtensions.length === 0) {
            const recommendation = this.calculateHeightAdjustment(
                sortedExtensions, 
                missingHeight, 
                maxAllowedHeight
            );
            
            console.log('💡 Doporučení:', recommendation);
            console.groupEnd();
            return { extensions: [], recommendation };
        }
    
        console.groupEnd();
        return { extensions: usableExtensions, recommendation: null };
    }
 
    async loadData() {
        if (this.coverData.length > 0) {
            return; // Data už jsou načtená
        }
    
        try {
            const response = await fetch('jsony/poklopy.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.coverData = await response.json();
            return this.coverData; // Vracíme data pro await
        } catch (error) {
            console.error('Chyba při načítání dat:', error);
            throw error;
        }
    }
 
    getCompatibleCovers(tankSystem, currentCover, missingHeight) {
        const requiredLoad = window.destovkaStepManager?.formData.get('load');
        console.log('Filtering covers:', {
            tankSystem,
            currentCover,
            missingHeight,
            requiredLoad
        });

        if (!this.coverData || this.coverData.length === 0) {
            console.warn('No cover data available');
            return [];
        }

        const loadHierarchy = {
            'nepochozí': 0,
            'pochozí': 1,
            'pojezdná do 3,5 t': 2,
            'pojezdná do 12 t': 3,
            'pojezdná do 40 t': 4
        };

        const requiredLoadIndex = loadHierarchy[requiredLoad];
        
        const filtered = this.coverData.filter(cover => {
            // Základní validace dat
            if (!cover || !cover.Systém || !cover.Zatížení) {
                console.warn('Invalid cover data:', cover);
                return false;
            }

            // Kontrola systému
            const systemMatch = cover.Systém === tankSystem || 
                              (cover[''] && cover[''] === tankSystem);

            if (!systemMatch) {
                console.log(`System mismatch: ${cover.Systém} !== ${tankSystem}`);
                return false;
            }

            // Kontrola výšky
            const minHeight = parseInt(cover['Minimální výška (mm)']);
            if (minHeight > missingHeight) {
                console.log(`Height mismatch: ${minHeight}mm > ${missingHeight}mm`);
                return false;
            }

            // Kontrola zatížení
            const coverLoadIndex = loadHierarchy[cover.Zatížení];
            if (coverLoadIndex < requiredLoadIndex) {
                console.log(`Load mismatch: Cover ${cover.Zatížení} (${coverLoadIndex}) < Required ${requiredLoad} (${requiredLoadIndex})`);
                return false;
            }

            // Pokud je již nějaký poklop v ceně, zobrazit pouze vyšší třídy
            if (currentCover && currentCover !== 'žádný') {
                const currentLoadIndex = loadHierarchy[currentCover];
                if (coverLoadIndex <= currentLoadIndex) {
                    console.log(`Current cover has same or better load rating: ${currentCover} >= ${cover.Zatížení}`);
                    return false;
                }
            }

            return true;
        });

        console.log('Filtered covers:', filtered);
        return filtered;
    }

    meetsLoadRequirements(coverLoad, requiredLoad) {
        const loadHierarchy = [
            'nepochozí',
            'pochozí',
            'pojezdná do 3,5 t',
            'pojezdná do 12 t'
        ];
        
        const requiredLoadIndex = loadHierarchy.indexOf(requiredLoad);
        const coverLoadIndex = loadHierarchy.indexOf(coverLoad);
        
        // Poklop musí mít stejné nebo větší zatížení než požadované
        return coverLoadIndex >= requiredLoadIndex;
    }
 
    getLoadIndex(loadType) {
        const loadHierarchy = [
            'nepochozí',
            'pochozí',
            'pojezdná do 3,5 t',
            'pojezdná do 12 t'
        ];
        const index = loadHierarchy.indexOf(loadType);
        console.log(`Load index for ${loadType}: ${index}`);
        return index;
    }

    calculateHeightAdjustment(extensions, missingHeight, maxAllowedHeight) {
        // Pokud je požadovaná výška větší než maximum
        if (missingHeight > maxAllowedHeight) {
            return {
                type: 'decrease',
                amount: missingHeight - maxAllowedHeight,
                message: `Je potřeba snížit hloubku nátoku o ${missingHeight - maxAllowedHeight}mm`
            };
        }
    
        // Najdeme nejbližší větší nástavec
        const closestLarger = extensions.find(ext => 
            parseInt(ext['Výška (mm)']) >= missingHeight
        );
    
        // Najdeme nejbližší menší nástavec
        const closestSmaller = [...extensions]
            .reverse()
            .find(ext => parseInt(ext['Výška (mm)']) < missingHeight);
    
        if (!closestLarger && !closestSmaller) {
            return {
                type: 'system',
                message: 'Pro tento systém nejsou k dispozici žádné nástavce'
            };
        }
    
        if (!closestLarger) {
            return {
                type: 'increase',
                amount: parseInt(closestSmaller['Výška (mm)']),
                message: `Je potřeba zvýšit hloubku nátoku na ${closestSmaller['Výška (mm)']}mm`
            };
        }
    
        if (!closestSmaller) {
            if (closestLarger['Výška (mm)'] <= maxAllowedHeight) {
                return {
                    type: 'cut',
                    amount: closestLarger['Výška (mm)'] - missingHeight,
                    extension: closestLarger,
                    message: `Lze použít nástavec ${closestLarger['Výška (mm)']}mm a zkrátit ho o ${closestLarger['Výška (mm)'] - missingHeight}mm`
                };
            } else {
                return {
                    type: 'decrease',
                    amount: missingHeight,
                    message: `Je potřeba snížit hloubku nátoku o ${missingHeight}mm`
                };
            }
        }
    
        // Máme obě možnosti, vybereme lepší
        const diffLarger = closestLarger['Výška (mm)'] - missingHeight;
        const diffSmaller = missingHeight - closestSmaller['Výška (mm)'];
    
        if (diffLarger <= diffSmaller) {
            return {
                type: 'cut',
                amount: diffLarger,
                extension: closestLarger,
                message: `Lze použít nástavec ${closestLarger['Výška (mm)']}mm a zkrátit ho o ${diffLarger}mm`
            };
        } else {
            return {
                type: 'adjust',
                amount: diffSmaller,
                extension: closestSmaller,
                message: `Doporučujeme upravit hloubku nátoku na ${closestSmaller['Výška (mm)']}mm`
            };
        }
    }
 }


const initializeConfigurator = () => {
    window.unitConverter = new UnitConverter();
    window.volumeRange = new VolumeRangeHandler();
    window.tooltipHandler = new TooltipHandler();
    window.destovkaCart = new DestovkaCart();
    window.destovkaStepManager = new DestovkaStepManager();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeConfigurator);
} else {
    initializeConfigurator();
}






