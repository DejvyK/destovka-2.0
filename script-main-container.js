// zde bude kód patřící k věcem od main containeru. 



class DestovkaKonfigCalculator {
    constructor() {
        this.initialize();
    }

    initialize() {
        const volumeLabel = document.querySelector('.destovka-form-group:first-child .destovka-label');
        if (volumeLabel) {
            const calcButton = document.createElement('div');
            calcButton.style.display = 'flex';
            calcButton.style.cursor = 'pointer';
            calcButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style="margin-right:7px" class="bi bi-calculator" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                
            </svg>(Kalkulačka)`;
            calcButton.onclick = () => this.showCalculator();

            const labelWrapper = document.querySelector('.destovka-label-wrapper')
            labelWrapper.appendChild(calcButton)
        }

        this.createCalculatorModal();
    }

    createCalculatorModal() {
        const modal = document.createElement('div');
        modal.className = 'destovka-konfig-calc-modal';
        modal.innerHTML = `
            <div class="destovka-konfig-calc-modal-content">
                <div class="destovka-konfig-calc-modal-header">
                    <h2>Kalkulačka velikosti nádrže</h2>
                    <button class="destovka-konfig-calc-modal-close">&times;</button>
                </div>
                <div class="destovka-konfig-calc-modal-body">
                    <div class="destovka-konfig-calc-form">
                        <div class="destovka-konfig-calc-form-group">
                            <label>Plocha střechy, půdorysný průmět (v m²):</label>
                            <input type="number" id="destovkaKonfigCalcRoofArea" class="destovka-konfig-calc-input" value="110" min="0">
                            <span class="destovka-konfig-calc-hint">Střecha domu, garáže, zahradního domku a ostatních ploch</span>
                        </div>
                        
                        <div class="destovka-konfig-calc-form-group">
                            <label>Srážkový úhrn dle mapy (v mm):</label>
                            <input type="number" id="destovkaKonfigCalcRainfall" class="destovka-konfig-calc-input" value="630" min="0">
                            <span class="destovka-konfig-calc-hint">Průměrný srážkový úhrn v ČR je 673 mm/rok</span>
                        </div>
                        
                        <div class="destovka-konfig-calc-map">
                            <img src="https://cdn.myshoptet.com/usr/eshop.destovka.eu/user/documents/upload/mapa-srazek-cr.png" 
                                alt="Mapa srážek ČR" 
                                class="destovka-konfig-calc-map-img">
                        </div>
                        
                        <div class="destovka-konfig-calc-form-group">
                            <label>Doporučený objem v litrech:</label>
                            <input type="number" id="destovkaKonfigCalcVolume" class="destovka-konfig-calc-input" readonly>
                            <span class="destovka-konfig-calc-hint">Doporučená hodnota objemu nádrže zohledňuje trend přívalových dešťů a větších rozestupů mezi dešti tak, aby nádrž pojala co nejvíce vody během deště a poté se uplně nevyčerpala do deště následujícího. Díky tomu bude nádrž využita efektivněji.</span>
                        </div>
                    </div>
                </div>
                <div class="destovka-konfig-calc-modal-footer">
                    <button class="destovka-konfig-calc-button destovka-konfig-calc-button-calculate">Vypočítat</button>
                    <button class="destovka-konfig-calc-button destovka-konfig-calc-button-apply destovka-konfig-calc-button-disabled">Vybrat tuto velikost</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.destovka-konfig-calc-modal-close').onclick = () => this.hideCalculator();
        modal.querySelector('.destovka-konfig-calc-button-calculate').onclick = () => this.calculate();
        modal.querySelector('.destovka-konfig-calc-button-apply').onclick = () => this.applyVolume();
        
        // Close modal on outside click
        modal.onclick = (e) => {
            if (e.target === modal) this.hideCalculator();
        };

        this.modal = modal;

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('destovka-konfig-calc-modal-show')) {
                this.hideCalculator();
            }
        });

        // Input validation
        const numericInputs = modal.querySelectorAll('input[type="number"]');
        numericInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value < 0) input.value = 0;
            });
        });
    }

    showCalculator() {
        this.modal.classList.add('destovka-konfig-calc-modal-show');
    }

    hideCalculator() {
        this.modal.classList.remove('destovka-konfig-calc-modal-show');
    }

    calculate() {
        const roofArea = parseFloat(document.getElementById('destovkaKonfigCalcRoofArea').value) || 0;
        const rainfall = parseFloat(document.getElementById('destovkaKonfigCalcRainfall').value) || 0;
        
        // Finální upřesněný koeficient na základě mnoha testovacích případů
        const coefficient = 0.06558;
        const volume = Math.round(roofArea * rainfall * coefficient);
        
        document.getElementById('destovkaKonfigCalcVolume').value = volume;
        
        const applyButton = this.modal.querySelector('.destovka-konfig-calc-button-apply');
        applyButton.classList.remove('destovka-konfig-calc-button-disabled');
    }

    applyVolume() {
        const volume = document.getElementById('destovkaKonfigCalcVolume').value;
        const volumeRange = document.getElementById('volumeRange');
        
        if (volumeRange && volume) {
            // Ensure the value is within the range's min and max
            const newValue = Math.min(Math.max(volume, volumeRange.min), volumeRange.max);
            volumeRange.value = newValue;
            
            // Trigger the input event to update any listeners
            const event = new Event('input');
            volumeRange.dispatchEvent(event);
        }
        
        this.hideCalculator();
    }
}

class DestovkaTankFilter {
    constructor(formData) {
        this.formData = formData;
        this.selectedTankCode = window.destovkaCart?.destGetItemsByStep(2)[0]?.productCode;
        
        // Kritická nastavení z formuláře
        this.wantsConcrete = this.formData.get('concrete') === 'yes';
        this.requiredLoad = this.formData.get('load');
        this.requiredInflowDepth = parseFloat(this.formData.get('inflowDepth'));
        this.requiredVolume = parseInt(this.formData.get('volume'));
        this.soilType = this.formData.get('soil');
        this.requiredInflow = this.formData.get('inflowDiameter');
        this.requiredOutflow = this.formData.get('outflowDiameter');
        
        // Hierarchie zatížení pro porovnání
        this.loadHierarchy = [
            'pochozí',
            'pojezdná do 3,5 t',
            'pojezdná do 12 t'
        ];
        
        // Objemová tolerance a kroky
        this.initialVolumeTolerance = 0.1;  // 10%
        this.maxVolumeTolerance = 0.3;      // 30%
        this.volumeToleranceStep = 0.05;    // 5% krok pro navyšování tolerance
        
        // Váhy pro bodování
        this.weights = {
            load: 40,       // Nejvyšší váha pro zatížení
            earthworks: 30, // Váha pro zemní práce
            volume: 30      // Váha pro objem
        };

        this.extensionCalculator = null;
        this.accessoryCalculator = null;

        console.log('Tank Filter initialized with settings:', {
            concrete: this.wantsConcrete,
            load: this.requiredLoad,
            inflowDepth: this.requiredInflowDepth,
            volume: this.requiredVolume
        });
    }

    async filterTanks(tanks) {
        if (!tanks || !Array.isArray(tanks) || tanks.length === 0) {
            return [];
        }
     
        let selectedTank = null;
        if (this.selectedTankCode) {
            selectedTank = tanks.find(tank => tank['Kód'] === this.selectedTankCode);
            if (selectedTank) {
                selectedTank = {
                    ...selectedTank,
                    score: await this.calculateTankScore(selectedTank)
                };
            }
        }
     
        let currentTolerance = this.initialVolumeTolerance;
        let filteredTanks = [];
     
        while (currentTolerance <= this.maxVolumeTolerance) {
            const validTanks = [];
            
            for (const tank of tanks) {
                if (await this.passesCriticalFilters(tank) && this.passesVolumeFilter(tank, currentTolerance)) {
                    const score = await this.calculateTankScore(tank);
                    validTanks.push({
                        ...tank,
                        score
                    });
                }
            }
     
            filteredTanks = validTanks.sort((a, b) => b.score - a.score);
     
            if (filteredTanks.length >= 3) break;
            currentTolerance += this.volumeToleranceStep;
        }
     
        if (filteredTanks.length === 0) {
            return [];
        }
     
        let topTanks = filteredTanks.slice(0, 3);
        
        if (selectedTank && !topTanks.find(tank => tank['Kód'] === selectedTank['Kód'])) {
            topTanks.push(selectedTank);
        }
     
        const recommendedTank = this.getRecommendedTank(topTanks);
        
        const finalTanks = [
            recommendedTank,
            ...topTanks.filter(tank => tank['Kód'] !== recommendedTank['Kód'])
        ];

        this.logFinalTanksScoring(finalTanks);
     
        return finalTanks;
     }

     logFinalTanksScoring(finalTanks) {
        console.group('🎯 Finální výběr nádrží:');
        
        finalTanks.forEach((tank, index) => {
            const marginScore = parseFloat(tank['Marze (%)'].trim()) || 0;
            const normalizedMarginScore = Math.min(marginScore / 25, 1);
    
            console.group(`${index + 1}. ${tank['Typ nádrže']} ${tank['Objemové označení']} (${tank['Kód']})`);
            
            console.log('📊 Celkové skóre:', Math.round(tank.score * 100) + '%');
            
            console.group('🎯 Dílčí skóre:');
            const earthworksScore = this.calculateEarthworksScore(tank);
            const volumeScore = this.calculateVolumeScore(tank);
            
            console.log('🏗️ Zemní práce:', Math.round(earthworksScore * 100) + '%', '(váha 60%)');
            console.log('📦 Objem:', Math.round(volumeScore * 100) + '%', '(váha 30%)');
            console.log('💰 Marže:', Math.round(marginScore) + '%', `(${Math.round(normalizedMarginScore * 100)}% z max, váha 10%)`);
            console.groupEnd();
    
            console.group('📝 Klíčové parametry:');
            console.log('Požadovaný objem:', `${this.requiredVolume.toLocaleString()} l`);
            console.log('Skutečný objem:', `${parseInt(tank['Objem (l)']).toLocaleString()} l`);
            
            console.group('📏 Analýza výšek:');
            const defaultInflowDepth = parseInt(tank['Hloubka nátoku bez nástavce (mm)']);
            const requiredDepth = this.requiredInflowDepth;
            const missingHeight = Math.max(0, requiredDepth - defaultInflowDepth);
            const maxPossibleHeight = parseInt(tank['Max. překrytí zeminou (mm)']);
            const remainingHeight = maxPossibleHeight - missingHeight;
            
            console.log('Požadovaná hloubka nátoku:', `${requiredDepth} mm`);
            console.log('Výchozí hloubka nátoku:', `${defaultInflowDepth} mm`);
            console.log('Chybějící výška:', `${missingHeight} mm`, missingHeight > 0 ? '⚠️ Potřeba nástavců!' : '✅');
            console.log('Max. možné překrytí:', `${maxPossibleHeight} mm`);
            console.log('Zbývající prostor pro nástavce:', `${remainingHeight} mm`);
            console.groupEnd();
    
            console.log('Marže:', `${tank['Marze (%)']}%`);
            
            console.group('💪 Zatížení:');
            console.log('Požadované:', this.requiredLoad);
            console.log('Dostupné:', [tank.Zatizeni1, tank.Zatizeni2, tank.Zatizeni3].filter(Boolean).join(', '));
            console.groupEnd();
    
            console.groupEnd();
            console.groupEnd();
        });
    
        console.groupEnd();
    }

    getRecommendedTank(tanks) {
        return tanks.reduce((recommended, current) => {
            const currentMargin = parseFloat(current['Marze (%)']) || 0;
            const recommendedMargin = parseFloat(recommended['Marze (%)']) || 0;
            return currentMargin > recommendedMargin ? current : recommended;
        }, tanks[0]);
    }

    async passesCriticalFilters(tank) {
        // 1. NEJVYŠŠÍ PRIORITA - Zatížení
        if (!this.passesLoadCheck(tank)) {
            return false;
        }
    
        // 2. DRUHÁ PRIORITA - Zemní práce
        const maxCovering = parseFloat(tank['Max. překrytí zeminou (mm)']);
        if (maxCovering < this.requiredInflowDepth) {
            return false;
        }
    
        const defaultInflowDepth = parseFloat(tank['Hloubka nátoku bez nástavce (mm)']);
        if (defaultInflowDepth > this.requiredInflowDepth) {
            return false;
        }
    
        // 3. TŘETÍ PRIORITA - Objem se řeší v passesVolumeFilter s tolerancí
    
        // Ostatní kontroly
        if (!this.wantsConcrete && tank['Konstrukce'] === 'Plastová samonosná na desku') {
            return false;
        }
    
        if (!this.passesDNCheck(tank)) {
            return false;
        }
    
        if (this.soilType === 'clay' && tank['Vhodné do jílovité půdy'] !== 'ANO') {
            return false;
        }
    
        return true;
    }

