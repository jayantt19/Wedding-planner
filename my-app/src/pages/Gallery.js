import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import './Gallery.css';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1520962914815-55ac2fdc76cd', caption: 'Fairytale Outdoor Setup', category: 'Ceremony' },
  { src: 'https://images.unsplash.com/photo-1530026405186-ed1f13931383', caption: 'Elegant Reception Hall', category: 'Reception' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc', caption: 'Romantic Sunset Ceremony', category: 'Ceremony' },
  { src: 'https://images.unsplash.com/photo-1519741497674-4114818c402b', caption: 'Luxury Floral Decor', category: 'Pre-Wedding' },
  { src: 'https://images.unsplash.com/photo-1516184124292-3c2e1dc28872', caption: 'Classic Bridal Portrait', category: 'Pre-Wedding' },
  { src: 'https://images.unsplash.com/photo-1519227355998-9b2f5e7c3698', caption: 'Chic Table Settings', category: 'Reception' },
  { src: 'https://images.unsplash.com/photo-1519337265831-4fded23cafeb', caption: 'Dramatic Aisle Walk', category: 'Ceremony' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', caption: 'The Perfect Cake Moment', category: 'Reception' },
  { src: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044', caption: 'Bridal Elegance', category: 'Pre-Wedding' },
  { src: 'https://images.unsplash.com/photo-1519227355998-9b2f5e7c3698', caption: 'Golden Hour Vows', category: 'Ceremony' },
];

const categories = ['All', 'Ceremony', 'Reception', 'Pre-Wedding'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    selectedCategory === 'All' ? galleryImages : galleryImages.filter(img => img.category === selectedCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const closeLightbox = () => setSelectedImage(null);

  return (
    <div className="gallery-container">
      {/* Hero Section */}
      <section className="gallery-hero" role="banner">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Wedding Inspiration Gallery</h1>
          <p>
            Discover the magic of love captured in our curated collection of wedding moments. Let these visuals inspire your
            dream day.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-btn"
            aria-label="Browse our wedding gallery"
          >
            Browse Now <FaHeart />
          </motion.button>
        </motion.div>
      </section>

      {/* Filter and Grid */}
      <section className="gallery-main">
        <div className="gallery-header">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            Explore Our Portfolio
          </motion.h2>
          <div className="filter-buttons">
            {categories.map(cat => (
              <motion.button
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Filter by ${cat}`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                variants={itemVariants}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.src} alt={image.caption} loading="lazy" />
                <div className="caption">{image.caption}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Featured Moments */}
      <section className="featured-moments">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          Featured Moments
        </motion.h2>
        <motion.div
          className="featured-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {galleryImages.slice(0, 3).map((image, index) => (
            <motion.div
              key={index}
              className="featured-item"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.caption} loading="lazy" />
              <div className="featured-caption">{image.caption}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeLightbox}
        >
          <motion.div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.caption} />
            <p>{selectedImage.caption}</p>
            <button className="close-btn" onClick={closeLightbox} aria-label="Close lightbox">
              ×
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* CTA */}
      <section className="gallery-cta">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Get Inspired for Your Big Day</h2>
          <p>
            Let our gallery spark your imagination. Contact us to start planning your own unforgettable wedding.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-btn"
            aria-label="Contact us for wedding planning"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery;