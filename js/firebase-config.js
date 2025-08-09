// Firebase Configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456789"
};

// Initialize Firebase
let db;
let storage;

try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    storage = firebase.storage();
    
    console.log('Firebase initialized successfully');
    
    // Enable offline persistence
    db.enablePersistence()
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
            } else if (err.code == 'unimplemented') {
                console.warn('The current browser does not support all of the features required to enable persistence');
            }
        });
        
} catch (error) {
    console.error('Error initializing Firebase:', error);
    
    // Fallback to local storage if Firebase fails
    console.warn('Falling back to local storage for data persistence');
    
    // Mock Firebase interface for development
    db = {
        collection: (name) => ({
            add: async (data) => {
                const properties = JSON.parse(localStorage.getItem('properties') || '[]');
                const newProperty = { ...data, id: Date.now().toString() };
                properties.push(newProperty);
                localStorage.setItem('properties', JSON.stringify(properties));
                return { id: newProperty.id };
            },
            get: async () => ({
                docs: JSON.parse(localStorage.getItem('properties') || '[]').map(prop => ({
                    id: prop.id,
                    data: () => prop
                }))
            }),
            onSnapshot: (callback) => {
                const properties = JSON.parse(localStorage.getItem('properties') || '[]');
                callback({
                    docs: properties.map(prop => ({
                        id: prop.id,
                        data: () => prop
                    }))
                });
            }
        })
    };
    
    storage = {
        ref: () => ({
            child: () => ({
                put: async () => ({ ref: { getDownloadURL: async () => 'placeholder-url' } })
            })
        })
    };
}

// Export for global use
window.db = db;
window.storage = storage;

// Initialize sample data if no properties exist
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const snapshot = await db.collection('properties').get();
        if (snapshot.docs.length === 0) {
            console.log('No properties found, loading sample data...');
            await loadSampleData();
        }
    } catch (error) {
        console.error('Error checking for existing properties:', error);
        await loadSampleData();
    }
});

// Load sample data function
async function loadSampleData() {
    const sampleProperties = [
        {
            title: "Luxury Beachfront Villa",
            type: "Villa",
            price: 2500000,
            area: 3500,
            address: "123 Ocean Drive",
            city: "Miami",
            state: "FL",
            zip: "33139",
            description: "Stunning beachfront luxury villa with panoramic ocean views, infinity pool, and state-of-the-art amenities. This 5-bedroom property features floor-to-ceiling windows, high-end finishes throughout, and direct beach access. Perfect for those seeking the ultimate in coastal living with modern conveniences and breathtaking sunsets every evening.",
            contact: {
                name: "John Smith",
                phone: "+1 (305) 555-1234",
                email: "john.smith@example.com",
                hours: "9AM - 6PM"
            },
            images: [
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            ],
            createdAt: new Date()
        },
        {
            title: "Modern Downtown Apartment",
            type: "Apartment",
            price: 1200000,
            area: 1800,
            address: "456 Main Street",
            city: "New York",
            state: "NY",
            zip: "10001",
            description: "Sophisticated downtown apartment in premium building with stunning skyline views. Features open-concept living with designer finishes, smart home technology, and access to building amenities including gym, rooftop garden, and 24/7 concierge service. Located in the heart of the city with easy access to restaurants, shopping, and transportation.",
            contact: {
                name: "Sarah Johnson",
                phone: "+1 (212) 555-9876",
                email: "sarah.johnson@example.com",
                hours: "10AM - 5PM"
            },
            images: [
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            ],
            createdAt: new Date()
        },
        {
            title: "Charming Suburban House",
            type: "House",
            price: 750000,
            area: 2400,
            address: "789 Maple Lane",
            city: "Austin",
            state: "TX",
            zip: "78701",
            description: "Beautiful family home in quiet suburban neighborhood with excellent schools nearby. Features 4 bedrooms, 3 bathrooms, updated kitchen with granite countertops, hardwood floors throughout, and a large backyard perfect for entertaining. Recently renovated with energy-efficient appliances and modern fixtures while maintaining classic charm.",
            contact: {
                name: "Michael Davis",
                phone: "+1 (512) 555-4567",
                email: "michael.davis@example.com",
                hours: "8AM - 7PM"
            },
            images: [
                "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            ],
            createdAt: new Date()
        }
    ];

    try {
        for (const property of sampleProperties) {
            await db.collection('properties').add(property);
        }
        console.log('Sample data loaded successfully');
    } catch (error) {
        console.error('Error loading sample data:', error);
    }
}