    async passesExtensionCheck(tank) {
        this.extensionCalculator = new ExtensionCalculator(
            tank['Systém'],
            this.requiredInflowDepth,
            parseFloat(tank['Hloubka nátoku bez nástavce (mm)'])
        );

        const result = await this.extensionCalculator.findExtensionCombinations();
        
        if (result.combinations.length === 0) {
            return false;
        }

        const isHeavyLoad = this.loadHierarchy.indexOf(this.requiredLoad) >= 1;
        if (isHeavyLoad) {
            const bestCombination = result.combinations[0];
            return bestCombination.totalHeight >= 500;
        }

        return true;
    }

    passesLoadCheck(tank) {
        const tankLoads = [tank.Zatizeni1, tank.Zatizeni2, tank.Zatizeni3]
            .filter(Boolean);
        
        const requiredLoadIndex = this.loadHierarchy.indexOf(this.requiredLoad);
        
        return tankLoads.some(tankLoad => {
            const tankLoadIndex = this.loadHierarchy.indexOf(tankLoad);
            return tankLoadIndex >= requiredLoadIndex;
        });
    }

    passesEarthworksCheck(tank) {
        const maxCovering = parseFloat(tank['Max. překrytí zeminou (mm)']);
        const defaultInflowDepth = parseFloat(tank['Hloubka nátoku bez nástavce (mm)']);

        // Překrytí zeminou musí být větší než požadovaná hloubka nátoku
        if (maxCovering < this.requiredInflowDepth) {
            return false;
        }

        // Defaultní hloubka nátoku musí být menší než požadovaná
        // (zbytek se dorovná nástavci)
        if (defaultInflowDepth > this.requiredInflowDepth) {
            return false;
        }

        return true;
    }

    passesDNCheck(tank) {
        const inflowOk = tank[`DN${this.requiredInflow}`] === "ANO";
        const outflowOk = tank[`DN${this.requiredOutflow}`] === "ANO";
        return inflowOk && outflowOk;
    }

    passesVolumeFilter(tank, tolerance) {
        const tankVolume = parseInt(tank['Objem (l)']);
        const minVolume = this.requiredVolume * (1 - tolerance);
        const maxVolume = this.requiredVolume * (1 + tolerance);
        
        return tankVolume >= minVolume && tankVolume <= maxVolume;
    }

    calculateTankScore(tank) {
        let maxScore = 100;
        let score = 0;
    
        // Zemní práce - 60% celkového skóre
        const earthworksScore = this.calculateEarthworksScore(tank);
        score += earthworksScore * 60;
    
        // Objem - 30% celkového skóre
        const volumeScore = this.calculateVolumeScore(tank);
        score += volumeScore * 30;
    
        // Bonus za marži - 10% celkového skóre
        const marginScore = parseFloat(tank['Marze (%)'].trim()) || 0;
        // Předpokládáme, že běžná marže je mezi 0-25%, takže dělíme 25 pro normalizaci
        const normalizedMarginScore = Math.min(marginScore / 25, 1);
        score += normalizedMarginScore * 10;
    
        return score / maxScore;
    }

    calculateLoadScore(tank) {
        const tankLoads = [tank.Zatizeni1, tank.Zatizeni2, tank.Zatizeni3]
            .filter(Boolean);
        
        const requiredLoadIndex = this.loadHierarchy.indexOf(this.requiredLoad);
        const maxTankLoadIndex = Math.max(
            ...tankLoads.map(load => this.loadHierarchy.indexOf(load))
        );

        if (maxTankLoadIndex === requiredLoadIndex) {
            return 1; // Přesná shoda = 100%
        } else if (maxTankLoadIndex > requiredLoadIndex) {
            return 0.8; // Vyšší zatížení = 80%
        }

        return 0;
    }

    calculateEarthworksScore(tank) {
        const maxCovering = parseFloat(tank['Max. překrytí zeminou (mm)']);
        const defaultInflowDepth = parseFloat(tank['Hloubka nátoku bez nástavce (mm)']);
        
        // Skóre za překrytí zeminou (max 0.5)
        const coveringScore = Math.max(0, 1 - 
            Math.abs(maxCovering - this.requiredInflowDepth) / this.requiredInflowDepth) * 0.5;
        
        // Skóre za hloubku nátoku (max 0.5)
        const depthScore = Math.max(0, 1 - 
            Math.abs(defaultInflowDepth - this.requiredInflowDepth) / this.requiredInflowDepth) * 0.5;
        
        return coveringScore + depthScore;
    }

    calculateVolumeScore(tank) {
        const tankVolume = parseInt(tank['Objem (l)']);
        if (tankVolume < this.requiredVolume) {
            return 0; // Pokud je objem menší než požadovaný, vrátíme 0
        }
        
        const volumeDiff = Math.abs(tankVolume - this.requiredVolume) / this.requiredVolume;
        return Math.max(0, 1 - volumeDiff);
    }
}

class DestovkaTankManager {
    constructor() {
        this.tanksContainer = document.getElementById('destovkaTanksContainer');
        this.tanksData = [];
        this.feedData = new Map();
        this.MAX_RETRIES = 3;
        this.RETRY_DELAY = 2000;
        this.tankFilter = null;
        this.init();
    }

    async init() {
        try {
            const [jsonData, xmlData] = await Promise.all([
                this.fetchWithRetry(() => this.fetchJSON(), 'JSON'),
                this.fetchWithRetry(() => this.fetchXMLFeed(), 'XML feed')
            ]);
    
            this.tanksData = jsonData;
            await this.processFeedData(xmlData);
            
        } catch (error) {
            console.error('Chyba při inicializaci:', error);
            this.handleError();
        }
    }

    // Nová metoda pro aktualizaci zobrazení nádrží
    updateTankDisplay(formData) {
        this.tankFilter = new DestovkaTankFilter(formData || new Map());
        this.renderTanks();
    }

    renderNoResults() {
        this.tanksContainer.innerHTML = `
            <div class="destovka-no-results">
                <div class="destovka-no-results-content">
                    <h3>Nenalezeny žádné vyhovující nádrže</h3>
                    <p>Pro vaše zadané parametry jsme bohužel nenašli žádnou vyhovující nádrž. 
                       Zkuste prosím upravit některé z následujících kritérií:</p>
                    <ul>
                        <li>Velikost nádrže (objem)</li>
                        <li>Požadavky na zatížení</li>
                        <li>Průměr nátoku nebo výtoku</li>
                    </ul>
                    <button class="destovka-button destovka-button-back" 
                            onclick="window.destovkaStepManager.handlePreviousStep()">
                        Upravit parametry
                    </button>
                </div>
            </div>
        `;
    }

    async fetchWithRetry(fetchFn, resourceName, retryCount = 0) {
        try {
            return await fetchFn();
        } catch (error) {
            if (retryCount < this.MAX_RETRIES) {
                console.log(`Pokus ${retryCount + 1} o načtení ${resourceName} selhal, zkouším znovu za ${this.RETRY_DELAY/1000} sekund...`);
                
                await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
                
                // Exponenciální navýšení čekací doby pro další pokus
                this.RETRY_DELAY *= 1.5;
                
                return this.fetchWithRetry(fetchFn, resourceName, retryCount + 1);
            }
            throw new Error(`Nepodařilo se načíst ${resourceName} po ${this.MAX_RETRIES} pokusech`);
        }
    }

    async fetchJSON() {
        const response = await fetch('jsony/nadrze.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async fetchXMLFeed() {
        const response = await fetch('google.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        
        // Kontrola, zda XML není prázdné nebo neobsahuje chyby
        const parseError = xml.getElementsByTagName('parsererror');
        if (parseError.length > 0) {
            throw new Error('XML parsing error');
        }
        
        return xml;
    }

    async processFeedData(xmlDoc) {
        const entries = xmlDoc.getElementsByTagName('entry');
        
        if (!entries || entries.length === 0) {
            throw new Error('XML feed neobsahuje žádné položky');
        }
        
        for (const entry of entries) {
            const productData = {
                id: this.getElementText(entry, 'g:id'),
                price: this.getElementText(entry, 'g:price'),
                availability: this.getElementText(entry, 'g:availability'),
                imageLink: this.getElementText(entry, 'g:image_link'),
                link: this.getElementText(entry, 'link')
            };
            
            // Kontrola, zda máme všechna požadovaná data
            if (!productData.id) continue;
            
            this.feedData.set(productData.id, productData);
        }
    }

    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }

    getFeedDataForTank(tankCode) {
        return this.feedData.get(tankCode) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: 'img/radoby_placeholder.png',
            link: '#'
        };
    }

    handleError() {
        if (this.tanksContainer) {
            this.tanksContainer.innerHTML = `
                <div class="destovka-error-message">
                    <div class="destovka-error-message-content">
                        <p>Omlouváme se, ale došlo k chybě při načítání dat.</p>
                        <button class="destovka-error-retry" onclick="window.destovkaTankManager = new DestovkaTankManager()">
                            Zkusit znovu
                        </button>
                    </div>
                </div>
            `;
        }
    }

    async renderTanks() {
        if (!this.tanksContainer) return;
    
        try {
            const filteredTanks = await this.tankFilter?.filterTanks(this.tanksData) || [];
            
            if (filteredTanks.length === 0) {
                this.renderNoResults();
                return;
            }
    
            this.tanksContainer.innerHTML = '';
            
            for (const [index, tankData] of filteredTanks.entries()) {
                const feedData = this.getFeedDataForTank(tankData.Kód);
                const tankElement = this.createTankElement(tankData, feedData, index === 0);
                if (tankElement) {
                    this.tanksContainer.appendChild(tankElement);
                    this.initializeTankSelection(tankElement, tankData, feedData);
                }
            }
    
        } catch (error) {
            console.error('Error rendering tanks:', error);
            this.tanksContainer.innerHTML = `
                <div class="destovka-error-message">
                    <p>Došlo k chybě při načítání nádrží. Prosím zkuste to znovu.</p>
                </div>
            `;
        }
    }

    createTankElement(data, feedData, isRecommended) {
        const tankDiv = document.createElement('div');
        tankDiv.className = 'destovka-tank-box';
        
        // Kontrola jestli je nádrž již v košíku
        const isSelected = window.destovkaCart?.destGetItemsByStep(2)
            .some(item => item.productCode === data['Kód']);
        
        if (isSelected) {
            tankDiv.classList.add('destovka-tank-box-selected');
        }
    
        const availability = this.formatAvailability(feedData.availability);
        const price = this.formatPrice(feedData.price);
    
        tankDiv.innerHTML = `
            ${isRecommended ? '<div class="destovka-tank-badge">DOPORUČUJEME</div>' : ''}
            <div class="destovka-tank-content">
                <div class="destovka-tank-visuals">
                    <div class="destovka-tank-main">
                        <img src="${feedData.imageLink}" 
                             alt="${data['Typ nádrže']} ${data['Objemové označení']}"
                             onerror="this.src='img/radoby_placeholder.png'" />
                    </div>
                </div>
                <div class="destovka-tank-info">
                    <div class="destovka-tank-item">
                        <div class="destovka-tank-item-name">
                            ${data['Typ nádrže']} ${data['Objemové označení']}
                        </div>
                        <div class="destovka-tank-item-code">kód ${data['Kód']}</div>
                        <div class="destovka-tank-availability ${availability.className}">
                            ${availability.text}
                        </div>
                    </div>
                </div>
                <div class="destovka-tank-actions">
                    <div class="destovka-tank-total-price">${price}</div>
                    <div class="destovka-tank-action-buttons">
                        <button class="destovka-tank-select ${isSelected ? 'destovka-tank-select-selected' : ''}" 
                                ${availability.isAvailable && !isSelected ? '' : 'disabled'}
                                data-tank-code="${data['Kód']}">
                            ${isSelected ? 'Vybráno' : (availability.isAvailable ? 'Vybrat' : 'Nedostupné')}
                        </button>
                        <button class="destovka-tank-details-btn" data-tank-id="${data['Kód']}">
                            ${isSelected ? 'Skrýt informace o nádrži' : 'Zobrazit informace o nádrži'}
                        </button>
                    </div>
                </div>
            </div>
            <div class="destovka-tank-details" id="details-${data['Kód']}">
                <table class="destovka-tank-specs">
                    ${this.generateSpecsRows(data)}
                </table>
            </div>`;
    
        this.initializeDetailsToggle(tankDiv);
        this.initializeTankSelection(tankDiv, data, feedData);
        return tankDiv;
    }

