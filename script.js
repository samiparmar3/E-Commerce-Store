/* ==========================================================================
   PRODUCT MODEL CLASS DEFINITION
   ========================================================================== */

// javascript class (OOP Concept)
// class ek structure design karne ka tareeka hai jisme dynamic templates banaye jaate hain.
// Is class se hum standard system variables ke basis par naye dynamic items construct kar sakte hain.
export class Product {
    // Constructor method
    // Constructor automatically call hota hai jab hum 'new Product()' use karte hain.
    // Ye inputs ko object properties ke roop me setup karta hai.
    constructor(id, name, price, category, image, description) {
        this.id = id;
        this.name = name;
        this.price = parseFloat(price); // String se pure numbers generate karne ke liye parseFloat() use hota hai.
        this.category = category;
        this.image = image;
        this.description = description;
    }
}

/* ==========================================================================
   SHOPPING CART SYSTEM (OOP CLASS)
   ========================================================================== */

// class Cart:
// Ye class cart array ka dynamic structure manage karti hai.
// Cart elements me updates karna, delete, subtotal values aur values load/save triggers isi array handle hote hain.
export class Cart {
    constructor() {
        // Arrays aur Objects ka use:
        // Cart array jisme dynamic products unki dynamic quantities ke sath safe rehte hain.
        this.items = []; 
        this.loadFromLocalStorage(); // Data backup fetch karne ke liye local initialization flow.
    }

