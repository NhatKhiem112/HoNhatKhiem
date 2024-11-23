import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const CategoryDetail = () => {
    const { slug } = useParams(); // Getting the category slug from the URL
    const [products, setProducts] = useState([]); // State to hold products
    const [selectedPriceRange, setSelectedPriceRange] = useState(''); // State for selected price range
    const [isOnPromotion, setIsOnPromotion] = useState(''); // State for promotion filter
    const [sortOrder, setSortOrder] = useState('newest'); // State for sorting order
    const [pagination, setPagination] = useState({}); // State for pagination data
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [loading, setLoading] = useState(false); // State for loading
    const [autoPaginate, setAutoPaginate] = useState(false); // State for automatic pagination
    const [error, setError] = useState(null); // State for error handling
    const [cachedProducts, setCachedProducts] = useState({}); // Cache for products by category

    // Price ranges
    const priceRanges = [
        { label: '< 1,000,000', value: '0-1000000' },
        { label: '1,000,000 - 5,000,000', value: '1000000-5000000' },
        { label: '5,000,000 - 10,000,000', value: '5000000-10000000' },
        { label: '10,000,000 - 20,000,000', value: '10000000-20000000' },
        { label: '> 20,000,000', value: '20000000-99999999999' },
    ];

    useEffect(() => {
        fetchProducts(currentPage); // Fetch products on initial render and when page changes
    }, [currentPage]);

    const fetchProducts = async (page = 1) => {
        setLoading(true); // Set loading to true before fetching
        setError(null); // Reset any previous errors

        // Check if products for the current category are already cached
        const cacheKey = `${slug}-${selectedPriceRange}-${isOnPromotion}-${sortOrder}-${page}`;
        if (cachedProducts[cacheKey]) {
            setProducts(cachedProducts[cacheKey]); // Load from cache
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/danh-muc/${slug}`, {
                params: {
                    price_range: selectedPriceRange,
                    on_promotion: isOnPromotion,
                    sort_order: sortOrder,
                    page,
                },
            });
            setProducts(response.data.data); // Set fetched products
            setPagination(response.data); // Assume pagination data in response
            
            // Cache the fetched products
            setCachedProducts(prev => ({
                ...prev,
                [cacheKey]: response.data.data,
            }));
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Unable to fetch products. Please try again later.'); // Set error message
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    const handleFilterChange = () => {
        setCurrentPage(1); // Reset to page 1 when filters change
        fetchProducts(1);
    };

    useEffect(() => {
        handleFilterChange(); // Call filter change handler on filter updates
    }, [selectedPriceRange, isOnPromotion, sortOrder]);

    // Automatic pagination effect
    useEffect(() => {
        let interval = null;

        if (autoPaginate) {
            interval = setInterval(() => {
                if (pagination.links) {
                    const nextPageLink = pagination.links.find(link => link.label.includes("Next") && link.url);
                    if (nextPageLink) {
                        setCurrentPage(prev => prev + 1); // Move to next page
                    } else {
                        setAutoPaginate(false); // Stop if no next page
                    }
                }
            }, 3000); // Change page every 3 seconds
        }

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [autoPaginate, pagination]);

    const handlePrint = () => {
        window.print(); // Print the current page
    };

    return (
        <div style={styles.container}>
            {/* Filter Section */}
            <div style={styles.filter}>
                {/* Price Filter */}
                <div style={styles.filterChild}>
                    <span>Giá:</span>
                    <select
                        value={selectedPriceRange}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="ml-2 h-8 border-none outline-none rounded-lg"
                    >
                        <option value="">Chọn khoảng giá</option>
                        {priceRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Promotion Filter */}
                <div style={styles.filterChild}>
                    <span>Khuyến mãi:</span>
                    <select
                        value={isOnPromotion}
                        onChange={(e) => setIsOnPromotion(e.target.value)}
                        className="ml-2 h-8 border-none outline-none rounded-lg"
                    >
                        <option value="">Chọn điều kiện</option>
                        <option value="promotion">Đang khuyến mãi</option>
                    </select>
                </div>
                {/* Sorting Filter */}
                <div style={styles.filterChild}>
                    <span>Sắp xếp:</span>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="ml-2 h-8 border-none outline-none rounded-lg"
                    >
                        <option value="newest">Sản phẩm mới nhất</option>
                        <option value="high_to_low">Giá cao đến thấp</option>
                        <option value="low_to_high">Giá thấp đến cao</option>
                    </select>
                </div>
            </div>

            {/* Product Section */}
            <div style={styles.productSection}>
                <h3 className="text-xl font-bold mb-4 text-center">Sản phẩm</h3>
                <div style={styles.productGrid}>
                    {loading ? (
                        <p>Đang tải sản phẩm...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : products.length > 0 ? (
                        products.map((productItem) => (
                            <ProductCard key={productItem.id} product={productItem} onAddToCart={() => {}} />
                        ))
                    ) : (
                        <p>Không có sản phẩm nào trong danh mục này.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

// Styles object
const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px',
    },
    filter: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    filterChild: {
        border: '1px solid #D1D5DB',
        borderRadius: '8px',
        padding: '8px',
        flexGrow: 1,
        marginBottom: '10px',
    },
    productSection: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '24px',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px',
    },
    button: {
        margin: '0 8px',
        padding: '8px 16px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    activeButton: {
        backgroundColor: '#3B82F6',
        color: 'white',
    },
    inactiveButton: {
        backgroundColor: '#E5E7EB',
        color: '#374151',
    },
};

export default CategoryDetail;