    initializeTankSelection(tankElement, tankData, feedData) {
        if (!tankElement) return;
        
        const selectButton = tankElement.querySelector('.destovka-tank-select');
        if (!selectButton) return;
        
        selectButton.addEventListener('click', () => {
            const currentTank = window.destovkaCart?.destGetItemsByStep(2)[0];
            
            if (currentTank) {
                if (currentTank.productCode === tankData['Kód']) return;
                
                if (!confirm('Již máte vybranou nádrž. Chcete ji nahradit novou?')) {
                    return;
                }
                window.destovkaCart.destRemoveItem(currentTank.productCode);
            }
    
            window.destovkaCart.destAddItem(2, tankData['Kód'], 1, {
                name: `${tankData['Typ nádrže']} ${tankData['Objemové označení']}`,
                price: this.extractPrice(feedData.price),
                volume: tankData['Objem (l)'],
                imageUrl: feedData.imageLink || 'none'
            });
    
            this.renderTanks();
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

    generateSpecsRows(data) {
        // Určení vhodných DN
        let suitableDN = [];
        if (data['DN100/110'] === 'ANO') suitableDN.push('100/110');
        if (data['DN125'] === 'ANO') suitableDN.push('125');
        if (data['DN150/160'] === 'ANO') suitableDN.push('150/160');
    
        const specs = [
            { label: 'Konstrukce', key: 'Konstrukce' },
            { label: 'Objem (l)', key: 'Objem (l)' },
            { label: 'Délka (mm)', key: 'Délka (mm)' },
            { label: 'Šířka (mm)', key: 'Šířka (mm)' },
            { label: 'Výška (mm)', key: 'Výška (mm)' },
            { label: 'Hmotnost (kg)', key: 'Hmotnost' },
            { label: 'Záruka (let)', key: 'Záruka (let)' },
            { label: 'Max. překrytí zeminou (mm)', key: 'Max. překrytí zeminou (mm)' },
            { label: 'Vhodné do jílovité půdy', key: 'Vhodné do jílovité půdy' },
            { label: 'Integrovaný filtrační koš', key: 'Integrovaný filtrační koš' },
            { label: 'Integrovaný bezpečnostní přepad', key: 'Integrovaný bezpečnostní přepad (sifon)' },
            { label: 'Poklop v ceně', key: 'Poklop v ceně (žádný/nepochozí/pochozí/do 1,5 t/do 3,5 t/do 12,5 t/do 40 t' },
            { label: 'Vhodné pro potrubí DN', type: 'custom', value: suitableDN.length > 0 ? suitableDN.join(', ') : '-' },
            { label: 'Přibližná velikost výkopu (m³)', key: 'Přibližná velikost výkopu (m3)' },
            { label: 'Přibližné množství zásypu (m³)', key: 'Přibližné množství zásypu (m3)' }
        ];
    
        return specs
            .map(spec => `
                <tr>
                    <td>${spec.label}</td>
                    <td>${spec.type === 'custom' ? spec.value : (data[spec.key] || '-')}</td>
                </tr>
            `)
            .join('');
    }

    initializeDetailsToggle(tankElement) {
        const detailsBtn = tankElement.querySelector('.destovka-tank-details-btn');
        const details = tankElement.querySelector('.destovka-tank-details');

        detailsBtn.addEventListener('click', () => {
            const isVisible = details.classList.contains('destovka-active');
            details.classList.toggle('destovka-active');
            detailsBtn.textContent = isVisible ? 
                'Zobrazit informace o nádrži' : 
                'Skrýt informace o nádrži';
        });
    }

    extractPrice(priceString) {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/[^0-9]/g, ''));
    }
}



class CoverCalculator {
    constructor(tankSystem, requiredLoad, availableSpace) {
        this.tankSystem = tankSystem;
        this.requiredLoad = requiredLoad;
        this.availableSpace = availableSpace;
        this.covers = [];
        this.loadCoverData();
    }

    async loadCoverData() {
        try {
            const response = await fetch('jsony/poklopy.json');
            if (!response.ok) throw new Error('Failed to load covers');
            const data = await response.json();
            
            this.covers = data.filter(cover => 
                cover.Systém === this.tankSystem &&
                this.meetsLoadRequirements(cover.Zatížení) &&
                this.fitsAvailableSpace(cover)
            ).map(cover => ({
                code: cover.Kód,
                name: cover.Název,
                load: cover.Zatížení,
                minHeight: parseInt(cover['Minimální výška (mm)']),
                maxHeight: parseInt(cover['Maximální výška (mm)']),
                system: cover.Systém
            }));
        } catch (error) {
            console.error('Error loading covers:', error);
            this.covers = [];
        }
    }

    meetsLoadRequirements(coverLoad) {
        const loadHierarchy = [
            'nepochozí',
            'pochozí',
            'pojezdná do 3,5 t',
            'pojezdná do 12 t'
        ];
        
        const requiredLoadIndex = loadHierarchy.indexOf(this.requiredLoad);
        const coverLoadIndex = loadHierarchy.indexOf(coverLoad);
        
        return coverLoadIndex >= requiredLoadIndex;
    }

    fitsAvailableSpace(cover) {
        const minHeight = parseInt(cover['Minimální výška (mm)']);
        return minHeight <= this.availableSpace;
    }

    findSuitableCovers() {
        return this.covers.sort((a, b) => a.minHeight - b.minHeight);
    }
}

class DestovkaAccessoriesManager {
    constructor() {
        this.container = document.querySelector('#destovka-step3');
        this.accessoriesData = [];
        this.feedData = new Map();
        this.productGenerator = window.productStructureGenerator;
        this.init();
    }

    async init() {
        console.group('🚀 Initializing AccessoriesManager');
        try {
            await this.loadAccessoriesData();
            await this.loadXMLFeed();
            this.initProductContainer();
            this.updateDisplay();
            console.log('✅ Initialization complete');
        } catch (error) {
            console.error('❌ Error during initialization:', error);
            this.handleError();
        }
        console.groupEnd();
    }

    async loadAccessoriesData() {
        const response = await fetch('jsony/nastavec.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.accessoriesData = await response.json();
    }

    displayExtensionResults(result, heightData) {
        console.group('🎨 Displaying Results');
        
        let content = `
            <div class="destovka-height-info">
                <div class="destovka-height-info-item">
                    <span>Chybějící výška:</span> 
                    <strong>${heightData.remaining}mm</strong>
                </div>
                <div class="destovka-height-info-item">
                    <span>Max povolená výška:</span> 
                    <strong>${heightData.maxAllowed}mm</strong>
                </div>
            </div>`;

        if (result.combinations.length === 0) {
            console.log('⚠️ No suitable combinations found');
            content += `
                <div class="destovka-no-results">
                    ${result.message}
                </div>`;
        } else {
            console.log('✅ Rendering combinations:', result.combinations);
            content += this.renderCombinations(result.combinations);
        }

        this.productContainer.innerHTML = content;
        this.initializeSelectionHandlers();
        console.groupEnd();
    }


    async loadXMLFeed() {
        const response = await fetch('google.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        
        const entries = xml.getElementsByTagName('entry');
        for (const entry of entries) {
            const productData = {
                id: this.getElementText(entry, 'g:id'),
                price: this.getElementText(entry, 'g:price'),
                availability: this.getElementText(entry, 'g:availability'),
                imageLink: this.getElementText(entry, 'g:image_link'),
                link: this.getElementText(entry, 'link')
            };
            
            if (!productData.id) continue;
            this.feedData.set(productData.id, productData);
        }
    }

    calculateRemainingHeight(selectedTank) {
        console.group('📐 Calculating Required Heights');
        
        const tankData = window.destovkaTankManager?.tanksData.find(
            tank => tank['Kód'] === selectedTank.productCode
        );
        
        if (!tankData) {
            console.error('❌ Tank data not found');
            console.groupEnd();
            return null;
        }

        const defaultInflowDepth = parseInt(tankData['Hloubka nátoku bez nástavce (mm)']);
        const requiredDepth = parseInt(window.destovkaStepManager?.formData.get('inflowDepth'));
        const maxAllowedHeight = parseInt(tankData['Max. překrytí zeminou (mm)']);

        const result = {
            remaining: Math.max(0, requiredDepth - defaultInflowDepth),
            maxAllowed: maxAllowedHeight,
            defaultDepth: defaultInflowDepth,
            tankSystem: tankData['Systém']
        };

        console.log('📊 Height calculations:', result);
        console.groupEnd();
        return result;
    }

    initializeCounters() {
        const counters = this.container.querySelectorAll('.destovka-quantity-counter');
        
        counters.forEach(counter => {
            const input = counter.querySelector('.destovka-quantity-input');
            const decreaseBtn = counter.querySelector('.destovka-quantity-decrease');
            const increaseBtn = counter.querySelector('.destovka-quantity-increase');
            
            if (!input || !decreaseBtn || !increaseBtn) return;
    
            // Kontrola existujících nástavců v košíku
            const existingItems = window.destovkaCart?.destGetItemsByStep(3) || [];
            const existingItem = existingItems.find(item => item.productCode === input.dataset.code);
            if (existingItem) {
                input.value = existingItem.quantity;
            }
         
            decreaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value) || 0;
                if (currentValue > 0) {
                    input.value = currentValue - 1;
                    this.updateCart(input.dataset.code, currentValue - 1);
                }
            });
         
            increaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value) || 0;
                input.value = currentValue + 1;
                this.updateCart(input.dataset.code, currentValue + 1);
            });
         
