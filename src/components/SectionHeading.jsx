import { motion } from 'framer-motion'

function SectionHeading({ number, title, intro }) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      <span className="section-number">{number}</span>
      <div>
        <p className="section-kicker">{intro}</p>
        <h2>{title}</h2>
      </div>
    </motion.div>
  )
}

export default SectionHeading
