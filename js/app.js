// Property Marketplace Application
class PropertyMarketplace {
    constructor() {
        this.properties = [];
        this.filteredProperties = [];
        this.currentProperty = null;
        this.init();
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

        this.filteredProperties = this.properties.filter(property => {
            // Search filter
            const matchesSearch = !searchTerm || 
                property.title.toLowerCase().includes(searchTerm) ||
                property.city.toLowerCase().includes(searchTerm) ||
                property.address.toLowerCase().includes(searchTerm) ||
                property.description.toLowerCase().includes(searchTerm);

            // Type filter
            const matchesType = !typeFilter || property.type === typeFilter;

            // Price filter
            let matchesPrice = true;
            if (priceFilter) {
                const [min, max] = priceFilter.split('-').map(Number);
                matchesPrice = property.price >= min && property.price <= max;
            }

            return matchesSearch && matchesType && matchesPrice;
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

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new PropertyMarketplace();
});

// Global functions for onclick handlers
window.showPage = showPage;
window.app = app;