            input.addEventListener('change', () => {
                let value = parseInt(input.value) || 0;
                if (value < 0) value = 0;
                input.value = value;
                this.updateCart(input.dataset.code, value);
            });
        });
    }

     getCompatibleExtensions(system, remainingHeight, maxHeight) {
        console.group('🔍 Hledání kompatibilních nástavců');
        console.log('Systém:', system);
        console.log('Zbývající výška:', remainingHeight, 'mm');
        console.log('Max. povolená výška:', maxHeight, 'mm');
    
        const systemExtensions = this.accessoriesData.filter(ext => ext.Systém === system);
        const usableExtensions = systemExtensions
            .filter(ext => {
                const height = parseInt(ext['Výška (mm)']);
                return height >= remainingHeight && height <= maxHeight;
            })
            .sort((a, b) => parseInt(a['Výška (mm)']) - parseInt(b['Výška (mm)']));
    
        if (usableExtensions.length === 0) {
            const recommendation = this.calculateExtensionRecommendation(
                systemExtensions, 
                remainingHeight, 
                maxHeight
            );
            console.log('💡 Doporučení:', recommendation);
            console.groupEnd();
            return { extensions: [], recommendation };
        }
    
        console.log('📏 Nalezené nástavce:', usableExtensions);
        console.groupEnd();
        return { extensions: usableExtensions, recommendation: null };
    }

    calculateExtensionRecommendation(extensions, remainingHeight, maxHeight) {
        if (remainingHeight > maxHeight) {
            return {
                type: 'decrease',
                amount: remainingHeight - maxHeight,
                message: `Je potřeba snížit hloubku nátoku o ${remainingHeight - maxHeight}mm`
            };
        }
    
        const sortedExtensions = [...extensions].sort((a, b) => 
            parseInt(a['Výška (mm)']) - parseInt(b['Výška (mm)'])
        );
    
        const closestLarger = sortedExtensions.find(ext => 
            parseInt(ext['Výška (mm)']) >= remainingHeight
        );
    
        const closestSmaller = [...sortedExtensions]
            .reverse()
            .find(ext => parseInt(ext['Výška (mm)']) < remainingHeight);
    
        if (!closestLarger && !closestSmaller) {
            return {
                type: 'system',
                message: 'Pro tento systém nejsou k dispozici žádné nástavce'
            };
        }
    
        if (closestLarger && parseInt(closestLarger['Výška (mm)']) <= maxHeight) {
            const difference = parseInt(closestLarger['Výška (mm)']) - remainingHeight;
            return {
                type: 'cut',
                amount: difference,
                extension: closestLarger,
                message: `Lze použít nástavec ${closestLarger['Výška (mm)']}mm a zkrátit ho o ${difference}mm`
            };
        }
    
        return {
            type: 'decrease',
            amount: remainingHeight,
            message: `Je potřeba snížit hloubku nátoku o ${remainingHeight}mm`
        };
    }

     extractPrice(priceString) {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/[^0-9]/g, ''));
    }
     
     updateCart(code, quantity) {
        if (!code) return;
        
        if (quantity <= 0) {
            window.destovkaCart?.destRemoveItem(code);
        } else {
            const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
            if (!selectedTank) return;
     
            const tankData = window.destovkaTankManager?.tanksData.find(
                tank => tank['Kód'] === selectedTank.productCode
            );
            if (!tankData || !tankData.accessories) return;
     
            const extension = tankData.accessories.extensions.find(ext => ext.code === code);
            if (!extension) return;
     
            const feedData = this.getFeedDataForProduct(code);
            window.destovkaCart?.destAddItem(3, code, quantity, {
                name: `Nástavec ${extension.height}mm`,
                price: this.extractPrice(feedData.price),
                height: extension.height,
                system: extension.system,
                imageUrl: feedData.imageLink || 'none'
            });
        }
     }

    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }

    getFeedDataForProduct(code) {
        return this.feedData.get(code) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: 'img/radoby_placeholder.png',
            link: '#'
        };
    }

    initProductContainer() {
        let productContainer = this.container.querySelector('.destovka-products-container');
        if (!productContainer) {
            productContainer = document.createElement('div');
            productContainer.className = 'destovka-products-container';
            const heading = this.container.querySelector('h1');
            if (heading) {
                heading.insertAdjacentElement('afterend', productContainer);
            } else {
                this.container.appendChild(productContainer);
            }
        }
        this.productContainer = productContainer;
    }

    async updateDisplay() {
        console.group('🔄 Updating Display');
        if (!this.productContainer) {
            console.error('❌ Product container not found');
            console.groupEnd();
            return;
        }
    
        const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
        if (!selectedTank) {
            this.productContainer.innerHTML = `
                <div class="destovka-no-results">
                    Nejprve prosím vyberte nádrž
                </div>`;
            console.groupEnd();
            return;
        }
    
        const tankData = window.destovkaTankManager?.tanksData.find(
            tank => tank['Kód'] === selectedTank.productCode
        );
    
        if (!tankData) {
            this.productContainer.innerHTML = `
                <div class="destovka-no-results">
                    Nepodařilo se načíst potřebná data
                </div>`;
            console.groupEnd();
            return;
        }
    
        const heightData = this.calculateRemainingHeight(selectedTank);
        if (!heightData) {
            this.productContainer.innerHTML = `
                <div class="destovka-no-results">
                    Nepodařilo se spočítat potřebné výšky
                </div>`;
            console.groupEnd();
            return;
        }
    
        // Vytvoření kalkulátoru s již načtenými daty
        const calculator = new ExtensionCalculator(
            heightData.tankSystem,
            heightData.remaining,
            heightData.defaultDepth,
            this.accessoriesData
        );
    
        const result = await calculator.findExtensionCombinations();
        console.log('🎯 Calculator results:', result);
    
        let extensionsHtml = `
            <div class="destovka-height-info">
                <div class="destovka-height-info-item">
                    <span>Chybějící výška:</span> 
                    <strong>${heightData.remaining}mm</strong>
                </div>
                <div class="destovka-height-info-item">
                    <span>Max povolená výška:</span> 
                    <strong>${heightData.maxAllowed}mm</strong>
                </div>
            </div>
        `;
    
        if (result.combinations.length === 0) {
            this.productContainer.innerHTML = `
                <div class="destovka-no-results">
                    ${result.message || 'Pro tuto nádrž nejsou k dispozici žádné nástavce'}
                </div>`;
            console.groupEnd();
            return;
        }
    
        extensionsHtml += '<div class="destovka-extensions-section">';
        result.combinations.forEach(combination => {
            combination.extensions.forEach(extension => {
                const feedData = this.getFeedDataForProduct(extension.code);
                const productData = {
                    'Produkt': `Nástavec ${extension.height}mm`,
                    'Kód': extension.code,
                    'Systém': extension.system
                };
    
                const cutNote = combination.needsCutting ? 
                    `(lze zkrátit o ${combination.cutAmount}mm)` : '';
    
                extensionsHtml += `
                    <div class="destovka-product-item">
                        ${this.productGenerator.createProductItem(productData, feedData)}
                        ${cutNote ? `<div class="destovka-product-note destovka-label">${cutNote}</div>` : ''}
                        <div class="destovka-quantity-counter">
                            <input type="number" 
                                   class="destovka-input destovka-quantity-input" 
                                   value="1" 
                                   min="0" 
                                   data-code="${extension.code}">
                            <div class="destovka-quantity-controls">
                                <button class="destovka-quantity-increase">+</button>
                                <button class="destovka-quantity-decrease">-</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
        extensionsHtml += '</div>';
    
        this.productContainer.innerHTML = extensionsHtml;
        this.initializeCounters();
        this.productGenerator.initializeSelection(this.productContainer);
        
        console.groupEnd();
    }

    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat nástavců.</p>
                    <button onclick="window.destovkaAccessoriesManager = new DestovkaAccessoriesManager()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }
}

class ExtensionCalculator {
    constructor(tankSystem, requiredDepth, tankDefaultDepth, existingExtensions) {
        console.group('🔧 Initializing ExtensionCalculator');
        console.log('Parameters:', {
            tankSystem,
            requiredDepth,
            tankDefaultDepth,
            extensionsProvided: !!existingExtensions
        });

        if (!tankSystem) throw new Error('Systém nádrže musí být specifikován');
        if (isNaN(requiredDepth) || isNaN(tankDefaultDepth)) {
            throw new Error('Hloubky musí být čísla');
        }

        this.tankSystem = tankSystem;
        this.requiredDepth = parseFloat(requiredDepth);
        this.tankDefaultDepth = parseFloat(tankDefaultDepth);
        this.missingDepth = this.requiredDepth - this.tankDefaultDepth;
        
        // Použijeme již načtená data místo nového načítání
        this.availableExtensions = (existingExtensions || [])
            .filter(ext => ext.Systém === tankSystem)
            .map(ext => ({
                code: ext.Kód,
                height: parseInt(ext['Výška (mm)']),
                system: ext.Systém,
                name: ext.Název
            }))
            .sort((a, b) => a.height - b.height);

        console.log('Initialized with:', {
            missingDepth: this.missingDepth,
            availableExtensions: this.availableExtensions.length
        });
        console.groupEnd();
    }

    async initialize() {
        console.log("checkopint1");
        if (this.initialized) return;
        await this.loadExtensionData();
        this.initialized = true;
        console.log("checkopint1");
    }

    async loadExtensionData() {
        try {
            console.group('📥 Načítání dat nástavců');
            const response = await fetch('jsony/nastavec.json');
            if (!response.ok) throw new Error('Failed to load extensions');
            const data = await response.json();
            console.log('Načtená data:', data);
            console.log('Hledám nástavce pro systém:', this.tankSystem);
            
            this.availableExtensions = data.filter(ext => ext.Systém === this.tankSystem)
                .map(ext => ({
                    code: ext.Kód,
                    height: parseInt(ext['Výška (mm)']),
                    system: ext.Systém,
                    name: ext.Název
                }))
                .sort((a, b) => a.height - b.height);
            
            console.log('Nalezené nástavce:', this.availableExtensions);
            console.groupEnd();
        } catch (error) {
            console.error('Error loading extensions:', error);
            this.availableExtensions = [];
            throw error;
        }
    }

    async findExtensionCombinations() {
        console.group('🔍 Hledání kombinací nástavců');
        console.log({
            tankSystem: this.tankSystem,
            requiredDepth: this.requiredDepth,
            currentDepth: this.tankDefaultDepth,
            missingDepth: this.missingDepth,
            availableExtensions: this.availableExtensions
        });
    
        if (this.missingDepth <= 0) {
            console.log('✨ Není potřeba nástavec');
            console.groupEnd();
            return { combinations: [], message: 'Není potřeba nástavec' };
        }
    
        if (this.availableExtensions.length === 0) {
            console.log('❌ Žádné dostupné nástavce pro systém');
            console.groupEnd();
            return { 
                combinations: [], 
                message: `Pro systém ${this.tankSystem} nejsou k dispozici žádné nástavce` 
            };
        }
    
        // Kontrola přesné shody
        const exactMatch = this.availableExtensions.find(ext => ext.height === this.missingDepth);
        if (exactMatch) {
            console.log('✅ Nalezen přesně odpovídající nástavec:', exactMatch);
            console.groupEnd();
            return {
                combinations: [{
                    extensions: [exactMatch],
                    totalHeight: exactMatch.height,
                    needsCutting: false,
                    cutAmount: 0
                }],
                message: 'Nalezen přesně odpovídající nástavec'
            };
        }
    
        console.log('🔄 Hledání kombinací nástavců...');
        const combinations = [];
    
        // Zkusíme najít jeden nástavec, který lze zkrátit
        const singleExtension = this.availableExtensions.find(ext => ext.height > this.missingDepth);
        if (singleExtension) {
            console.log('✅ Nalezen jeden vhodný nástavec ke zkrácení:', singleExtension);
            combinations.push({
                extensions: [singleExtension],
                totalHeight: singleExtension.height,
                needsCutting: true,
                cutAmount: singleExtension.height - this.missingDepth
            });
        }
    
        // Pokud nenajdeme jeden vhodný nástavec, hledáme kombinace
        if (combinations.length === 0) {
            console.log('🔄 Hledání kombinací dvou nástavců...');
            this.findCombinationsRecursive([], this.missingDepth, 2, combinations);
        }
    
        // Pokud stále nemáme kombinace, nabídneme všechny nástavce
        if (combinations.length === 0) {
            console.log('⚠️ Nenalezeny vhodné kombinace, vracím všechny nástavce');
            return {
                combinations: this.availableExtensions.map(ext => ({
                    extensions: [ext],
                    totalHeight: ext.height,
                    needsCutting: ext.height > this.missingDepth,
                    cutAmount: Math.max(0, ext.height - this.missingDepth)
                })),
                message: `Pro výšku ${this.missingDepth}mm můžete použít tyto nástavce. Některé bude nutné zkrátit.`
            };
        }
    
        // Seřadíme kombinace podle nejmenšího rozdílu od požadované výšky
        combinations.sort((a, b) => {
            const diffA = Math.abs(a.totalHeight - this.missingDepth);
            const diffB = Math.abs(b.totalHeight - this.missingDepth);
            if (diffA !== diffB) return diffA - diffB;
            return a.extensions.length - b.extensions.length;
        });
    
        const result = { 
            combinations: combinations.slice(0, 3),
            message: combinations[0]?.needsCutting ? 
                `Nalezené nástavce bude třeba zkrátit o ${combinations[0].cutAmount}mm` : 
                'Nalezeny vhodné kombinace nástavců'
        };
        
        console.log('✅ Finální výsledek:', result);
        console.groupEnd();
        return result;
    }

     findCombinationsRecursive(current, remainingDepth, maxPieces, result) {
        console.log("checkopint3");
        const totalHeight = current.reduce((sum, ext) => sum + ext.height, 0);
        
        console.log('Kontrola kombinace:', {
            aktuálníNástavce: current.map(ext => `${ext.name} (${ext.height}mm)`),
            celkováVýška: totalHeight,
            potřebnáVýška: this.missingDepth,
            zbývajícíKusy: maxPieces
        });
        
        if (totalHeight >= this.missingDepth) {
            console.log('✅ Nalezena vyhovující kombinace!', {
                nástavce: current.map(ext => `${ext.name} (${ext.height}mm)`),
                celkováVýška: totalHeight,
                potřebnéZkrácení: totalHeight - this.missingDepth
            });
            
            result.push({
                extensions: [...current],
                totalHeight,
                needsCutting: totalHeight > this.missingDepth,
                cutAmount: totalHeight > this.missingDepth ? totalHeight - this.missingDepth : 0
            });
            return;
        }
    
        if (maxPieces === 0) {
            console.log('❌ Dosažen limit počtu nástavců');
            return;
        }
    
        console.log(`Zkouším přidat další nástavce (zbývá kusů: ${maxPieces})`);
        for (const extension of this.availableExtensions) {
            console.log(`Zkouším přidat:`, extension.name);
            this.findCombinationsRecursive(
                [...current, extension],
                remainingDepth - extension.height,
                maxPieces - 1,
                result
            );
        }
    }
}

class DestovkaFiltrationManager {
    constructor() {
        this.filtraceData = [];
        this.filteredProducts = [];
        this.container = document.getElementById('destovka-step4');
        this.productGenerator = window.productStructureGenerator;
        this.feedData = new Map();
        this.init();
    }
 
    async init() {
        try {
            await Promise.all([
                this.loadFiltrationData(),
                this.loadXMLFeed()
            ]);
            this.initProductContainer();
            this.updateDisplay();
        } catch (error) {
            console.error('Chyba při inicializaci FiltrationManager:', error);
            this.handleError();
        }
    }
 
    async loadFiltrationData() {
        const response = await fetch('jsony/filtrace.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.filtraceData = await response.json();
    }
 
    async loadXMLFeed() {
        const response = await fetch('google.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        
        const entries = xml.getElementsByTagName('entry');
        for (const entry of entries) {
            const productData = {
                id: this.getElementText(entry, 'g:id'),
                price: this.getElementText(entry, 'g:price'),
                availability: this.getElementText(entry, 'g:availability'),
                imageLink: this.getElementText(entry, 'g:image_link'),
                link: this.getElementText(entry, 'link')
            };
            
            if (!productData.id) continue;
            this.feedData.set(productData.id, productData);
        }
    }
 
    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }
 
    getFeedDataForProduct(code) {
        const feedData = this.feedData.get(code);
        if (!feedData) {
            console.log(`Feed data not found for product code: ${code}`);
            return {
                price: 'Cena na dotaz',
                availability: 'out of stock',
                imageLink: 'img/delete.png',
                link: '#'
            };
        }
        return feedData;
    }
 
    initProductContainer() {
        let productContainer = this.container.querySelector('.destovka-products-container');
        if (!productContainer) {
            productContainer = document.createElement('div');
            productContainer.className = 'destovka-products-container';
            const heading = this.container.querySelector('h1');
            if (heading) {
                heading.insertAdjacentElement('afterend', productContainer);
            } else {
                this.container.appendChild(productContainer);
            }
        }
        this.productContainer = productContainer;
    }
 
    filterProducts() {
        const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
        if (!selectedTank) return [];
    
        const tankData = window.destovkaTankManager?.tanksData.find(
            tank => tank['Kód'] === selectedTank.productCode
        );
        if (!tankData) return [];
    
        const formData = window.destovkaStepManager?.formData || new Map();
        // Přidáme prefix "DN" k hodnotě z formuláře
        const inflowDiameter = formData.get('inflowDiameter') ? `DN${formData.get('inflowDiameter')}` : undefined;
    
        console.log('Filtering with inflowDiameter:', inflowDiameter);
    
        const filteredProducts = this.filtraceData.filter(product => {
            const isSystemCompatible = Array.from({length: 13}, (_, i) => i + 1).some(i => {
                const sysKey = `Kompatibilsys${i}`;
                return product[sysKey] === tankData['Systém'] || product[sysKey] === 'nezáleží';
            });
            
            const isDiameterCompatible = 
                product['Průměr nátoku'] === 'nezáleží' || 
                product['Průměr nátoku'] === inflowDiameter;
                    
            return isSystemCompatible && isDiameterCompatible;
        });
    
        this.logFilteringDiagnostics(tankData, formData, filteredProducts);
        return filteredProducts;
    }
 
    updateDisplay() {
        this.filteredProducts = this.filterProducts();
        
        if (!this.productContainer) return;
    
        if (this.filteredProducts.length === 0) {
            this.productContainer.innerHTML = `
                <div class="destovka-no-results">
                    Pro vybrané parametry nebyla nalezena žádná kompatibilní filtrace.
                </div>`;
            return;
        }
    
        this.productContainer.innerHTML = '';
        
        // Omezíme počet produktů na 2
        const productsToShow = this.filteredProducts.slice(0, 2);
        
        // Přidáme produkty
        productsToShow.forEach(product => {
            const feedData = this.getFeedDataForProduct(product.Kód);
            const productHtml = this.productGenerator.createProductItem(product, feedData);
            this.productContainer.innerHTML += productHtml;
        });
    
        // Přidáme prázdný produkt
        const emptyProductHtml = this.productGenerator.createEmptyProductItem();
        this.productContainer.innerHTML += emptyProductHtml;
    
        // Inicializujeme event listenery pro výběr produktů - TOHLE CHYBĚLO
        this.productGenerator.initializeSelection(this.productContainer);
    }
    
 
    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat filtrace.</p>
                    <button onclick="window.destovkaFiltrationManager = new DestovkaFiltrationManager()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }

    logFilteringDiagnostics(tankData, formData, filteredProducts) {
        console.group('Diagnostika filtrace produktů');
        console.log('Vstupní parametry:');
        console.log(`- Systém nádrže: ${tankData['Systém']}`);
        console.log(`- Průměr nátoku: ${formData.get('inflowDiameter')}`);
    
        console.log('\nZkontrolované produkty:');
        this.filtraceData.forEach(product => {
            console.group(`${product.Produkt} (${product.Kód})`);
            
            const systemMatch = Array.from({length: 13}, (_, i) => i + 1).some(i => {
                const sysKey = `Kompatibilsys${i}`;
                return product[sysKey] === tankData['Systém'] || product[sysKey] === 'nezáleží';
            });
            console.log(`Kompatibilita systému: ${systemMatch ? '✓' : '✗'}`);
    
            const diameterMatch = product['Průměr nátoku'] === 'nezáleží' || 
                product['Průměr nátoku'] === formData.get('inflowDiameter');
            console.log(`Průměr nátoku: ${diameterMatch ? '✓' : '✗'} (${product['Průměr nátoku']})`);
    
            const isSelected = filteredProducts.some(p => p.Kód === product.Kód);
            console.log(`Výsledek: ${isSelected ? 'VYBRÁNO' : 'VYŘAZENO'}`);
            
            console.groupEnd();
        });
    
        console.log('\nFinální výběr:');
        console.log(`Celkem vybráno: ${filteredProducts.length} produktů`);
        filteredProducts.forEach(product => {
            console.log(`- ${product.Produkt} (${product.Kód})`);
        });
    
        console.groupEnd();
    }
 }

 class DestovkaBaseProductManager {
    constructor(stepId) {
        this.container = document.getElementById(`destovka-step${stepId}`);
        this.productGenerator = window.productStructureGenerator;
        this.feedData = new Map();
        this.init();
    }

    async init() {
        try {
            await this.loadXMLFeed();
            this.initProductContainer();
            this.updateDisplay();
        } catch (error) {
            console.error(`Chyba při inicializaci ${this.constructor.name}:`, error);
            this.handleError();
        }
    }

    async loadXMLFeed() {
        const response = await fetch('google.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        
        const entries = xml.getElementsByTagName('entry');
        for (const entry of entries) {
            const productData = {
                id: this.getElementText(entry, 'g:id'),
                price: this.getElementText(entry, 'g:price'),
                availability: this.getElementText(entry, 'g:availability'),
                imageLink: this.getElementText(entry, 'g:image_link'),
                link: this.getElementText(entry, 'link')
            };
            
            if (!productData.id) continue;
            this.feedData.set(productData.id, productData);
        }
    }

    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }

    getFeedDataForProduct(code) {
        return this.feedData.get(code) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: 'img/radoby_placeholder.png',
            link: '#'
        };
    }

    initProductContainer() {
        let productContainer = this.container.querySelector('.destovka-products-container');
        if (!productContainer) {
            productContainer = document.createElement('div');
            productContainer.className = 'destovka-products-container';
            const heading = this.container.querySelector('h1');
            if (heading) {
                heading.insertAdjacentElement('afterend', productContainer);
            } else {
                this.container.appendChild(productContainer);
            }
        }
        this.productContainer = productContainer;
    }

    // Metoda, kterou budou dědit potomci
    getProducts() {
        throw new Error('getProducts musí být implementována v potomkovi');
    }

    showNoResults(message = 'Nebyly nalezeny žádné produkty') {
        this.productContainer.innerHTML = `
            <div class="destovka-no-results">
                <div class="destovka-no-results-content">
                    <h3>${message}</h3>
                </div>
            </div>`;
    }

    updateDisplay() {
        if (!this.productContainer) return;

        const products = this.getProducts();
        
        if (!products || products.length === 0) {
            this.showNoResults();
            return;
        }

        this.productContainer.innerHTML = '';
        
        products.forEach(product => {
            const feedData = this.getFeedDataForProduct(product.Kód);
            const productHtml = this.productGenerator.createProductItem(product, feedData);
            this.productContainer.innerHTML += productHtml;
        });

        this.productGenerator.initializeSelection(this.productContainer);
    }

    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat.</p>
                    <button onclick="window.${this.constructor.name.toLowerCase()} = new ${this.constructor.name}()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }
}

class DestovkaSiphonManager extends DestovkaBaseProductManager {
    constructor() {
        super(5);
        this.siphonCode = '19526';
    }

    shouldShowSiphon() {
        const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
        if (!selectedTank) return false;

        const tankData = window.destovkaTankManager?.tanksData.find(
            tank => tank['Kód'] === selectedTank.productCode
        );
        
        return tankData && tankData['Integrovaný bezpečnostní přepad (sifon)'] === 'NE';
    }

    updateDisplay() {
        if (!this.productContainer) return;

        if (!this.shouldShowSiphon()) {
            this.showNoResults('Bezpečnostní přepad není potřeba - nádrž již obsahuje integrovaný přepad');
            return;
        }

        this.productContainer.innerHTML = '';
        
        // Přidáme sifon
        const siphonData = {
            'Produkt': 'Bezpečnostní přepad - sifon',
            'Kód': this.siphonCode,
            'Varianta': 'DN100/110'
        };
        
        const feedData = this.getFeedDataForProduct(this.siphonCode);
        const productHtml = this.productGenerator.createProductItem(siphonData, feedData);
        this.productContainer.innerHTML += productHtml;

        // Přidáme prázdný produkt
        const emptyProductHtml = this.productGenerator.createEmptyProductItem();
        this.productContainer.innerHTML += emptyProductHtml;

        // Inicializujeme event listenery
        this.productGenerator.initializeSelection(this.productContainer);
    }
}


class DestovkaPumpManager extends DestovkaBaseProductManager {
    constructor() {
        super(6); // krok 6
        this.selectedCategory = null;
        this.pumpsData = [];
        this.categories = [
            'Ponorné s plovákovým spínačem',
            'Ponorné s automatickým spínačem', 
            'Systém pro zalévání a splachování',
            'Zahradní čerpadlo',
            'žádné'
        ];
        this.init();
    }

    async init() {
        try {
            await Promise.all([
                this.loadPumpsData(),
                this.loadXMLFeed()
            ]);
            this.initializeContainers();
            this.showCategories();
        } catch (error) {
            console.error('Chyba při inicializaci PumpManager:', error);
            this.handleError();
        }
    }

    async loadPumpsData() {
        try {
            const response = await fetch('jsony/cerpadla.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.pumpsData = await response.json();
        } catch (error) {
            console.error('Chyba při načítání dat čerpadel:', error);
            throw error;
        }
    }

    initializeContainers() {
        let categoriesContainer = this.container.querySelector('.destovka-categories-container');
        if (!categoriesContainer) {
            categoriesContainer = document.createElement('div');
            categoriesContainer.className = 'destovka-categories-container destovka-products-container';
            const heading = this.container.querySelector('h1');
            if (heading) {
                heading.insertAdjacentElement('afterend', categoriesContainer);
            }
        }
        this.categoriesContainer = categoriesContainer;

        let productsContainer = this.container.querySelector('.destovka-products-container:not(.destovka-categories-container)');
        if (!productsContainer) {
            productsContainer = document.createElement('div');
            productsContainer.className = 'destovka-products-container';
            this.categoriesContainer.insertAdjacentElement('afterend', productsContainer);
        }
        this.productContainer = productsContainer;
    }

    showCategories() {
        if (!this.categoriesContainer) return;

        // Vyčistíme oba containery
        this.categoriesContainer.innerHTML = '';
        this.productContainer.innerHTML = '';

        // Skryjeme container produktů
        this.productContainer.style.display = 'none';
        
        // Zobrazíme container kategorií
        this.categoriesContainer.style.display = 'flex';

        // Odstraníme tlačítko pro návrat, pokud existuje
        const backButton = this.container.querySelector('.destovka-back-to-categories');
        if (backButton) {
            backButton.remove();
        }

        const categoryImages = {
            'Ponorné s plovákovým spínačem': 'img/ponor_plovak.png',
            'Ponorné s automatickým spínačem': 'img/ponor_auto.png',
            'Systém pro zalévání a splachování': 'img/system_zalej.png',
            'Zahradní čerpadlo': "img/zahradni_cerpadla.png",
            'žádné': 'img/delete.png'
        };

        this.categories.forEach(category => {
            const categoryHtml = this.productGenerator.createCategoryItem(
                category, 
                categoryImages[category]
            );
            this.categoriesContainer.innerHTML += categoryHtml;
        });

        this.productGenerator.initializeCategorySelection(
            this.categoriesContainer, 
            (category) => this.handleCategorySelection(category)
        );
    }

    handleCategorySelection(category) {
        this.selectedCategory = category;
        
        // Skryjeme kategorie
        this.categoriesContainer.style.display = 'none';
        
        // Zobrazíme container produktů
        this.productContainer.style.display = 'flex';
    
        if (category === 'žádné') {
            // Odstraníme existující produkty z košíku
            const currentItems = window.destovkaCart?.destGetItemsByStep(6) || [];
            currentItems.forEach(item => {
                window.destovkaCart.destRemoveItem(item.productCode);
            });
            
            this.productContainer.innerHTML = this.productGenerator.createEmptyProductItem();
            const emptyCard = this.productContainer.querySelector('.destovka-product-card');
            if (emptyCard) {
                emptyCard.classList.add('destovka-product-selected');
                const button = emptyCard.querySelector('.destovka-product-select-button');
                if (button) {
                    button.textContent = 'Vybráno';
                    button.classList.add('destovka-selected');
                }
            }
        } else {
            this.updateDisplay();
        }
    
        // Přidáme tlačítko pro návrat pokud ještě neexistuje
        if (!this.container.querySelector('.destovka-back-to-categories')) {
            const backButton = document.createElement('button');
            backButton.className = 'destovka-back-to-categories';
            backButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Zpět na výběr kategorií
            `;
            backButton.addEventListener('click', () => this.showCategories());
            this.productContainer.insertAdjacentElement('beforebegin', backButton);
        }
    }

    getProducts() {
        if (!this.selectedCategory) return [];
    
        return this.pumpsData.filter(pump => 
            pump.Kategorie === this.selectedCategory && 
            pump.Název && 
            pump.Kód
        ).map(pump => ({
            'Produkt': pump.Název,
            'Kód': pump.Kód,
            'Kategorie': pump.Kategorie,
            'Záruka (let)': pump['Záruka (let)'],
            'Max. průtok (l/hod)': pump['Max. průtok (l/hod)'],
            'Max. výtlak (m)': pump['Max. výtlak (m)'],
            'Max. ponor (m)': pump['Max. ponor (m)'],
            'Výkon (W)': pump['Výkon (W)'],
            'PříslušenstvíID1': pump.PříslušenstvíID1,
            'PříslušenstvíID2': pump.PříslušenstvíID2,
            'PříslušenstvíID3': pump.PříslušenstvíID3
        }));
    }

    formatPumpSpecs(pump) {
        const specs = [];
        
        if (pump['Max. průtok (l/hod)']) {
            specs.push(`Max. průtok: ${pump['Max. průtok (l/hod)']} l/hod`);
        }
        if (pump['Max. výtlak (m)']) {
            specs.push(`Max. výtlak: ${pump['Max. výtlak (m)']} m`);
        }
        if (pump['Výkon (W)']) {
            specs.push(`Výkon: ${pump['Výkon (W)']} W`);
        }
        if (pump['Max. ponor (m)']) {
            specs.push(`Max. ponor: ${pump['Max. ponor (m)']} m`);
        }
        if (pump['Záruka (let)']) {
            specs.push(`Záruka: ${pump['Záruka (let)']} let`);
        }
        
        return specs.join(' | ');
    }

    updateDisplay() {
        if (!this.productContainer) return;
    
        const products = this.getProducts();
        
        if (!products || products.length === 0) {
            this.showNoResults();
            return;
        }
    
        // Vyčistit container
        this.productContainer.innerHTML = '';
        
        // Získat aktuálně vybraný produkt z košíku
        const selectedPump = window.destovkaCart?.destGetItemsByStep(6)[0];
    
        // Vytvořit produktové karty
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'destovka-product-card';
            productDiv.dataset.productCode = product.Kód;
            
            const feedData = this.getFeedDataForProduct(product.Kód);
            
            // Základní obsah karty
            productDiv.innerHTML = `
                <div>
                    <img class="destovka-product-image"
                         src="${feedData.imageLink}" 
                         alt="${product.Produkt}"
                         onerror="this.src='img/delete.png'"
                         style="max-width: 200px" />
                </div>
                <div style="display: flex; align-items:center; flex-direction: column;">
                    <div class="destovka-product-title">
                        ${product.Produkt}
                    </div>
                    <div class="destovka-product-code">kód ${product.Kód}</div>
                </div>
                ${this.formatPumpSpecs(product)}
                <div class="destovka-product-card-footer">
                    <div class="destovka-product-price">
                        ${this.productGenerator.formatPrice(feedData.price)}
                    </div>
                    <button class="destovka-product-select-button">
                        ${selectedPump?.productCode === product.Kód ? 'Vybráno' : 'Vybrat'}
                    </button>
                </div>
            `;
    
            // Přidat třídy pro vybraný produkt
            if (selectedPump?.productCode === product.Kód) {
                productDiv.classList.add('destovka-product-selected');
                const button = productDiv.querySelector('.destovka-product-select-button');
                if (button) button.classList.add('destovka-selected');
            }
    
            // Přidat event listener pro výběr
            const selectButton = productDiv.querySelector('.destovka-product-select-button');
            if (selectButton) {
                selectButton.addEventListener('click', () => {
                    // Odstranit všechny předchozí produkty z kroku 6
                    const currentItems = window.destovkaCart?.destGetItemsByStep(6) || [];
                    currentItems.forEach(item => {
                        window.destovkaCart.destRemoveItem(item.productCode);
                    });
    
                    // Odstranit výběr ze všech karet
                    this.productContainer.querySelectorAll('.destovka-product-card').forEach(card => {
                        card.classList.remove('destovka-product-selected');
                        const btn = card.querySelector('.destovka-product-select-button');
                        if (btn) {
                            btn.textContent = 'Vybrat';
                            btn.classList.remove('destovka-selected');
                        }
                    });
    
                    // Přidat nový produkt a označit ho
                    this.addToCart(product.Kód);
                    productDiv.classList.add('destovka-product-selected');
                    selectButton.textContent = 'Vybráno';
                    selectButton.classList.add('destovka-selected');
                });
            }
    
            this.productContainer.appendChild(productDiv);
        });
    }

    initializeProductSelection() {
        const productCards = this.productContainer.querySelectorAll('.destovka-product-card');
        
        productCards.forEach(card => {
            const selectButton = card.querySelector('.destovka-product-select-button');
            if (!selectButton || selectButton.hasListener) return;
    
            selectButton.hasListener = true; // označíme, že jsme přidali listener
            selectButton.addEventListener('click', () => {
                const productCode = card.dataset.productCode;
                if (!productCode) return;
    
                // Odstranit všechny předchozí produkty z kroku 6
                const currentItems = window.destovkaCart?.destGetItemsByStep(6) || [];
                currentItems.forEach(item => {
                    window.destovkaCart.destRemoveItem(item.productCode);
                });
    
                // Odstranit výběr ze všech karet
                productCards.forEach(otherCard => {
                    otherCard.classList.remove('destovka-product-selected');
                    const otherButton = otherCard.querySelector('.destovka-product-select-button');
                    if (otherButton) {
                        otherButton.textContent = 'Vybrat';
                        otherButton.classList.remove('destovka-selected');
                    }
                });
    
                // Přidat nový produkt a označit ho
                this.addToCart(productCode);
                card.classList.add('destovka-product-selected');
                selectButton.textContent = 'Vybráno';
                selectButton.classList.add('destovka-selected');
            });
        });
    }

    // Metoda pro přidání do košíku s ID příslušenství
    addToCart(productCode) {
        const product = this.pumpsData.find(pump => pump.Kód === productCode);
        if (!product) return;
    
        const accessories = [];
        if (product.PříslušenstvíID1) accessories.push(product.PříslušenstvíID1.toString());
        if (product.PříslušenstvíID2) accessories.push(product.PříslušenstvíID2.toString());
        if (product.PříslušenstvíID3) accessories.push(product.PříslušenstvíID3.toString());
    
        window.destovkaCart.destAddItem(6, productCode, 1, {
            type: 'pump',
            accessories: accessories,
            name: product.Název,
            specs: this.formatPumpSpecs(product)
        });
    }

    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat čerpadel.</p>
                    <button onclick="window.destovkaPumpManager = new DestovkaPumpManager()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }
}

class DestovkaPumpAccessoryManager extends DestovkaBaseProductManager {
    constructor() {
        super(7); // krok 7
        this.accessoryData = [];
        this.init();
    }

    async init() {
        try {
            await Promise.all([
                this.loadAccessoryData(),
                this.loadXMLFeed()
            ]);
            this.initProductContainer();
            this.updateDisplay();
        } catch (error) {
            console.error('Chyba při inicializaci PumpAccessoryManager:', error);
            this.handleError();
        }
    }

    async loadAccessoryData() {
        try {
            const response = await fetch('jsony/prislusenstvi_cerpadla.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.accessoryData = await response.json();
        } catch (error) {
            console.error('Chyba při načítání dat příslušenství:', error);
            throw error;
        }
    }

    getCompatibleAccessories() {
        const selectedPump = window.destovkaCart?.destGetItemsByStep(6)[0];
        
        console.group('Debugging příslušenství čerpadel');
        console.log('Vybrané čerpadlo:', selectedPump);
        
        if (!selectedPump || !selectedPump.accessories) {  // změna z metadata.accessories na accessories
            console.warn('Žádné čerpadlo nebo chybějící accessories');
            console.groupEnd();
            return [];
        }
    
        console.log('Načtená data příslušenství:', this.accessoryData);
        console.log('ID k hledání:', selectedPump.accessories);
    
        // Konvertujeme ID na stringy pro porovnání
        const accessoryIds = selectedPump.accessories.map(id => id.toString());
        
        const compatibleAccessories = this.accessoryData.filter(accessory => {
            const isCompatible = accessoryIds.includes(accessory['Číslo ID'].toString());
            console.log(`Kontrola příslušenství ${accessory.Název}:`, {
                'ID příslušenství': accessory['Číslo ID'],
                'Hledaná ID': accessoryIds,
                'Je kompatibilní': isCompatible
            });
            return isCompatible;
        });
    
        console.log('Nalezené příslušenství:', compatibleAccessories);
        console.groupEnd();
    
        return compatibleAccessories.map(accessory => ({
            'Produkt': accessory.Název,
            'Kód': accessory.Kód
        }));
    }

    updateDisplay() {
        if (!this.productContainer) return;

        // Získat kompatibilní příslušenství
        const compatibleAccessories = this.getCompatibleAccessories();
        
        if (!compatibleAccessories || compatibleAccessories.length === 0) {
            this.showNoResults('Pro vybrané čerpadlo není dostupné žádné příslušenství');
            return;
        }

        this.productContainer.innerHTML = '';
        
        compatibleAccessories.forEach(accessory => {
            const feedData = this.getFeedDataForProduct(accessory.Kód);
            const productHtml = this.productGenerator.createProductItem(accessory, feedData);
            this.productContainer.innerHTML += productHtml;
        });

        // Přidáme prázdný produkt (možnost bez příslušenství)
        const emptyProductHtml = this.productGenerator.createEmptyProductItem();
        this.productContainer.innerHTML += emptyProductHtml;

        this.productGenerator.initializeSelection(this.productContainer);
    }

    addToCart(productCode, quantity = 1) {
        const accessory = this.accessoryData.find(acc => acc.Kód === productCode);
        if (!accessory) return;

        window.destovkaCart.destAddItem(7, productCode, quantity, {
            type: 'pump-accessory',
            name: accessory.Název
        });
    }
}

class DestovkaHladinomeryManager extends DestovkaBaseProductManager {
    constructor() {
        super(8);
        this.hladinomeryData = [];
        this.init();
    }

