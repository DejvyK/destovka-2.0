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
                fetch('jsony/nastavec.json'),
                fetch('jsony/poklopy.json')
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
            this.addVolumeWarning(
                `Pro vámi zadané parametry bohužel nebyly nalezeny žádné vyhovující nádrže. 
                Pro širší výběr doporučujeme zvážit parametry v oblasti Velikosti (Objemu), Zatížení, 
                Průměru nátoku a Betonáže. V případě potřeby individuální nabídky nás neváhejte 
                kontaktovat přes e-mail eshop@destovka.eu.`
            );
            return [];
        }
    
        let topTanks = filteredTanks.slice(0, 10);
        topTanks.sort((a, b) => parseInt(a['Objem (l)']) - parseInt(b['Objem (l)']));
        topTanks = topTanks.slice(0, 3);
    
        if (topTanks.length < 3) {
            this.addVolumeWarning(
                `Pro vámi zadané parametry byly nalezeny ${topTanks.length} nádrže se zadaným objemem. 
                Proto nabízíme také nádrže nejbližší velikosti dle ostatních zadaných parametrů. 
                Pro širší výběr doporučujeme zvážit parametry v oblasti Zatížení, Průměru nátoku a Betonáže.`
            );
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

    addVolumeWarning(message) {
        const container = document.getElementById('destovkaTanksContainer');
        if (!container) return;
    
        const warningDiv = document.createElement('div');
        warningDiv.className = 'destovka-volume-warning';
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
    
        // 3. Kontrola hloubky nátoku vs max překrytí zeminou
        const maxCovering = parseFloat(tank['Max. překrytí zeminou (mm)']); 
        if (this.requiredInflowDepth > maxCovering) {
            console.log(`Tank ${tank['Kód']} filtered out: Required depth ${this.requiredInflowDepth} exceeds max covering ${maxCovering}`);
            return false;
        }
    
        // 4. Kontrola defaultInflowDepth
        const defaultInflowDepth = parseFloat(tank['Hloubka nátoku bez nástavce (mm)']);
        if (defaultInflowDepth > this.requiredInflowDepth) {
            console.log(`Tank ${tank['Kód']} filtered out: Default inflow depth ${defaultInflowDepth} is greater than required ${this.requiredInflowDepth}`);
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
        const response = await fetch('jsony/nadrze_sorted.json');
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

        const missingHeight = Math.max(0, inflowDepth - tankHeight - coverHeight);

        return {
            inflowDepth,
            tankHeight,
            coverHeight,
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
            // Pokud máme chybějící výšku, vždy potřebujeme nástavec
            if (heightData.missingHeight > 0) {
                const calculator = new ExtensionCalculator(
                    heightData.tankSystem,
                    heightData.missingHeight,
                    heightData.inflowDepth,
                    this.accessoriesData
                );
    
                const result = await calculator.findExtensionCombinations();
                
                // Pokud najdeme kombinace, vrátíme je
                if (result.combinations && result.combinations.length > 0) {
                    return result;
                }
    
                // Jinak vrátíme všechny kompatibilní nástavce pro tento systém
                const compatibleExtensions = this.getCompatibleExtensions(heightData);
                if (compatibleExtensions.length > 0) {
                    return {
                        combinations: compatibleExtensions.map(ext => ({
                            extensions: [ext],
                            totalHeight: parseInt(ext['Výška (mm)']),
                            needsCutting: parseInt(ext['Výška (mm)']) > heightData.missingHeight,
                            cutAmount: Math.max(0, parseInt(ext['Výška (mm)']) - heightData.missingHeight)
                        }))
                    };
                }
            }
    
            // Pokud nenajdeme žádné nástavce
            return {
                error: true,
                message: 'Pro tento systém nejsou k dispozici žádné vhodné nástavce'
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
        const response = await fetch('jsony/bezpec_prepad.json');
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
            'Žádné': 'img/delete.png'
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

    if (category === 'Žádné') {
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
            window.destovkaStepManager.selectedCategory = null;
            const categoryDescriptions = {
                'Ponorné s plovákovým spínačem': 'Tato čerpadla fungují podle toho, jestli jsou zapojená v zásuvce a jestli mají ne/dostatek vody (to určuje plovák). V případě zapojení a dostatku vody se čerpadlo sepne, a to i v případě, že je zavřený kohout na hadici, proto této skutečnosti věnujte pozornost. Jedná se o nejlevnější typ čerpadel. Tato čerpadla jsou vhodná pro využití především k ručnímu zalévání zahrady. Čerpadla GARDENA navíc mohou získat prodlouženou záruku, pokud do 3 měsíců od jeho zakoupení čerpadlo zaregistrujete na webu gardena.com.',
                'Ponorné s automatickým spínačem': 'Tato čerpadla fungují na principu poklesu tlaku, tedy pokud je otevřen kohoutek nebo sepnut postřikovač, tak se samo zapne a po zavření kohoutku nebo vypnutí postřikovače se samo vypne. Zároveň mají tato čerpadla instalovanou ochranu proti chodu na sucho, pokud by v nádrži došla voda. Tato čerpadla doporučujeme všem, kteří chtějí pohodlné zavlažování zahrady. Varianta čerpadla s plovoucím sáním zajišťuje čerpání nejčistší vodu z vodního sloupce nádrže, a je tedy velmi vhodná pro použití u automatického zavlažování zahrady. Čerpadla GARDENA navíc mohou získat prodlouženou záruku, pokud do 3 měsíců od jeho zakoupení čerpadlo zaregistrujete na webu gardena.com.',
                'Systém pro zalévání a splachování': 'Tato čerpadla a jednotky jsou vhodná pro využití dešťové vody ke splachování WC v domě a k zalévání. Sestava RAINTRONIC funguje na principu dopouštění pitné vody do nádrže – pokud čidlo zjistí, že je nádrž prázdná, dopustí trochu vody, aby čerpadlo mohlo vodu čerpat do domu nebo k zálivce (do domu doporučujeme umístit tlakovou nádobu). Přítok pitné vody je nutné instalovat tak, aby se nedostal do styku s dešťovou vodou. Jednotka WILO RAIN funguje na principu přepínání mezi využitím dešťové či pitné vody uvnitř jednotky. V nádrži se nachází sací hadice s čidlem. Dokud je v nádrži dostatek vody, jednotka čerpá dešťovou vodu a po vyčerpání přepne na odběr vody z řádu nebo studny (na pitnou vodu). Jednotka WILO RAIN obsahuje certifikovaný sifon proti kontaminaci pitné vody. Jednotku RAIN1 doporučujeme pro menší rodinné domy s 2 toaletami, RAIN3 poté pro větší domy. Sestava RAINTRONIC zaujme cenou a jednoduchým systémem, jednotky WILO poté jednoduchou instalací a certifikovaným sifonem (doporučujeme při napojení na vodovodní řád).',
                'Zahradní čerpadlo': 'Čerpadla GARDENA navíc mohou získat prodlouženou záruku, pokud do 3 měsíců od jeho zakoupení čerpadlo zaregistrujete na webu gardena.com.'
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
    
            // Přidáme specs po vytvoření karty
            const productCard = this.productContainer.querySelector(`[data-product-code="${product.Kód}"]`);
            if (productCard) {
                const specText = this.formatPumpSpecs(product);
                const titleDiv = productCard.querySelector('.destovka-product-title').parentNode;
                titleDiv.insertAdjacentHTML('afterend', `<div class="destovka-product-specs">${specText}</div>`);
            }
        });
    
        // Inicializace event listenerů
        this.productGenerator.initializeSelection(this.productContainer);
    
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
                Celková cena: <span class="destovka-product-potrubi-total-price"></span>
            </div>
        `;
        this.productContainer.appendChild(totalContainer);
    
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
        const response = await fetch('jsony/pocasi_destovka_mista.json');
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
            const response = await fetch('jsony/matrix.json');
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
        const minVolume = this.calculateMinVolume() / 1000;
        
        const countByArea = Math.ceil(minArea / 0.93);
        const countByVolume = Math.ceil(minVolume / 0.3);
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
        const minVolume = this.calculateMinVolume() / 1000; // převod na m3
        
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
    
        return {
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
        this.vsakovaciTunelCodes = ['231004', '230010', '231005', '100200-2'];
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
            'Žádné': 'img/delete.png'
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
        
        if (category === 'Žádné') {
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
    
        // Vypočítáme minimální hodnoty
        const minArea = this.calculator.calculateMinArea();
        const minVolume = this.calculator.calculateMinVolume();
        
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
                                    console.log('Kontrola produktu s kódem:', productCode);

                                    if (productCode === 'RUR500') {
                                        input.value = recommendation.rur500;
                                    } else if (productCode === 'RUR1000') {
                                        input.value = recommendation.rur1000;
                                    } else if (productCode === 'RUR-RUE400') {
                                        input.value = recommendation.nastavce;
                                    } else if (productCode === 'RUR-RUA') {
                                        input.value = recommendation.odvzduseni;
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
                        <div class="destovka-vsak-recommendation-details">
                            Toto zapojení poskytne:
                            <div class="destovka-vsak-recommendation-values">
                                <div>Vsakovací plocha: ${recommendation.totalArea.toFixed(2)} m²</div>
                                <div>Vsakovací objem: ${recommendation.totalVolume.toFixed(2)} m³</div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (this.selectedCategory === 'Vsakovací tunel') {
                const recommendation = this.calculator.calculateRecommendedTunel();
                // vlozeni reccomended kusu do inputu
                setTimeout(() => {
                    const productInputs = this.productContainer.querySelectorAll('.destovka-product-potrubi-card-input');
                    productInputs.forEach(input => {
                        const productCode = input.getAttribute('data-code');
                        if (productCode === '231004') { // Kód pro tunely
                            input.value = recommendation.count;
                        } else if (productCode === '230010') { // Kód pro páry čel
                            input.value = recommendation.celUzaverPairs;
                        } else if (productCode === '231005') { // Kód pro uzávěry
                            input.value = recommendation.celUzaverPairs; // Stejná hodnota jako páry čel
                        } else if (productCode === '100200-2') { // Kód pro geotextilii
                            input.value = recommendation.geotextileArea;
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
                        <div class="destovka-vsak-recommendation-details">
                            Toto zapojení poskytne:
                            <div class="destovka-vsak-recommendation-values">
                                <div>Vsakovací plocha: ${recommendation.totalArea.toFixed(2)} m²</div>
                                <div>Vsakovací objem: ${recommendation.totalVolume.toFixed(2)} m³</div>
                            </div>
                        </div>
                    </div>
                `;
            }
    
            const infoBox = this.productGenerator.createVsakInfoBox(minArea, minVolume);
    
            if (this.selectedCategory === 'Vsakovací box') {
                const minArea = this.calculator.calculateMinArea();
                const minVolume = this.calculator.calculateMinVolume();
                const boxRecommendation = this.calculator.calculateBoxRecommendation();
            
                this.productContainer.innerHTML = `
                    ${this.productGenerator.createVsakInfoBox(minArea, minVolume)}
                    ${boxRecommendation ? `
                        <div class="destovka-vsak-recommendation">
                            <div class="destovka-vsak-recommendation-title">
                                Doporučené rozložení vsakovacích boxů:
                            </div>
                            <div class="destovka-vsak-recommendation-content">
                                ${boxRecommendation.layout.width}× ${boxRecommendation.layout.length}× ${boxRecommendation.layout.height} 
                                (${boxRecommendation.totalBoxes} ks)
                            </div>
                            <div class="destovka-vsak-recommendation-details">
                                Rozměry systému:
                                <div class="destovka-vsak-recommendation-values">
                                    <div>Šířka: ${boxRecommendation.dimensions.width}</div>
                                    <div>Délka: ${boxRecommendation.dimensions.length}</div>
                                    <div>Výška: ${boxRecommendation.dimensions.height}</div>
                                </div>
                                <div class="destovka-vsak-recommendation-values">
                                    <div>Vsakovací plocha: ${boxRecommendation.actualArea.toFixed(2)} m²</div>
                                    <div>Vsakovací objem: ${boxRecommendation.actualVolume.toFixed(2)} m³</div>
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
                this.productContainer.innerHTML = `
                    ${infoBox}
                    ${recommendationHtml}
                    <div class="destovka-products-container">
                        ${this.getProductsFromXML().map(product => {
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
    
        const mainContainer = document.createElement('div');
        mainContainer.className = 'destovka-main-container';
    
        const contentSection = document.createElement('section');
        contentSection.className = 'destovka-main-container-content';
    
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
                <button class="destovka-button destovka-button-next">
                    Pokračovat  
                </button>
            </div>
        `;
        mainContainer.appendChild(buttonGroupContainer);
    
        this.container.innerHTML = `
            <div class="destovka-main-text">
                <h1>Konečný seznam vybraných položek</h1>
                <p>GRATULUJEME, VÁŠ VÝBĚR JE PŘIPRAVEN!
                    Právě jste sestavili sadu nádrže a příslušenství, kterou si můžete prohlédnout a
                    zkontrolovat níže, případně ji vložit přímo do košíku nebo si ji nechat zaslat na e-mail.
                    Úpravy výběru můžete provádět nyní nebo i po přidání do košíku a porovnat tak
                    různé varianty. Kompletní výběr doporučujeme odeslat na vás e-mail pro možnost
                    vrácení se do průvodce. Máte nějaké dotazy? Neváhejte nám výběr přeposlat
                    společně s dotazem a my se vám ozveme! U vybrané nádrže doporučujeme detailně
                    prostudovat montážní návod, který naleznete na stránce produktu v kartě
                    „Související soubory".</p>
            </div>
        `;
        this.container.appendChild(mainContainer);

        setTimeout(() => {
        const backButton = buttonGroupContainer.querySelector('.destovka-button-back');
    if (backButton) {
        backButton.addEventListener('click', () => {
            if (window.destovkaStepManager) {
                window.destovkaStepManager.handlePreviousStep();
            }
        });
    }

 },500);





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