    // Cart.addItem() method
    // Parameters: product (Product Class dynamic Object instance)
    // Dynamic Product records cart system array me insert karne ka kaam karta hai.
    // returns: void (Kuch return nahi karta)
    addItem(product) {
        // find()
        // find() array ka native search loop method hai.
        // Ye di hui callback function check condition ke bad matching element return karta hai.
        // matching element milne par use direct target object ke roop me nikalta hai, fail hone par undefined output deta hai.
        // Is project me product checking flow track karne ke liye iska use kiya gaya hai.
        // Input: array check callback. Output: Single matching object reference.
        // Agar find() remove ho jaye, toh array me duplicate objects multiple quantities ke bina generate hone lagenge.
        const existingItem = this.items.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            // push()
            // push() array native method hai jo elements array ke dynamic tail (end) par input insert karta hai.
            // parent: Array. returns: updated array length calculation.
            // Problem solved: Cart storage arrays me new elements input karna dynamic speed se feasible ho jata hai.
            // Agar remove ho jaye, toh cart system items update hi nahi kar payega.
            this.items.push({ product, quantity: 1 });
        }
        this.saveToLocalStorage();
    }

    // Cart.removeItem() method
    // Parameters: productId (Number)
    // Dynamic products matching id arrays ke dynamic checks par block filter karke remove karta hai.
    removeItem(productId) {
        // filter()
        // filter() array native method hai jo array ke elements par check condition parse karta hai.
        // Jo conditions validation criteria true return karti hain, unka new custom array output deta hai.
        // parent: Array. returns: Filtered new structural array.
        // Is project me product deletion triggers execute karne ke liye use kiya gaya hai.
        // Input: callback check conditions. Output: pure arrays list.
        // Agar filter() hataya jaye, toh cart se delete tasks completely crash ho jayenge.
        this.items = this.items.filter(item => item.product.id !== productId);
        this.saveToLocalStorage();
    }

    // Cart.increaseQuantity() method
    // Parameters: productId (Number)
    // Target system quantity calculation dynamically plus (increments) check run karta hai.
    increaseQuantity(productId) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity++;
            this.saveToLocalStorage();
        }
    }

    // Cart.decreaseQuantity() method
    // Parameters: productId (Number)
    // Target system quantity subtraction loop triggers execute karta hai. Quantities 0 pahuchne par use automatically array se pop (delete) karta hai.
    decreaseQuantity(productId) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity--;
            if (item.quantity <= 0) {
                // splice() aur index optimization validations ke options check block
                // splice() dynamic levels par indexes deletion execute karne ka secondary method hai.
                // Par dynamic structures me clear state checks ke liye clean functional logic (filter) clear choice hoti hai.
                this.removeItem(productId);
            } else {
                this.saveToLocalStorage();
            }
        }
    }

    // Cart.calculateTotal() method
    // Dynamic subtotals dynamic mathematical aggregate calculation returns deta hai.
    // returns: overall numeric subtotal representation.
    calculateTotal() {
        // reduce()
        // reduce() array native accumulator flow calculation method hai.
        // Ye arrays value set lists parse karke complete single numeric result (totals output) compile karta hai.
        // parent: Array. returns: Final calculated numeric state computation.
        // Is project me checkout subtotals metrics dynamically calculate karne ke liye iska use kiya gaya hai.
        // Input: execution accumulation calculation functions structure. Output: calculated sum values.
        // Agar remove ho jaye, toh pricing dynamic validation operations compute karna bohot tedious manual process ban jayega.
        return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    // Cart.getUniqueCount() method
    // Returns: Total items counts inside cart.
    getUniqueCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Cart.clear() method
    // Complete collection array elements resetting processes.
    clear() {
        this.items = [];
        this.saveToLocalStorage();
    }

    // Cart.saveToLocalStorage() method
    // Storage memory sets tracking parameters arrays.
    saveToLocalStorage() {
        // localStorage.setItem()
        // localStorage.setItem() native Web API global disk key-value system method hai.
        // Isse dynamic system variable details global storage spaces me lock karke save kiye jaate hain.
        // parent: localStorage. returns: void.
        // Problem solved: Cart state variables refresh ya page change hone par safe rehte hain.
        // Agar remove ho, toh state page refresh par automatically default reset (lost) ho jayegi.
        // Input: Key label strings, Values stringified data sets.
        
        // JSON.stringify()
        // JSON.stringify() global static object conversion tool handler hai.
        // Ye variable objects state structures array elements string format me mapping convert karta hai.
        // parent: JSON. returns: Serialized standard plain strings parameters.
        // Agar remove ho, toh variable objects memory address values direct plain state output system error denge.
        localStorage.setItem('nexstore_cart', JSON.stringify(this.items));
    }

    // Cart.loadFromLocalStorage() method
    // Rehydrates arrays values inside database keys memory variables.
    loadFromLocalStorage() {
        // localStorage.getItem()
        // localStorage.getItem() data dynamic values dynamic key parsing variables fetch calls parameters read karta hai.
        // returns: Plain text encoded data representation strings, otherwise null values.
        // Input: Saved Database key. Output: Saved plain String format dynamic object arrays.
        const rawData = localStorage.getItem('nexstore_cart');
        if (rawData) {
            try {
                // JSON.parse()
                // JSON.parse() plain string variables ko readable structural arrays elements and dynamic objects parsing layout me reverse convert karta hai.
                // parent: JSON. returns: Structural dynamic javascript active parsed array configurations.
                // Input: plain storage string. Output: Native fully-functional variable objects layout structures.
                const parsedData = JSON.parse(rawData);
                
                // map()
                // map() array ka dynamic recreation structural projection standard loop method hai.
                // Ye current structural array targets transform karke exact matching dimension outputs records arrays rebuild karta hai.
                // parent: Array. returns: Structural newly calculated arrays arrays.
                // Problem solved: Plain objects re-mapping directly dynamic class system configurations standard properties bindings layout standard outputs run krti h.
                this.items = parsedData.map(item => ({
                    product: new Product(
                        item.product.id,
                        item.product.name,
                        item.product.price,
                        item.product.category,
                        item.product.image,
                        item.product.description
                    ),
                    quantity: item.quantity
                }));
            } catch (err) {
                console.error("Cart hydration execution corrupted. Cleared variables state.", err);
                this.items = [];
            }
        }
    }
}

/* ==========================================================================
   MAIN APPLICATION FLOW CONTROLLER CLASS
   ========================================================================== */