    async init() {
        try {
            await Promise.all([
                this.loadHladinomeryData(),
                this.loadXMLFeed()
            ]);
            this.initProductContainer();
            this.updateDisplay();
        } catch (error) {
            console.error('Chyba při inicializaci HladinomeryManager:', error);
            this.handleError();
        }
    }

    async loadHladinomeryData() {
        try {
            const response = await fetch('jsony/hladinoměry.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.hladinomeryData = await response.json();
        } catch (error) {
            console.error('Chyba při načítání dat hladinoměrů:', error);
            throw error;
        }
    }

    updateDisplay() {
        if (!this.productContainer) return;

        this.productContainer.innerHTML = '';
        
        // Přidáme všechny hladinoměry
        this.hladinomeryData.forEach(product => {
            const feedData = this.getFeedDataForProduct(product.Kód);
            const productHtml = this.productGenerator.createProductItem(product, feedData);
            this.productContainer.innerHTML += productHtml;
        });

        // Přidáme prázdný produkt
        const emptyProductHtml = this.productGenerator.createEmptyProductItem();
        this.productContainer.innerHTML += emptyProductHtml;

        this.productGenerator.initializeSelection(this.productContainer);
    }

    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat hladinoměrů.</p>
                    <button onclick="window.destovkaHladinomeryManager = new DestovkaHladinomeryManager()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }
}

class DestovkaGeigeryManager extends DestovkaBaseProductManager {
    constructor() {
        super(9); // Step 9 pro geigery
        this.geigerData = [];
        this.init();
    }

    async init() {
        try {
            await Promise.all([
                this.loadGeigerData(),
                this.loadXMLFeed()
            ]);
            this.initProductContainer();
            this.updateDisplay();
        } catch (error) {
            console.error('Chyba při inicializaci GeigeryManager:', error);
            this.handleError();
        }
    }

    async loadGeigerData() {
        try {
            const response = await fetch('jsony/gajgry.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.geigerData = await response.json();
        } catch (error) {
            console.error('Chyba při načítání dat geigerů:', error);
            throw error;
        }
    }

    updateDisplay() {
        if (!this.productContainer) return;
        this.productContainer.innerHTML = '';
        
        const geigerTypes = ['Spodní výtok', 'Boční výtok'];
        const typeToImageCode = {
            'Spodní výtok': '01.013.001.B',
            'Boční výtok': '01.013.002.B'
        };

        geigerTypes.forEach(type => {
            const geigersOfType = this.geigerData.filter(g => g.Typ === type);
            const imageCode = typeToImageCode[type];
            const feedData = this.getFeedDataForProduct(imageCode);
            
            const geigerDisplayData = {
                title: `Geiger - ${type}`,
                type: type,
                imageUrl: feedData.imageLink,
                variants: geigersOfType.map(g => ({
                    code: g.Kód,
                    color: g.Barva,
                    feedData: this.getFeedDataForProduct(g.Kód)
                }))
            };

            const productElement = this.productGenerator.createGeigeryProductItem(geigerDisplayData);
            this.productContainer.appendChild(productElement);
        });
    }

    getFeedDataForProduct(code) {
        return this.feedData.get(code) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: 'img/radoby_placeholder.png',
            link: '#'
        };
    }

    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat geigerů.</p>
                    <button onclick="window.destovkaGeigeryManager = new DestovkaGeigeryManager()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }

    getSelectedGeigers() {
        const selectedGeigers = [];
        const inputs = this.container.querySelectorAll('.destovka-product-geigery-card-input');
        
        inputs.forEach(input => {
            const quantity = parseInt(input.value || 0);
            if (quantity > 0) {
                const container = input.closest('.destovka-product-geigery-card-container');
                const type = container.dataset.type;
                
                selectedGeigers.push({
                    code: input.dataset.code,
                    quantity: quantity,
                    type: type
                });
            }
        });

        return selectedGeigers;
    }
}

class DestovkaPotrubíManager extends DestovkaBaseProductManager {
    constructor() {
        super(10);
        this.potrubíData = [];
        console.log('PotrubíManager initialized');  // Debug log
        this.init();
    }

    async init() {
        try {
            await Promise.all([
                this.loadPotrubíData(),
                this.loadXMLFeed()
            ]);
            this.initProductContainer();
            this.updateDisplay();
        } catch (error) {
            console.error('Chyba při inicializaci PotrubíManager:', error);
            this.handleError();
        }
    }

    async loadPotrubíData() {
        try {
            const response = await fetch('jsony/potrubi.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Loaded potrubi data:', data);  // Debug log
            this.potrubíData = data;
        } catch (error) {
            console.error('Chyba při načítání dat potrubí:', error);
            throw error;
        }
    }

    updateDisplay() {
        if (!this.productContainer) {
            console.error('Product container not found');
            return;
        }
        this.productContainer.innerHTML = '';
    
        // Získáme DN z form dat
        const inflowDiameter = window.destovkaStepManager?.formData.get('inflowDiameter');
        console.log('inflowDiameter:', inflowDiameter);  // Debug log
    
        const dnSystem = `DN${inflowDiameter}`;
        console.log('dnSystem:', dnSystem);  // Debug log
    
        // Filtrujeme data podle DN
        const filteredData = this.potrubíData.filter(item => item.Systém === dnSystem);
        console.log('Filtered Data:', filteredData);  // Debug log
        console.log('All Data:', this.potrubíData);  // Debug log pro všechna data
    
        const categories = ['Trubky', 'Kolena', 'Odbočky', 'Ostatní'];
        
        let columnsHTML = '';
        categories.forEach(category => {
            console.log('Processing category:', category);  // Debug log
            const categoryItems = filteredData.filter(item => item.Sloupec === category);
            console.log('Category items:', categoryItems);  // Debug log
    
            if (categoryItems.length > 0) {
                const categoryData = {
                    title: category,
                    items: categoryItems,
                    feedData: this.feedData,
                    systemTitle: `systém pro ${dnSystem}`
                };
    
                columnsHTML += this.productGenerator.createPotrubiProductItem(categoryData);
            }
        });
    
        this.productContainer.innerHTML = `
    <div class="destovka-potrubi-columns-container">
        ${columnsHTML}
    </div>
    <div class="destovka-product-potrubi-total-container">
        <div class="destovka-product-potrubi-total">
            Celková cena: <span class="destovka-product-potrubi-total-price">0 Kč vč. DPH</span>
        </div>
    </div>
`;
    
        this.initializeInputHandlers();
    }

    groupPotrubíByColumns(data) {
        return data.reduce((acc, item) => {
            const column = item.Sloupec;
            if (!acc[column]) {
                acc[column] = [];
            }
            acc[column].push(item);
            return acc;
        }, {});
    }

    initializeInputHandlers() {
        const container = this.productContainer;
        if (!container) return;
    
        container.querySelectorAll('.destovka-product-potrubi-card-input-container').forEach(inputContainer => {
            const input = inputContainer.querySelector('input');
            const decreaseBtn = inputContainer.querySelector('.destovka-decrease-quantity');
            const increaseBtn = inputContainer.querySelector('.destovka-increase-quantity');
    
            if (decreaseBtn && increaseBtn && input) {
                decreaseBtn.style.cursor = 'pointer';
                increaseBtn.style.cursor = 'pointer';
    
                decreaseBtn.addEventListener('click', () => {
                    const currentValue = parseInt(input.value) || 0;
                    if (currentValue > 0) {
                        input.value = currentValue - 1;
                        this.updateTotalPrice();
                    }
                });
    
                increaseBtn.addEventListener('click', () => {
                    const currentValue = parseInt(input.value) || 0;
                    input.value = currentValue + 1;
                    this.updateTotalPrice();
                });
    
                input.addEventListener('change', () => {
                    let value = parseInt(input.value) || 0;
                    if (value < 0) value = 0;
                    input.value = value;
                    this.updateTotalPrice();
                });
            }
        });
    }

    updateTotalPrice() {
        const container = this.productContainer;
        if (!container) return;
    
        let totalPrice = 0;
        container.querySelectorAll('.destovka-product-potrubi-card-input').forEach(input => {
            const quantity = parseInt(input.value) || 0;
            const code = input.dataset.code;
            const feedData = this.feedData.get(code);
            const price = this.extractPrice(feedData?.price || '0');
            totalPrice += quantity * price;
        });
    
        // Aktualizace celkové ceny
        const totalPriceElement = container.querySelector('.destovka-product-potrubi-total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `${totalPrice.toLocaleString('cs-CZ')} Kč vč. DPH`;
        }
    }

    extractPrice(priceString) {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/[^0-9]/g, ''));
    }

    getSelectedPotrubí() {
        const selectedItems = [];
        const inputs = this.container.querySelectorAll('.destovka-product-potrubi-card-input');
        
        inputs.forEach(input => {
            const quantity = parseInt(input.value || 0);
            if (quantity > 0) {
                selectedItems.push({
                    code: input.dataset.code,
                    quantity: quantity
                });
            }
        });

        return selectedItems;
    }

    getSelectedProducts() {
        const selectedProducts = [];
        this.productContainer.querySelectorAll('.destovka-product-potrubi-card-input').forEach(input => {
            const quantity = parseInt(input.value) || 0;
            if (quantity > 0) {
                selectedProducts.push({
                    code: input.dataset.code,
                    quantity: quantity
                });
            }
        });
        return selectedProducts;
    }
}

class VsakovaciCalculator {
    constructor(formData) {
        this.volume = parseInt(formData.get('volume'));
        this.soil = formData.get('soil');
        this.soilCoefficients = {
            'gravel': 0.0001,
            'sand': 0.00001,
            'soil': 0.000001,
            'clay': 0.0000001
        };
    }

    getCoefficient() {
        const coefficientMap = {
            'gravel': 0.0001,
            'sand': 0.00001,
            'soil': 0.000001,
            'clay': 0.0000001
        };
        return coefficientMap[this.soil] || 0.0000001; // default to clay if unknown
    }

    calculateMinArea() {
        return 0.1 * this.volume / 673 / 0.9 / 0.95 / 28 * 365;
    }

    calculateMinVolume() {
        const minArea = this.calculateMinArea();
        const coef = this.getCoefficient();
        return (673 / 1000 * (this.volume / 673 / 0.9 / 0.95 / 28 * 365)) - 
               (1 / 2 * coef * minArea * 4320 * 60);
    }
}

class DestovkaVsakovaciManager {
    constructor() {
        this.container = document.getElementById('destovka-step11');
        this.productGenerator = window.productStructureGenerator;
        this.feedData = new Map();
        this.selectedCategory = null;
        this.categories = [
            'Vsakovací jímka',
            'Vsakovací tunel',
            'Vsakovací box',
            'žádné'
        ];
        this.vsakovaciJimkaCodes = ['RUR500', 'RUR1000', 'RUR-RUE400', 'RUR-RUA'];
        this.vsakovaciTunelCodes = ['231004', '230010', '231005', '3754322'];
        this.init();
        this.calculator = new VsakovaciCalculator(window.destovkaStepManager?.formData || new Map());
    }

    async init() {
        try {
            await this.loadXMLFeed();
            this.initializeContainers();
            this.showCategories();
        } catch (error) {
            console.error('Chyba při inicializaci VsakManager:', error);
            this.handleError();
        }
    }

    async loadXMLFeed() {
        const response = await fetch('google.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        
        const entries = xml.getElementsByTagName('entry');
        for (const entry of entries) {
            const productData = {
                id: this.getElementText(entry, 'g:id'),
                title: this.getElementText(entry, 'title'),
                price: this.getElementText(entry, 'g:price'),
                availability: this.getElementText(entry, 'g:availability'),
                imageLink: this.getElementText(entry, 'g:image_link'),
                link: this.getElementText(entry, 'link')
            };
            
            if (!productData.id) continue;
            this.feedData.set(productData.id, productData);
        }
    }

    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }

    initializeContainers() {
        let categoriesContainer = this.container.querySelector('.destovka-categories-container');
        if (!categoriesContainer) {
            categoriesContainer = document.createElement('div');
            categoriesContainer.className = 'destovka-categories-container destovka-products-container';
            const heading = this.container.querySelector('h1');
            if (heading) {
                heading.insertAdjacentElement('afterend', categoriesContainer);
            }
        }
        this.categoriesContainer = categoriesContainer;

        let productsContainer = this.container.querySelector('.destovka-products-container:not(.destovka-categories-container)');
        if (!productsContainer) {
            productsContainer = document.createElement('div');
            productsContainer.className = 'destovka-products-container';
            this.categoriesContainer.insertAdjacentElement('afterend', productsContainer);
        }
        this.productContainer = productsContainer;
    }

    getSelectedProducts() {
        const selectedCard = this.productContainer?.querySelector('.destovka-product-selected');
        if (!selectedCard) return [];
    
        const code = selectedCard.dataset.productCode;
        if (!code) return [];
    
        return [{
            code: code,
            quantity: 1,
            type: this.selectedCategory
        }];
    }

    showCategories() {
        if (!this.categoriesContainer) return;
    
        // Reset containers
        this.productContainer.innerHTML = '';
        this.categoriesContainer.innerHTML = '';
        
        // Reset display
        this.productContainer.style.display = 'none';
        this.categoriesContainer.style.display = 'flex';
    
        // Remove back button if exists
        const backButton = this.container.querySelector('.destovka-back-to-categories');
        if (backButton) {
            backButton.remove();
        }
    
        const categoryImages = {
            'Vsakovací jímka': 'img/vsakovaci_jimka.png',
            'Vsakovací tunel': 'img/vsakovaci_tunel.png',
            'Vsakovací box': 'img/vsakovaci_box.png',
            'žádné': 'img/delete.png'
        };
    
        this.categories.forEach(category => {
            const categoryHtml = this.productGenerator.createCategoryItem(
                category, 
                categoryImages[category]
            );
            this.categoriesContainer.innerHTML += categoryHtml;
        });
    
        this.productGenerator.initializeCategorySelection(
            this.categoriesContainer, 
            (category) => this.handleCategorySelection(category)
        );
    }

    handleCategorySelection(category) {
        this.selectedCategory = category;
        
        if (category === 'žádné') {
            this.categoriesContainer.style.display = 'none';
            this.productContainer.style.display = 'flex';
            this.productContainer.innerHTML = this.productGenerator.createEmptyProductItem();
        } else {
            this.categoriesContainer.style.display = 'none';
            this.productContainer.style.display = 'flex';
            this.updateDisplay();
        }
    
        if (!this.container.querySelector('.destovka-back-to-categories')) {
            const backButton = document.createElement('button');
            backButton.className = 'destovka-back-to-categories';
            backButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Zpět na výběr kategorií
            `;
            backButton.addEventListener('click', () => {
                // Reset display properites
                this.categoriesContainer.style.display = 'flex';
                this.productContainer.style.display = 'none';
                this.productContainer.innerHTML = '';  // Clear products
                
                // Remove back button
                backButton.remove();
                
                // Show categories again
                this.showCategories();
            });
            this.productContainer.insertAdjacentElement('beforebegin', backButton);
        }
    }



    getProductsFromXML() {
        let productCodes = [];
        switch (this.selectedCategory) {
            case 'Vsakovací jímka':
                productCodes = this.vsakovaciJimkaCodes;
                break;
            case 'Vsakovací tunel':
                productCodes = this.vsakovaciTunelCodes;
                break;
            case 'Vsakovací box':
                // Simulace 5 stejných boxů
                productCodes = Array(5).fill('1042-40M');
                break;
            case 'žádné':
                return [];
            default:
                return [];
        }
    
        return productCodes.map(code => {
            const feedData = this.feedData.get(code);
            if (!feedData) return null;
    
            return {
                'Kód': code,
                'Produkt': feedData.title,
                'Typ': this.selectedCategory
            };
        }).filter(product => product !== null);
    }

    updateDisplay() {
        if (!this.productContainer) return;
    
        // Vypočítáme minimální hodnoty stejné pro všechny kategorie
        const minArea = this.calculator.calculateMinArea();
        const minVolume = this.calculator.calculateMinVolume();
        const infoBox = this.productGenerator.createVsakInfoBox(minArea, minVolume);
        
        const products = this.getProductsFromXML();
        
        if (!products || products.length === 0) {
            this.showNoResults();
            return;
        }
    
        if (this.selectedCategory === 'Vsakovací box') {
            this.productContainer.innerHTML = `
                ${infoBox}
                <div class="destovka-vsakbox-container">
                    <div class="destovka-vsakbox-grid-section">
                        ${this.productGenerator.createVsakBoxGrid()}
                    </div>
                    <div class="destovka-vsakbox-products">
                        ${products.map(product => {
                            const feedData = this.getFeedDataForProduct(product.Kód);
                            return this.productGenerator.createVsakBoxProductItem(product, feedData);
                        }).join('')}
                        <div class="destovka-vsakbox-total">
                            celkem <span class="destovka-vsakbox-total-price">0 Kč</span> vč. DPH
                        </div>
                    </div>
                </div>
            `;
            
            this.initializeVsakBoxGridControls();
            this.initializeVsakBoxCounters();
            this.updateGridVisualization();
            
        } else if (this.selectedCategory === 'Vsakovací jímka' || this.selectedCategory === 'Vsakovací tunel') {
            this.productContainer.innerHTML = `
                ${infoBox}
                <div class="destovka-products-container">
                    ${products.map(product => {
                        const feedData = this.getFeedDataForProduct(product.Kód);
                        return this.productGenerator.createVsakProductItem(product, feedData);
                    }).join('')}
                </div>
                <div class="destovka-product-potrubi-total-container">
                    <div class="destovka-product-potrubi-total">
                        Celková cena: <span class="destovka-product-potrubi-total-price">0 Kč vč. DPH</span>
                    </div>
                </div>
            `;
            this.initializeCounters();
            
        } else if (this.selectedCategory === 'žádné') {
            this.productContainer.innerHTML = this.productGenerator.createEmptyProductItem();
        }
    
        // Odstranit tlačítko zpět pokud existuje a kategorie je 'žádné'
        if (this.selectedCategory === 'žádné') {
            const backButton = this.container.querySelector('.destovka-back-to-categories');
            if (backButton) {
                backButton.remove();
            }
            this.categoriesContainer.style.display = 'flex';
        }
    
        // Inicializovat tlačítko zpět, pokud není kategorie 'žádné'
        if (this.selectedCategory !== 'žádné' && !this.container.querySelector('.destovka-back-to-categories')) {
            const backButton = document.createElement('button');
            backButton.className = 'destovka-back-to-categories';
            backButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Zpět na výběr kategorií
            `;
            backButton.addEventListener('click', () => this.showCategories());
            this.productContainer.insertAdjacentElement('beforebegin', backButton);
        }
    
        if (this.selectedCategory === 'žádné') {
            this.categoriesContainer.style.display = 'flex';
        }
    }

