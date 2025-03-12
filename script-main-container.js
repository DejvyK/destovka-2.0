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
        this.initialVolumeTolerance = 0.1;  // Začáteční tolerance 10 % 
        this.maxVolumeTolerance = 0.5;      // max tolerance 60 % 
        this.volumeToleranceStep = 0.05;    // 5% krok pro navyšování tolerance
        
        // Váhy pro bodování
        this.weights = {
            load: 40,       // Nejvyšší váha pro zatížení
            earthworks: 30, // Váha pro zemní práce
            volume: 30      // Váha pro objem
        };

        this.extensionCalculator = null;
        this.accessoryCalculator = null;

        /*
        this.extensionsData = window.destovkaAccessoryFilter?.extensionsData || [];
        this.coversData = window.destovkaAccessoryFilter?.coversData || [];

        if (!this.extensionsData.length || !this.coversData.length) {
            console.warn('Extensions or covers data not available, some validations will be skipped');
        }
            */
        this.extensionsData = [];
        this.coversData = [];
        this.loadInitialData();

        console.log('Tank Filter initialized with settings:', {
            concrete: this.wantsConcrete,
            load: this.requiredLoad,
            inflowDepth: this.requiredInflowDepth,
            volume: this.requiredVolume
        });
    }

    async loadInitialData() {
        try {
            const [extensionsResponse, coversResponse] = await Promise.all([
                fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/nastavec.json'),
                fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/poklopy.json')
            ]);
    
            if (!extensionsResponse.ok || !coversResponse.ok) {
                throw new Error('Failed to load data');
            }
    
            this.extensionsData = await extensionsResponse.json();
            this.coversData = await coversResponse.json();
    
            console.log('Data loaded:', {
                extensions: this.extensionsData.length,
                covers: this.coversData.length
            });
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }


    //pozměněná quick fixes
    async filterTanks(tanks) {
        await this.loadInitialData();
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
    
            if (filteredTanks.length >= 10) break;
            currentTolerance += this.volumeToleranceStep;
        }
    
        if (filteredTanks.length === 0) {
            setTimeout(() => {
                this.addVolumeWarning(
                    `Pro vámi zadané parametry bohužel nebyly nalezeny žádné vyhovující nádrže. 
                    Pro širší výběr doporučujeme zvážit parametry v oblasti Velikosti (Objemu), Zatížení, 
                    Průměru nátoku a Betonáže. V případě potřeby individuální nabídky nás neváhejte 
                    kontaktovat přes e-mail eshop@destovka.eu.`
                );
            }, 0);
            return [];
        }
    
        let topTanks = filteredTanks.slice(0, 10);
        topTanks.sort((a, b) => parseInt(a['Objem (l)']) - parseInt(b['Objem (l)']));
        topTanks = topTanks.slice(0, 3);
    
        // Kontrola počtu nádrží
        if (topTanks.length < 3) {
            setTimeout(() => {
                this.addVolumeWarning(
                    `Pro vámi zadané parametry byly nalezeny ${topTanks.length} nádrže se zadaným objemem. 
                    Proto nabízíme také nádrže nejbližší velikosti dle ostatních zadaných parametrů. 
                    Pro širší výběr doporučujeme zvážit parametry v oblasti Zatížení, Průměru nátoku a Betonáže.`
                );
            }, 0);
        }
    
        // Kontrola objemových rozdílů
        const requestedVolume = this.requiredVolume;
        const biggerTanks = topTanks.filter(tank => {
            const tankVolume = parseInt(tank['Objem (l)']);
            return tankVolume > requestedVolume * 1.1; // O 10% větší
        });
    
        if (biggerTanks.length > 0) {
            setTimeout(() => {
                this.addVolumeWarning(
                    `Pro vámi zadané parametry byly nalezeny méně nádrží se zadaným
                    objemem. Proto nabízíme také nádrže nejbližší velikosti dle ostatních
                    zadaných parametrů. Pro širší výběr doporučujeme zvážit parametry
                    v oblasti Zatížení, Průměru nátoku a Betonáže.`,
                    'volume-difference-warning'
                );
            }, 0);
        }
    
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

    addVolumeWarning(message, className = 'destovka-volume-warning') {
        const container = document.getElementById('destovkaTanksContainer');
        if (!container) return;
    
        // Pokud je to standardní varování, odstraníme předchozí stejného typu
        if (className === 'destovka-volume-warning') {
            const existingWarning = container.querySelector('.' + className);
            if (existingWarning) {
                existingWarning.remove();
            }
        }
    
        const warningDiv = document.createElement('div');
        warningDiv.className = className;
        warningDiv.innerHTML = message;
        
        const firstTank = container.firstChild;
        if (firstTank) {
            container.insertBefore(warningDiv, firstTank);
        } else {
            container.appendChild(warningDiv);
        }
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
        // Kontrola dostupnosti
        const formData = window.destovkaStepManager?.formData;
        const availability = window.destovkaTankManager?.feedData.get(tank['Kód'])?.availability;
        if (availability !== 'in stock') {
            console.log(`Tank ${tank['Kód']} filtered out: Not in stock (${availability})`);
            return false;
        }
    
        // 1. Kontrola minimálního objemu
        if (!this.passesVolumeCheck(tank)) {
            return false;
        }
    
        // 2. Kontrola zatížení
        if (!this.passesLoadCheck(tank)) {
            console.log(`Tank ${tank['Kód']} filtered out: Failed load check`);
            return false;
        }

        const requiredLoad = formData.get('load');
        const requiredVolume = parseInt(formData.get('volume'));

        // Kontrola zatížení a systému
        if (requiredLoad === 'pojezdná do 3,5 t' || 
            requiredLoad === 'pojezdná do 12 t' || 
            requiredLoad === 'pojezdná do 40 t') {
            
            const allowedSystems = [
                'ROTERRA',
                'AQUA',
                'LILO',
                'COLUMBUS',
                'TWIN',
                'Nautilus Gera'
            ];

            if (!allowedSystems.includes(tank.Systém)) {
                console.log(`Tank ${tank.Systém} filtered out - not suitable for load ${requiredLoad}`);
                return false;
            }
        }


    
         // 3. Kontrola hloubky nátoku vs max překrytí zeminou
        const maxCovering = parseFloat(tank['Max. překrytí zeminou (mm)']); 
        const defaultInflowDepth = parseFloat(tank['Hloubka nátoku bez nástavce (mm)']);
        const inflowOffsetFromTop = parseFloat(tank['Výška umístění nátoku vůči stropu nádrže'] || "0");
        const actualInflowDepth = defaultInflowDepth + inflowOffsetFromTop;

        if (this.requiredInflowDepth + inflowOffsetFromTop > maxCovering) {
            console.log(`Tank ${tank['Kód']} filtered out: Required depth with offset exceeds max covering`);
            return false;
        }


        //3a - max zatopení nádrže spodní vodou. 
        const maxFloodingHeight = parseFloat(tank['Max. výška zatopení nádrže spodní vodou (mm)']);
        const requiredFloodingHeight = parseFloat(this.formData.get('hsvDepth') || '0'); // přichází v mm
        
        if (maxFloodingHeight < requiredFloodingHeight && requiredFloodingHeight > 0) {
            console.log(`Tank ${tank['Kód']} filtered out: Max flooding height (${maxFloodingHeight}) is less than required (${requiredFloodingHeight})`);
            return false;
        }

        // 4. Kontrola defaultInflowDepth
        if (actualInflowDepth > this.requiredInflowDepth) {
            console.log(`Tank ${tank['Kód']} filtered out: Actual inflow depth is greater than required`);
            return false;
        }

        // 5. Kontrola actual inflow depth vs max covering
        if (actualInflowDepth > maxCovering) {
            console.log(`Tank ${tank['Kód']} filtered out: Actual inflow depth exceeds max covering`);
            return false;
        }
    
        // 5a. Kontrola dostupnosti nástavců
        if (!this.hasCompatibleExtensions(tank)) {
            console.log(`Tank ${tank['Kód']} has no compatible extensions`);
        }
    
        // 5b. Kontrola dostupnosti teleskopických poklopů
        if (!this.hasCompatibleTelescopicCover(tank)) {
            console.log(`Tank ${tank['Kód']} has no compatible telescopic covers`);
        }
    
        // Pokud obě kontroly selžou, nádrž je nevhodná
        if (!this.hasCompatibleExtensions(tank) && !this.hasCompatibleTelescopicCover(tank)) {
            console.log(`Tank ${tank['Kód']} filtered out: Neither extensions nor telescopic covers are available`);
            return false;
        }
    
        // 6. Ostatní kontroly
        if (!this.wantsConcrete && tank['Konstrukce'] === 'Plastová samonosná na desku') {
            console.log(`Tank ${tank['Kód']} filtered out: Concrete construction not wanted`);
            return false;
        }
    
        if (!this.passesDNCheck(tank)) {
            console.log(`Tank ${tank['Kód']} filtered out: Failed DN check`);
            return false;
        }
    
        if (this.soilType === 'clay' && tank['Vhodné do jílovité půdy'] !== 'ANO') {
            console.log(`Tank ${tank['Kód']} filtered out: Not suitable for clay soil`);
            return false;
        }
    
        console.log(`Tank ${tank['Kód']} passed all filters`);
        return true;
    }

     passesVolumeCheck(tank) {
        const tankVolume = parseInt(tank['Objem (l)']);
        if (tankVolume < this.requiredVolume) {
            console.log(`Tank ${tank['Kód']} filtered out: Volume ${tankVolume} is less than required ${this.requiredVolume}`);
            return false;
        }
        return true;
    }
    
    // Nová funkce pro kontrolu dostupnosti nástavců
    hasCompatibleExtensions(tank) {
        const tankSystem = tank['Systém'];
        console.group(`Checking extensions for tank ${tank['Kód']} (System: ${tankSystem})`);
        
        // Debug log celých dat
        if(tank['Kód'] === '35.3700.0000') {
            console.log('VŠECHNA DATA NÁSTAVCŮ:', {
                rawExtensionsData: this.extensionsData,
                tankSystem: tankSystem
            });
        }
     
        const compatibleExtensions = this.extensionsData.filter(extension => 
            extension.Systém === tankSystem
        );
     
        console.log('Available extensions:', {
            total: this.extensionsData.length,
            compatible: compatibleExtensions.length,
            extensions: compatibleExtensions.map(ext => ({
                code: ext.Kód,
                name: ext.Název,
                height: ext['Výška (mm)'],
                system: ext.Systém
            }))
        });
     
        if(tank['Kód'] === '35.3700.0000') {
            console.log('Detailní kontrola pro tank 35.3700.0000:', {
                tankSystem: tankSystem,
                allExtensionSystems: this.extensionsData.map(ext => ext.Systém),
                exactMatches: this.extensionsData.filter(ext => ext.Systém === tankSystem).length
            });
        }
     
        const result = compatibleExtensions.length > 0;
        console.log(`Result: ${result ? 'Has compatible extensions' : 'No compatible extensions found'}`);
        console.groupEnd();
        return result;
     }
     
     hasCompatibleTelescopicCover(tank) {
        const tankSystem = tank['Systém'];
        const defaultInflowDepth = parseFloat(tank['Hloubka nátoku bez nástavce (mm)']);
        const heightDiff = this.requiredInflowDepth - defaultInflowDepth;
     
        console.group(`Checking telescopic covers for tank ${tank['Kód']}`);
        console.log('Parameters:', {
            tankSystem,
            defaultInflowDepth,
            requiredInflowDepth: this.requiredInflowDepth,
            heightDifference: heightDiff
        });
     
        const compatibleCovers = this.coversData.filter(cover => {
            const systemMatch = cover.Systém === tankSystem || cover[''] === tankSystem;
            const hasHeights = cover['Minimální výška (mm)'] && cover['Maximální výška (mm)'];
            
            if (!systemMatch || !hasHeights) {
                return false;
            }
     
            const minHeight = parseFloat(cover['Minimální výška (mm)']);
            const maxHeight = parseFloat(cover['Maximální výška (mm)']);
            
            const maxCondition = heightDiff - maxHeight <= 0;
            const minCondition = heightDiff - minHeight >= 0;
     
            console.log('Cover check:', {
                code: cover.Kód,
                name: cover.Název,
                system: cover.Systém,
                system2: cover[''],
                minHeight,
                maxHeight,
                maxCondition,
                minCondition,
                bothConditionsMet: maxCondition && minCondition
            });
     
            return maxCondition && minCondition;
        });
     
        console.log('Compatible covers found:', compatibleCovers.length);
        console.log('Compatible covers:', compatibleCovers);
        console.groupEnd();
     
        return compatibleCovers.length > 0;
     }
    

    async passesExtensionCheck(tank) {
        this.extensionCalculator = new ExtensionCalculator(
            tank['Systém'],
            this.requiredInflowDepth,
            parseFloat(tank['Hloubka nátoku bez nástavce (mm)']),
            parseFloat(tank['Výška umístění nátoku vůči stropu nádrže'] || "0")
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
        const actualInflowDepth = defaultInflowDepth;
        
        // Skóre za překrytí zeminou (max 0.5)
        const coveringScore = Math.max(0, 1 - 
            Math.abs(maxCovering - this.requiredInflowDepth) / this.requiredInflowDepth) * 0.5;
        
        // Skóre za hloubku nátoku (max 0.5)
        const depthScore = Math.max(0, 1 - 
            Math.abs(actualInflowDepth - this.requiredInflowDepth) / this.requiredInflowDepth) * 0.5;
        
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
        console.group('🚀 TankManager Initialization');
        console.log("Začínám inicializaci TankManageru");
        try {
            console.log("Začínám načítání dat...");
            const [jsonData, xmlData] = await Promise.all([
                this.fetchWithRetry(() => this.fetchJSON(), 'JSON'),
                this.fetchWithRetry(() => this.fetchXMLFeed(), 'XML feed')
            ]);
    
            console.log("Data načtena:", {
                jsonDataExists: !!jsonData,
                jsonDataLength: jsonData?.length || 0,
                xmlDataExists: !!xmlData
            });
    
            this.tanksData = jsonData;
            console.log("TanksData nastavena:", this.tanksData?.length || 0);
            
            await this.processFeedData(xmlData);
            console.log("FeedData zpracována, počet položek:", this.feedData?.size || 0);
            
        } catch (error) {
            console.error('❌ Chyba při inicializaci:', error);
            this.handleError();
        }
        console.groupEnd();
    }

    // Nová metoda pro aktualizaci zobrazení nádrží
    async updateTankDisplay(formData) {
        await this.init(); // Wait for initialization to complete
        this.tankFilter = new DestovkaTankFilter(formData || new Map());
        await this.renderTanks(); // Make renderTanks async as well
    }

    renderNoResults() {
        this.tanksContainer.innerHTML = `
            <div class="destovka-no-results">
                <div class="destovka-no-results-content">
                    <h3>Nenalezeny žádné vyhovující nádrže</h3>
                    <p>Pro vámi zadané
                        parametry bohužel nebyly nalezeny žádné vyhovující nádrže. Pro širší výběr
                        doporučujeme zvážit parametry v oblasti Velikosti (Objemu), Zatížení, Průměru

                        nátoku a Betonáže. V případě potřeby individuální nabídky nás neváhejte
                        kontaktovat přes e-mail eshop@destovka.eu.:</p>
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
        console.group('📦 Fetch JSON');
        console.log("Začínám fetch JSON souboru");
        try {
            const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/nadrze_12_01.json');
            console.log("Response status:", response.status);
            console.log("Response OK:", response.ok);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("JSON data úspěšně načtena, počet záznamů:", data?.length || 0);
            console.groupEnd();
            return data;
        } catch (error) {
            console.error("❌ Chyba při načítání JSON:", error);
            console.groupEnd();
            throw error;
        }
    }

    async fetchXMLFeed() {
        console.log("pokousim se o volani xml tank")
        const response = await fetch('https://eshop.destovka.eu/google.xml');
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
            // Wait for both initialization and filter results
            await this.init();
            //await this.loadXMLFeed();
            
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
                imageUrl: feedData.imageLink || 'none',
                height: parseInt(tankData['Hloubka nátoku bez nástavce (mm)']) || 0  // Správná hodnota - hloubka nátoku
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
            const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/poklopy.json');
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
        const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/nastavec.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.accessoriesData = await response.json();
    }

    async loadXMLFeed() {
        const response = await fetch('https://eshop.destovka.eu/google.xml');
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

    calculateHeights() {
        const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
        if (!selectedTank) return null;
    
        const tankData = window.destovkaTankManager?.tanksData.find(
            tank => tank['Kód'] === selectedTank.productCode
        );
        if (!tankData) return null;
    
        const inflowDepth = parseInt(window.destovkaStepManager?.formData.get('inflowDepth'));
        const tankHeight = selectedTank.height || 0;
        
    
        // Cover je opcionální
        const selectedCover = window.destovkaCart?.destGetItemsByStep(2)[1];
        const coverHeight = selectedCover?.height || 0;
    
        // Přepočítáváme skutečnou výšku s ohledem na offset
        const actualInflowDepth = tankHeight;
        const missingHeight = Math.max(0, inflowDepth - actualInflowDepth - coverHeight);
    
        return {
            inflowDepth,
            tankHeight,
            coverHeight,
            actualInflowDepth,
            missingHeight,
            tankSystem: tankData['Systém']
        };
    }

    calculateCutLength(extensionHeight, missingHeight) {
        return Math.max(0, extensionHeight - missingHeight);
    }

    createHeightInfo(heightData) {
        return `
            <div class="destovka-height-info">
                <div class="destovka-height-info-item">
                    <span>Vaše vybraná hloubka nátoku:</span>
                    <strong>${heightData.inflowDepth} mm</strong>
                </div>
                <div class="destovka-height-info-item">
                    <span>Chybějící výška:</span>
                    <strong>${heightData.missingHeight} mm</strong>
                </div>
                <div class="destovka-height-info-dynamic" data-missing="${heightData.missingHeight}">
                    <div class="destovka-height-info-item destovka-height-missing">
                        <span>S těmito nástavci chybějící výška:</span>
                        <strong class="destovka-height-value destovka-height-negative">0 mm</strong>
                    </div>
                    <div class="destovka-height-info-item destovka-height-exceeding">
                        <span>S těmito nástavci nadbývající výška:</span>
                        <strong class="destovka-height-value destovka-height-positive">0 mm</strong>
                    </div>
                </div>
            </div>`;
    }

    createExtensionItem(extension, heightData) {
        const feedData = this.getFeedDataForProduct(extension.Kód);
        const extensionHeight = parseInt(extension['Výška (mm)']);
        const cutLength = this.calculateCutLength(extensionHeight, heightData.missingHeight);

        let cutNote = '';
        if (cutLength > 0) {
            cutNote = `
                <div class="destovka-extension-cut-note">
                    Tento nástavec bude třeba zkrátit o ${cutLength} mm
                </div>
            `;
        }

        return `
            <div class="destovka-accessory-item">
                <div class="destovka-accessory-item-main">
                    <div class="destovka-accessory-item-visuals">
                        <div class="destovka-accessory-item-image">
                            <img src="${feedData.imageLink}" 
                                 alt="${extension.Název}"
                                 onerror="this.src='img/radoby_placeholder.png'" />
                        </div>
                    </div>
                    <div class="destovka-accessory-item-info">
                        <div class="destovka-accessory-item-name">${extension.Název}</div>
                        <div class="destovka-accessory-item-code">kód ${extension.Kód}</div>
                        <div class="destovka-accessory-item-height">Výška: ${extensionHeight} mm</div>
                        ${cutNote}
                    </div>
                    <div class="destovka-accessory-item-actions">
                        <div class="destovka-tank-total-price">${this.formatPrice(feedData.price)}</div>
                        <div class="destovka-quantity-counter">
                            <input type="number" 
                                   class="destovka-quantity-input" 
                                   value="0" 
                                   min="0" 
                                   data-code="${extension.Kód}"
                                   data-height="${extensionHeight}">
                            <div class="destovka-quantity-controls">
                                <button class="destovka-quantity-increase">+</button>
                                <button class="destovka-quantity-decrease">-</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getCompatibleExtensions(heightData) {
        if (!heightData || !heightData.tankSystem) return [];

        return this.accessoriesData
            .filter(ext => ext.Systém === heightData.tankSystem)
            .filter(ext => parseInt(ext['Výška (mm)']) >= heightData.missingHeight)
            .sort((a, b) => parseInt(a['Výška (mm)']) - parseInt(b['Výška (mm)']));
    }

    async updateDisplay() {
        if (!this.productContainer) return;
     
        try {
            await this.validateSetup();
     
            const heightData = this.calculateHeights();
            if (!heightData || !this.validateHeightData(heightData)) {
                this.showNoResults('Nejprve prosím vyberte nádrž a vyplňte všechny potřebné údaje');
                return;
            }
     
            // Získáme kompatibilní nástavce pro daný systém
            const compatibleExtensions = this.accessoriesData.filter(ext => 
                ext.Systém === heightData.tankSystem
            ).sort((a, b) => parseInt(a['Výška (mm)']) - parseInt(b['Výška (mm)']));
     
            // Najdeme první vhodný nástavec
            const firstExtension = compatibleExtensions[0];
            let extensionRecommendation = '';
            
            if (firstExtension) {
                const extensionHeight = parseInt(firstExtension['Výška (mm)']);
                const neededCount = Math.ceil(heightData.missingHeight / extensionHeight);
                const totalHeight = neededCount * extensionHeight;
                const cutLength = totalHeight - heightData.missingHeight;
                
                extensionRecommendation = `
                    <div class="destovka-extension-recommendation">
                        <div class="destovka-extension-recommendation-title">
                            Doporučené použití nástavců:
                        </div>
                        <div class="destovka-extension-recommendation-text">
                            Měli byste použít ${neededCount}× nástavec ${firstExtension.Název} (${extensionHeight} mm)
                            ${cutLength > 0 ? `, přičemž jeden nástavec se uřeže o ${cutLength} mm` : ''}
                        </div>
                    </div>
                `;
            }
     
            let content = `
                <div class="destovka-height-info">
                    <div class="destovka-height-info-item">
                        <span>Vaše vybraná hloubka nátoku:</span>
                        <strong>${heightData.inflowDepth} mm</strong>
                    </div>
                    <div class="destovka-height-info-item">
                        <span>Chybějící výška:</span>
                        <strong>${heightData.missingHeight} mm</strong>
                    </div>
                    <div class="destovka-height-info-dynamic" data-missing="${heightData.missingHeight}">
                        <div class="destovka-height-info-item destovka-height-missing">
                            <span>S těmito nástavci chybějící výška:</span>
                            <strong class="destovka-height-value destovka-height-negative">0 mm</strong>
                        </div>
                        <div class="destovka-height-info-item destovka-height-exceeding">
                            <span>S těmito nástavci nadbývající výška:</span>
                            <strong class="destovka-height-value destovka-height-positive">0 mm</strong>
                        </div>
                    </div>
                </div>
                <div>${extensionRecommendation}<div>
                
                `;
     
            const extensionResults = await this.processExtensionCalculations(heightData);
            if (extensionResults.error) {
                content += `
                    <div class="destovka-error-message">
                        ${extensionResults.message}
                    </div>
                `;
                this.productContainer.innerHTML = content;
                return;
            }
     
            const compatibleExtensionsForDisplay = this.getCompatibleExtensions(heightData);
            
            if (compatibleExtensionsForDisplay.length === 0) {
                content += `
                    <div class="destovka-no-results">
                        <div class="destovka-no-results-content">
                            <h3>Nebyly nalezeny žádné kompatibilní nástavce</h3>
                            <p>Pro vaše parametry bohužel nemáme vhodné nástavce. 
                               Zkuste prosím upravit hloubku nátoku nebo vybrat jinou nádrž.</p>
                        </div>
                    </div>
                `;
            } else {
                content += `
                    <div class="destovka-extensions-section">
                        <h3 class="destovka-extensions-title">Dostupné nástavce</h3>
                        <p>K vámi vybrané nádrži byly nalezeny následující nástavce. Vyberte počet nástavců pro
                                splnění chybějící výšky tak, aby číslo svítilo zeleně (od požadované hloubky nátoku je
                                odečtena výška poklopu a hloubka nátoku do nádrže od horní hrany nádrže).
                                Nástavce je poté možné při stavbě zkrátit na požadovanou výšku. Nástavce je také
                                možné dokoupit při nenadálé změně na stavbě, při objednání k nádrži však ušetříte
                                za další poštovné a vyvarujete se případným průtahům stavby. </p>
                        <div class="destovka-extensions-grid">
                            ${compatibleExtensionsForDisplay.map(extension => 
                                this.createExtensionItem(extension, heightData)
                            ).join('')}
                        </div>
                    </div>
                `;
            }
     
            this.productContainer.innerHTML = content;
            this.initializeCounters();
            
            const quantityInput = document.querySelector(".destovka-quantity-input");
if (quantityInput && firstExtension) {
    const extensionHeight = parseInt(firstExtension['Výška (mm)']);
    const neededCount = Math.ceil(heightData.missingHeight / extensionHeight);
    quantityInput.value = Math.ceil(neededCount);
    
    // Vyvoláme událost change, aby se aktualizovaly všechny závislé hodnoty
    const event = new Event('change', {
        bubbles: true,
        cancelable: true,
    });
    quantityInput.dispatchEvent(event);
}

        } catch (error) {
            console.error('Chyba při aktualizaci zobrazení:', error);
            this.handleError(error.message);
        }
     }

    initializeCounters() {
        const counters = this.container.querySelectorAll('.destovka-quantity-counter');
        const dynamicContainer = this.container.querySelector('.destovka-height-info-dynamic');
        const missingHeight = parseInt(dynamicContainer?.dataset.missing || 0);
        
        const updateRemainingHeight = () => {
            let totalExtensionHeight = 0;
            
            // Spočítáme celkovou výšku nástavců
            counters.forEach(counter => {
                const input = counter.querySelector('.destovka-quantity-input');
                const quantity = parseInt(input.value) || 0;
                const height = parseInt(input.dataset.height) || 0;
                totalExtensionHeight += quantity * height;
            });
    
            const heightDifference = totalExtensionHeight - missingHeight;
            
            if (dynamicContainer) {
                const missingElement = dynamicContainer.querySelector('.destovka-height-missing');
                const exceedingElement = dynamicContainer.querySelector('.destovka-height-exceeding');
                
                if (heightDifference < 0) {
                    // Chybí výška
                    missingElement.style.display = 'flex';
                    exceedingElement.style.display = 'none';
                    missingElement.querySelector('.destovka-height-value').textContent = 
                        `${Math.abs(heightDifference)} mm`;
                } else if (heightDifference > 0) {
                    // Nadbývá výška
                    missingElement.style.display = 'none';
                    exceedingElement.style.display = 'flex';
                    exceedingElement.querySelector('.destovka-height-value').textContent = 
                        `${heightDifference} mm`;
                } else {
                    // Přesně sedí
                    missingElement.style.display = 'none';
                    exceedingElement.style.display = 'none';
                }
            }
        };
        
        counters.forEach(counter => {
            const input = counter.querySelector('.destovka-quantity-input');
            const decreaseBtn = counter.querySelector('.destovka-quantity-decrease');
            const increaseBtn = counter.querySelector('.destovka-quantity-increase');
            
            if (!input || !decreaseBtn || !increaseBtn) return;
    
            // Načtení existujících hodnot z košíku
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
                    updateRemainingHeight();
                }
            });
    
            increaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value) || 0;
                input.value = currentValue + 1;
                this.updateCart(input.dataset.code, currentValue + 1);
                updateRemainingHeight();
            });
    
            input.addEventListener('change', () => {
                let value = parseInt(input.value) || 0;
                if (value < 0) value = 0;
                input.value = value;
                this.updateCart(input.dataset.code, value);
                updateRemainingHeight();
            });
        });
    
        // Inicializace počáteční hodnoty
        updateRemainingHeight();
    }

    updateCart(code, quantity) {
        if (!code) return;
        
        if (quantity <= 0) {
            window.destovkaCart?.destRemoveItem(code);
        } else {
            const extension = this.accessoriesData.find(ext => ext.Kód === code);
            if (!extension) return;

            const feedData = this.getFeedDataForProduct(code);
            window.destovkaCart?.destAddItem(3, code, quantity, {
                name: extension.Název,
                price: this.extractPrice(feedData.price),
                height: parseInt(extension['Výška (mm)']),
                imageUrl: feedData.imageLink || 'none'
            });
        }
    }

    getFeedDataForProduct(code) {
        return this.feedData.get(code) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: 'img/radoby_placeholder.png',
            link: '#'
        };
    }

    formatPrice(price) {
        if (!price) return 'Cena na dotaz';
        const [value, currency] = price.split(' ');
        return `${parseInt(value).toLocaleString('cs-CZ')} Kč`;
    }

    extractPrice(priceString) {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/[^0-9]/g, ''));
    }

    async validateSetup() {
        if (!window.destovkaTankManager?.tanksData) {
            throw new Error('TankManager není inicializován');
        }
        
        if (!window.destovkaStepManager?.formData) {
            throw new Error('StepManager není inicializován');
        }
        
        if (!this.accessoriesData.length) {
            throw new Error('Data nástavců nejsou načtena');
        }
    }

    async processExtensionCalculations(heightData) {
        try {
            if (heightData.missingHeight > 0) {
                // Používáme existující filtrovací metodu pro získání nástavců
                const compatibleExtensions = this.getCompatibleExtensions(heightData);
                
                if (compatibleExtensions.length === 0) {
                    return {
                        error: true,
                        message: 'Pro tento systém nejsou k dispozici žádné nástavce'
                    };
                }
    
                // Seřadíme nástavce podle výšky
                const sortedExtensions = compatibleExtensions.sort((a, b) => 
                    parseInt(a['Výška (mm)']) - parseInt(b['Výška (mm)'])
                );
    
                // 1. Pokus: Najít jeden nástavec, který pokryje celou výšku
                const singleExtension = sortedExtensions.find(ext => 
                    parseInt(ext['Výška (mm)']) >= heightData.missingHeight
                );
    
                if (singleExtension) {
                    return {
                        combinations: [{
                            extensions: [singleExtension],
                            totalHeight: parseInt(singleExtension['Výška (mm)']),
                            needsCutting: true,
                            cutAmount: parseInt(singleExtension['Výška (mm)']) - heightData.missingHeight
                        }]
                    };
                }
    
                // 2. Pokus: Najít kombinaci dvou nástavců
                let bestCombination = null;
                let smallestOverage = Infinity;
    
                for (let i = 0; i < sortedExtensions.length; i++) {
                    for (let j = i; j < sortedExtensions.length; j++) {
                        const ext1 = sortedExtensions[i];
                        const ext2 = sortedExtensions[j];
                        
                        const combinedHeight = parseInt(ext1['Výška (mm)']) + parseInt(ext2['Výška (mm)']);
                        const overage = combinedHeight - heightData.missingHeight;
                        
                        if (overage >= 0 && overage < smallestOverage) {
                            smallestOverage = overage;
                            bestCombination = {
                                extensions: [ext1, ext2],
                                totalHeight: combinedHeight,
                                needsCutting: true,
                                cutAmount: overage
                            };
                        }
                    }
                }
    
                if (bestCombination) {
                    return {
                        combinations: [bestCombination]
                    };
                }
    
                // 3. Pokud nic nevyšlo, vrátíme všechny kompatibilní nástavce
                return {
                    combinations: sortedExtensions.map(ext => ({
                        extensions: [ext],
                        totalHeight: parseInt(ext['Výška (mm)']),
                        needsCutting: parseInt(ext['Výška (mm)']) > heightData.missingHeight,
                        cutAmount: Math.max(0, parseInt(ext['Výška (mm)']) - heightData.missingHeight)
                    }))
                };
            }
    
            return {
                error: true,
                message: 'Není potřeba přidávat nástavce'
            };
    
        } catch (error) {
            console.error('Chyba při kalkulaci nástavců:', error);
            return {
                error: true,
                message: 'Nepodařilo se spočítat kombinace nástavců'
            };
        }
    }

    validateHeightData(heightData) {
        if (!heightData) return false;
        
        const requiredFields = ['inflowDepth', 'tankHeight', 'missingHeight', 'tankSystem'];
        const missingFields = requiredFields.filter(field => 
            heightData[field] === undefined || heightData[field] === null
        );

        if (missingFields.length > 0) {
            console.error('Chybějící data výšek:', missingFields);
            return false;
        }

        return true;
    }

    showNoResults(message = 'Pro vybrané parametry nebyly nalezeny žádné nástavce') {
        this.productContainer.innerHTML = `
            <div class="destovka-no-results">
                <div class="destovka-no-results-content">
                    <h3>${message}</h3>
                </div>
            </div>`;
    }

    handleError(message = 'Došlo k neočekávané chybě') {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <div class="destovka-error-content">
                        <h3>Chyba při načítání nástavců</h3>
                        <p>${message}</p>
                        <button class="destovka-button" 
                                onclick="window.destovkaAccessoriesManager = new DestovkaAccessoriesManager()">
                            Zkusit znovu
                        </button>
                    </div>
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
        if (isNaN(requiredDepth) || isNaN(tankDefaultDepth) || isNaN(inflowOffsetFromTop)) {
            throw new Error('Hloubky musí být čísla');
        }
     
        this.tankSystem = tankSystem;
        this.requiredDepth = parseFloat(requiredDepth);
        this.tankDefaultDepth = parseFloat(tankDefaultDepth);
        
        // Přepočítáváme skutečnou výšku s ohledem na offset
        const actualTankDepth = this.tankDefaultDepth;
        this.missingDepth = this.requiredDepth - actualTankDepth;
        
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
            actualTankDepth,
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
            const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/nastavec.json');
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
        const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/filtrace.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.filtraceData = await response.json();
    }
 
    async loadXMLFeed() {
        const response = await fetch('https://eshop.destovka.eu/google.xml');
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
        const inflowDiameter = formData.get('inflowDiameter') ? `DN${formData.get('inflowDiameter')}` : undefined;
        const inflowDepth = parseInt(formData.get('inflowDepth')) || 0;
    
        const filteredProducts = this.filtraceData.filter(product => {
            // Nejprve kontrola základní kompatibility
            const isSystemCompatible = Array.from({length: 13}, (_, i) => i + 1).some(i => {
                const sysKey = `Kompatibilsys${i}`;
                return product[sysKey] === tankData['Systém'] || product[sysKey] === 'nezáleží';
            });
            
            const isDiameterCompatible = 
                product['Průměr nátoku'] === 'nezáleží' || 
                product['Průměr nátoku'] === inflowDiameter;
    
            // Přidáme kontrolu minimální hloubky nátoku
            const minDepth = parseInt(product['Min. hloubka nátoku (mm)']) || 0;
            
            // Filtrační šachta BASIC se zobrazí pouze pokud je hloubka nátoku >= 695mm
            if (product['Kód'] === '963508') {
                return inflowDepth >= 695;
            }
    
            // Pro ostatní produkty kontrolujeme běžnou kompatibilitu
            return isSystemCompatible && isDiameterCompatible && 
                   (product['Min. hloubka nátoku (mm)'] === 'nezáleží' || inflowDepth >= minDepth);
        });
    
        this.logFilteringDiagnostics(tankData, formData, filteredProducts);
        return filteredProducts;
    }
 
    updateDisplay() {
        this.filteredProducts = this.filterProducts();
        
        if (!this.productContainer) return;
    
        if (this.filteredProducts.length === 0) {
            this.showNoResults();
            return;
        }
    
        this.productContainer.innerHTML = '';
        
        // Omezíme počet produktů na 2
        const productsToShow = this.filteredProducts.slice(0, 2);
        
        productsToShow.forEach(product => {
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
        const response = await fetch('https://eshop.destovka.eu/google.xml');
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
/*
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
    */
class DestovkaSiphonManager extends DestovkaBaseProductManager {
    constructor() {
        super(5);
        this.siphonData = [];
        this.init();
    }

    async init() {
        try {
            await Promise.all([
                this.loadSiphonData(),
                this.loadXMLFeed()
            ]);
            
            if (this.shouldSkipStep()) {
                this.handleStepSkip();
            } else {
                this.initProductContainer();
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Chyba při inicializaci SiphonManager:', error);
            this.handleError();
        }
    }

    async loadSiphonData() {
        const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/bezpec_prepad.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        this.siphonData = await response.json();
    }

    shouldSkipStep() {
        const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
        if (!selectedTank) return true;

        const tankData = window.destovkaTankManager?.tanksData.find(
            tank => tank['Kód'] === selectedTank.productCode
        );
        
        if (!tankData) return true;

        // Check if tank has integrated siphon
        if (tankData['Integrovaný bezpečnostní přepad (sifon)'] === 'ANO') {
            return true;
        }

        // Get outflow diameter from form data
        const outflowDiameter = window.destovkaStepManager?.formData.get('outflowDiameter');
        
        // Find any compatible siphon (excluding 'žádný' option)
        const compatibleSiphon = this.siphonData.find(siphon => 
            siphon.Kód !== '0' && 
            (siphon['Průměr výtoku'] === `DN${outflowDiameter}` || 
             siphon['Průměr výtoku'] === 'nezáleží')
        );

        return !compatibleSiphon;
    }

    handleStepSkip() {
        if (window.destovkaStepManager) {
            window.destovkaStepManager.changeStep(6); // Skip to next step
        }
    }

    updateDisplay() {
        if (!this.productContainer) return;
    
        if (this.shouldSkipStep()) {
            this.showNoResults('Bezpečnostní přepad není potřeba - nádrž již obsahuje integrovaný přepad');
            return;
        }
    
        this.productContainer.innerHTML = '';
        
        // Najít vhodný sifon z načtených dat
        const outflowDiameter = window.destovkaStepManager?.formData.get('outflowDiameter');
        const siphon = this.siphonData.find(siphon => 
            siphon.Kód !== '0' && 
            (siphon['Průměr výtoku'] === `DN${outflowDiameter}` || 
             siphon['Průměr výtoku'] === 'nezáleží')
        );
    
        if (siphon) {
            const siphonData = {
                'Produkt': siphon.Produkt,
                'Kód': siphon.Kód,
                'Varianta': siphon['Průměr výtoku']
            };
            
            const feedData = this.getFeedDataForProduct(siphon.Kód);
            const productHtml = this.productGenerator.createProductItem(siphonData, feedData);
            this.productContainer.innerHTML += productHtml;
        }
    
        // Přidáme prázdný produkt
        const emptyProductHtml = this.productGenerator.createEmptyProductItem();
        this.productContainer.innerHTML += emptyProductHtml;
    
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
            'Žádné'
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
            const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/cerpadla.json');
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
            'Ponorné s plovákovým spínačem': 'https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/cerpadlo-s-plovakovym-spinacem.png',
            'Ponorné s automatickým spínačem': 'https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/cerpadlo-s-automatickym-spinacem.png',
            'Systém pro zalévání a splachování': 'https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/jednotka-k-zalevani-a-splachovani.png',
            'Zahradní čerpadlo': "https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/zahradni-cerpadlo.png",
            'Žádné': 'https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/delete.png'
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
        
        this.categoriesContainer.style.display = 'none';
        this.productContainer.style.display = 'flex';

        const existingDescription = this.container.querySelector('.destovka-category-description');
        if (existingDescription) {
            existingDescription.remove();
        }
    
        if (category === 'Žádné') {
            
            const currentItems = window.destovkaCart?.destGetItemsByStep(6) || [];
            currentItems.forEach(item => {
                window.destovkaCart.destRemoveItem(item.productCode);
            });
            
            this.productContainer.innerHTML = this.productGenerator.createEmptyProductItem();
            this.productGenerator.initializeSelection(this.productContainer);
        } else {
            window.destovkaStepManager.selectedCategory = null;
            window.destovkaCart?.destGetItemsByStep(6).forEach(item => {
                window.destovkaCart.destRemoveItem(item.productCode);
            });
            const categoryDescriptions = {
                'Ponorné s plovákovým spínačem': 'Tato čerpadla fungují podle toho, jestli jsou zapojená v zásuvce a jestli mají ne/dostatek vody (to určuje plovák). V případě zapojení a dostatku vody se čerpadlo sepne, a to i v případě, že je zavřený kohout na hadici, proto této skutečnosti věnujte pozornost. Jedná se o nejlevnější typ čerpadel. Tato čerpadla jsou vhodná pro využití především k ručnímu zalévání zahrady. Čerpadla GARDENA navíc mohou získat prodlouženou záruku, pokud do 3 měsíců od jeho zakoupení čerpadlo zaregistrujete na webu gardena.com.',
                'Ponorné s automatickým spínačem': 'Tato čerpadla fungují na principu poklesu tlaku, tedy pokud je otevřen kohoutek nebo sepnut postřikovač, tak se samo zapne a po zavření kohoutku nebo vypnutí postřikovače se samo vypne. Zároveň mají tato čerpadla instalovanou ochranu proti chodu na sucho, pokud by v nádrži došla voda. Tato čerpadla doporučujeme všem, kteří chtějí pohodlné zavlažování zahrady. Varianta čerpadla s plovoucím sáním zajišťuje čerpání nejčistší vodu z vodního sloupce nádrže, a je tedy velmi vhodná pro použití u automatického zavlažování zahrady. Čerpadla GARDENA navíc mohou získat prodlouženou záruku, pokud do 3 měsíců od jeho zakoupení čerpadlo zaregistrujete na webu gardena.com.',
                'Systém pro zalévání a splachování': 'Tato čerpadla a jednotky jsou vhodná pro využití dešťové vody ke splachování WC v domě a k zalévání. Sestava RAINTRONIC funguje na principu dopouštění pitné vody do nádrže – pokud čidlo zjistí, že je nádrž prázdná, dopustí trochu vody, aby čerpadlo mohlo vodu čerpat do domu nebo k zálivce (do domu doporučujeme umístit tlakovou nádobu). Přítok pitné vody je nutné instalovat tak, aby se nedostal do styku s dešťovou vodou. Jednotka WILO RAIN funguje na principu přepínání mezi využitím dešťové či pitné vody uvnitř jednotky. V nádrži se nachází sací hadice s čidlem. Dokud je v nádrži dostatek vody, jednotka čerpá dešťovou vodu a po vyčerpání přepne na odběr vody z řádu nebo studny (na pitnou vodu). Jednotka WILO RAIN obsahuje certifikovaný sifon proti kontaminaci pitné vody. Jednotku RAIN1 doporučujeme pro menší rodinné domy s 2 toaletami, RAIN3 poté pro větší domy. Sestava RAINTRONIC zaujme cenou a jednoduchým systémem, jednotky WILO poté jednoduchou instalací a certifikovaným sifonem (doporučujeme při napojení na vodovodní řád).',
                'Zahradní čerpadlo': 'Zahradní čerpadla jsou vhodným řešením pro čerpání vody z dešťových nádrží pro ruční závlahu i pro využití vody v domě. Pomocí sací hadice umístěné v nádrži je voda čerpána k dalšímu využití. Tím, že čerpadlo není umístěno v nádrži, je umožněna jednoduchá manipulace při přesunu k jiné nádrži a čerpadlo je vždy pod dohledem. Zahradní čerpadlo doporučujeme všem, kteří mají k dispozici více nádrží, ale nechtějí mít v každém čerpací techniku. Čerpadla GARDENA navíc mohou získat prodlouženou záruku, pokud do 3 měsíců od jeho zakoupení čerpadlo zaregistrujete na webu gardena.com.',
                'Žádné': ''
            };
    
            const description = categoryDescriptions[category] || '';
            
            // Nejprve odstraníme existující popis, pokud existuje
            const existingDescription = this.container.querySelector('.destovka-category-description');
            if (existingDescription) {
                existingDescription.remove();
            }
            
            // Vytvoříme popis před kontejnerem produktů
            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'destovka-category-description';
            descriptionElement.innerHTML = `
                <div class="destovka-category-type">
                    <div class="destovka-category-type-title">${category}</div>
                    <p>${description}</p>
                </div>
            `;
            
            // Vložíme popis před kontejner produktů
            this.productContainer.parentNode.insertBefore(descriptionElement, this.productContainer);
            
            // Aktualizujeme obsah kontejneru produktů
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
            backButton.addEventListener('click', () => {
                const description = this.container.querySelector('.destovka-category-description');
                if (description) {
                    description.remove();
                }
                this.showCategories();
            });
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

    
        // Reset containers
        this.categoriesContainer.style.display = 'none';
        this.productContainer.style.display = 'flex';
        this.productContainer.innerHTML = '';
        
        products.forEach(product => {
            const feedData = this.getFeedDataForProduct(product.Kód);
            const productHtml = this.productGenerator.createProductItem(
                {
                    ...product,
                    'Produkt': product.Produkt,
                    'Kód': product.Kód,
                    'Kategorie': product.Kategorie
                }, 
                feedData
            );
            this.productContainer.innerHTML += productHtml;
    
            // Přidáme speciální třídu pro produkty čerpadel a specs
            const productCard = this.productContainer.querySelector(`[data-product-code="${product.Kód}"]`);
            if (productCard) {
                productCard.classList.add('destovka-pump-product');
                const specText = this.formatPumpSpecs(product);
                const titleDiv = productCard.querySelector('.destovka-product-title').parentNode;
                titleDiv.insertAdjacentHTML('afterend', `<div class="destovka-product-specs">${specText}</div>`);
            }
        });
        
        /*
        // Inicializace event listenerů pro výběr produktů
        const productCards = this.productContainer.querySelectorAll('.destovka-product-card');
        productCards.forEach(card => {
            const button = card.querySelector('.destovka-product-select-button');
            if (!button) return;
    
            button.addEventListener('click', () => {
                // Odstranit výběr ze všech karet
                productCards.forEach(otherCard => {
                    otherCard.classList.remove('destovka-product-selected');
                    const otherButton = otherCard.querySelector('.destovka-product-select-button');
                    if (otherButton) {
                        otherButton.textContent = 'Vybrat';
                        otherButton.classList.remove('destovka-selected');
                    }
                });
    
                // Označit vybranou kartu
                card.classList.add('destovka-product-selected');
                button.textContent = 'Vybráno';
                button.classList.add('destovka-selected');
            });
        });
        */
    
        // Přidat tlačítko zpět pokud neexistuje
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

        this.productGenerator.initializeSelection(this.productContainer);
        
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
            const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/prislusenstvi_cerpadla.json');
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

    getSelectedProducts() {
        const selectedCard = this.container.querySelector('.destovka-product-selected');
        if (!selectedCard) return [];
    
        const productCode = selectedCard.dataset.productCode;
        if (!productCode) return [];
    
        return [{
            code: productCode,
            quantity: 1,
            type: 'pump-accessory'
        }];
    }
/*
    addToCart(productCode, quantity = 1) {
        const accessory = this.accessoryData.find(acc => acc.Kód === productCode);
        if (!accessory) return;

        window.destovkaCart.destAddItem(7, productCode, quantity, {
            type: 'pump-accessory',
            name: accessory.Název
        });
    }
        */
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
            const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/hladinoměry.json');
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
            const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/gajgry.json');
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
    
        // Vykreslení jednotlivých typů geigerů
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
    
        // Přidání celkové ceny pod všechny geigery
const totalContainer = document.createElement('div');
totalContainer.className = 'destovka-product-potrubi-total-container';
totalContainer.innerHTML = `
    <div class="destovka-product-potrubi-total">
        Celková cena <span class="destovka-product-potrubi-total-price"></span>
    </div>
`;
this.productContainer.appendChild(totalContainer);

// Nyní když je totalContainer v DOM, můžeme vložit popis před něj
const gaigery_stock_description = document.createElement('div');
gaigery_stock_description.className = 'destovka-in-stock-legenda';
gaigery_stock_description.innerHTML = `
    *Zašedlé varianty produktů nejsou skladem
`;
this.productContainer.insertBefore(gaigery_stock_description, totalContainer);
    
        this.initializeInputHandlers();
    }
    
    updateTotal() {
        const containers = this.productContainer.querySelectorAll('.destovka-product-geigery-card-container');
        let totalSpodni = 0;
        let totalBocni = 0;
    
        containers.forEach(card => {
            const inputs = card.querySelectorAll('.destovka-product-geigery-card-input');
            const geigerType = card.querySelector('.destovka-product-geigery-card-title')?.textContent;
            const isSpodni = geigerType?.includes('Spodní výtok');
            const basePrice = isSpodni ? 219 : 239;
            
            let subtotal = 0;
            inputs.forEach(input => {
                subtotal += parseInt(input.value || 0) * basePrice;
            });
    
            // Aktualizace ceny pro jednotlivý typ - pouze s DPH
            const cardTotal = card.querySelector('.destovka-product-geigery-card-total-price');
            if (cardTotal) {
                cardTotal.textContent = `${subtotal.toLocaleString('cs-CZ')} Kč vč. DPH`;
            }
    
            if (isSpodni) {
                totalSpodni = subtotal;
            } else {
                totalBocni = subtotal;
            }
        });
    
        const totalPriceElement = this.productContainer.querySelector('.destovka-product-potrubi-total-price');
        if (totalPriceElement) {
            const total = totalSpodni + totalBocni;
            const withoutVAT = Math.round(total / 1.21);
            
            totalPriceElement.innerHTML = `
                <span class="destovka-product-potrubi-total-price-without-vat">${withoutVAT.toLocaleString('cs-CZ')} Kč</span> bez DPH<br>
                <span class="destovka-product-potrubi-total-price">${total.toLocaleString('cs-CZ')} Kč</span> vč DPH
            `;
        }
    }

    initializeInputHandlers() {
        const inputs = this.productContainer.querySelectorAll('.destovka-product-geigery-card-input');
        inputs.forEach(input => {
            const decreaseBtn = input.parentElement.querySelector('.destovka-decrease-quantity');
            const increaseBtn = input.parentElement.querySelector('.destovka-increase-quantity');

            if (!input.disabled) {
                decreaseBtn.addEventListener('click', () => {
                    if (input.value > 0) {
                        input.value = parseInt(input.value) - 1;
                        this.updateTotal();
                    }
                });

                increaseBtn.addEventListener('click', () => {
                    input.value = parseInt(input.value) + 1;
                    this.updateTotal();
                });

                input.addEventListener('change', () => {
                    if (input.value < 0) input.value = 0;
                    this.updateTotal();
                });
            }
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
            const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/potrubi.json');
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
    
        // Získáme DN z form dat pro oba průměry
        const inflowDiameter = window.destovkaStepManager?.formData.get('inflowDiameter');
        const outflowDiameter = window.destovkaStepManager?.formData.get('outflowDiameter');
        
        // Vytvoříme pole unikátních průměrů
        const diameters = [...new Set([inflowDiameter, outflowDiameter])];
        
        let allColumnsHTML = '';
        
        // Pro každý unikátní průměr vytvoříme sekci
        diameters.forEach(diameter => {
            const dnSystem = `DN${diameter}`;
            console.log('Generuji sekci pro:', dnSystem);
    
            // Filtrujeme data podle DN
            const filteredData = this.potrubíData.filter(item => item.Systém === dnSystem);
            
            const categories = ['Trubky', 'Kolena', 'Odbočky', 'Ostatní'];
            
            let columnsHTML = '';
            categories.forEach(category => {
                const categoryItems = filteredData.filter(item => item.Sloupec === category);
                
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
    
            if (columnsHTML) {
                allColumnsHTML += `
                    <div class="destovka-potrubi-section">
                        <h2 class="destovka-potrubi-section-title">Potrubí pro ${dnSystem}</h2>
                        <div class="destovka-potrubi-columns-container">
                            ${columnsHTML}
                        </div>
                    </div>
                `;
            }
        });

        
    
        this.productContainer.innerHTML = `
            ${allColumnsHTML}
            <div class="destovka-in-stock-legenda">
                 *Zašedlé varianty produktů nejsou skladem
            </div>
            <div class="destovka-product-potrubi-total-container">
                <div class="destovka-product-potrubi-total">
                    Celková cena <span class="destovka-product-potrubi-total-price">0 Kč vč. DPH</span>
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
            const feedData = this.getFeedDataForProduct(code);
            const price = this.extractPrice(feedData?.price || '0');
            totalPrice += quantity * price;
        });
    
        const totalPriceElement = container.querySelector('.destovka-product-potrubi-total-price');
        if (totalPriceElement) {
            const withoutVAT = Math.round(totalPrice / 1.21);
            totalPriceElement.innerHTML = `
                <span class="destovka-product-potrubi-total-price-without-vat">${withoutVAT.toLocaleString('cs-CZ')} Kč</span> bez DPH<br>
                <span class="destovka-product-potrubi-total-price">${totalPrice.toLocaleString('cs-CZ')} Kč</span> vč DPH
            `;
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

class DestovkaCalculatorVsakObjem {
    constructor(formData) {
        this.volume = parseInt(formData.get('volume'));
        this.soil = formData.get('soil');
        this.station = formData.get('rainfallStation');
        this.rainfallData = null;
        this.resultMap = new Map();
        this.soilCoefficients = {
            'gravel': 0.0001,
            'sand': 0.00005,
            'soil': 0.000001,
            'clay': 0.000001
        };
        this.infiltrationCoefficients = [0.025, 0.05, 0.1, 0.2, 0.3];
    }

    async init() {
        await this.loadRainfallData();
        this.calculateAll();
    }

    async loadRainfallData() {
        const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/pocasi_destovka_mista.json');
        const data = await response.json();
        this.rainfallData = data.find(station => 
            station['Číslo stanice'].split(' - ')[0] === this.station
        );
        if (!this.rainfallData) throw new Error('Stanice nenalezena');
    }

    calculatePlochaStrechy() {
        return (this.volume / 673 / 0.9 / 0.95 / 28 * 365).toFixed(2);
    }

    getVsakCoeff() {
        return this.soilCoefficients[this.soil] || this.soilCoefficients['clay'];
    }

    calculateMinVsak(roofArea, infiltrationCoef) {
        return roofArea * infiltrationCoef;
    }

    calculateVsakOdtok(minVsakArea, soilCoef) {
        return 0.5 * minVsakArea * soilCoef;
    }

    extractMinutes(key) {
        const match = key.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }

    calculateHodnota(rainfallAmount, roofArea, soilCoef, minVsakArea, minutes) {
        return (rainfallAmount / 1000 * roofArea) - 
               (0.5 * soilCoef * minVsakArea * minutes * 60);
    }

    calculateAll() {
        const roofArea = this.calculatePlochaStrechy();
        const soilCoef = this.getVsakCoeff();

        this.infiltrationCoefficients.forEach(infiltrationCoef => {
            const minVsakArea = this.calculateMinVsak(roofArea, infiltrationCoef);
            const vsakOdtok = this.calculateVsakOdtok(minVsakArea, soilCoef);
            
            const hodnoty = Object.entries(this.rainfallData)
                .filter(([key]) => key.includes('Návrhové úhrny srázek'))
                .map(([key, amount]) => {
                    const minutes = this.extractMinutes(key);
                    return this.calculateHodnota(
                        amount, roofArea, soilCoef, minVsakArea, minutes
                    );
                });

            const maxHodnota = this.calculateMaxHodnota(hodnoty);
            const dobaPrazdneni = this.calculateDobaPrazdneni(maxHodnota, vsakOdtok);

            this.resultMap.set(`koef_${infiltrationCoef}`, {
                min_vsak_plocha: minVsakArea,
                vsakovany_odtok: vsakOdtok,
                hodnoty: hodnoty,
                max_hodnota: maxHodnota,
                doba_prazdneni: dobaPrazdneni
            });
        });
    }

    calculateMaxHodnota(hodnoty) {
        return Math.max(...hodnoty);
    }

    calculateDobaPrazdneni(maxHodnota, vsakOdtok) {
        return maxHodnota / vsakOdtok / 3600;
    }

    getSelectedCoefficient() {
        console.group('Analýza koeficientů a doby prázdnění:');
        let selectedData = null;
    
        for (const [key, data] of this.resultMap) {
            console.log(`Koeficient ${key}:`, {
                'min_vsak_plocha (m2)': data.min_vsak_plocha,
                'vsakovany_odtok': data.vsakovany_odtok,
                'max_hodnota': data.max_hodnota,
                'doba_prazdneni (h)': data.doba_prazdneni
            });
    
            if (data.doba_prazdneni < 72 && !selectedData) {
                selectedData = {
                    min_vsak_plocha: data.min_vsak_plocha,
                    max_hodnota: data.max_hodnota
                };
                console.log('✓ První koeficient pod 72h - vybrán');
            }
        }
        
        console.log('Vybraná data:', selectedData);
        console.groupEnd();
        
        return selectedData || {
            min_vsak_plocha: Array.from(this.resultMap.values()).pop().min_vsak_plocha,
            max_hodnota: Array.from(this.resultMap.values()).pop().max_hodnota
        };
    }

    /*
    getSelectedCoefficient() {
        for (const [key, data] of this.resultMap) {
            if (data.doba_prazdneni < 72) {
                return {
                    min_vsak_plocha: data.min_vsak_plocha,
                    max_hodnota: data.max_hodnota
                };
            }
        }
        return null;
    }
        */


}

class VsakovaciCalculator {
    constructor(formData) {
        this.detailCalculator = new DestovkaCalculatorVsakObjem(formData);
        this.matrixData = null;
        this.init();
    }

    async init() {
        await Promise.all([
            this.detailCalculator.init(),
            this.loadMatrixData()
        ]);
    
        const selectedCoef = this.detailCalculator.getSelectedCoefficient();
        
        if (selectedCoef) {
            this.minArea = selectedCoef.min_vsak_plocha;
            this.minVolume = selectedCoef.max_hodnota;
        } else {
            // Pokud není nalezen koeficient pod 72h, vezmeme poslední (největší)
            const lastEntry = Array.from(this.detailCalculator.resultMap.values()).pop();
            this.minArea = lastEntry.min_vsak_plocha;
            this.minVolume = lastEntry.max_hodnota;
        }
    
        // Spočítáme rozložení boxů
        const boxLayout = this.calculateBoxLayout();
        this.boxLayout = boxLayout; // Uložíme si výsledek pro pozdější použití
    
        console.log('Inicializace VsakovaciCalculator dokončena:', {
            minArea: this.minArea,
            minVolume: this.minVolume,
            boxLayout: this.boxLayout
        });
    }

    calculateMinArea() {
        return this.minArea;
    }

    calculateMinVolume() {
        return this.minVolume;
    }


    // tohle není moc funkční -- 
    async loadMatrixData() {
        try {
            const response = await fetch('https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/jsony/matrix.json');
            if (!response.ok) throw new Error('Failed to load matrix data');
            this.matrixData = await response.json();
        } catch (error) {
            console.error('Error loading matrix data:', error);
            throw error;
        }
    }

    calculateRecommendedJimka() {
        const minArea = this.calculateMinArea();
        const minVolume = this.calculateMinVolume() / 1000;
        
        // Výpočet RUR1000 a RUR500
        const countByArea = Math.ceil(minArea / 1.54);
        const countByVolume = Math.ceil(minVolume / 1.0);
        
        let countRUR1000 = Math.max(countByArea, countByVolume);
        let remainingArea = minArea - (countRUR1000 * 1.54);
        let remainingVolume = minVolume - (countRUR1000 * 1.0);
    
        let countRUR500 = Math.max(
            Math.ceil(remainingArea / 1.13),
            Math.ceil(remainingVolume / 0.5)
        );

        // Výpočet nástavců
        const inflowDepth = parseFloat(window.destovkaStepManager?.formData.get('inflowDepth')) || 0;
        const Y = inflowDepth / 200;
        // Zaokrouhlení nahoru i při nejmenším zbytku
        const YRounded = Y % 1 > 0 ? Math.ceil(Y) : Y;
        const totalJimky = countRUR1000 + countRUR500;
        const countNastavce = YRounded * totalJimky;
    
        return {
            rur1000: countRUR1000,
            rur500: countRUR500,
            nastavce: countNastavce,
            odvzduseni: 1,  // Vždy 1
            totalArea: (countRUR1000 * 1.54) + (countRUR500 * 1.13),
            totalVolume: (countRUR1000 * 1.0) + (countRUR500 * 0.5)
        };
    }
    
    calculateRecommendedTunel() {
        const minArea = this.calculateMinArea();
        const minVolume = this.calculateMinVolume(); // odstraníme první dělení 1000
        
        // Výpočet potřebných tunelů podle jednotlivých kritérií
        const countByArea = Math.ceil(minArea / 0.93);  // jeden tunel = 0.93 m²
        const countByVolume = Math.ceil(minVolume / 0.3); // jeden tunel = 0.3 m³
        
        console.log('Debug tunel calculations:', {
            rawMinVolume: minVolume,
            minVolumeInM3: minVolume,
            countByArea: countByArea,
            countByVolume: countByVolume,
        });
        
        // Vezmeme větší číslo z obou výpočtů
        const tunnelCount = Math.max(countByArea, countByVolume);
        
        // Výpočet čel a uzávěrů
        const celUzaverPairs = Math.ceil(tunnelCount / 6);
        
        // Výpočet geotextilie
        const geotextileArea = tunnelCount * 6;
    
        return {
            count: tunnelCount,
            celUzaverPairs: celUzaverPairs,
            geotextileArea: geotextileArea,
            totalArea: tunnelCount * 0.93,
            totalVolume: tunnelCount * 0.3
        };
    }



    calculateBoxLayout() {
        console.group('Výpočet rozložení boxů');
        
        const minArea = this.calculateMinArea();
        const minVolume = this.calculateMinVolume()  // převod na m3
        
        console.log('Požadavky:', {
            minArea: `${minArea.toFixed(2)} m²`,
            minVolume: `${minVolume.toFixed(2)} m³`
        });
    
        // 1. Najdeme koordinace pro plochu
        const areaCoordinates = this.findNextHigherAreaCoordinates(minArea);
        console.log('Nalezené koordinace pro plochu:', areaCoordinates);
    
        // 2. Najdeme koordinace pro objem, začínáme od floor1
        const volumeResult = this.findVolumeCoordinates(minVolume);
        console.log('Nalezené koordinace pro objem:', volumeResult);
    
        // 3. Pokud máme více koordinací pro plochu, vybereme nejefektivnější
        const finalAreaCoord = this.selectMostEfficientCoordinate(areaCoordinates);
        const finalVolumeCoord = this.selectMostEfficientCoordinate(volumeResult.coordinates);
    
        // 4. Vybereme finální variantu podle počtu boxů
        const result = this.selectFinalVariant(finalAreaCoord, finalVolumeCoord, volumeResult.floor);
        
        console.log('Finální výsledek:', result);
        console.groupEnd();
        return result;
    }
    
    findNextHigherAreaCoordinates(minArea) {
        const coordinates = [];
        let minHigherArea = Infinity;
        
        // Procházíme matrix a hledáme nejbližší vyšší hodnotu
        this.matrixData.matrix.forEach(item => {
            if (item.area >= minArea) {
                if (item.area < minHigherArea) {
                    // Našli jsme novou nejmenší vyšší hodnotu
                    coordinates.length = 0;
                    coordinates.push({ x: item.X, y: item.Y, area: item.area });
                    minHigherArea = item.area;
                } else if (item.area === minHigherArea) {
                    // Našli jsme stejnou hodnotu
                    coordinates.push({ x: item.X, y: item.Y, area: item.area });
                }
            }
        });
        
        return coordinates;
    }
    
    findVolumeCoordinates(minVolume) {
        // Začínáme s floor1
        let coordinates = this.findNextHigherVolumeInFloor(minVolume, 'floor_1');
        if (coordinates.length > 0) {
            return { coordinates, floor: 1 };
        }
    
        // Pokud nenajdeme v floor1, zkusíme floor2
        coordinates = this.findNextHigherVolumeInFloor(minVolume, 'floor_2');
        if (coordinates.length > 0) {
            return { coordinates, floor: 2 };
        }
    
        // Nakonec zkusíme floor3
        coordinates = this.findNextHigherVolumeInFloor(minVolume, 'floor_3');
        return { coordinates, floor: 3 };
    }
    
    findNextHigherVolumeInFloor(minVolume, floorKey) {
        const coordinates = [];
        let minHigherVolume = Infinity;
        
        this.matrixData[floorKey].forEach(item => {
            if (item.volume >= minVolume) {
                if (item.volume < minHigherVolume) {
                    coordinates.length = 0;
                    coordinates.push({ x: item.X, y: item.Y, volume: item.volume });
                    minHigherVolume = item.volume;
                } else if (item.volume === minHigherVolume) {
                    coordinates.push({ x: item.X, y: item.Y, volume: item.volume });
                }
            }
        });
        
        return coordinates;
    }
    
    selectMostEfficientCoordinate(coordinates) {
        if (coordinates.length <= 1) {
            return coordinates[0];
        }
    
        // Vypočítáme Z pro každou koordinaci a vybereme nejmenší
        return coordinates.reduce((efficient, current) => {
            const currentZ = current.x + current.y;
            const efficientZ = efficient.x + efficient.y;
            return currentZ < efficientZ ? current : efficient;
        });
    }
    
    selectFinalVariant(areaCoord, volumeCoord, floorLevel) {
        const areaBoxCount = areaCoord.x * areaCoord.y;
        const volumeBoxCount = volumeCoord.x * volumeCoord.y;

        console.log('Porovnání variant:', {
            area: {
                boxes: areaBoxCount,
                totalArea: areaCoord.area,
                dimensions: `${areaCoord.x}x${areaCoord.y}`
            },
            volume: {
                boxes: volumeBoxCount,
                totalVolume: volumeCoord.volume,
                dimensions: `${volumeCoord.x}x${volumeCoord.y}`,
                floor: floorLevel
            }
        });
        
        // Vybereme variantu s větším počtem boxů
        const isVolumeWinner = volumeBoxCount > areaBoxCount;
        const winner = isVolumeWinner ? volumeCoord : areaCoord;
        
        return {
            boxCount: winner.x * winner.y,
            floorCount: isVolumeWinner ? floorLevel : 1,
            coordinates: {
                x: winner.x,
                y: winner.y
            },
            area: winner.area || this.findAreaForCoordinates(winner.x, winner.y),
            volume: winner.volume || this.findVolumeForCoordinates(winner.x, winner.y, floorLevel)
        };
    }
    
    // Pomocné metody pro zjištění area/volume podle koordinátů
    findAreaForCoordinates(x, y) {
        return this.matrixData.matrix.find(item => item.X === x && item.Y === y)?.area || 0;
    }
    
    findVolumeForCoordinates(x, y, floor) {
        const floorKey = `floor_${floor}`;
        return this.matrixData[floorKey].find(item => item.X === x && item.Y === y)?.volume || 0;
    }

    calculateBoxRecommendation() {
        if (!this.boxLayout) {
            console.warn('Box layout není k dispozici');
            return null;
        }
    
        const { coordinates, floorCount } = this.boxLayout;
        const width = coordinates.x;  // X je šířka
        const length = coordinates.y; // Y je délka
        const height = floorCount;    // floor je výška
        
        // Vypočteme skutečné rozměry v metrech
        const realWidth = width * 0.6;
        const realLength = length * 0.6;
        const realHeight = height * 0.4;
    
        // Vypočteme vsakovací plochu a objem
        const actualArea = width * length * 0.36;  // plocha jednoho boxu je 0.36 m2
        const actualVolume = width * length * height * 0.144;  // objem jednoho boxu je 0.144 m3
    
        // Formátování rozměrů pro zobrazení
        const dimensions = {
            width: `${realWidth.toFixed(1)} m`,
            length: `${realLength.toFixed(1)} m`,
            height: `${realHeight.toFixed(1)} m`
        };
    
        const result = {
            layout: {
                width,
                length,
                height
            },
            dimensions,
            totalBoxes: width * length * height,
            actualArea,
            actualVolume
        };
    
        // Uložíme vypočtené hodnoty do instance kalkulátoru
        this.calculatedValues = this.calculateVsakValues();
    
        return result;
    }

    calculateVsakValues() {
        if (!this.boxLayout) {
            console.warn('Box layout není k dispozici');
            return null;
        }
    
        const { coordinates, floorCount } = this.boxLayout;
        const width = coordinates.x;  // X je šířka
        const length = coordinates.y; // Y je délka
        const height = floorCount;    // floor je výška
        
        // Reálné rozměry v metrech
        const realWidth = width * 0.6;
        const realLength = length * 0.6;
        const realHeight = height * 0.4;
    
        // Počet boxů celkem
        const boxesCelkem = width * length * height;
    
        // Výpočet objemu vsaku (m³)
        const vsakVolume = realWidth * realLength * realHeight;
    
        // Výpočet plochy vsaku (m²)
        const vsakPlocha = (realWidth * realLength) + 
                          (0.5 * (realWidth + realLength) * realHeight);
    
        let count1023;
        if (boxesCelkem <= 5) count1023 = 1;
        else if (boxesCelkem <= 10) count1023 = 2;
        else if (boxesCelkem <= 20) count1023 = 3;
        else count1023 = 4;
    
        const count00001042 = boxesCelkem - count1023;
        const count00010012 = 2 * (2 * (width * length) - width - length) * height;
        const pocetmetrugeotextilie = Math.ceil(1.2 * 2 * (
            realWidth * realLength + 
            realWidth * realHeight + 
            realLength * realHeight
        ));
        const countRURRUA = 1;
    
        return {
            boxesCelkem,
            vsakVolume,
            vsakPlocha,
            realDimensions: {
                width: realWidth,
                length: realLength,
                height: realHeight
            },
            productCounts: {
                '1023': count1023,
                '00001042-40': count00001042,
                '00010012': count00010012,
                '100200-2': pocetmetrugeotextilie,
                'RUR-RUA': countRURRUA
            }
        };
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
            'Žádné'
        ];
        this.vsakovaciJimkaCodes = ['RUR500', 'RUR1000', 'RUR-RUE400', 'RUR-RUA'];
        this.vsakovaciTunelCodes = [ '230010','231004', '231005', '100200-2'];
        this.init();
        this.calculator = new VsakovaciCalculator(window.destovkaStepManager?.formData || new Map());
    }

    async init() {
        try {
            await this.loadXMLFeed();
            this.initializeContainers();
            await this.calculator.init();
            this.showCategories();
    
            // Počkáme na vykreslení kategorií a pak je upravíme
            setTimeout(() => {
                const minArea = this.calculator.calculateMinArea();
                const minVolume = this.calculator.calculateMinVolume();
                // Najdeme všechny karty kategorií
                const categoryCards = this.categoriesContainer.querySelectorAll('.destovka-product-card');
                
                categoryCards.forEach(card => {
                    const category = card.dataset.category;
                    let isRecommended = false;
    
                    // Určení, která kategorie má být doporučená
                    if (minArea <= 3 && minVolume <= 3 && category === 'Vsakovací jímka') {
                        isRecommended = true;
                    } else if (minArea > 3 && minArea <= 7.2 && minVolume > 3 && minVolume <= 7.2 && category === 'Vsakovací tunel') {
                        isRecommended = true;
                    } else if ((minArea > 7.2 || minVolume > 7.2) && category === 'Vsakovací box') {
                        isRecommended = true;
                    }
    
                    // Pokud má být karta doporučená, přidáme potřebné třídy a badge
                    if (isRecommended) {
                        card.classList.add('destovka-product-recommended');
                        const badge = document.createElement('div');
                        badge.className = 'destovka-product-recommend-badge';
                        badge.textContent = 'DOPORUČUJEME';
                        card.insertBefore(badge, card.firstChild);
                    }
                });
            }, 100);
    
        } catch (error) {
            console.error('Chyba při inicializaci VsakManager:', error);
            this.handleError();
        }
    }

    async loadXMLFeed() {
        const response = await fetch('https://eshop.destovka.eu/google.xml');
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
            const heading = this.container.querySelector('.destovka-special-text');
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
        console.log('Getting selected products...', this.selectedCategory);
        
        if (this.selectedCategory === 'Žádné') {
            return [];
        }

        const selectedProducts = [];
        
        switch(this.selectedCategory) {
            case 'Vsakovací box':
                // Pro vsakovací boxy
                const boxInputs = this.container.querySelectorAll('.destovka-vsakbox-product-input');
                boxInputs.forEach(input => {
                    const quantity = parseInt(input.value) || 0;
                    if (quantity > 0) {
                        selectedProducts.push({
                            code: input.dataset.code,
                            quantity: quantity,
                            type: 'vsakovací box'
                        });
                    }
                });
                break;

            case 'Vsakovací jímka':
                // Pro vsakovací jímky
                const jimkaInputs = this.container.querySelectorAll('.destovka-product-potrubi-card-input');
                jimkaInputs.forEach(input => {
                    const quantity = parseInt(input.value) || 0;
                    if (quantity > 0) {
                        selectedProducts.push({
                            code: input.dataset.code,
                            quantity: quantity,
                            type: 'vsakovací jímka'
                        });
                    }
                });
                break;

            case 'Vsakovací tunel':
                // Pro vsakovací tunely
                const tunelInputs = this.container.querySelectorAll('.destovka-product-potrubi-card-input');
                tunelInputs.forEach(input => {
                    const quantity = parseInt(input.value) || 0;
                    if (quantity > 0) {
                        selectedProducts.push({
                            code: input.dataset.code,
                            quantity: quantity,
                            type: 'vsakovací tunel'
                        });
                    }
                });
                break;
        }

        console.log('Selected products:', selectedProducts);
        return selectedProducts;
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
            'Vsakovací jímka': 'https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/vsakovaci_jimka.png',
            'Vsakovací tunel': 'https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/vsakovaci_tunel.png',
            'Vsakovací box': 'https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/vsakovaci_box.png',
            'Žádné': 'https://eshop.destovka.eu/user/documents/upload/Dkral_konfigurator/img/delete.png'
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


        const infoBox = this.productGenerator.createVsakInfoBox(
            this.calculator.calculateMinArea(),
            this.calculator.calculateMinVolume()
        );
        this.categoriesContainer.insertAdjacentHTML('beforeend', infoBox);
    }

    handleCategorySelection(category) {
        this.selectedCategory = category;
        

        const existingDescription = this.container.querySelector('.destovka-category-description');
        if (existingDescription) {
            existingDescription.remove();
        }
        // V DestovkaPumpManager
            if (category === 'Žádné') {
                const currentItems = window.destovkaCart?.destGetItemsByStep(6) || [];
                currentItems.forEach(item => {
                    window.destovkaCart.destRemoveItem(item.productCode);
                });
                
                this.productContainer.innerHTML = this.productGenerator.createEmptyProductItem();
                const emptyCard = this.productContainer.querySelector('.destovka-empty-product');
                if (emptyCard) {
                    const button = emptyCard.querySelector('.destovka-product-select-button');
                    if (button) {
                        button.addEventListener('click', () => {
                            emptyCard.classList.add('destovka-product-selected');
                            button.textContent = 'Vybráno';
                            button.classList.add('destovka-selected');
                            window.destovkaStepManager.handleNextStep();
                        });
                    }
                }
            }
        else {
            this.categoriesContainer.style.display = 'none';
            this.productContainer.style.display = 'flex';

            const existingDescription = this.container.querySelector('.destovka-category-description');
            if (existingDescription) {
                existingDescription.remove();
            }
    
            const categoryDescriptions = {
                'Vsakovací jímka': 'Praktické provedení vsakovací jímky na dešťovou nebo odpadní vodu o objemu 500 a 1000 litrů. RUR jsou vsakovací jímky s otevřeným dnem. Vespodu má na stěnách 24 otvorů o průměru 8 cm. V horní části se nachází revizní komín o průměru 400 mm, který je možné nastavit nástavci o výšce 200 mm (maximálně 6 nástavců na 1 jímku). Na stěně vsakovací jímky v horní části jsou také čtyři montážní plochy pro otvory pro připojení svodu dešťové vody, přívodního potrubí odpadní vody nebo pro napojení více vsakovacích jímek do většího systému pomocí potrubí DN100/110, DN125 nebo DN150/160. Jímka se podsypává a obsypává kačírkem frakce 8/16 mm.',
                'Vsakovací tunel': 'Vsakovací tunel GARANTIA se obsypává štěrkem (frakce 8/16 mm) a dá se seskládat do libovolného počtu řad. Každá řada může mít libovolný počet tunelů. Instalace je jednoduchá, jednotlivé kusy se cvakají do sebe a každou řadu nakonec zavíčkujete pomocí čela vsakovacích tunelů dodávaných v páru. Na jednu řadu přijde jeden pár zakončení. Tunely je potřeba přikrýt geotextilií. Doporučujeme tunely podsypávat štěrkem o tloušťce vrstvy 15 cm. Odstupy řad je 200 mm pro pochozí zatížení. Maximální hloubka uložení dna tunelů pod terénem je 2 metry. Příčně na vyskládané řady tunelů vyložte role geotextilie s přesahy 15 cm. Doporučujeme geotextilii přichytit na stěny výkopu, zasypat štěrkem 5 cm nad strop tunelů a následně geotextilii ještě přehodit přes strop tunelu. Další možné varianty uložení naleznete v montážním návodu. Pro možnost revize a případného odsání usazených kalů v tunelu doporučujeme ze stropu každé řady tunelů vyvést potrubí KG DN200 (hrdlem na strop tunelu) a souběžně s terénem ukončit kontrolním závěrem. Doporučujeme ze stropu řad tunelů vyvést i odvětrání pomocí potrubí DN100/110.',
                'Vsakovací box': 'X-BOX jsou plastové bloky určené k zabudování pod zem (podzemní vsakovací objekty). Vedle dříve běžných galerií vyplněných štěrkem se v současnosti ve zvýšené míře budují podzemní vsakovací/retenční objekty. Čtyři bloky X-BOX nahradí 1 m3 štěrku (přibližně 1200 kg). Odvodňovací systém můžete poskládat libovolně. Lze položit i vice řad vedle sebe pro zvětšení vsakovací schopnosti. Jednotlivé bloky se pevně spojí dohromady pomocí spojek bloku. Na povrch lze bez rizika nehody rovnou vstoupit. Dále se do objektu napojí přes modul s kanálkem přívodní potrubí a objekt se obalí do geotextilie a zasype. Doporučujeme objekt instalovat na štěrkové lože (frakce 2-8 mm) o tloušťce min. 15 cm',
                'Žádné': ''
            };
    
            const description = categoryDescriptions[category] || '';
            
            // Vytvoříme popis před kontejnerem produktů
            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'destovka-category-description';
            descriptionElement.innerHTML = `
                <div class="destovka-category-type">
                    <div class="destovka-category-type-title">${category}</div>
                    <p>${description}</p>
                </div>
            `;
            
            // Vložíme popis před kontejner produktů
            this.productContainer.parentNode.insertBefore(descriptionElement, this.productContainer);
            
            // Aktualizujeme obsah kontejneru produktů
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
                // Odstraníme popis kategorie při návratu zpět
                const description = this.container.querySelector('.destovka-category-description');
                if (description) {
                    description.remove();
                }
                this.showCategories();
            });
            this.productContainer.insertAdjacentElement('beforebegin', backButton);
        }
    }

    // Ve třídě DestovkaVsakovaciManager

    calculateActualJimkaValues() {
        const inputs = this.container.querySelectorAll('.destovka-product-potrubi-card-input');
        let rur500Count = 0;
        let rur1000Count = 0;
    
        inputs.forEach(input => {
            const code = input.dataset.code;
            const quantity = parseInt(input.value) || 0;
            
            if (code === 'RUR500') rur500Count = quantity;
            if (code === 'RUR1000') rur1000Count = quantity;
        });
    
        return {
            area: (rur500Count * 1.13) + (rur1000Count * 1.54),
            volume: (rur500Count * 0.5) + (rur1000Count * 1.0)
        };
    }
    
    calculateActualTunnelValues() {
        const inputs = this.container.querySelectorAll('.destovka-product-potrubi-card-input');
        let garantiaCount = 0;
    
        inputs.forEach(input => {
            if (input.dataset.code === '230010') { // kód pro GARANTIA 300
                garantiaCount = parseInt(input.value) || 0;
            }
        });
    
        return {
            area: garantiaCount * 0.93,  // jeden tunel = 0.93 m²
            volume: garantiaCount * 0.3   // jeden tunel = 0.3 m³
        };
    }
    
    calculateActualBoxValues() {
        const lengthInput = this.container.querySelector('[data-dimension="length"]');
        const widthInput = this.container.querySelector('[data-dimension="width"]');
        const heightInput = this.container.querySelector('[data-dimension="height"]');
    
        // Počet boxů v každém směru
        const boxesLength = parseInt(lengthInput?.value) || 0;  // počet boxů na délku
        const boxesWidth = parseInt(widthInput?.value) || 0;    // počet boxů na šířku
        const boxesHeight = parseInt(heightInput?.value) || 0;  // počet boxů na výšku
    
        // Výpočet dle zadané formule
        const area = boxesLength * boxesWidth * 0.36;          // vsakovací plocha v m2
        const volume = boxesLength * boxesWidth * boxesHeight * 0.144;  // vsakovací objem v m3
    
        return {
            area: area,
            volume: volume
        };
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
            productCodes = ['1023', '00001042-40', '00010012', '100200-2', 'RUR-RUA'];
            break;
        case 'Žádné':
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

    /*
    const minArea = this.calculator.calculateMinArea();
    const minVolume = this.calculator.calculateMinVolume();

    const infoBox = this.productGenerator.createVsakInfoBox(minArea, minVolume);
    */

    const minArea = this.calculator.calculateMinArea();
    const minVolume = this.calculator.calculateMinVolume();
    const actualValues = this.selectedCategory === 'Vsakovací jímka' ? 
    this.calculateActualJimkaValues() : 
    this.selectedCategory === 'Vsakovací tunel' ? 
        this.calculateActualTunnelValues() : 
        this.calculateActualBoxValues();


    if (this.selectedCategory === 'Žádné') {
        this.categoriesContainer.style.display = 'none';
        this.productContainer.style.display = 'flex';
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
        this.categoriesContainer.style.display = 'none';
        this.productContainer.style.display = 'flex';

        let recommendationHtml = '';
        if (this.selectedCategory === 'Vsakovací jímka') {
            const recommendation = this.calculator.calculateRecommendedJimka();
            

            // Zadání doporučených hodnot přímo do inputů

            setTimeout(() => {
                const productInputs = this.productContainer.querySelectorAll('.destovka-product-potrubi-card-input');
                productInputs.forEach(input => {
                    const productCode = input.getAttribute('data-code');
                    if (productCode === 'RUR500') {
                        input.value = recommendation.rur500;
                        // Přidáno - vyvolání change eventu
                        const event = new Event('change', {
                            bubbles: true,
                            cancelable: true,
                        });
                        input.dispatchEvent(event);
                    } else if (productCode === 'RUR1000') {
                        input.value = recommendation.rur1000;
                        // Přidáno - vyvolání change eventu
                        const event = new Event('change', {
                            bubbles: true,
                            cancelable: true,
                        });
                        input.dispatchEvent(event);
                    } else if (productCode === 'RUR-RUE400') {
                        input.value = recommendation.nastavce;
                        // Přidáno - vyvolání change eventu
                        const event = new Event('change', {
                            bubbles: true,
                            cancelable: true,
                        });
                        input.dispatchEvent(event);
                    } else if (productCode === 'RUR-RUA') {
                        input.value = recommendation.odvzduseni;
                        // Přidáno - vyvolání change eventu
                        const event = new Event('change', {
                            bubbles: true,
                            cancelable: true,
                        });
                        input.dispatchEvent(event);
                    }
                });
            }, 500);
            recommendationHtml = `
                <div class="destovka-vsak-recommendation">
                    <div class="destovka-vsak-recommendation-title">
                        Doporučené zapojení:
                    </div>
                    <div class="destovka-vsak-recommendation-content">
                        ${recommendation.rur1000 > 0 ? `${recommendation.rur1000}× RUR1000` : ''}
                        ${recommendation.rur1000 > 0 && recommendation.rur500 > 0 ? ' a ' : ''}
                        ${recommendation.rur500 > 0 ? `${recommendation.rur500}× RUR500` : ''}
                        ${recommendation.nastavce > 0 ? `, ${recommendation.nastavce}× nástavec` : ''}
                        ${recommendation.odvzduseni ? ' a 1× odvzdušnění' : ''}
                    </div>
                    <div class="destovka-vsak-details-grid">
                        <div class="destovka-vsak-details-column">
                            <div class="destovka-vsak-details-header">Parametr</div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-label">Vsakovací plocha</div>
                            </div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-label">Vsakovací objem</div>
                            </div>
                        </div>
                        
                        <div class="destovka-vsak-details-column">
                            <div class="destovka-vsak-details-header">Minimální dle vašich parametrů</div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value">${minArea.toFixed(2)} m²</div>
                            </div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value">${minVolume.toFixed(2)} m³</div>
                            </div>
                        </div>

                        <div class="destovka-vsak-details-column">
                            <div class="destovka-vsak-details-header">Doporučená dle doporučeného zapojení</div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value">${recommendation.totalArea.toFixed(2)} m²</div>
                            </div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value">${recommendation.totalVolume.toFixed(2)} m³</div>
                            </div>
                        </div>

                        <div class="destovka-vsak-details-column">
                            <div class="destovka-vsak-details-header">Zvolená dle produktů níže</div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value ${actualValues.area < minArea ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}">
                                    ${actualValues.area.toFixed(2)} m²</div>
                            </div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value ${actualValues.volume < minVolume ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}">
                                    ${actualValues.volume.toFixed(2)} m³</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const actualValues = this.calculateActualJimkaValues();
                const valueElements = this.container.querySelectorAll('.destovka-vsak-details-column:last-child .destovka-vsak-details-value');
                if (valueElements.length >= 2) {
                    valueElements[0].textContent = `${actualValues.area.toFixed(2)} m²`;
                    valueElements[1].textContent = `${actualValues.volume.toFixed(2)} m³`;
                    
                    // Aktualizace tříd pro warning/success
                    valueElements[0].className = `destovka-vsak-details-value ${actualValues.area < minArea ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
                    valueElements[1].className = `destovka-vsak-details-value ${actualValues.volume < minVolume ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
                }
            }, 600);
        } else if (this.selectedCategory === 'Vsakovací tunel') {
            const recommendation = this.calculator.calculateRecommendedTunel();
            console.log(recommendation);
            // vlozeni reccomended kusu do inputu
            setTimeout(() => {
                const productInputs = this.productContainer.querySelectorAll('.destovka-product-potrubi-card-input');
                productInputs.forEach(input => {
                    const productCode = input.getAttribute('data-code');
                    if (productCode === '230010') { // Kód pro tunely
                        input.value = recommendation.count;
                        // Přidáno - vyvolání change eventu
                        const event = new Event('change', {
                            bubbles: true,
                            cancelable: true,
                        });
                        input.dispatchEvent(event);
                    } else if (productCode === '231004') { // Kód pro páry čel
                        input.value = recommendation.celUzaverPairs;
                        // Přidáno - vyvolání change eventu
                        const event = new Event('change', {
                            bubbles: true,
                            cancelable: true,
                        });
                        input.dispatchEvent(event);
                    } else if (productCode === '231005') { // Kód pro uzávěry
                        input.value = recommendation.celUzaverPairs;
                        // Přidáno - vyvolání change eventu
                        const event = new Event('change', {
                            bubbles: true,
                            cancelable: true,
                        });
                        input.dispatchEvent(event);
                    } else if (productCode === '100200-2') { // Kód pro geotextilii
                        input.value = recommendation.geotextileArea;
                        // Přidáno - vyvolání change eventu
                        const event = new Event('change', {
                            bubbles: true,
                            cancelable: true,
                        });
                        input.dispatchEvent(event);
                    }
                });
            }, 500);
            recommendationHtml = `
                <div class="destovka-vsak-recommendation">
                    <div class="destovka-vsak-recommendation-title">
                        Doporučené zapojení:
                    </div>
                    <div class="destovka-vsak-recommendation-content">
                        ${recommendation.count}× GARANTIA 300
                        ${recommendation.celUzaverPairs > 0 ? `, ${recommendation.celUzaverPairs}× pár čel` : ''}
                        ${recommendation.celUzaverPairs > 0 ? `, ${recommendation.celUzaverPairs}× uzávěr` : ''}
                        ${recommendation.geotextileArea > 0 ? `, ${recommendation.geotextileArea} m² geotextilie` : ''}
                    </div>
                    <div class="destovka-vsak-details-grid">
                        <div class="destovka-vsak-details-column">
                            <div class="destovka-vsak-details-header">Parametr</div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-label">Vsakovací plocha</div>
                            </div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-label">Vsakovací objem</div>
                            </div>
                        </div>
                        
                        <div class="destovka-vsak-details-column">
                            <div class="destovka-vsak-details-header">Minimální dle vašich parametrů</div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value">${minArea.toFixed(2)} m²</div>
                            </div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value">${minVolume.toFixed(2)} m³</div>
                            </div>
                        </div>

                        <div class="destovka-vsak-details-column">
                            <div class="destovka-vsak-details-header">Doporučená dle doporučeného zapojení</div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value">${recommendation.totalArea.toFixed(2)} m²</div>
                            </div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value">${recommendation.totalVolume.toFixed(2)} m³</div>
                            </div>
                        </div>

                        <div class="destovka-vsak-details-column">
                            <div class="destovka-vsak-details-header">Zvolená dle produktů níže</div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value ${actualValues.area < minArea ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}">
                                    ${actualValues.area.toFixed(2)} m²</div>
                            </div>
                            <div class="destovka-vsak-details-row">
                                <div class="destovka-vsak-details-value ${actualValues.volume < minVolume ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}">
                                    ${actualValues.volume.toFixed(2)} m³</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            setTimeout(() => {
                const actualValues = this.calculateActualTunnelValues();
                const valueElements = this.container.querySelectorAll('.destovka-vsak-details-column:last-child .destovka-vsak-details-value');
                if (valueElements.length >= 2) {
                    valueElements[0].textContent = `${actualValues.area.toFixed(2)} m²`;
                    valueElements[1].textContent = `${actualValues.volume.toFixed(2)} m³`;
                    
                    valueElements[0].className = `destovka-vsak-details-value ${actualValues.area < minArea ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
                    valueElements[1].className = `destovka-vsak-details-value ${actualValues.volume < minVolume ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
                }
            }, 600);
        }

        //const infoBox = this.productGenerator.createVsakInfoBox(minArea, minVolume);

        if (this.selectedCategory === 'Vsakovací box') {
            const minArea = this.calculator.calculateMinArea();
            const minVolume = this.calculator.calculateMinVolume();
            const boxRecommendation = this.calculator.calculateBoxRecommendation();
            const vsakValues = this.calculator.calculateVsakValues();

            console.group('Debug vsakovacích hodnot');
            console.log('Box recommendation:', boxRecommendation);
            console.log('Vsak values:', vsakValues);
            console.groupEnd();
    
            this.productContainer.innerHTML = 
                //${this.productGenerator.createVsakInfoBox(minArea, minVolume)} tohle bylo uvnitř těch uvozovek, ale nejde uvnitř uvozovek komentovat
                `
                
                ${boxRecommendation ? `
                    <div class="destovka-vsak-recommendation">
            <div class="destovka-vsak-recommendation-title">
                Doporučené rozložení vsakovacích boxů:
            </div>
            <div class="destovka-vsak-recommendation-content">
                ${vsakValues ? `
                    <div class="destovka-vsak-recommendation-products">
                        ${vsakValues.productCounts['1023'] > 0 ? `${vsakValues.productCounts['1023']}× modul s kanálkem` : ''}
                        ${vsakValues.productCounts['00001042-40'] > 0 ? `, ${vsakValues.productCounts['00001042-40']}× modul` : ''}
                        ${vsakValues.productCounts['00010012'] > 0 ? `, ${vsakValues.productCounts['00010012']}× konektor` : ''}
                        ${vsakValues.productCounts['100200-2'] > 0 ? `, ${vsakValues.productCounts['100200-2']} m² geotextilie` : ''}
                        ${vsakValues.productCounts['RUR-RUA'] > 0 ? `, ${vsakValues.productCounts['RUR-RUA']}× odvzdušnění` : ''}
                    </div>` : ''}
            </div>
            <div class="destovka-vsak-details-grid">
                <div class="destovka-vsak-details-column">
                    <div class="destovka-vsak-details-header">Parametr</div>
                    <div class="destovka-vsak-details-row">
                        <div class="destovka-vsak-details-label">Vsakovací plocha</div>
                    </div>
                    <div class="destovka-vsak-details-row">
                        <div class="destovka-vsak-details-label">Vsakovací objem</div>
                    </div>
                </div>
                
                <div class="destovka-vsak-details-column">
                    <div class="destovka-vsak-details-header">Minimální dle vašich parametrů</div>
                    <div class="destovka-vsak-details-row">
                        <div class="destovka-vsak-details-value">${minArea.toFixed(2)} m²</div>
                    </div>
                    <div class="destovka-vsak-details-row">
                        <div class="destovka-vsak-details-value">${minVolume.toFixed(2)} m³</div>
                    </div>
                </div>

                <div class="destovka-vsak-details-column">
                    <div class="destovka-vsak-details-header">Doporučená dle doporučeného zapojení</div>
                    <div class="destovka-vsak-details-row">
                        <div class="destovka-vsak-details-value">${boxRecommendation.actualArea.toFixed(2)} m²</div>
                    </div>
                    <div class="destovka-vsak-details-row">
                        <div class="destovka-vsak-details-value">${boxRecommendation.actualVolume.toFixed(2)} m³</div>
                    </div>
                </div>

                <div class="destovka-vsak-details-column">
                    <div class="destovka-vsak-details-header">Zvolená dle produktů níže</div>
                    <div class="destovka-vsak-details-row">
                        <div class="destovka-vsak-details-value ${actualValues.area < minArea ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}">
                            ${actualValues.area.toFixed(2)} m²</div>
                    </div>
                    <div class="destovka-vsak-details-row">
                        <div class="destovka-vsak-details-value ${actualValues.volume < minVolume ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}">
                            ${actualValues.volume.toFixed(2)} m³</div>
                    </div>
                </div>
            </div>
        </div>
                ` : ''}
                <div class="destovka-vsakbox-container">
                    <div class="destovka-vsakbox-grid-section">
                        ${this.productGenerator.createVsakBoxGrid(
                            boxRecommendation ? boxRecommendation.layout : null
                        )}
                    </div>
                    <div class="destovka-vsakbox-products">
                        ${this.getProductsFromXML().map(product => {
                            const feedData = this.getFeedDataForProduct(product.Kód);
                            return this.productGenerator.createVsakBoxProductItem(product, feedData);
                        }).join('')}
                        <div class="destovka-vsakbox-total">
                            celkem <span class="destovka-vsakbox-total-price">0 Kč</span> vč. DPH
                        </div>
                    </div>
                </div>
            `;
    
            // Timeout pro nastavení hodnot do inputů
            // V updateDisplay ve třídě DestovkaVsakovaciManager
            setTimeout(() => {
                if (vsakValues && vsakValues.productCounts) {
                    const productInputs = this.productContainer.querySelectorAll('.destovka-vsakbox-product-input');
                    console.log('Nalezené inputy:', productInputs);
                    
                    productInputs.forEach(input => {
                        const code = input.dataset.code;
                        console.log('Zpracovávám input s kódem:', code);
                        console.log('Hodnota pro tento kód:', vsakValues.productCounts[code]);
                        
                        if (vsakValues.productCounts[code] !== undefined) {
                            console.log(`Nastavuji hodnotu ${vsakValues.productCounts[code]} pro kód ${code}`);
                            input.value = vsakValues.productCounts[code];
                            
                            const event = new Event('change', {
                                bubbles: true,
                                cancelable: true,
                            });
                            input.dispatchEvent(event);
                        }
                    });
                }
            }, 400);

            setTimeout(() => {
                const dimensions = this.container.querySelectorAll('.destovka-vsakbox-dimension');
                dimensions.forEach(dimension => {
                    const input = dimension.querySelector('.destovka-vsakbox-input');
                    const minusBtn = dimension.querySelector('.destovka-vsakbox-minus');
                    const plusBtn = dimension.querySelector('.destovka-vsakbox-plus');
            
                    const updateDetailValues = () => {
                        console.log('Updating detail values');
                        const actualValues = this.calculateActualBoxValues();
                        const valueElements = this.container.querySelectorAll('.destovka-vsak-details-column:last-child .destovka-vsak-details-value');
                        if (valueElements.length >= 2) {
                            console.log('Updating display elements');
                            valueElements[0].textContent = `${actualValues.area.toFixed(2)} m²`;
                            valueElements[1].textContent = `${actualValues.volume.toFixed(2)} m³`;
                            
                            const minArea = this.calculator.calculateMinArea();
                            const minVolume = this.calculator.calculateMinVolume();
                            
                            valueElements[0].className = `destovka-vsak-details-value ${actualValues.area < minArea ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
                            valueElements[1].className = `destovka-vsak-details-value ${actualValues.volume < minVolume ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
                        }
                    };
            
                    if (minusBtn) {
                        minusBtn.addEventListener('click', updateDetailValues);
                    }
            
                    if (plusBtn) {
                        plusBtn.addEventListener('click', updateDetailValues);
                    }
            
                    input.addEventListener('change', updateDetailValues);
                });
            
                // Přidáme okamžité spuštění pro inicializační hodnoty
                const initialValues = this.calculateActualBoxValues();
                const valueElements = this.container.querySelectorAll('.destovka-vsak-details-column:last-child .destovka-vsak-details-value');
                if (valueElements.length >= 2) {
                    valueElements[0].textContent = `${initialValues.area.toFixed(2)} m²`;
                    valueElements[1].textContent = `${initialValues.volume.toFixed(2)} m³`;
                    
                    const minArea = this.calculator.calculateMinArea();
                    const minVolume = this.calculator.calculateMinVolume();
                    
                    valueElements[0].className = `destovka-vsak-details-value ${initialValues.area < minArea ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
                    valueElements[1].className = `destovka-vsak-details-value ${initialValues.volume < minVolume ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
                }
            }, 500);
    
            // Inicializace ovládacích prvků
            this.initializeVsakBoxGridControls();
            this.initializeVsakBoxCounters();
        
            // Nastavení doporučených hodnot do inputů
            if (boxRecommendation) {
                const lengthInput = this.container.querySelector('[data-dimension="length"]');
                const widthInput = this.container.querySelector('[data-dimension="width"]');
                const heightInput = this.container.querySelector('[data-dimension="height"]');
        
                if (lengthInput) lengthInput.value = boxRecommendation.layout.length;
                if (widthInput) widthInput.value = boxRecommendation.layout.width;
                if (heightInput) heightInput.value = boxRecommendation.layout.height;
        
                // Aktualizace vizualizace
                this.updateGridVisualization();
            }
        }
        else {
            this.productContainer.innerHTML = 
                //${infoBox}  bylo uvnitř uvozovek, ale nejde komentovat uvnitř nich. 
                `
                
                ${recommendationHtml}
                <div class="destovka-products-container">
                    ${this.getProductsFromXML().map(product => {
                        const feedData = this.getFeedDataForProduct(product.Kód);
                        return this.productGenerator.createVsakProductItem(product, feedData);
                    }).join('')}
                </div>
                <div class="destovka-product-potrubi-total-container">
                    <div class="destovka-product-potrubi-total">
                        Celková cena <span class="destovka-product-potrubi-total-price">0 Kč vč. DPH</span>
                    </div>
                </div>
            `;
            this.initializeCounters();
        }
    }

    // Přidat tlačítko zpět pokud neexistuje a není kategorie 'žádné'
    if (!this.container.querySelector('.destovka-back-to-categories') && this.selectedCategory !== 'Žádné') {
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

    // Odstranit tlačítko zpět pokud existuje a kategorie je 'žádné'
    if (this.selectedCategory === 'Žádné') {
        const backButton = this.container.querySelector('.destovka-back-to-categories');
        if (backButton) {
            backButton.remove();
        }
    }
}

    initializeVsakBoxGridControls() {
        const controls = this.container.querySelectorAll('.destovka-vsakbox-counter');
        
        const recalculateAndUpdateInputs = () => {
            // Získáme aktuální hodnoty
            const lengthInput = this.container.querySelector('[data-dimension="length"]');
            const widthInput = this.container.querySelector('[data-dimension="width"]');
            const heightInput = this.container.querySelector('[data-dimension="height"]');
            
            if (!lengthInput || !widthInput || !heightInput) return;
    
            // Aktualizujeme boxLayout v calculatoru
            this.calculator.boxLayout = {
                coordinates: {
                    x: parseInt(widthInput.value),
                    y: parseInt(lengthInput.value)
                },
                floorCount: parseInt(heightInput.value)
            };
    
            // Získáme nové hodnoty
            const vsakValues = this.calculator.calculateVsakValues();
    
            // Nastavíme nové hodnoty do inputů
            setTimeout(() => {
                if (vsakValues && vsakValues.productCounts) {
                    const productInputs = this.productContainer.querySelectorAll('.destovka-vsakbox-product-input');
                    
                    productInputs.forEach(input => {
                        const code = input.dataset.code;
                        if (vsakValues.productCounts[code] !== undefined) {
                            input.value = vsakValues.productCounts[code];
                            
                            const event = new Event('change', {
                                bubbles: true,
                                cancelable: true,
                            });
                            input.dispatchEvent(event);
                        }
                    });
                }
            }, 500);
        };
    
        controls.forEach(control => {
            const input = control.querySelector('.destovka-vsakbox-input');
            const minusBtn = control.querySelector('.destovka-vsakbox-minus');
            const plusBtn = control.querySelector('.destovka-vsakbox-plus');
            
            if (!input || !minusBtn || !plusBtn) return;
    
            const updateGrid = () => {
                const dimension = input.dataset.dimension;
                const value = parseInt(input.value);
                const measureSpan = control.parentElement.querySelector('.destovka-vsakbox-measure');
                
                if (isNaN(value)) return;
    
                if (measureSpan) {
                    if (dimension === 'height') {
                        measureSpan.textContent = `${(value * 0.4).toFixed(1)} m`;
                    } else {
                        measureSpan.textContent = `${(value * 0.6).toFixed(1)} m`;
                    }
                }
                
                this.updateGridVisualization();
                recalculateAndUpdateInputs(); // Zavolá přepočet a aktualizaci inputů
            };
    
            plusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                const maxValue = parseInt(input.max);
                
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
    
            input.addEventListener('change', updateGrid);
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
            const withoutVAT = Math.round(total / 1.21);
            totalElement.innerHTML = `
                <span class="destovka-product-potrubi-total-price-without-vat">${withoutVAT.toLocaleString('cs-CZ')} Kč</span> bez DPH<br>
                <span class="destovka-product-potrubi-total-price">${total.toLocaleString('cs-CZ')} Kč</span> vč DPH
            `;
        }
    }

    initializeCounters() {
        const container = this.productContainer;
        if (!container) return;
    
        const minArea = this.calculator.calculateMinArea();
        const minVolume = this.calculator.calculateMinVolume();
        
        const updateActualValues = () => {
            let actualValues;
            if (this.selectedCategory === 'Vsakovací tunel') {
                actualValues = this.calculateActualTunnelValues();
            } else if (this.selectedCategory === 'Vsakovací jímka') {
                actualValues = this.calculateActualJimkaValues();
            } else if (this.selectedCategory === 'Vsakovací box') {
                actualValues = this.calculateActualBoxValues();
            }
    
            const valueElements = container.querySelectorAll('.destovka-vsak-details-column:last-child .destovka-vsak-details-value');
            if (valueElements.length >= 2) {
                valueElements[0].textContent = `${actualValues.area.toFixed(2)} m²`;
                valueElements[1].textContent = `${actualValues.volume.toFixed(2)} m³`;
                
                valueElements[0].className = `destovka-vsak-details-value ${actualValues.area < minArea ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
                valueElements[1].className = `destovka-vsak-details-value ${actualValues.volume < minVolume ? 'destovka-vsak-details-value-warning' : 'destovka-vsak-details-value-success'}`;
            }
        };
    
        // Pro tunely a jímky
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
                    updateActualValues();
                }
            });
    
            increaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value) || 0;
                input.value = currentValue + 1;
                this.updateTotalPrice();
                updateActualValues();
            });
    
            input.addEventListener('change', () => {
                let value = parseInt(input.value) || 0;
                if (value < 0) value = 0;
                input.value = value;
                this.updateTotalPrice();
                updateActualValues();
            });
        });
    
        // Pro boxy - sledujeme změny v grid controls
        const gridControls = container.querySelector('.destovka-vsakbox-grid-controls');
        if (gridControls) {
            gridControls.querySelectorAll('.destovka-vsakbox-dimension').forEach(dimension => {
                const input = dimension.querySelector('.destovka-vsakbox-input');
                const minusBtn = dimension.querySelector('.destovka-vsakbox-minus');
                const plusBtn = dimension.querySelector('.destovka-vsakbox-plus');
    
                if (!input || !minusBtn || !plusBtn) return;
    
                minusBtn.addEventListener('click', () => {
                    const currentValue = parseInt(input.value) || 0;
                    if (currentValue > parseInt(input.min)) {
                        input.value = currentValue - 1;
                        updateActualValues();
                    }
                });
    
                plusBtn.addEventListener('click', () => {
                    const currentValue = parseInt(input.value) || 0;
                    if (currentValue < parseInt(input.max)) {
                        input.value = currentValue + 1;
                        updateActualValues();
                    }
                });
    
                input.addEventListener('change', () => {
                    let value = parseInt(input.value) || 0;
                    const min = parseInt(input.min);
                    const max = parseInt(input.max);
                    if (value < min) value = min;
                    if (value > max) value = max;
                    input.value = value;
                    updateActualValues();
                });
            });
        }
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
    constructor(type = 'final') {
        this.type = type; // 'final' nebo 'intermediate'
        this.container = document.getElementById(
            this.type === 'intermediate' ? 'destovka-step7-5' : 'destovka-step12'
        );
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
            const response = await fetch('https://eshop.destovka.eu/google.xml');
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
    
        const mainContainer = document.createElement('div');
        mainContainer.className = 'destovka-main-container';
    
        const contentSection = document.createElement('section');
        contentSection.className = 'destovka-main-container-content';
    
        const cartContent = document.createElement('div');
        cartContent.className = 'destovka-cart-content';
        
        const totals = this.calculateTotals();
    
         // Přidáme totaly na začátek
        cartContent.innerHTML += this.cartGenerator.createCartTotalItem(
        totals.totalItems,
        totals.totalPrice
        );

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
        
        //const totals = this.calculateTotals();
        cartContent.innerHTML += this.cartGenerator.createCartTotalItem(
            totals.totalItems,
            totals.totalPrice
        );
    
        contentSection.appendChild(cartContent);
        mainContainer.appendChild(contentSection);
    
        // Přidáme button group
        const buttonGroupContainer = document.createElement('section');
        buttonGroupContainer.className = 'destovka-button-group-container';
        buttonGroupContainer.innerHTML = `
            <div class="destovka-button-group">
                <button class="destovka-button destovka-button-back">
                    Předchozí krok
                </button>
                ${this.type === 'intermediate' ? `
                    <button class="destovka-button destovka-button-next">
                        Pokračovat k dalšímu výběru
                    </button>
                ` : ''}
            </div>
        `;
        mainContainer.appendChild(buttonGroupContainer);
    
        // Necháme původní HTML obsah a jen přidáme mainContainer
        const mainText = this.container.querySelector('.destovka-main-text');
        if (mainText) {
            mainText.after(mainContainer);
        } else {
            this.container.appendChild(mainContainer);
        }
    
        setTimeout(() => {
            const backButton = buttonGroupContainer.querySelector('.destovka-button-back');
            const nextButton = buttonGroupContainer.querySelector('.destovka-button-next');
    
            if (backButton) {
                backButton.addEventListener('click', () => {
                    if (window.destovkaStepManager) {
                        window.destovkaStepManager.handlePreviousStep();
                    }
                });
            }
    
            if (nextButton && this.type === 'intermediate') {
                nextButton.addEventListener('click', () => {
                    if (window.destovkaStepManager) {
                        window.destovkaStepManager.handleNextStep();
                    }
                });
            }
        }, 500);
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

    // V třídě DestovkaCartDisplayManager přidáme nové metody:

    showEmailPopup() {
        const popup = document.createElement('div');
        popup.className = 'destovka-email-popup';
        
        popup.innerHTML = `
        <div class="destovka-email-popup-content">
            <div class="destovka-email-popup-header">
                <h2>Odeslat konfigurátor na e-mail</h2>
                <button class="destovka-email-popup-close">&times;</button>
            </div>
            <div class="destovka-email-popup-body">
                <div class="destovka-form-group">
                    <div class="destovka-input-wrapper">
                        <label class="destovka-label">Jméno a příjmení <span class="destovka-required-field">*</span></label>
                        <input type="text" class="destovka-input" id="destovka-email-name">
                    </div>
                </div>
                <div class="destovka-form-group">
                    <div class="destovka-input-wrapper">
                        <label class="destovka-label">E-mail <span class="destovka-required-field">*</span></label>
                        <input type="email" class="destovka-input" id="destovka-email-address">
                    </div>
                </div>
                <div class="destovka-form-group">
                    <div class="destovka-input-wrapper">
                        <label class="destovka-label">Telefonní číslo</label>
                        <input type="tel" class="destovka-input" id="destovka-email-phone">
                    </div>
                </div>
                <div class="destovka-form-group">
                    <div class="destovka-checkbox-wrapper">
                        <input type="checkbox" class="destovka-checkbox" id="destovka-email-gdpr">
                        <label for="destovka-email-gdpr" class="destovka-checkbox-label">
                            Souhlasím s <a href="https://eshop.destovka.eu/poou/" target="_blank">podmínkami zpracování osobních údajů</a> <span class="destovka-required-field">*</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="destovka-email-popup-footer">
                <button class="destovka-button destovka-button-next" id="destovka-email-send">
                    Odeslat
                </button>
            </div>
        </div>
    `;
    
        document.body.appendChild(popup);
        
        // Event listeners
        const closeBtn = popup.querySelector('.destovka-email-popup-close');
        const sendBtn = popup.querySelector('#destovka-email-send');
        
        closeBtn.addEventListener('click', () => this.closeEmailPopup(popup));
        
        sendBtn.addEventListener('click', async () => {
            const name = document.getElementById('destovka-email-name').value;
            const email = document.getElementById('destovka-email-address').value;
            const phone = document.getElementById('destovka-email-phone').value;
            const gdprConsent = document.getElementById('destovka-email-gdpr').checked;
            
            if (!this.validateEmailForm(name, email, phone, gdprConsent)) {
                return;
            }
            
            sendBtn.disabled = true;
            sendBtn.textContent = 'Odesílám...';
            
            const success = await this.sendEmailData(name, email, phone);
            
            if (success) {
                alert('E-mail byl úspěšně odeslán');
                this.closeEmailPopup(popup);
            } else {
                alert('Při odesílání e-mailu došlo k chybě. Zkuste to prosím znovu.');
                sendBtn.disabled = false;
                sendBtn.textContent = 'Odeslat';
            }
        });
    
        // Zavřít při kliknutí mimo popup
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                this.closeEmailPopup(popup);
            }
        });
    }



async sendEmailData(name, email, phone) {
    try {
        const formData = Object.fromEntries(window.destovkaStepManager?.formData || []);
        
        const concreteMapping = {
            'yes': 'Nevadí mi betonovat',
            'no': 'Nechci betonovat'
        };
 
        const soilMapping = {
            'gravel': 'Štěrk',
            'sand': 'Písek',
            'soil': 'Hlína',
            'clay': 'Jíl'
        };
 
        const cartItems = window.destovkaCart.destGetAllItems();
        
        let shoppingList = '';
        cartItems.forEach((item, index) => {
            shoppingList += `${item.productCode} : ${item.quantity} x`;
            if (index < cartItems.length - 1) {
                shoppingList += ';\n';
            }
        });
 
        const stateUrl = window.urlStateManager.generateStateUrl();
        
        const currentStep = Array.from(document.querySelectorAll('.destovka-step-content'))
                .find(step => step.classList.contains('destovka-active'))?.id;

        const stepNumber = currentStep === 'destovka-step7-5' ? '7-5' : '12';

        // Vytvoření URL parametrů pro produkty
        const productParams = cartItems.map((item, index) => 
            `p${index}=${encodeURIComponent(item.productCode)}&q${index}=${encodeURIComponent(item.quantity)}`
        ).join('&');

        // Sestavení kompletního URL - použijeme původní stateUrl a přidáme produkty a krok
        const fullStateUrl = `${stateUrl}&${productParams}&step=${stepNumber}`;


        const cartData = {
            name,
            email,
            phone,
            items: cartItems,
            shoppingList: shoppingList,
            formStateUrl: stateUrl,
            fullStateUrl: fullStateUrl,  // Přidáno nové URL
            formData: {
                ...formData,
                concrete_translated: concreteMapping[formData.concrete] || formData.concrete,
                soil_translated: soilMapping[formData.soil] || formData.soil
            }
        };
 
        const response = await fetch('https://hook.eu1.make.com/2r69rcg6bcwjz37tmtpjnywnj2kftpx8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        });
 
        if (!response.ok) throw new Error('Network response was not ok');
        return true;
    } catch (error) {
        console.error('Error sending email data:', error);
        return false;
    }
 }

 validateEmailForm(name, email, phone, gdprConsent) {
    // Kontrola povinných polí - pouze jméno a e-mail
    if (!name) {
        alert('Prosím vyplňte jméno');
        return false;
    }
    
    if (!email) {
        alert('Prosím vyplňte e-mail');
        return false;
    }
    
    // Validace formátu e-mailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Prosím zadejte platnou e-mailovou adresu');
        return false;
    }
    
    // Telefonní číslo není povinné, ale pokud je vyplněno, kontrolujeme formát
    if (phone && phone.trim() !== '') {
        const phoneRegex = /^(\+420)?\s*\d{9}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            alert('Prosím zadejte platné telefonní číslo');
            return false;
        }
    }
    
    // Kontrola souhlasu s podmínkami
    if (!gdprConsent) {
        alert('Pro odeslání je nutné souhlasit s podmínkami zpracování osobních údajů');
        return false;
    }
    
    return true;
}

validatePhone(phone) {
    const phoneRegex = /^(\+420)?\s*\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

closeEmailPopup(popup) {
    popup.classList.add('destovka-email-popup-fade-out');
    setTimeout(() => {
        popup.remove();
    }, 300);
}

handleAddToCart() {
    if (confirm('Přidáme Vámi vybrané předměty do košíku a přesuneme Vás k objednávce')) {
        console.group('Přidávání do košíku');
        console.log('Začínám proces přidávání do košíku');
        
        // Vytvořit a zobrazit loader
        const loaderOverlay = document.createElement('div');
        loaderOverlay.className = 'destovka-loader-overlay';
        loaderOverlay.innerHTML = `
            <div class="destovka-spinner"></div>
            <div class="destovka-loader-text">Přidávám položky do košíku...</div>
        `;
        document.body.appendChild(loaderOverlay);
        
        const cartItems = window.destovkaCart?.destGetAllItems() || [];
        console.log(`Celkem položek k přidání: ${cartItems.length}`);
        
        const addItemToCart = (item) => {
            return new Promise((resolve) => {
                console.log(`Přidávám položku: ${item.productCode}, množství: ${item.quantity}`);
                
                // Speciální kontrola jen pro produkty z kroku 2
                if (item.step === 2) {
                    console.log(`Položka ${item.productCode} je z kroku 2, použiju speciální zpracování`);
                    shoptet.cartShared.addToCart({
                        productCode: item.productCode,
                        amount: item.quantity
                    });

                    const checkRequest = () => {
                        const observer = new MutationObserver((mutations) => {
                            const requestFound = mutations.some(mutation => {
                                return Array.from(mutation.addedNodes).some(node => 
                                    node.src?.includes('Cart/GetExtendedOrder')
                                );
                            });

                            if (requestFound) {
                                console.log(`První request pro ${item.productCode} byl úspěšný`);
                                observer.disconnect();
                                resolve(true);
                            }
                        });

                        observer.observe(document, {
                            childList: true,
                            subtree: true
                        });

                        setTimeout(() => {
                            console.log(`Timeout pro ${item.productCode}, zkouším druhý request`);
                            observer.disconnect();
                            shoptet.cartShared.addToCart({
                                productCode: item.productCode,
                                amount: item.quantity,
                                surchargeParameterValueId: {281: 1316}
                            });
                            resolve(false);
                        }, 350);
                    };

                    checkRequest();
                } else {
                    // Pro ostatní produkty jen jednoduché přidání
                    console.log(`Standardní přidání pro položku ${item.productCode}`);
                    shoptet.cartShared.addToCart({
                        productCode: item.productCode,
                        amount: item.quantity
                    });
                    setTimeout(() => {
                        console.log(`Položka ${item.productCode} přidána do košíku`);
                        resolve(true);
                    }, 250);
                }
            });
        };

        // Postupně přidáváme položky
        const processItems = async () => {
            try {
                console.log('Začínám zpracování položek');
                for (const item of cartItems) {
                    await addItemToCart(item);
                }
                console.log('Všechny položky byly zpracovány');

                // Počkáme chvíli na aktualizaci dataLayeru
                console.log('Čekám na aktualizaci dataLayeru...');
                
                setTimeout(() => {
                    try {
                        console.log('Kontroluji úspěšnost přidání položek');
                        
                        // Kontrola košíku pomocí dataLayer
                        const shoptetCart = dataLayer && dataLayer[0] && dataLayer[0].shoptet ? dataLayer[0].shoptet.cart : null;
                        console.log('DataLayer shoptet cart:', shoptetCart);
                        
                        const failedProducts = [];

                        if (shoptetCart && shoptetCart.items) {
                            const cartProductCodes = shoptetCart.items.map(item => item.productCode);
                            console.log('Aktuální kódy produktů v košíku:', cartProductCodes);
                            
                            // Kontrola zda všechny produkty jsou v košíku
                            cartItems.forEach(item => {
                                if (!cartProductCodes.includes(item.productCode)) {
                                    console.warn(`Produkt ${item.productCode} nebyl přidán do košíku`);
                                    failedProducts.push(item.productCode);
                                }
                            });
                        } else {
                            console.warn('DataLayer neobsahuje informace o košíku');
                        }

                        // Přesměrování s případnými failed produkty
                        let redirectUrl = 'https://eshop.destovka.eu/kosik/';
                        if (failedProducts.length > 0) {
                            redirectUrl += `?failed=${failedProducts.join(',')}`;
                        }
                        
                        console.log(`Přesměrování na: ${redirectUrl}`);
                        
                        // Odstranit loader před přesměrováním
                        if (loaderOverlay && loaderOverlay.parentNode) {
                            loaderOverlay.remove();
                        }
                        
                        // Použijeme přímo window.location.href pro přesměrování
                        console.log('Provádím přesměrování...');
                        window.location.href = redirectUrl;
                        
                        // Záložní způsob přesměrování pomocí setTimeout
                        setTimeout(() => {
                            console.log('Záložní přesměrování pomocí timeout');
                            window.location.replace(redirectUrl);
                        }, 500);
                        
                    } catch (error) {
                        console.error('Chyba při kontrole košíku nebo přesměrování:', error);
                        
                        // Odstranit loader v případě chyby
                        if (loaderOverlay && loaderOverlay.parentNode) {
                            loaderOverlay.remove();
                        }
                        
                        // Nouzové přesměrování
                        window.location.href = 'https://eshop.destovka.eu/kosik/';
                    }
                }, 1000);
                
            } catch (error) {
                console.error('Chyba při zpracování položek:', error);
                
                // Odstranit loader v případě chyby
                if (loaderOverlay && loaderOverlay.parentNode) {
                    loaderOverlay.remove();
                }
                
                // Nouzové přesměrování
                window.location.href = 'https://eshop.destovka.eu/kosik/';
            }
        };

        processItems().finally(() => {
            console.log('Proces přidávání do košíku dokončen');
            console.groupEnd();
        });
    }
}

 }

 

 class UrlStateManager {
    constructor() {
        console.group('UrlStateManager Initialization');
        console.log('Constructor started');
        
        const urlParams = new URLSearchParams(window.location.search);
        const hasProducts = this.hasProductsInUrl(urlParams);

        if (hasProducts) {
            console.log('URL contains products - switching to product loading branch');
            setTimeout(() => {
                this.processProductUrl();
            }, 500);
        } else {
            console.log('Standard URL processing');
            setTimeout(() => {
                this.processUrlParameters();
            }, 100);
        }
        console.groupEnd();
    }

    hasProductsInUrl(urlParams) {
        return urlParams.has('p0') && urlParams.has('q0');
    }

    async loadProducts() {
        console.group('Loading Products');
        const urlParams = new URLSearchParams(window.location.search);
        const products = [];
        let i = 0;
        
        // Sbíráme všechny produkty z URL
        while (urlParams.has(`p${i}`) && urlParams.has(`q${i}`)) {
            const code = urlParams.get(`p${i}`);
            const quantity = parseInt(urlParams.get(`q${i}`));
            
            if (code && quantity) {
                products.push({ code, quantity });
                console.log(`Found product: ${code}, quantity: ${quantity}`);
            }
            i++;
        }
    
        // Přidáváme produkty do košíku
        if (products.length > 0) {
            console.log(`Adding ${products.length} products to cart`);
            
            // První produkt je vždy tank (krok 2)
            if (products[0]) {
                window.destovkaCart?.destAddItem(2, products[0].code, products[0].quantity);
                console.log(`Added tank: ${products[0].code} to step 2`);
            }
    
            // Zbytek produktů rozdělíme do dalších kroků (3-11)
            for (let i = 1; i < products.length; i++) {
                const step = i + 2; // Začínáme od kroku 3
                window.destovkaCart?.destAddItem(step, products[i].code, products[i].quantity);
                console.log(`Added product: ${products[i].code} to step ${step}`);
            }
        }
        console.groupEnd();
    }
 
    generateStateUrl() {
        const formData = Object.fromEntries(window.destovkaStepManager?.formData || []);
        const urlParams = new URLSearchParams();
 
        // Add each form field to URL parameters
        Object.entries(formData).forEach(([key, value]) => {
            urlParams.append(key, value);
        });
 
        const baseUrl = window.location.href.split('?')[0];
        return `${baseUrl}?${urlParams.toString()}`;
    }
 
    processUrlParameters() {
        if (!window.destovkaStepManager) {
            console.log('StepManager není inicializován');
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        console.log('URL parametry:', Object.fromEntries(urlParams));
        const formFields = {
            volumeRange: urlParams.get('volume'),  // změna z volumeRange na volume
            concrete: urlParams.get('concrete'),
            soil: urlParams.get('soil'), 
            hsvDepth: urlParams.get('hsvDepth'),
            load: urlParams.get('load'),
            inflowDiameter: urlParams.get('inflowDiameter'),
            outflowDiameter: urlParams.get('outflowDiameter'),
            inflowDepth: urlParams.get('inflowDepth'),
            rainfallStation: urlParams.get('rainfallStation'),
            distance: urlParams.get('distance')
        };
    
        // Dekódování URL encoded hodnot
        Object.keys(formFields).forEach(key => {
            if (formFields[key]) {
                formFields[key] = decodeURIComponent(formFields[key]);
            }
        });
    
        // Speciální úprava pro zatížení
        if (formFields.load === 'pochozí') {
            formFields.load = 'pochozí';
        }
    
        // Pouze pokud máme nějaké validní parametry
        if (Object.values(formFields).some(value => value !== null)) {
            // Počkáme na načtení DOM
            const initForm = () => {
                Object.entries(formFields).forEach(([id, value]) => {
                    if (!value) return;
                    
                    const element = document.getElementById(id);
                    if (!element) return;
    
                    element.value = value;
                    
                    // Speciální handling pro volume range
                    if (id === 'volumeRange' && window.volumeRange) {
                        window.volumeRange.updateValue(value);
                    }
    
                    // Vyvolání change eventu
                    const event = new Event('change', {
                        bubbles: true,
                        cancelable: true
                    });
                    element.dispatchEvent(event);
                });
    
                // Aktualizace form data ve step manageru
                if (window.destovkaStepManager) {
                    Object.entries(formFields).forEach(([key, value]) => {
                        if (value) {
                            window.destovkaStepManager.formData.set(key, value);
                        }
                    });
                }
            };
    
            // Pokud je DOM již načtený, vyplníme hned
            if (document.readyState === 'complete') {
                initForm();
            } else {
                // Jinak počkáme na načtení
                document.addEventListener('DOMContentLoaded', initForm);
            }
        }
    }

    async processProductUrl() {
        console.group('Product URL Processing');
        
        try {
            // Nejdřív načteme data formuláře
            await this.loadFormData();
            console.log('Form data loaded');
            
            // Potom načteme produkty
            await this.loadProducts();
            console.log('Products loaded');
            
            // Nakonec nastavíme krok
            const urlParams = new URLSearchParams(window.location.search);
            const targetStep = urlParams.get('step');
            
            if (targetStep) {
                await this.setStep(targetStep);  // Přidáno await
                console.log(`Step set to ${targetStep}`);
                
                // Explicitní inicializace CartDisplayManager pro krok 7.5
                if (targetStep === '7-5' && !window.destovkaCartDisplayIntermediate) {
                    console.log('Initializing intermediate cart display');
                    window.destovkaCartDisplayIntermediate = new DestovkaCartDisplayManager('intermediate');
                }
            }
        } catch (error) {
            console.error('Error in processProductUrl:', error);
        }
        
        console.groupEnd();
    }
     
     async loadFormData() {
        console.log('Loading form data from URL');
        const urlParams = new URLSearchParams(window.location.search);
        
        const formFields = {
            volumeRange: urlParams.get('volume'),
            concrete: urlParams.get('concrete'),
            soil: urlParams.get('soil'), 
            hsvDepth: urlParams.get('hsvDepth'),
            load: urlParams.get('load'),
            inflowDiameter: urlParams.get('inflowDiameter'),
            outflowDiameter: urlParams.get('outflowDiameter'),
            inflowDepth: urlParams.get('inflowDepth'),
            rainfallStation: urlParams.get('rainfallStation'),
            distance: urlParams.get('distance')
        };
     
        // Dekódování hodnot a nastavení do formData
        Object.entries(formFields).forEach(([key, value]) => {
            if (value) {
                const decodedValue = decodeURIComponent(value);
                // Ukládáme přímo do formData
                if (window.destovkaStepManager?.formData) {
                    window.destovkaStepManager.formData.set(key, decodedValue);
                    console.log(`Setting ${key} = ${decodedValue} to formData`);
                }
            }
        });
     }

     async setStep(targetStep) {
       
        // Převod '7-5' na 7.5 pokud je potřeba
        const step = targetStep === '7-5' ? 7.5 : parseFloat(targetStep);
        
        if (!window.destovkaStepManager) {
            console.warn('StepManager not initialized, cannot set step');
            return;
        }
        
        // Přidáme delší timeout a callback pro inicializaci cart display
        return new Promise((resolve) => {
            setTimeout(() => {
                window.destovkaStepManager.changeStep(step);
                
                // Po změně kroku zkontrolujeme jestli je potřeba inicializovat cart display
                if (step === 7.5 && !window.destovkaCartDisplayIntermediate) {
                    console.log('Initializing intermediate cart display after step change');
                    window.destovkaCartDisplayIntermediate = new DestovkaCartDisplayManager('intermediate');
                }
                
                resolve();
            }, 1000);
        });
        
        
    }
 }



document.addEventListener('DOMContentLoaded', () => {
    console.log("tady se ani neobjevuji")
    window.destovkaTankManager = new DestovkaTankManager();
});







// Initialize the calculator
window.destovkaKonfigCalculator = new DestovkaKonfigCalculator();
window.urlStateManager = new UrlStateManager();
document.querySelector("body").style.overflowX = "hidden";

/*
if(window.location.search && window.location.search !== '') {
    console.log("nenačetl jsem se");
    setTimeout(() => {
        window.urlStateManager = new UrlStateManager();
    }, 100);
}
*/




