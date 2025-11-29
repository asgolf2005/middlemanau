export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4'
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-star-blue border-t-transparent rounded-full animate-spin`} />
    </div>
  )
}