    initializeVsakBoxGridControls() {
        const controls = this.container.querySelectorAll('.destovka-vsakbox-counter');
        
        controls.forEach(control => {
            const input = control.querySelector('.destovka-vsakbox-input');
            const minusBtn = control.querySelector('.destovka-vsakbox-minus');
            const plusBtn = control.querySelector('.destovka-vsakbox-plus');
            
            // Přidám logování pro debugování
            console.log('Initializing control:', {
                dimension: input.dataset.dimension,
                min: input.min,
                max: input.max,
                currentValue: input.value
            });
    
            const updateGrid = () => {
                const dimension = input.dataset.dimension;
                const value = parseInt(input.value);
                const measureSpan = control.parentElement.querySelector('.destovka-vsakbox-measure');
                
                // Kontrola platnosti hodnoty
                if (isNaN(value)) return;
    
                // Aktualizace zobrazení měr
                if (dimension === 'height') {
                    measureSpan.textContent = `${(value * 0.4).toFixed(1)} m`;
                } else {
                    measureSpan.textContent = `${(value * 0.6).toFixed(1)} m`;
                }
                
                this.updateGridVisualization();
            };
    
            plusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                const maxValue = parseInt(input.max);
                
                // Přidám logování pro debugování
                console.log('Plus clicked:', {
                    currentValue,
                    maxValue,
                    dimension: input.dataset.dimension
                });
    
                if (currentValue < maxValue) {
                    input.value = currentValue + 1;
                    updateGrid();
                }
            });
    
            minusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                const minValue = parseInt(input.min);
                
                if (currentValue > minValue) {
                    input.value = currentValue - 1;
                    updateGrid();
                }
            });
    
            input.addEventListener('change', (e) => {
                let value = parseInt(input.value);
                const minValue = parseInt(input.min);
                const maxValue = parseInt(input.max);
                
                // Ošetření hodnoty
                if (isNaN(value)) value = minValue;
                value = Math.max(minValue, Math.min(maxValue, value));
                
                input.value = value;
                updateGrid();
            });
    
            // Inicializace počátečního stavu
            updateGrid();
        });
    }
    
    updateGridVisualization() {
        const length = parseInt(this.container.querySelector('[data-dimension="length"]').value);
        const width = parseInt(this.container.querySelector('[data-dimension="width"]').value);
        const height = parseInt(this.container.querySelector('[data-dimension="height"]').value);
    
        // Update main grid
        const cells = this.container.querySelectorAll('.destovka-vsakbox-grid .destovka-vsakbox-grid-cell');
        cells.forEach((cell, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;
            cell.classList.toggle('active', row < width && col < length);
        });
    
        // Update height visualization
        const heightCells = this.container.querySelectorAll('.destovka-vsakbox-height-grid .destovka-vsakbox-grid-cell');
        heightCells.forEach((cell, index) => {
            cell.classList.toggle('active', index < height);
        });
    }

    initializeVsakBoxCounters() {
        const inputs = this.productContainer.querySelectorAll('.destovka-vsakbox-product-input');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                if (input.value < 0) input.value = 0;
                this.updateVsakBoxTotal();
            });
        });
    }
    
    updateVsakBoxTotal() {
        let total = 0;
        const inputs = this.productContainer.querySelectorAll('.destovka-vsakbox-product-input');
        inputs.forEach(input => {
            const code = input.dataset.code;
            const quantity = parseInt(input.value) || 0;
            const feedData = this.getFeedDataForProduct(code);
            const price = this.extractPrice(feedData?.price || '0');
            total += price * quantity;
        });
    
        const totalElement = this.productContainer.querySelector('.destovka-vsakbox-total-price');
        if (totalElement) {
            totalElement.textContent = `${total.toLocaleString('cs-CZ')} Kč`;
        }
    }

    initializeCounters() {
        const container = this.productContainer;
        if (!container) return;
    
        container.querySelectorAll('.destovka-product-potrubi-card-input-container').forEach(inputContainer => {
            const input = inputContainer.querySelector('input');
            const decreaseBtn = inputContainer.querySelector('.destovka-decrease-quantity');
            const increaseBtn = inputContainer.querySelector('.destovka-increase-quantity');
    
            if (!input || !decreaseBtn || !increaseBtn) return;
    
            decreaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value) || 0;
                if (currentValue > 0) {
                    input.value = currentValue - 1;
                    this.updateTotalPrice();
                }
            });
    
            increaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value) || 0;
                input.value = currentValue + 1;
                this.updateTotalPrice();
            });
    
            input.addEventListener('change', () => {
                let value = parseInt(input.value) || 0;
                if (value < 0) value = 0;
                input.value = value;
                this.updateTotalPrice();
            });
        });
    }
    
    updateTotalPrice() {
        const container = this.productContainer;
        if (!container) return;
    
        let totalPrice = 0;
        container.querySelectorAll('.destovka-product-potrubi-card-input').forEach(input => {
            const quantity = parseInt(input.value) || 0;
            const code = input.dataset.code;
            const feedData = this.feedData.get(code);
            const price = this.extractPrice(feedData?.price || '0');
            totalPrice += quantity * price;
        });
    
        const totalPriceElement = container.querySelector('.destovka-product-potrubi-total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `${totalPrice.toLocaleString('cs-CZ')} Kč vč. DPH`;
        }
    }
    
    extractPrice(priceString) {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/[^0-9]/g, ''));
    }

    getFeedDataForProduct(code) {
        return this.feedData.get(code) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: 'img/delete.png',
            link: '#'
        };
    }

    showNoResults(message = 'Nebyly nalezeny žádné produkty') {
        this.productContainer.innerHTML = `
            <div class="destovka-no-results">
                <div class="destovka-no-results-content">
                    <h3>${message}</h3>
                </div>
            </div>`;
    }

    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat vsakovacích prvků.</p>
                    <button onclick="window.destovkaVsakManager = new DestovkaVsakManager()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }
}

class DestovkaCartDisplayManager {
    constructor() {
        this.container = document.getElementById('destovka-step12');
        this.cartGenerator = new CartStructureGenerator();
        this.feedData = new Map();
        this.init();
    }
 
    async init() {
        if (!this.container) return;
        try {
            await this.loadXMLFeed();
            this.cartItems = window.destovkaCart?.destGetAllItems() || [];
            this.renderCart();
            this.initializeEventListeners();
        } catch (error) {
            console.error('Chyba při inicializaci košíku:', error);
            this.renderError();
        }
    }
 
    async loadXMLFeed() {
        try {
            const response = await fetch('google.xml');
            if (!response.ok) throw new Error('Failed to fetch XML feed');
            
            const text = await response.text();
            const xml = new DOMParser().parseFromString(text, 'text/xml');
            
            if (xml.getElementsByTagName('parsererror').length > 0) {
                throw new Error('XML parsing error');
            }
            
            const entries = xml.getElementsByTagName('entry');
            for (const entry of entries) {
                const productData = {
                    id: this.getElementText(entry, 'g:id'),
                    title: this.getElementText(entry, 'title'),
                    price: this.getElementText(entry, 'g:price'),
                    imageLink: this.getElementText(entry, 'g:image_link')
                };
                if (!productData.id) continue;
                this.feedData.set(productData.id, productData);
            }
        } catch (error) {
            console.error('Chyba při načítání XML feedu:', error);
            throw error;
        }
    }
 
    initializeEventListeners() {
        this.container.addEventListener('click', (e) => {
            const removeButton = e.target.closest('.destovka-cart-card-remove-button');
            if (removeButton) {
                const productCode = removeButton.dataset.productCode;
                if (productCode) {
                    window.destovkaCart.destRemoveItem(productCode);
                    this.cartItems = window.destovkaCart?.destGetAllItems() || [];
                    this.renderCart();
                }
            }
        });
    }
 
    groupItemsByStep() {
        return this.cartItems.reduce((acc, item) => {
            const stepTitle = this.getStepTitle(item.step);
            if (!acc[stepTitle]) acc[stepTitle] = [];
            acc[stepTitle].push(item);
            return acc;
        }, {});
    }
 
    renderCart() {
        if (!this.cartItems.length) {
            this.renderEmptyCart();
            return;
        }
 
        const cartContent = document.createElement('div');
        cartContent.className = 'destovka-cart-content';
        
        const groupedItems = this.groupItemsByStep();
        
        Object.entries(groupedItems).forEach(([title, items]) => {
            const itemsHtml = items.map(item => {
                const feedData = this.feedData.get(item.productCode);
                return this.cartGenerator.createCartItem({
                    ...item,
                    name: feedData?.title || item.name,
                    imageUrl: feedData?.imageLink || 'img/radoby_placeholder.png',
                    price: this.extractPrice(feedData?.price || item.price),
                    productCode: item.productCode
                });
            }).join('');
 
            cartContent.innerHTML += this.cartGenerator.createCartSection(
                title, 
                itemsHtml, 
                items.length
            );
        });
        
        const totals = this.calculateTotals();
        cartContent.innerHTML += this.cartGenerator.createCartTotalItem(
            totals.totalItems,
            totals.totalPrice
        );
        
        this.container.innerHTML = '<h1>Konečný seznam vybraných položek</h1>';
        this.container.appendChild(cartContent);
    }
 
    renderEmptyCart() {
        this.container.innerHTML = `
            <h1>Konečný seznam vybraných položek</h1>
            <div class="destovka-cart-empty">
                <p>Váš košík je prázdný</p>
            </div>
        `;
    }
 
    renderError() {
        this.container.innerHTML = `
            <h1>Konečný seznam vybraných položek</h1>
            <div class="destovka-cart-error">
                <p>Při načítání košíku došlo k chybě. Prosím zkuste to znovu později.</p>
                <button class="destovka-button destovka-button-back" onclick="window.destovkaCartDisplay = new DestovkaCartDisplayManager()">
                    Zkusit znovu
                </button>
            </div>
        `;
    }
 
    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }
 
    extractPrice(price) {
        if (typeof price === 'number') return price;
        if (typeof price === 'string') {
            return parseInt(price.replace(/[^0-9]/g, '')) || 0;
        }
        return 0;
    }
 
    calculateTotals() {
        return this.cartItems.reduce((acc, item) => {
            const price = this.extractPrice(this.feedData.get(item.productCode)?.price || item.price);
            return {
                totalItems: acc.totalItems + item.quantity,
                totalPrice: acc.totalPrice + (price * item.quantity)
            };
        }, { totalItems: 0, totalPrice: 0 });
    }
 
    getStepTitle(step) {
        const titles = {
            2: 'Nádrž',
            3: 'Nástavce',
            4: 'Filtrace',
            5: 'Bezpečnostní přepad',
            6: 'Čerpadlo',
            7: 'Příslušenství čerpadla',
            8: 'Hladinoměr',
            9: 'Geigery',
            10: 'Potrubí',
            11: 'Vsakovací objekt'
        };
        return titles[step] || 'Ostatní';
    }
 }

// Inicializace manageru při načtení DOMu
document.addEventListener('DOMContentLoaded', () => {
    window.destovkaTankManager = new DestovkaTankManager();
});






// Initialize the calculator
window.destovkaKonfigCalculator = new DestovkaKonfigCalculator();





