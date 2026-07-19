import { motion } from 'framer-motion'
import { useEffect } from 'react'

function Lightbox({ isOpen, item, items, currentIndex, onClose, onNext, onPrev, variant }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
      if (event.key === 'ArrowRight') {
        onNext()
      }
      if (event.key === 'ArrowLeft') {
        onPrev()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen || !item) {
    return null
  }

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="presentation">
      <motion.div
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={variant === 'certificate' ? 'Certificate preview' : 'Project gallery'}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close preview">
          ×
        </button>

        <div className="lightbox-media">
          <img src={item.src} alt={item.alt} loading="eager" />
        </div>

        <div className="lightbox-content">
          <p className="lightbox-label">
            {variant === 'certificate' ? 'Certification preview' : 'Project gallery'}
          </p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.meta ? <p className="lightbox-meta">{item.meta}</p> : null}

          <div className="lightbox-actions">
            {currentIndex > 0 ? (
              <button type="button" className="button secondary" onClick={onPrev}>
                Previous
              </button>
            ) : null}
            {currentIndex < items.length - 1 ? (
              <button type="button" className="button primary" onClick={onNext}>
                Next
              </button>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Lightbox
