type Props = {
  src: string
  alt: string
  caption: string
  compact?: boolean
}

export default function VideoStill({ src, alt, caption, compact = false }: Props) {
  return (
    <figure className={`project-video-figure${compact ? ' project-video-figure-compact' : ''}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