class App {
    constructor() {
        this.products = [];
        this.cart = new Cart();
        
        // JSON.parse() aur localStorage.getItem() integration
        this.orderHistory = JSON.parse(localStorage.getItem('nexstore_orders')) || [];
        
        // Controls status parameters trackers
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.currentSort = 'featured';

        // Bind DOM elements initial settings
        this.initDOMElements();
        // Bind event actions setup loops
        this.initEvents();
    }

    // App.start() async method
    // async execution dynamic API call integration run processes
    // returns: Promise
    async start() {
        try {
            // await keyword
            // await asynchrony dynamic execution execution process dynamic resolution track parameters controls karta hai.
            // Iska code thread executions call standard synchronous patterns run operations ke limits check boundaries optimize karta h.
            // Problem solved: JSON fetch API dynamic arrays responses dynamic resolution system elements variable array load optimization dynamic patterns setup loops.
            this.products = await this.loadProducts();
            this.render();
        } catch (err) {
            this.displayErrorState("Inventory database error. Verify products.json resource mappings location levels.");
            console.error(err);
        }
    }

    // App.loadProducts() async method
    // async method dynamic file readings data fetching handles.
    async loadProducts() {
        // fetch()
        // fetch() modern native global javascript interface function asynchronous network integration handles system setups fetch data patterns.
        // returns: Promise variables configurations arrays standard results objects.
        // Input: targets file paths locations. Output: HTTP values packages headers arrays contents.
        // Agar remove kiya jaye, toh files updates dynamically render karna manual hardcoding structures options run validation check limitations design constraints properties optimization patterns me transform ban jayega.
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP API communications error levels status limits check: ${response.status}`);
        }
        const parsedProducts = await response.json();
        
        return parsedProducts.map(p => new Product(p.id, p.name, p.price, p.category, p.image, p.description));
    }

    // App.initDOMElements()
    // DOM selectors allocations processes.
    initDOMElements() {
        // getElementById()
        // getElementById() native DOM selection interface parameters document parser execution levels call functions checks options.
        // returns: Matching DOM Element, otherwise null configurations output variables.
        // Is code structure modules bindings optimize handles krti h directly element dynamic actions checks standard results.
        this.productGrid = document.getElementById('productGrid');
        this.cartSidebar = document.getElementById('cartSidebar');
        this.siteOverlay = document.getElementById('siteOverlay');
        this.cartOpenBtn = document.getElementById('cartOpenBtn');
        this.cartCloseBtn = document.getElementById('cartCloseBtn');
        this.startShoppingBtn = document.getElementById('startShoppingBtn');

        // Counters controls labels elements selectors
        this.cartBadgeCount = document.getElementById('cartBadgeCount');
        this.cartSidebarCount = document.getElementById('cartSidebarCount');
        this.cartTotalDisplay = document.getElementById('cartTotalDisplay');
        this.cartItemsContainer = document.getElementById('cartItemsContainer');

        // Search options, filters parameters sorting selectors controls
        this.searchInput = document.getElementById('searchInput');
        this.categoryFilterContainer = document.getElementById('categoryFilterContainer');
        this.sortSelect = document.getElementById('sortSelect');

        // Order history elements
        this.orderHistoryList = document.getElementById('orderHistoryList');

        // Form elements mapping parameters selectors
        this.checkoutModal = document.getElementById('checkoutModal');
        this.checkoutOpenBtn = document.getElementById('checkoutOpenBtn');
        this.modalCloseBtn = document.getElementById('modalCloseBtn');
        this.cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
        this.checkoutForm = document.getElementById('checkoutForm');

        this.fullNameInput = document.getElementById('fullName');
        this.emailInput = document.getElementById('emailAddress');
        this.addressInput = document.getElementById('shippingAddress');

        this.overviewItemCount = document.getElementById('overviewItemCount');
        this.overviewTotalCost = document.getElementById('overviewTotalCost');
    }

    // App.initEvents()
    // Event listeners initializations processes setup.
    initEvents() {
        // addEventListener()
        // addEventListener() event register model dynamic process functions configurations handle loop hooks interfaces setups parameters.
        // parent: EventTarget. returns: void.
        // Problem solved: Users triggers (clicks, inputs, submissions, keypress, scrolls) dynamic code routines map targets execute options run handles.
        // Input: event type strings, callback tracking methods.
        this.cartOpenBtn.addEventListener('click', () => this.toggleSidebar(true));
        this.cartCloseBtn.addEventListener('click', () => this.toggleSidebar(false));
        this.startShoppingBtn.addEventListener('click', () => this.toggleSidebar(false));

        this.siteOverlay.addEventListener('click', () => {
            this.toggleSidebar(false);
            this.toggleModal(false);
        });

        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.trim().toLowerCase();
            this.renderProducts();
        });

        this.sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderProducts();
        });

        // Event delegation targets loops filters triggers clicks
        this.categoryFilterContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.category-btn');
            if (!btn) return;

            // classList.remove()
            // classList.remove() DOM tokens class modification dynamic utility tool targets elements dynamic styles changes rules.
            // parent: Element.classList. removes named class properties bindings.
            this.categoryFilterContainer.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            
            // classList.add()
            // classList.add() element targets dynamic specifications classes parameters insertion operations execute methods classes rules.
            btn.classList.add('active');

            this.currentCategory = btn.dataset.category;
            this.renderProducts();
        });

        /* =========================================
           SHOPPING CART SYSTEM (INTERACTION EVENTS)
           ========================================= */
        this.productGrid.addEventListener('click', (e) => {
            const addBtn = e.target.closest('.add-btn-primary');
            if (!addBtn) return;

            const productId = parseInt(addBtn.dataset.id, 10);
            const selectedProduct = this.products.find(p => p.id === productId);
            if (selectedProduct) {
                this.cart.addItem(selectedProduct);
                this.renderCartUI();

                // UI feedback adjustments
                addBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Added!`;
                addBtn.style.backgroundColor = 'var(--success-color)';
                setTimeout(() => {
                    addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add To Cart`;
                    addBtn.style.backgroundColor = '';
                }, 1000);
            }
        });

        this.cartItemsContainer.addEventListener('click', (e) => {
            const target = e.target;
            const incBtn = target.closest('.stepper-inc');
            const decBtn = target.closest('.stepper-dec');
            const deleteBtn = target.closest('.item-delete-btn');

            if (incBtn) {
                const id = parseInt(incBtn.dataset.id, 10);
                this.cart.increaseQuantity(id);
                this.renderCartUI();
            } else if (decBtn) {
                const id = parseInt(decBtn.dataset.id, 10);
                this.cart.decreaseQuantity(id);
                this.renderCartUI();
            } else if (deleteBtn) {
                const id = parseInt(deleteBtn.dataset.id, 10);
                this.cart.removeItem(id);
                this.renderCartUI();
            }
        });

        /* =========================================
           CHECKOUT SYSTEM (INTERACTION EVENTS)
           ========================================= */
        this.checkoutOpenBtn.addEventListener('click', () => {
            this.toggleSidebar(false);
            this.toggleModal(true);
            this.populateCheckoutSummary();
        });

        this.modalCloseBtn.addEventListener('click', () => this.toggleModal(false));
        this.cancelCheckoutBtn.addEventListener('click', () => this.toggleModal(false));

        this.checkoutForm.addEventListener('submit', (e) => {
            // preventDefault() standard browser submissions execution stops loops structures forms
            e.preventDefault();
            this.processCheckout();
        });

        // Real-time error state removals inside form input key handlers loops
        [this.fullNameInput, this.emailInput, this.addressInput].forEach(elem => {
            elem.addEventListener('input', () => {
                elem.parentElement.classList.remove('invalid');
            });
        });
    }

    // ============================================================================
    // UI RENDERING ENGINE LOOPS FUNCTIONS
    // ============================================================================

    render() {
        this.renderProducts();
        this.renderCartUI();
        this.renderOrderHistory();
    }

    toggleSidebar(isOpen) {
        if (isOpen) {
            this.cartSidebar.classList.add('open');
            this.siteOverlay.classList.add('active');
        } else {
            this.cartSidebar.classList.remove('open');
            this.siteOverlay.classList.remove('active');
        }
    }

    toggleModal(isOpen) {
        if (isOpen) {
            this.checkoutModal.classList.add('open');
            this.siteOverlay.classList.add('active');
        } else {
            this.checkoutModal.classList.remove('open');
            this.siteOverlay.classList.remove('active');
            this.resetFormValidationState();
        }
    }

    /* =========================================
       PRODUCT LISTING SECTION
       ========================================= */
    renderProducts() {
        // filter() concept: Match results array against input dynamic options elements rules.
        let displayedItems = this.products.filter(p => {
            const matchesCategory = (this.currentCategory === 'all' || p.category === this.currentCategory);
            
            // includes()
            // includes() matching pattern lookup query checks handles elements arrays lists.
            // parent: String or Array. returns: boolean indicators value options.
            const matchesSearch = p.name.toLowerCase().includes(this.searchQuery) ||
                                  p.category.toLowerCase().includes(this.searchQuery);
            return matchesCategory && matchesSearch;
        });

        // sort()
        // sort() Array inline mutable processing sort mechanics setup handles functions options data values records parameters.
        // parent: Array. returns: Pointer array references.
        // Is project me price dynamics arrays alignment low-high sorting parameters structure set update.
        if (this.currentSort === 'price-asc') {
            displayedItems.sort((a, b) => a.price - b.price);
        } else if (this.currentSort === 'price-desc') {
            displayedItems.sort((a, b) => b.price - a.price);
        } else if (this.currentSort === 'name-asc') {
            displayedItems.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.currentSort === 'name-desc') {
            displayedItems.sort((a, b) => b.name.localeCompare(a.name));
        }

        if (displayedItems.length === 0) {
            this.productGrid.innerHTML = `
                <div class="no-search-results">
                    <i class="fa-solid fa-box-open"></i>
                    <p>No catalog matching values records found settings criteria options elements variables.</p>
                </div>
            `;
            return;
        }

        // map() concept: Array mapping conversion to standard dynamic templates layouts.
        this.productGrid.innerHTML = displayedItems.map(p => `
            <article class="product-card">
                <div class="product-image-container">
                    <span class="product-card-badge">${p.category}</span>
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                </div>
                <div class="product-details">
                    <h3>${p.name}</h3>
                    <p>${p.description}</p>
                    <div class="product-footer">
                        <span class="product-price-tag">$${p.price.toFixed(2)}</span>
                        <button class="add-btn-primary" data-id="${p.id}">
                            <i class="fa-solid fa-plus"></i> Add To Cart
                        </button>
                    </div>
                </div>
            </article>
        `).join('');
    }

    renderCartUI() {
        const count = this.cart.getUniqueCount();
        const total = this.cart.calculateTotal();

        this.cartBadgeCount.textContent = count;
        this.cartSidebarCount.textContent = count;
        this.cartTotalDisplay.textContent = `$${total.toFixed(2)}`;

        this.checkoutOpenBtn.disabled = (this.cart.items.length === 0);

        if (this.cart.items.length === 0) {
            this.cartItemsContainer.innerHTML = `
                <div class="cart-empty-placeholder">
                    <i class="fa-solid fa-basket-shopping placeholder-icon"></i>
                    <p>Your shopping bag is empty.</p>
                    <button class="start-shopping-btn" id="startShoppingBtnInline">Start Shopping</button>
                </div>
            `;
            
            const btnInline = document.getElementById('startShoppingBtnInline');
            if (btnInline) {
                btnInline.addEventListener('click', () => this.toggleSidebar(false));
            }
            return;
        }

        this.cartItemsContainer.innerHTML = this.cart.items.map(item => `
            <div class="cart-item-row">
                <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-thumbnail">
                <div class="cart-item-info">
                    <div>
                        <h4>${item.product.name}</h4>
                        <span class="cart-item-price-unit">$${item.product.price.toFixed(2)}</span>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-stepper">
                            <button class="stepper-btn stepper-dec" data-id="${item.product.id}">-</button>
                            <span class="stepper-value">${item.quantity}</span>
                            <button class="stepper-btn stepper-inc" data-id="${item.product.id}">+</button>
                        </div>
                        <button class="item-delete-btn" data-id="${item.product.id}">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    populateCheckoutSummary() {
        const count = this.cart.getUniqueCount();
        const total = this.cart.calculateTotal();
        this.overviewItemCount.textContent = `${count} Item${count > 1 ? 's' : ''}`;
        this.overviewTotalCost.textContent = `$${total.toFixed(2)}`;
    }

    /* =========================================
       ORDER HISTORY SYSTEM
       ========================================= */
    renderOrderHistory() {
        if (this.orderHistory.length === 0) {
            this.orderHistoryList.innerHTML = `<p class="empty-history-fallback">No previous order receipts saved locally on this machine.</p>`;
            return;
        }

        this.orderHistoryList.innerHTML = this.orderHistory.map(o => `
            <div class="order-receipt-card">
                <div class="receipt-header-row">
                    <span>Receipt Reference: <strong>#${o.id}</strong></span>
                    <span>Date: <strong>${o.date}</strong></span>
                </div>
                <div class="receipt-summary-row">
                    <span>${o.itemCount} item${o.itemCount > 1 ? 's' : ''} purchased</span>
                    <span class="receipt-total">$${parseFloat(o.totalAmount).toFixed(2)}</span>
                </div>
            </div>
        `).join('');
    }

    resetFormValidationState() {
        this.checkoutForm.reset();
        [this.fullNameInput, this.emailInput, this.addressInput].forEach(elem => {
            elem.parentElement.classList.remove('invalid');
        });
    }

    displayErrorState(message) {
        this.productGrid.innerHTML = `
            <div class="no-search-results">
                <i class="fa-solid fa-circle-exclamation" style="color: var(--error-color);"></i>
                <p>${message}</p>
            </div>
        `;
    }

    /* =========================================
       CHECKOUT SYSTEM (SUBMISSIONS & LOCAL LOGS)
       ========================================= */
    processCheckout() {
        let isFormValid = true;

        const nameVal = this.fullNameInput.value.trim();
        if (nameVal.length < 3) {
            this.fullNameInput.parentElement.classList.add('invalid');
            isFormValid = false;
        } else {
            this.fullNameInput.parentElement.classList.remove('invalid');
        }

        const emailVal = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            this.emailInput.parentElement.classList.add('invalid');
            isFormValid = false;
        } else {
            this.emailInput.parentElement.classList.remove('invalid');
        }

        const addressVal = this.addressInput.value.trim();
        if (addressVal.length < 10) {
            this.addressInput.parentElement.classList.add('invalid');
            isFormValid = false;
        } else {
            this.addressInput.parentElement.classList.remove('invalid');
        }

        if (!isFormValid) return;

        const generatedOrderId = Math.floor(100000 + Math.random() * 900000);
        const orderReceipt = {
            id: generatedOrderId,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            totalAmount: this.cart.calculateTotal().toFixed(2),
            itemCount: this.cart.getUniqueCount()
        };

        // unshift() Array insertion parameters controls to standard top records
        this.orderHistory.unshift(orderReceipt);
        localStorage.setItem('nexstore_orders', JSON.stringify(this.orderHistory));

        alert(`Purchase Order Confirmed, ${nameVal}!\nOrder Reference ID: #${generatedOrderId}\nCharged Total: $${orderReceipt.totalAmount}`);

        this.cart.clear();
        this.toggleModal(false);
        this.render();
    }
}

// Instantiate the application controller system
const app = new App();
app.start();

