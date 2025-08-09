// Property Marketplace Application
class PropertyMarketplace {
    constructor() {
        this.properties = [];
        this.filteredProperties = [];
        this.currentProperty = null;
        this.countryData = this.initializeCountryData();
        this.init();
    }

    // Initialize country data with currencies and measurement units
    initializeCountryData() {
        return {
            'US': { currency: 'USD', symbol: '$', name: 'US Dollar', areaUnit: 'sq ft', areaName: 'Square Feet' },
            'CA': { currency: 'CAD', symbol: 'C$', name: 'Canadian Dollar', areaUnit: 'sq ft', areaName: 'Square Feet' },
            'GB': { currency: 'GBP', symbol: '£', name: 'British Pound', areaUnit: 'sq ft', areaName: 'Square Feet' },
            'AU': { currency: 'AUD', symbol: 'A$', name: 'Australian Dollar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'DE': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'FR': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'IT': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'ES': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'JP': { currency: 'JPY', symbol: '¥', name: 'Japanese Yen', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CN': { currency: 'CNY', symbol: '¥', name: 'Chinese Yuan', areaUnit: 'sq m', areaName: 'Square Meters' },
            'IN': { currency: 'INR', symbol: '₹', name: 'Indian Rupee', areaUnit: 'sq ft', areaName: 'Square Feet' },
            'BR': { currency: 'BRL', symbol: 'R$', name: 'Brazilian Real', areaUnit: 'sq m', areaName: 'Square Meters' },
            'MX': { currency: 'MXN', symbol: '$', name: 'Mexican Peso', areaUnit: 'sq m', areaName: 'Square Meters' },
            'AE': { currency: 'AED', symbol: 'د.إ', name: 'UAE Dirham', areaUnit: 'sq ft', areaName: 'Square Feet' },
            'SA': { currency: 'SAR', symbol: '﷼', name: 'Saudi Riyal', areaUnit: 'sq m', areaName: 'Square Meters' },
            'EG': { currency: 'EGP', symbol: '£', name: 'Egyptian Pound', areaUnit: 'sq m', areaName: 'Square Meters' },
            'ZA': { currency: 'ZAR', symbol: 'R', name: 'South African Rand', areaUnit: 'sq m', areaName: 'Square Meters' },
            'NG': { currency: 'NGN', symbol: '₦', name: 'Nigerian Naira', areaUnit: 'sq m', areaName: 'Square Meters' },
            'KE': { currency: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SG': { currency: 'SGD', symbol: 'S$', name: 'Singapore Dollar', areaUnit: 'sq ft', areaName: 'Square Feet' },
            'MY': { currency: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', areaUnit: 'sq ft', areaName: 'Square Feet' },
            'TH': { currency: 'THB', symbol: '฿', name: 'Thai Baht', areaUnit: 'sq m', areaName: 'Square Meters' },
            'ID': { currency: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', areaUnit: 'sq m', areaName: 'Square Meters' },
            'PH': { currency: 'PHP', symbol: '₱', name: 'Philippine Peso', areaUnit: 'sq m', areaName: 'Square Meters' },
            'VN': { currency: 'VND', symbol: '₫', name: 'Vietnamese Dong', areaUnit: 'sq m', areaName: 'Square Meters' },
            'KR': { currency: 'KRW', symbol: '₩', name: 'South Korean Won', areaUnit: 'sq m', areaName: 'Square Meters' },
            'RU': { currency: 'RUB', symbol: '₽', name: 'Russian Ruble', areaUnit: 'sq m', areaName: 'Square Meters' },
            'TR': { currency: 'TRY', symbol: '₺', name: 'Turkish Lira', areaUnit: 'sq m', areaName: 'Square Meters' },
            'PL': { currency: 'PLN', symbol: 'zł', name: 'Polish Zloty', areaUnit: 'sq m', areaName: 'Square Meters' },
            'NL': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'BE': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CH': { currency: 'CHF', symbol: 'CHF', name: 'Swiss Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'AT': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SE': { currency: 'SEK', symbol: 'kr', name: 'Swedish Krona', areaUnit: 'sq m', areaName: 'Square Meters' },
            'NO': { currency: 'NOK', symbol: 'kr', name: 'Norwegian Krone', areaUnit: 'sq m', areaName: 'Square Meters' },
            'DK': { currency: 'DKK', symbol: 'kr', name: 'Danish Krone', areaUnit: 'sq m', areaName: 'Square Meters' },
            'FI': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'IE': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq ft', areaName: 'Square Feet' },
            'PT': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'GR': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CZ': { currency: 'CZK', symbol: 'Kč', name: 'Czech Koruna', areaUnit: 'sq m', areaName: 'Square Meters' },
            'HU': { currency: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', areaUnit: 'sq m', areaName: 'Square Meters' },
            'RO': { currency: 'RON', symbol: 'lei', name: 'Romanian Leu', areaUnit: 'sq m', areaName: 'Square Meters' },
            'BG': { currency: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', areaUnit: 'sq m', areaName: 'Square Meters' },
            'HR': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SI': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SK': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'LT': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'LV': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'EE': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'AR': { currency: 'ARS', symbol: '$', name: 'Argentine Peso', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CL': { currency: 'CLP', symbol: '$', name: 'Chilean Peso', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CO': { currency: 'COP', symbol: '$', name: 'Colombian Peso', areaUnit: 'sq m', areaName: 'Square Meters' },
            'PE': { currency: 'PEN', symbol: 'S/', name: 'Peruvian Sol', areaUnit: 'sq m', areaName: 'Square Meters' },
            'UY': { currency: 'UYU', symbol: '$U', name: 'Uruguayan Peso', areaUnit: 'sq m', areaName: 'Square Meters' },
            'EC': { currency: 'USD', symbol: '$', name: 'US Dollar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'BO': { currency: 'BOB', symbol: 'Bs', name: 'Bolivian Boliviano', areaUnit: 'sq m', areaName: 'Square Meters' },
            'PY': { currency: 'PYG', symbol: '₲', name: 'Paraguayan Guarani', areaUnit: 'sq m', areaName: 'Square Meters' },
            'VE': { currency: 'VES', symbol: 'Bs.S', name: 'Venezuelan Bolívar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'IL': { currency: 'ILS', symbol: '₪', name: 'Israeli Shekel', areaUnit: 'sq m', areaName: 'Square Meters' },
            'JO': { currency: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'LB': { currency: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound', areaUnit: 'sq m', areaName: 'Square Meters' },
            'KW': { currency: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'QA': { currency: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', areaUnit: 'sq m', areaName: 'Square Meters' },
            'BH': { currency: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'OM': { currency: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial', areaUnit: 'sq m', areaName: 'Square Meters' },
            'MA': { currency: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', areaUnit: 'sq m', areaName: 'Square Meters' },
            'TN': { currency: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'DZ': { currency: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'LY': { currency: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SD': { currency: 'SDG', symbol: 'ج.س.', name: 'Sudanese Pound', areaUnit: 'sq m', areaName: 'Square Meters' },
            'ET': { currency: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', areaUnit: 'sq m', areaName: 'Square Meters' },
            'GH': { currency: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CI': { currency: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SN': { currency: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'ML': { currency: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'BF': { currency: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'NE': { currency: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'TD': { currency: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CM': { currency: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CF': { currency: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'GA': { currency: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CG': { currency: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'CD': { currency: 'CDF', symbol: 'FC', name: 'Congolese Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'AO': { currency: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza', areaUnit: 'sq m', areaName: 'Square Meters' },
            'ZM': { currency: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha', areaUnit: 'sq m', areaName: 'Square Meters' },
            'ZW': { currency: 'USD', symbol: '$', name: 'US Dollar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'BW': { currency: 'BWP', symbol: 'P', name: 'Botswana Pula', areaUnit: 'sq m', areaName: 'Square Meters' },
            'NA': { currency: 'NAD', symbol: 'N$', name: 'Namibian Dollar', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SZ': { currency: 'SZL', symbol: 'E', name: 'Swazi Lilangeni', areaUnit: 'sq m', areaName: 'Square Meters' },
            'LS': { currency: 'LSL', symbol: 'L', name: 'Lesotho Loti', areaUnit: 'sq m', areaName: 'Square Meters' },
            'MW': { currency: 'MWK', symbol: 'MK', name: 'Malawian Kwacha', areaUnit: 'sq m', areaName: 'Square Meters' },
            'MZ': { currency: 'MZN', symbol: 'MT', name: 'Mozambican Metical', areaUnit: 'sq m', areaName: 'Square Meters' },
            'MG': { currency: 'MGA', symbol: 'Ar', name: 'Malagasy Ariary', areaUnit: 'sq m', areaName: 'Square Meters' },
            'MU': { currency: 'MUR', symbol: '₨', name: 'Mauritian Rupee', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SC': { currency: 'SCR', symbol: '₨', name: 'Seychellois Rupee', areaUnit: 'sq m', areaName: 'Square Meters' },
            'RE': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'YT': { currency: 'EUR', symbol: '€', name: 'Euro', areaUnit: 'sq m', areaName: 'Square Meters' },
            'KM': { currency: 'KMF', symbol: 'CF', name: 'Comorian Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'DJ': { currency: 'DJF', symbol: 'Fdj', name: 'Djiboutian Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SO': { currency: 'SOS', symbol: 'S', name: 'Somali Shilling', areaUnit: 'sq m', areaName: 'Square Meters' },
            'ER': { currency: 'ERN', symbol: 'Nfk', name: 'Eritrean Nakfa', areaUnit: 'sq m', areaName: 'Square Meters' },
            'UG': { currency: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', areaUnit: 'sq m', areaName: 'Square Meters' },
            'TZ': { currency: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', areaUnit: 'sq m', areaName: 'Square Meters' },
            'RW': { currency: 'RWF', symbol: 'R₣', name: 'Rwandan Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'BI': { currency: 'BIF', symbol: 'FBu', name: 'Burundian Franc', areaUnit: 'sq m', areaName: 'Square Meters' },
            'SS': { currency: 'SSP', symbol: '£', name: 'South Sudanese Pound', areaUnit: 'sq m', areaName: 'Square Meters' }
        };
    }

    // Update currency and units based on selected country
    updateCurrencyAndUnits(countryCode) {
        const countryInfo = this.countryData[countryCode];
        if (!countryInfo) return;

        // Update currency display
        const currencyDisplay = document.getElementById('currency-display');
        const currencySymbol = document.getElementById('currency-symbol');
        const areaUnit = document.getElementById('area-unit');

        if (currencyDisplay) {
            currencyDisplay.value = `${countryInfo.name} (${countryInfo.currency})`;
        }
        
        if (currencySymbol) {
            currencySymbol.textContent = countryInfo.symbol;
        }
        
        if (areaUnit) {
            areaUnit.textContent = countryInfo.areaUnit;
        }

        // Update placeholders
        const priceInput = document.getElementById('property-price');
        const areaInput = document.getElementById('property-area');
        
        if (priceInput) {
            priceInput.placeholder = countryCode === 'JP' ? '50000000' : countryCode === 'IN' ? '5000000' : '500000';
        }
        
        if (areaInput) {
            areaInput.placeholder = countryInfo.areaUnit === 'sq m' ? '200' : '2000';
        }
    }

    // Initialize the application
    async init() {
        this.setupEventListeners();
        await this.loadProperties();
        this.renderProperties();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Form submission
        const propertyForm = document.getElementById('property-form');
        if (propertyForm) {
            propertyForm.addEventListener('submit', (e) => this.handleAddProperty(e));
        }

        // Image upload
        const imageInput = document.getElementById('property-images');
        if (imageInput) {
            imageInput.addEventListener('change', (e) => this.handleImagePreview(e));
        }

        // Search and filter
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterProperties());
        }

        // Drag and drop for images
        this.setupDragAndDrop();
    }

    // Setup drag and drop functionality
    setupDragAndDrop() {
        const dropZone = document.querySelector('.border-dashed');
        if (!dropZone) return;

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-blue-400', 'bg-blue-50');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-400', 'bg-blue-50');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-400', 'bg-blue-50');
            
            const files = Array.from(e.dataTransfer.files);
            const imageInput = document.getElementById('property-images');
            
            // Create a new FileList-like object
            const dt = new DataTransfer();
            files.forEach(file => {
                if (file.type.startsWith('image/')) {
                    dt.items.add(file);
                }
            });
            
            imageInput.files = dt.files;
            this.handleImagePreview({ target: imageInput });
        });
    }

    // Load properties from Firebase/localStorage
    async loadProperties() {
        this.showLoading(true);
        
        try {
            const snapshot = await db.collection('properties').get();
            this.properties = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            this.filteredProperties = [...this.properties];
            console.log(`Loaded ${this.properties.length} properties`);
            
        } catch (error) {
            console.error('Error loading properties:', error);
            this.showNotification('Failed to load properties. Please refresh the page.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // Render properties list
    renderProperties() {
        const container = document.getElementById('property-list');
        const countElement = document.getElementById('property-count');
        
        if (!container) return;

        // Update count
        if (countElement) {
            countElement.textContent = `${this.filteredProperties.length} properties found`;
        }

        // Clear container
        container.innerHTML = '';

        if (this.filteredProperties.length === 0) {
            container.innerHTML = `
                <div class="col-span-full empty-state">
                    <div class="empty-state-icon">🏠</div>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
                    <p class="text-gray-500 mb-6">Try adjusting your search criteria or add a new property.</p>
                    <button onclick="showPage('add-property-page')" class="btn-primary">
                        Add First Property
                    </button>
                </div>
            `;
            return;
        }

        // Render each property
        this.filteredProperties.forEach(property => {
            const card = this.createPropertyCard(property);
            container.appendChild(card);
        });
    }

    // Create property card element
    createPropertyCard(property) {
        const card = document.createElement('div');
        card.className = 'property-card hover-lift';
        card.onclick = () => this.showPropertyDetail(property.id);

        const imageUrl = property.images && property.images.length > 0 
            ? property.images[0] 
            : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

        const typeClass = `type-${property.type.toLowerCase()}`;
        const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(property.price);

        card.innerHTML = `
            <div class="property-card-image">
                <img src="${imageUrl}" alt="${property.title}" loading="lazy">
                <div class="absolute top-3 right-3">
                    <span class="property-type-badge ${typeClass}">${property.type}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">${property.title}</h3>
                <p class="text-gray-600 text-sm mb-3 flex items-center">
                    <span class="mr-1">📍</span>
                    ${property.address}, ${property.city}, ${property.state}
                </p>
                <div class="flex items-center justify-between mb-4">
                    <span class="property-price">${formattedPrice}</span>
                    <span class="text-gray-500 text-sm">${property.area.toLocaleString()} sq ft</span>
                </div>
                <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors font-medium">
                    View Details
                </button>
            </div>
        `;

        return card;
    }

    // Filter properties based on search and filters
    filterProperties() {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const typeFilter = document.getElementById('type-filter')?.value || '';
        const priceFilter = document.getElementById('price-filter')?.value || '';
        const countryFilter = document.getElementById('country-filter')?.value || '';

        this.filteredProperties = this.properties.filter(property => {
            // Search filter
            const matchesSearch = !searchTerm || 
                property.title.toLowerCase().includes(searchTerm) ||
                property.city.toLowerCase().includes(searchTerm) ||
                property.address.toLowerCase().includes(searchTerm) ||
                property.description.toLowerCase().includes(searchTerm);

            // Type filter
            const matchesType = !typeFilter || property.type === typeFilter;

            // Country filter
            const matchesCountry = !countryFilter || (property.country && property.country.code === countryFilter);

            // Price filter
            let matchesPrice = true;
            if (priceFilter) {
                const [min, max] = priceFilter.split('-').map(Number);
                matchesPrice = property.price >= min && property.price <= max;
            }

            return matchesSearch && matchesType && matchesCountry && matchesPrice;
        });

        this.renderProperties();
    }

    // Handle image preview
    handleImagePreview(event) {
        const files = Array.from(event.target.files);
        const previewContainer = document.getElementById('image-preview');
        
        if (!previewContainer) return;

        previewContainer.innerHTML = '';

        if (files.length === 0) {
            previewContainer.classList.add('hidden');
            return;
        }

        previewContainer.classList.remove('hidden');

        files.forEach((file, index) => {
            if (!file.type.startsWith('image/')) {
                this.showNotification(`File "${file.name}" is not an image`, 'error');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                this.showNotification(`Image "${file.name}" is too large (max 10MB)`, 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview ${index + 1}">
                    <button type="button" class="image-remove-btn" onclick="app.removeImage(${index})">
                        ×
                    </button>
                `;
                previewContainer.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });
    }

    // Remove image from preview
    removeImage(index) {
        const imageInput = document.getElementById('property-images');
        const previewContainer = document.getElementById('image-preview');
        
        if (!imageInput || !previewContainer) return;

        const dt = new DataTransfer();
        const files = Array.from(imageInput.files);
        
        files.forEach((file, i) => {
            if (i !== index) {
                dt.items.add(file);
            }
        });
        
        imageInput.files = dt.files;
        this.handleImagePreview({ target: imageInput });
    }

    // Handle add property form submission
    async handleAddProperty(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const imageFiles = document.getElementById('property-images').files;

        // Validate required fields
        const requiredFields = ['property-title', 'property-type', 'property-price', 'property-area', 
                               'property-address', 'property-city', 'property-state', 'property-zip',
                               'property-description', 'contact-name', 'contact-phone', 'contact-email'];
        
        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                this.showNotification(`Please fill in the ${fieldId.replace('property-', '').replace('contact-', '').replace('-', ' ')} field`, 'error');
                field?.focus();
                return;
            }
        }

        this.showLoading(true);

        try {
            // Process images
            const imageUrls = [];
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const reader = new FileReader();
                const imageData = await new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(file);
                });
                imageUrls.push(imageData);
            }

            // Create property object
            const newProperty = {
                title: document.getElementById('property-title').value.trim(),
                type: document.getElementById('property-type').value,
                price: parseInt(document.getElementById('property-price').value),
                area: parseInt(document.getElementById('property-area').value),
                address: document.getElementById('property-address').value.trim(),
                city: document.getElementById('property-city').value.trim(),
                state: document.getElementById('property-state').value.trim(),
                zip: document.getElementById('property-zip').value.trim(),
                description: document.getElementById('property-description').value.trim(),
                contact: {
                    name: document.getElementById('contact-name').value.trim(),
                    phone: document.getElementById('contact-phone').value.trim(),
                    email: document.getElementById('contact-email').value.trim(),
                    hours: document.getElementById('contact-hours').value.trim() || 'Not specified'
                },
                images: imageUrls,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Save to database
            const docRef = await db.collection('properties').add(newProperty);
            newProperty.id = docRef.id;
            
            // Update local state
            this.properties.unshift(newProperty);
            this.filteredProperties = [...this.properties];

            // Reset form
            event.target.reset();
            document.getElementById('image-preview').innerHTML = '';
            document.getElementById('image-preview').classList.add('hidden');

            // Show success and redirect
            this.showNotification('Property added successfully!', 'success');
            setTimeout(() => {
                showPage('listings-page');
                this.renderProperties();
            }, 1500);

        } catch (error) {
            console.error('Error adding property:', error);
            this.showNotification('Failed to add property. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // Show property detail page
    showPropertyDetail(propertyId) {
        const property = this.properties.find(p => p.id === propertyId);
        if (!property) {
            this.showNotification('Property not found', 'error');
            return;
        }

        this.currentProperty = property;

        // Populate detail fields
        document.getElementById('detail-title').textContent = property.title;
        document.getElementById('detail-location').textContent = `${property.address}, ${property.city}, ${property.state} ${property.zip}`;
        
        const imageUrl = property.images && property.images.length > 0 
            ? property.images[0] 
            : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
        
        document.getElementById('detail-main-image').src = imageUrl;
        document.getElementById('detail-main-image').alt = property.title;
        
        document.getElementById('detail-price').textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(property.price);
        
        document.getElementById('detail-area').textContent = `${property.area.toLocaleString()} sq ft`;
        document.getElementById('detail-type').textContent = property.type;
        document.getElementById('detail-description').textContent = property.description;
        
        // Contact information
        document.getElementById('detail-contact-name').textContent = property.contact.name;
        document.getElementById('detail-email').textContent = property.contact.email;
        document.getElementById('detail-email').href = `mailto:${property.contact.email}`;
        document.getElementById('detail-phone').textContent = property.contact.phone;
        document.getElementById('detail-phone').href = `tel:${property.contact.phone.replace(/\D/g, '')}`;
        document.getElementById('detail-hours').textContent = property.contact.hours;

        showPage('property-detail-page');
    }

    // Show loading spinner
    showLoading(show) {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.toggle('hidden', !show);
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                    ×
                </button>
            </div>
        `;

        container.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Page navigation function
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    
    // Show requested page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active-page');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update page title
    const titles = {
        'listings-page': 'Property Listings',
        'add-property-page': 'Add Property',
        'property-detail-page': 'Property Details'
    };
    
    if (titles[pageId]) {
        document.title = `${titles[pageId]} - Property Marketplace`;
    }
}

function updateCurrencyAndUnits() {
    const countrySelect = document.getElementById('country-select');
    if (countrySelect && app) {
        app.updateCurrencyAndUnits(countrySelect.value);
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new PropertyMarketplace();
});

// Global functions for onclick handlers
window.showPage = showPage;
window.app = app;
window.updateCurrencyAndUnits = updateCurrencyAndUnits;
